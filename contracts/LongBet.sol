// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Long Bets, but Crypto TM
 * @dev Store & retrieve value in a variable
 */

contract LongBet {
    // todo: add "earliest date this can be voted on"
    // todo: add duration (e.g. this bet is over x years)
    // todo: add way for arbiter and challenger to set their arguments
    // todo: disallow anyone but the predictor/challenger/arbiter from accepting/voting
    // todo: make both parties contribute to the prize pool (right now, only predictor stakes)
    // todo: both parties need to agree on arbiter
    // todo: change rewardees
    
    bool _isActive = true;
    
    address predictor;
    address challenger;
    address arbiter; // person who casts the tie-breaker vote in whether a bet was resolved or not
    
    uint256 stakes;
    address predictorWins; // money sent here when predictor wins
    address challengerWins; // money sent here when challenger wins
    
    string predictorArg;
    string challengerArg;
    string arbiterArg;
    
    string detailedTerms;
    
    enum VoteState { NotVoted, VotedYes, VotedNo }
    
    mapping (address => VoteState) votes; // stores the votes by individuals
    mapping (address => bool) accepted; // stores individuals accepting
    


    
    // https://ethereum.stackexchange.com/questions/82203/how-to-disable-a-contract-by-changing-some-internal-state-which-causes-all-funct
    modifier checkActive() {
        require (_isActive, "contract no longer active");
        _;
    }
    
    modifier checkAllAccepted() {
         // disable voting until all have accepted the bet
        require((accepted[predictor] && accepted[challenger] && accepted[arbiter]), "not all parties have accepted");
        _;
    }

    // creates the LongBet
    constructor(
    	address arg_predictor,
        address arg_challenger, 
        address arg_arbiter, 
        address pWins, 
        address cWins, 
        string memory pArg, 
        string memory t) 
        payable {
            require(arg_predictor != arg_challenger && arg_challenger != arg_arbiter && arg_arbiter != arg_predictor, "predictor, challenger, arbiter must be different addresses");
            require(
                keccak256(bytes(pArg)) != keccak256(bytes("")) && 
                keccak256(bytes(t)) != keccak256(bytes("")), 
                "predictor's argument and terms shouldn't be empty"
                );
                
            // todo: add check that value is > 0
            
            predictor = arg_predictor;
            challenger = arg_challenger;
            arbiter = arg_arbiter;
            
            // right now, these conditions are suboptimal: it's a hacky way of approximating null
            // todo: improve this
            predictorWins = pWins == address(0x0) ? arg_predictor: pWins;
            challengerWins = cWins == address(0x0) ? arg_challenger: cWins;
            
            // todo: add assertion these aren't empty
            predictorArg = pArg;
            detailedTerms = t;
    }
    
    function acceptBet() 
    public 
    checkActive {
        accepted[msg.sender] = true;
    }
    
    function vote(VoteState myVote) 
    public 
    checkActive 
    checkAllAccepted {
        require(myVote != VoteState.NotVoted, "can't vote for NotVote"); // disable voting until all have accepted the bet
        
        votes[msg.sender] = myVote;
        shouldComplete();
    }
    
    function getVote(address voter) 
    public 
    view 
    checkActive
    returns (VoteState){
        return votes[voter];
    }
    
    function shouldComplete() 
    public 
    checkActive {
        // majority voted yes = predictor won
        if (
            (votes[predictor] == VoteState.VotedYes && votes[challenger] == VoteState.VotedYes) ||
            (votes[predictor] == VoteState.VotedYes && votes[arbiter] == VoteState.VotedYes) ||
            (votes[challenger] == VoteState.VotedYes && votes[arbiter] == VoteState.VotedYes)
            ) {
                distributeReward(predictorWins);
            } 
            
        // majority voted no = challenger won
        else if (
            (votes[predictor] == VoteState.VotedNo && votes[challenger] == VoteState.VotedNo) ||
            (votes[predictor] == VoteState.VotedNo && votes[arbiter] == VoteState.VotedNo) ||
            (votes[challenger] == VoteState.VotedNo && votes[arbiter] == VoteState.VotedNo)
            ) {
                distributeReward(challengerWins);
            }
    }
    
    function distributeReward(address rewardee) 
    private 
    checkActive {
        // send all money to this dude and deactivate contract
        _isActive = false;
        // todo: should i stop using transfer? see: https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/
        payable(rewardee).transfer(address(this).balance);
    }
    
    /* 
    TODO: create this funcs
    */
    
    // edit a bet?
}

