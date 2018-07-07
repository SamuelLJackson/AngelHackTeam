![Header Image](https://github.com/SamuelLJackson/AngelHackTeam/blob/master/MOCHeader.PNG)

## Overview
<b>"Minable Oracle Contract (MOC))</b> is an oracle schema that implements a mineable proof of work (POW) competiton to determine the validity of data outside of the blockchain.  Once aggregated, validated, and processed into a consumable output, these oracle data entries will be internally referred to as 'truthpoints'.  

This project draws inspiration from the [EIP918 Mineable Token](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-918.md) as an abstract standard that uses a SHA-256 Proof of Work algorithm for token minting and distribution.  

MOC leverages a novel game-theoretical competition in an attempt to disintermediate and decentralize the existing 3rd party trust layer associated with centralized oracle services like Oraclize, whcih use basic API getters to provide smart-contracts with off-chain data.  This reduces the implicit cost of risk associated with third parties.  For more information, see:

> "Trusted third parites are security holes" ~ Nick Szabo, 2001 (https://nakamotoinstitute.org/trusted-third-parties/)

To summarize, by creating an oracle schema that uses a sound game-theoretical construct to determine the validity of off-chain data, we:
  1. <b>Remove</b> the risks associated with single-party oracle providers, who can cut access to API data, forge message data, etc
  2. <b>Enable</b> a superior oracle system where truth data is derived from a distributed set of participants which have both economic interest and 'stake' in the validity and success of the oracle data
  3. <b>Create</b> an effective, secure, and decentralized oracle system which inputs data from multiple parties and disincentives incorrect submissions

## How It Works
Users engage in a POW competion to find a nonce which satisifies the requirement of the challenge.  The users who find a nonce which correctly solves the POW puzzle input input data for the POW Oracle contract and recieve native tokens in exchange for their work.  The oracle data submissions are stored in contract memory as an array - which is subsequently operated upon to derive the median for the sample. In this implementation the amount of samples recorded may be stated as N=5.  

Each datapoint is expressed as an integer with a median timestamp describing the point in time that the oracle truth corresponds to.  On average, these oracle truths are mined and recorded at an interval dynamically adjusted to correspond to the total work inputted - so that truthpoints (represented as values stored for P sub n variables) may be expressed in a timeseries array fed into another contract, or visualized in a front-end through an event.

### The Oracle Mining Process
MOC implements a quadriphasic approach to token mining and minting.  The hash, reward, epoch and adjust difficulty, are all called during the mint() operation.

As explained in the initial section, MOC uses a native token as a reward for miners who solve the POW challenge and subsequently input data for the contract.  XXX is required to report on the off-chain pracle data to be used in a smart-contract.  

The mining process is expressed as:

<insert contract code>

### Rewards in MOC
The Reward schema is an essential component of MOC.  The schema is designed to inventivize miners to input correct truthpoints - as outlying datapoints in the sample receieve proportionaly less reward than the median input.

This Reward schema is expressed in the contract, here:

<insert contract code>

It may be visualized as so:

![Reward Mechanism](https://github.com/SamuelLJackson/AngelHackTeam/blob/master/RewardMechanism.PNG)

## Example Usage Scenarios

Within the context of ethereum, oracles can be thought of as authoritative sources of off-chain data (called truthpoints) These truthpoints allow smart contracts to receive and condition executional instructions using extrinsic information.  This is highly useful for a wide-array of derivitive scenarios.

As MOC is a contract mechanism that allows oracle data to be derived in a comeptitive, decentralized manner - we envision a wide array of use cases for the OracleToken smart-contract.  Namely:
1. Exchange-rate data: interval based exchange-rate truthpoints may be used to create trustless financial derivatives [ala Decentralized Derivitives](https://github.com/decentralizedderivatives/)
2. Weather data logs: for example, we may calculate insurance premium calculation based on a weather forecast
3. Static/pseudo-static data: logging and indexing various identifiers, country codes, currency codes
4. Prediction Market Probability/Odds: i.e. "What is the likelyhood that X event will happen"
5. Prediction Market Resolution: i.e. determining who won the most recent presidential election or sporting event
6. Damage verification: What were the results in damage for insurance contracts
7. Pseudorandom number generation: to fairly select a winner in a lottery smart contract

## Conclusion

lorem ipsum
