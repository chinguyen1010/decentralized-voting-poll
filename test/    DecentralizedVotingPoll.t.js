import { expect } from "chai";
import hre from "hardhat";

const { ethers } = hre;

describe("DecentralizedVotingPoll", function () {
  async function deployPollFixture() {
    const options = ["Option A", "Option B", "Option C"];
    const Poll = await ethers.getContractFactory("DecentralizedVotingPoll");
    const poll = await Poll.deploy("Hackathon Poll", options);
    return { poll, options };
  }

  it("deploys correctly with title + options", async function () {
    const { poll } = await deployPollFixture();

    expect(await poll.title()).to.equal("Hackathon Poll");
    expect(await poll.options(0)).to.equal("Option A");
    expect(await poll.options(1)).to.equal("Option B");
    expect(await poll.options(2)).to.equal("Option C");
  });

  it("allows a user to vote once", async function () {
    const { poll } = await deployPollFixture();
    const [voter] = await ethers.getSigners();

    await poll.connect(voter).vote(1);  // vote for Option B
    const results = await poll.getResults();

    expect(results[1]).to.equal(1); // Option B should have 1 vote
  });

  it("prevents double voting", async function () {
    const { poll } = await deployPollFixture();
    const [voter] = await ethers.getSigners();

    await poll.connect(voter).vote(0);

    await expect(
      poll.connect(voter).vote(1)
    ).to.be.revertedWith("Already voted");
  });

  it("rejects invalid optionId", async function () {
    const { poll } = await deployPollFixture();
    const [voter] = await ethers.getSigners();

    await expect(
      poll.connect(voter).vote(99)
    ).to.be.revertedWith("Invalid option");
  });

  it("counts multiple users' votes correctly", async function () {
    const { poll } = await deployPollFixture();
    const [v1, v2, v3] = await ethers.getSigners();

    await poll.connect(v1).vote(0);
    await poll.connect(v2).vote(0);
    await poll.connect(v3).vote(2);

    const results = await poll.getResults();

    expect(results[0]).to.equal(2);  // Option A
    expect(results[2]).to.equal(1);  // Option C
  });
});
