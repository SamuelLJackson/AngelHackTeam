# Mineable Oracle Token

<b>Project "Minable Oracle Token (or MOT)</b> is an oracle schema that implements a mineable proof of work (POW) competiton to determine the validity of data outside of the blockchain.  Once aggregated, validated, and processed into a consumable output, these oracle data entries will be internally referred to as 'truthpoints'.  

This project draws inspiration from the EIP918 Mineable Token as an abstract standard that uses a SHA-256 Proof of Work algorithm for token minting and distribution.  

MOT leverages a novel game-theoretical competition in an attempt to disintermediate and decentralize the existing 3rd party trust layer associated with centralized oracle services like Oraclize, whcih use basic API getters to provide smart-contracts with off-chain data.  This reduces the implicit cost of risk associated with third parties.  For more information, see:

> "Trusted third parites are security holes" ~ Nick Szabo, 2001 (https://nakamotoinstitute.org/trusted-third-parties/)

To summarize, by creating an oracle schema that uses a sound game-theoretical construct to determine the validity of off-chain data, we:
  1. <b>Remove</b> the risks associated with third party oracle providers, who can cut access to API data, forge data messages, etc.
  2. <b>Enable</b> a decentralized, wisdom-of-the-crowds-like system which inputs data from multiple parties and disregards outliers
  3. <b>Create</b> a superior oracle system where truth data is derived from participants who all have economic interest and stake in the validity and success of the overall system
  

## How It Works
Users engage in a POW competion to find a nonce which satisifies the requirement of the challenge.  The users who find a nonce which correctly solves the POW puzzle input input data for the POW Oracle contract and recieve native tokens in exchange for their work.  The oracle data submissions are stored in contract memory as an array - which is subsequently operated upon to derive the median for the sample. In this implementation the amount of samples recorded may be stated as N=5.  

Each datapoint is expressed as an integer with a median timestamp describing the point in time that the oracle truth corresponds to.  On average, these oracle truths are mined and recorded at an interval dynamically adjusted to correspond to the total work inputted - so that truthpoints (represented as values stored for P variables) may be expressed in a timeseries array fed into another contract, or front-end through an event.

### The Oracle Mining Process
4 internal phases of token mining and minting: hash, reward, epoch and adjust difficulty, all called during the mint() operation. This construct provides a balance between being too general for use while providing ample room for multiple mined implementation types.

As explained in the initial section, MOT uses a native token as a reward for miners who solve the POW challenge and subsequently input data for the contract.  XXX is required to report on the off-chain pracle data to be used in a smart-contract.  

The mining process is expressed as:

<insert contract code>

### Rewards in MOT
The Reward schema is an essential component of MOT. The schema is designed to inventivize miners to input correct truthpoints, as outlying datapoints in the sample receieve proportionaly less reward than the median.

This Reward schema is expressed in the contract, here:

<insert contract code>

It may be visualized as so:

<insert image>

## Example Usage Scenarios

1.
2.
3.
4.
5.

## Conclusion

lorem ipsum
