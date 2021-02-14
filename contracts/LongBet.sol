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
    // todo: both parties need to agree on arbiter
    
    bool _isActive = true;
    
    address public predictor;
    address public challenger;
    address public arbiter; // person who casts the tie-breaker vote in whether a bet was resolved or not
    
    uint256 public stakes; // used to determine how much the challenger needs to determine (it's half of the total pot)
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
                
            stakes = msg.value;
            prediction = arg_prediction;
            
            predictor = arg_predictor;
            challenger = arg_challenger;
            arbiter = arg_arbiter;

            // initially, had a hack here to ensure that the arguments were passed and to have a default value if they weren't
            // there's no need to do that because they MUST pass all parameters to call function
            // if they give a shitty address, that's on them 
            predictorWins = pWins;
            challengerWins = cWins;
            
            // require ensures these are not empty
            predictorArg = pArg;
            detailedTerms = t;
    }
    
    function acceptBet() 
    public 
    payable
    checkActive
    isParty {
        // if challenger, must deposit equal stake
        if (msg.sender == challenger) {
            require(msg.value == stakes, "must deposit an equal stake to the predictor!");
        }
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
    }
    
    // contract doesn't need to be active for this to work
    // anybody should be able to call this
    function getVote(address voter) 
    public 
    view 
    returns (VoteState){
        return votes[voter];
    }
    
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

    function editArgument(string calldata newText)
    public
    checkActive
    isParty {
        if (msg.sender == challenger) {
            challengerArg = newText;
        } else if (msg.sender == predictor) {
            predictorArg = newText;
        } else if (msg.sender == arbiter) { 
            arbiterArg = newText;
        }
    }

    function editTerms(string calldata newText)
    public
    checkActive
    isParty {
        require(msg.sender == arbiter, "only arbiter can change detailed terms");
        detailedTerms = newText;
    }
    
    /* 
    TODO: create this funcs
    */
    
    // edit fields?
    // edit payees
}

