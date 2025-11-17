# Architecture

## Problem
Traditional online polls can be manipulated, lack transparency, and require trusting a centralized operator.

## Solution
A decentralized, on-chain voting system where:
- A poll creator defines options.
- Each wallet address may vote once.
- All vote counts are public and immutable.

## Components
- **Users**: Wallet owners who vote.
- **Poll Creator**: Deploys poll contract & options.
- **Smart Contract**: Stores poll data, vote counts, and voter status.
- **Blockchain**: Ensures immutability & transparency.

## On-chain Data
- Poll title
- Options array
- Votes per option
- hasVoted mapping

## Data Flow
1. Creator deploys contract with poll title & options.
2. User calls `vote(optionId)`.
3. Contract checks:
   - User has not voted before.
   - Option is valid.
4. Vote is counted on-chain.
5. Anyone can call `getResults()` or read `votes`.
