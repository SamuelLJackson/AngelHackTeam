pragma solidity ^0.4.21;

import "./Token.sol";
/**
 * @title Mineable Token
 *
 * @dev Turns a wallet into a mine for a specified ERC20 token
 */
contract OracleToken is Token {

    event Mine(address indexed to, uint value);

    bytes32 public currentChallenge;
    uint public timeOfLastProof; // time of last challenge solved
    uint256 public difficulty = 2**256 - 1; // Difficulty starts low
    uint256 public baseReward = 1;
    bool public incrementalRewards = true;
    Token public token;
    uint maxRewardPercent = 50;
    address owner;
    string oracleName;
    mapping(uint => uint) values;
    uint[5] last_five_values;


    /**
     * @dev Constructor that sets the passed value as the token to be mineable.
     * @param _token ERC20 ERC20 compatible token
     */
    function OracleToken(Token _token) {
        token = _token;
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
  function transferOwnership(address newOwner) onlyOwner {
    require(newOwner != address(0));
    owner = newOwner;
  }

    /**
     * @dev Change the difficulty
     * @param _difficulty uint256 difficulty to be set
     */
    function setDifficulty(uint256 _difficulty) onlyOwner {
        difficulty = _difficulty;
    }

    /**
     * @dev Change the maximum percent of the total supply that can be rewarded
     * @param _percent uint Maximum percent of the total supply to be rewarded
     */
    function setMaxRewardPercentOfTotal(uint _percent) onlyOwner {
        if (_percent < 1 || _percent > 100) revert();
        maxRewardPercent = _percent;
    }

    /**
     * @dev Change the reward
     * @param _baseReward uint256 base reward given when not incremental
     */
    function setBaseReward(uint256 _baseReward) onlyOwner {
        baseReward = _baseReward;
    }

    /**
     * @dev Change if the reward should increment or not
     * @param _shouldRewardIncrement bool Wehether the reward should be incremental or not
     */
    function isIncremental(bool _shouldRewardIncrement) onlyOwner {
        incrementalRewards = _shouldRewardIncrement;
    }

    /**
     * @dev Get the balance of the contract
     * @return returns the number of tokens associated with the contract
     */
    function getTokenBalance() returns (uint256) {
        return token.balanceOf(address(this));
    }

    /**
     * @dev Change the token to be mined
     * @param _newToken ERC20 ERC20-compatible token
     */
    function changeToken(ERC20 _newToken) {
        token = _newToken;
    }

    /**
     * @dev Transfer tokens out of the contract
     * @param _to address Address being transfered to
     * @param _amount uint256 Amount of tokens being transfered
     */
    function transfer(address _to, uint256 _amount) onlyOwner {
        token.transfer(_to, _amount);
    }

    /**
     * @dev Calculate the reward
     * @return uint256 Returns the amount to reward
     */
    function calculateReward() returns (uint256 reward) {
        uint256 totalSupply = getTokenBalance();

        /* Check if we are incrementing reward */
        if (incrementalRewards == true) {
            uint maxReward = (totalSupply * maxRewardPercent/100);
            reward = (totalSupply * (now - timeOfLastProof) / 1 years);
            if (reward > maxReward) reward = maxReward; // Make sure reward does not exceed maximum percent
        } else {
            reward = baseReward;
        }

        if (reward > totalSupply) return totalSupply;

        return reward;
    }

    /**
     * @dev Proof of work to be done for mining
     * @param nonce uint
     * @return uint The amount rewarded
     */
    function proofOfWork(uint nonce, uint[5] _last5) returns (uint256 reward) {
        bytes32 n = sha3(nonce, currentChallenge); // generate random hash based on input
        if (n > bytes32(difficulty)) revert();

        uint timeSinceLastProof = (now - timeOfLastProof); // Calculate time since last reward
        if (timeSinceLastProof < 5 seconds) revert(); // Do not reward too quickly

        reward = calculateReward();

        token.transfer(msg.sender, reward); // reward to winner grows over time

        difficulty = difficulty * 10 minutes / timeSinceLastProof + 1; // Adjusts the difficulty

        timeOfLastProof = now;
        currentChallenge = sha3(nonce, currentChallenge, block.blockhash(block.number - 1)); // Save hash for next proof

        Mine(msg.sender, reward); // execute an event reflecting the change


        last5times[4] = last5times[3];
        last5times[3] = last5times[2];
        last5times[2] = last5times[1];
        last5times[1] = last5times[0];
        last5times[0] = timeOfLastProof;
        for(i=0;i<5;i++){
            timevalues(last5times[i]).push(_last5[i]);
        }
        pushValue(last5times[4]);

        winner[timeOfLastProof] = msg.sender;

        return reward;
    }

    function pushValue(_time) internal {
        quicksort(timevalues[_time]);
        uint med_value = timevalues[2];

        values[_time] = med_value;
    }

        function retrieveData(uint _timestamp) public constant returns (uint) {
        return values[_timestamp];
    }

    mapping(uint => uint[5]) timevalues;
    mapping(uint => address) winner;
    uint[5] last5times;

     function quickSort(uint[] storage arr, uint left, uint right) internal {
        uint i = left;
        uint j = right;
        uint pivot = arr[left + (right - left) / 2];
        while (i <= j) {
            while (arr[i] < pivot) i++;
            while (pivot < arr[j]) j--;
            if (i <= j) {
                (arr[i], arr[j]) = (arr[j], arr[i]);
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