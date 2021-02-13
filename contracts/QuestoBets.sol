// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title Long Bets, but Crypto TM
 * @dev Store & retrieve value in a variable
 */

import "./LongBet.sol";

contract QuestoBets {
    LongBet[] bets;

    function newBet(
        address arg_challenger, 
        address arg_arbiter, 
        address pWins, 
        address cWins, 
        string memory pArg, 
        string memory t)
    payable 
    public returns (address){
        require(msg.value > 0, "must deposit stake");
        require(msg.sender != arg_challenger && arg_challenger != arg_arbiter && arg_arbiter != msg.sender, "predictor, challenger, arbiter must be different addresses");
        require(
            keccak256(bytes(pArg)) != keccak256(bytes("")) && 
            keccak256(bytes(t)) != keccak256(bytes("")), 
            "predictor's argument and terms shouldn't be empty"
            );

        bets.push(new LongBet{value:msg.value}(msg.sender, arg_challenger, arg_arbiter, pWins, cWins, pArg, t));
        // payable(address(bets[bets.length-1])).transfer(msg.value);
        return address(bets[bets.length-1]);
    }
}

