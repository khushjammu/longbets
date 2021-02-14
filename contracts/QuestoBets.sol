// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Long Bets, but Crypto TM
 * @dev Store & retrieve value in a variable
 */

import "./LongBet.sol";

contract QuestoBets {
    LongBet[] public bets;

    event NewBet(
        address indexed predictor,
        address indexed challenger,
        address indexed arbiter,
        address createdBet
        );

    // this emits an event which web3 can listen for
    // (https://ethereum.stackexchange.com/questions/35679/how-to-return-address-from-newly-created-contract)
    function newBet(
        string calldata prediction,
        address arg_challenger, 
        address arg_arbiter, 
        address pWins, 
        address cWins, 
        string calldata pArg, 
        string calldata t)
    payable 
    public {
        require (keccak256(bytes(prediction)) != keccak256(bytes("")), "must provide prediction!");
        require(msg.value > 0, "must deposit stake");
        require(msg.sender != arg_challenger && arg_challenger != arg_arbiter && arg_arbiter != msg.sender, "predictor, challenger, arbiter must be different addresses");
        require(
            keccak256(bytes(pArg)) != keccak256(bytes("")) && 
            keccak256(bytes(t)) != keccak256(bytes("")), 
            "predictor's argument and terms shouldn't be empty"
            );

        bets.push(new LongBet{value:msg.value}(prediction, msg.sender, arg_challenger, arg_arbiter, pWins, cWins, pArg, t));
        // payable(address(bets[bets.length-1])).transfer(msg.value);
        emit NewBet(msg.sender, arg_challenger, arg_arbiter, address(bets[bets.length-1]));
    }

    function getLatestBet()
    public
    view
    returns (address) {
        return address(bets[bets.length-1]);
    }

    function getBets()
    public
    view
    returns (LongBet[] memory) {
        return bets;
    }
}

