pragma solidity ^0.4.21;


import "./Token.sol";
/**
 * @title Mineable Token
 *
 * @dev Turns a wallet into a mine for a specified ERC20 token
 */
contract OracleToken is Token {

    
    /*Variables*/

    bytes32 public currentChallenge;
    uint public timeOfLastProof; // time of last challenge solved
    uint256 public difficulty = 2**256 - 1; // Difficulty starts low
    uint256 public baseReward = 1;
    bool public incrementalRewards = true;
    uint count;

    uint maxRewardPercent = 50;
    address owner;
    string oracleName;
    mapping(uint => uint) values;
    Details[5] first_five;
    struct Details {
        uint value;
        address miner;
    }
 

    /*Events*/
    event Mine(address indexed to, uint value);

    /*Functions*/
    /**
     * @dev Constructor that sets the passed value as the token to be mineable.

     */
    constructor() public{
        timeOfLastProof = now;
        owner = msg.sender;
    }

    modifier onlyOwner() {
    require(msg.sender == owner);
    _;
   }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) onlyOwner public{
    require(newOwner != address(0));
    owner = newOwner;
  }

    /**
     * @dev Change the difficulty
     * @param _difficulty uint256 difficulty to be set
     */
    function setDifficulty(uint256 _difficulty) onlyOwner public{
        difficulty = _difficulty;
    }

    /**
     * @dev Change the maximum percent of the total supply that can be rewarded
     * @param _percent uint Maximum percent of the total supply to be rewarded
     */
    function setMaxRewardPercentOfTotal(uint _percent) onlyOwner public {
        if (_percent < 1 || _percent > 100) revert();
        maxRewardPercent = _percent;
    }

    /**
     * @dev Change the reward
     * @param _baseReward uint256 base reward given when not incremental
     */
    function setBaseReward(uint256 _baseReward) onlyOwner public {
        baseReward = _baseReward;
    }

    /**
     * @dev Change if the reward should increment or not
     * @param _shouldRewardIncrement bool Wehether the reward should be incremental or not
     */
    function isIncremental(bool _shouldRewardIncrement) onlyOwner public {
        incrementalRewards = _shouldRewardIncrement;
    }







    /**
     * @dev Proof of work to be done for mining
     * @param nonce uint
     * @return uint The amount rewarded
     */

    function proofOfWork(uint nonce, uint value) returns (uint256) {
        bytes32 n = sha3(nonce, currentChallenge); // generate random hash based on input
        if (n > bytes32(difficulty)) revert();
        uint timeSinceLastProof = (now - timeOfLastProof); // Calculate time since last reward
        if (timeSinceLastProof < 5 seconds) revert(); // Do not reward too quickly
        difficulty = difficulty * 10 minutes / timeSinceLastProof + 1; // Adjusts the difficulty


        timeOfLastProof = now - (now % 3600);

        if (count<5) {
           first_five[count] = Details({
                value: value,
                miner: msg.sender
            });  
        } 
        if(count==5) {
            pushValue(timeOfLastProof);
            emit Mine(msg.sender, value); // execute an event reflecting the change
        }
        else {
        currentChallenge = sha3(nonce, currentChallenge, block.blockhash(block.number - 1)); // Save hash for next proof
        }
        count++;
        return (count);
    }

    function pushValue(uint _time) internal {
        quickSort(first_five,0,4);
        transfer(first_five[2].miner, 10); // reward to winner grows over time
        transfer(first_five[1].miner, 5); // reward to winner grows over time
        transfer(first_five[3].miner, 5); // reward to winner grows over time
        transfer(first_five[0].miner, 1); // reward to winner grows over time
        transfer(first_five[4].miner, 1); // reward to winner grows over time
        values[_time] = first_five[2].value;
    }

    function retrieveData(uint _timestamp) public constant returns (uint) {
        return values[_timestamp];
    }



     function quickSort(Details[5] storage arr, uint left, uint right) internal {
        uint i = left;
        uint j = right;
        uint pivot = arr[left + (right - left) / 2].value;
        while (i <= j) {
            while (arr[i].value < pivot) i++;
            while (pivot < arr[j].value) j--;
            if (i <= j) {
                (arr[i].value, arr[j].value) = (arr[j].value, arr[i].value);
                (arr[i].miner, arr[j].miner) = (arr[j].miner, arr[i].miner);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, left, j);
        if (i < right)
            quickSort(arr, i, right);
    }


    
}