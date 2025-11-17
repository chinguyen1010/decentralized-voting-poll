# Project Lifecycle

## 1. Ideation
Identify that online polls can be manipulated, are opaque, and depend on centralized trust.

## 2. Design
- Smart contract with:
  - `options` array
  - `votes` mapping
  - `hasVoted` mapping
  - `vote(optionId)` function
- Basic Hardhat project structure.

## 3. Implementation
- Write contract in Solidity.
- Write tests for:
  - Correct option setup
  - Single-vote enforcement
  - Invalid option rejection
  - Correct vote aggregation
- Write deploy script.

## 4. Testing
Run:
npx hardhat test

Ensure all test cases pass.

## 5. Deployment
Deploy to a testnet using:


npx hardhat run scripts/deploy.js --network <testnet>