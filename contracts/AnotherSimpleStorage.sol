// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract AnotherSimpleStorage {
  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}