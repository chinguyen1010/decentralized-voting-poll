# decentralized-voting-poll
A simple, on-chain voting system where a single, whitelisted address (the poll creator) can deploy a contract and define options. Each user can only vote once.
## Overview
This project implements a decentralized voting poll on the blockchain.  
A poll creator deploys the contract with a set of poll options.  
Users vote exactly once using their wallet address, and results are stored publicly on-chain.

## Features
- A single poll creator initializes the poll
- Unlimited voters
- Strict one-vote-per-address rule
- Public and tamper-proof vote counts
- Fully transparent smart contract logic

## How It Works (Technical)
- **Solidity Smart Contract**  
  Stores options, vote tallies, and voter history using:
  - `string[] options`
  - `mapping(uint => uint)` votes
  - `mapping(address => bool)` hasVoted

- **Blockchain Properties Used**
  - Immutability ensures no one can alter past votes
  - Transparency allows anyone to verify results
  - Decentralized identity uses `msg.sender`

- **Frameworks**
  - Hardhat (compiling, testing, deploying)
  - Ethers.js (interacting with contract)
  - Node.js (runtime)

## Running Locally
npm install
npx hardhat test

shell
Copy code

## Deployment
npx hardhat run scripts/deploy.js --network <yourNetwork>

shell
Copy code

## Repository Structure
contracts/
docs/
scripts/
test/
README.md
