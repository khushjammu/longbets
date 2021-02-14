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
    // todo: make both parties contribute to the prize pool (right now, only predictor stakes)
    // todo: both parties need to agree on arbiter
    // todo: change rewardees
    
    bool _isActive = true;
    
    address public predictor;
    address public challenger;
    address public arbiter; // person who casts the tie-breaker vote in whether a bet was resolved or not
    
    uint256 public stakes; // todo: delete this
    address public predictorWins; // money sent here when predictor wins
    address public challengerWins; // money sent here when challenger wins

    string public prediction; // the actual prediction
    
    string public predictorArg;
    string public challengerArg;
    string public arbiterArg;
    
    string public detailedTerms;
    
    enum VoteState { NotVoted, VotedYes, VotedNo }
    
    mapping (address => VoteState) public votes; // stores the votes by individuals
    mapping (address => bool) public accepted; // stores individuals accepting

    
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

    modifier isParty() {
        // disable voting until all have accepted the bet
         require(
         	msg.sender == predictor ||
         	msg.sender == challenger ||
         	msg.sender == arbiter,
         	"error: not predictor, challenger, or arbiter. must be party to bet."
         	);
        _;
    }

    // creates the LongBet
    constructor(
    	string memory arg_prediction,
    	address arg_predictor,
        address arg_challenger, 
        address arg_arbiter, 
        address pWins, 
        address cWins, 
        string memory pArg, 
        string memory t) 
        payable {
        	require(msg.value > 0, "must deposit stake");
        	require (keccak256(bytes(arg_prediction)) != keccak256(bytes("")), "must provide prediction!");
            require(arg_predictor != arg_challenger && arg_challenger != arg_arbiter && arg_arbiter != arg_predictor, "predictor, challenger, arbiter must be different addresses");
            require(
                keccak256(bytes(pArg)) != keccak256(bytes("")) && 
                keccak256(bytes(t)) != keccak256(bytes("")), 
                "predictor's argument and terms shouldn't be empty"
                );
                

            prediction = arg_prediction;
            
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
    checkActive
    isParty {
        accepted[msg.sender] = true;
    }
    
    function vote(VoteState myVote) 
    public 
    checkActive 
    isParty
    checkAllAccepted {
        require(myVote != VoteState.NotVoted, "can't vote for NotVote"); // disable voting until all have accepted the bet
        
        votes[msg.sender] = myVote;
        shouldComplete();
        // todo: disallow anyone but the predictor/challenger/arbiter from accepting/voting
    }
    
    // contract doesn't need to be active for this to work
    // anybody should be able to call this
    function getVote(address voter) 
    public 
    view 
    returns (VoteState){
        return votes[voter];
    }
    
    // todo: should this only run if a party to the bet runs it? by right, they shouldn't even be calling this
    // i've put in the modifier. let's see how it works
    function shouldComplete() 
    public 
    checkActive 
    isParty {
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
    
    // todo: is this a security vulnerability? aka could someone else just trigger this and end bet prematurely?
    function distributeReward(address rewardee) 
    private 
    checkActive 
    isParty {
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

