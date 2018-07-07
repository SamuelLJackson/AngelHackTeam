pragma solidity ^0.4.21;

owner = msg.sender;

contract ERC20 is ERC20Basic {
  uint256 public totalSupply;
  event Approval(address indexed owner, address indexed spender, uint256 value);
  event Transfer(address indexed from, address indexed to, uint256 value);
  function allowance(address owner, address spender) constant returns (uint256);
  function transferFrom(address from, address to, uint256 value) returns (bool);
  function approve(address spender, uint256 value) returns (bool);
  function balanceOf(address who) constant returns (uint256);
  function transfer(address to, uint256 value) returns (bool);
}