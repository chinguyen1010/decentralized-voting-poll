# Decentralized-Voting-Poll
Decentralized Voting Poll is an on-chain voting application. A simple, on-chain voting system where a single, whitelisted address (the poll creator) can deploy a contract and define options. Each user can only vote once. 

A poll creator deploys a smart contract, defines a set of options, and then any blockchain address can cast exactly one vote. Votes and tallies are stored directly on the blockchain, so the poll is transparent and cannot be secretly edited by the poll owner.

Problem Statement: Current online polls can be easily manipulated, and
transparency is often lacking.

● Proposed Solution: A simple, on-chain voting system where a single,
whitelisted address (the poll creator) can deploy a contract and define
options. Each user can only vote once.

●Core Smart Contract Logic:

○ Store a list of options (e.g., an array of strings).

○ Store the vote count for each option (e.g., a mapping of option ID to
integer count).

○ Maintain a list of voters to prevent double-voting (e.g., a mapping of
address to boolean voted).

○ A function vote(uint optionId) that checks if the address has voted
and then increments the count.



## Technical SDKs + blockchain features

1. Language / runtime:

       Smart contract written in Solidity (^0.8.20), running on an EVM-compatible blockchain 

3. Developer tooling

       @nomicfoundation/hardhat-toolbox for:

        Hardhat + Mocha + Chai testing

        Ethers.js (Getting signers in tests, Deploying the contract in scripts/deploy.js, Calling contract functions in tests)

4. Key blockchain features used

Immutability and transparency
        
        Votes and options are stored in contract storage. Anyone can call getResults() or read directly from the chain to verify results independently.

Decentralized identity via addresses

    Each voter is identified by their wallet address. The contract enforces “one address, one vote” via the hasVoted[address] mapping.

On-chain rule enforcement
    
    
  The vote() function uses require checks to guarantee:

    - The voter has not voted before. //You can’t vote twice
    
      The contract checks hasVoted[msg.sender] //If it's already true → the vote fails.

    - The option index is valid //You must choose a real option
    
       If optionId is outside the list → the vote fails.

Event logs as an audit trail (An audit trail is a history log that shows who did what and when, so anyone can verify that actions)
 

    Whenever someone votes, the smart contract emits a Voted(voter, optionId) event.

    These events are saved permanently in the blockchain’s transaction history.

    This creates a public, tamper-proof record of all votes.

Anyone can verify:

- which wallet address voted

- which option they chose

- the timestamp of the vote

These records cannot be removed or altered.



## Overview
This project implements a decentralized voting poll on the blockchain.  
A poll creator deploys the contract with a set of poll options.  
Users vote exactly once using their wallet address, and results are stored publicly on-chain.

The core logic is a Solidity smart contract (DecentralizedVotingPoll.sol) deployed on an EVM chain.

Votes, options, and voter status are stored on-chain as contract state:

    string[] public options

    mapping(uint256 => uint256) //public votes

    mapping(address => bool) //public hasVoted

Each voter is identified by their blockchain address, not by a centralized account system.

The rule “one address = one vote” is enforced on-chain in vote(uint256 optionId) via require(!hasVoted[msg.sender], "Already voted");.

Blockchain properties: anyone can call getResults() or inspect contract storage and see the same results.

## Features
- A single poll creator initializes the poll
- Unlimited voters
- Strict one-vote-per-address rule
- Public and tamper-proof vote counts
- Fully transparent smart contract logic

## How It Works (Technical)
- **Solidity Smart Contract**  The contract implements a complete on-chain voting system, including:

       (string[] public options) //Poll title and dynamically supplied voting options 

      (mapping(uint256 => uint256) votes) //Vote tracking for each option

      (mapping(address => bool) hasVoted) //One-vote-per-address rule enforced by blockchain identity 

The constructor enforces valid poll creation (requires at least two options).

The contract provides all functionality needed for a real poll:

    vote(uint256 optionId) //to cast a vote

    getResults() t//o fetch all vote tallies

    event Voted(address voter, uint256 optionId) //for an immutable audit log
    
The constructor enforces a real constraint: require(_options.length >= 2, "Need at least two options");

## A comprehensive suite of tests to validate the smart contract’s functionality
  
Automated tests in test/DecentralizedVotingPoll.t.js (has 5 passing tests)

Test 1: Deployment + configuration

  - Confirms the title and option strings are stored correctly.

Test 2: Single vote

  - A normal user can vote once and the correct option’s count increments.

Test 3: Double voting prevention

  - Second vote from the same address reverts with "Already voted".

Test 4: Invalid option protection

  - Voting with an out-of-range optionId reverts with "Invalid option".

Test 5: Multiple users

  - Several distinct addresses voting for different options yield the correct aggregate tallies.


## Full project life-cycle:

README.md — problem, solution, technical explanation, how to run tests, and how to deploy.

docs/architecture.md — system architecture (components and how they interact).

docs/lifecycle.md — project stages (problem → design → implementation → testing → deployment → future work).

contracts/DecentralizedVotingPoll.sol — implementation.

test/DecentralizedVotingPoll.t.js — verification.

## Data Structures 

1. Poll info

       title → name of the poll

       options[] → list of option names

2. Votes

votes[optionId] //number of votes for each option

3. Who already voted

hasVoted[address]  // true / false


## API Workflow (How someone uses the contract)

constructor(string title, string[] options)

    Called at deployment time (by creator).

function vote(uint256 optionId) external

    Called by a voter’s wallet.

    Writes to blockchain.

function getResults() external view returns (uint256[] memory)

    Called by anyone.

    Only reads from blockchain



## System architecture

<img width="1376" height="534" alt="Screenshot 2025-11-19 at 5 02 23 AM" src="https://github.com/user-attachments/assets/801858e2-4aaf-483d-904e-7b7587dc47d9" />

