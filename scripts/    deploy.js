import { ethers } from "hardhat";

async function main() {
  const options = ["Option A", "Option B", "Option C"];
  const Poll = await ethers.getContractFactory("DecentralizedVotingPoll");
  const poll = await Poll.deploy("Hackathon Poll", options);

  console.log("DecentralizedVotingPoll deployed to:", poll.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
