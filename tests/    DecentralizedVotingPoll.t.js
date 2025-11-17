import { expect } from "chai";
import { ethers } from "hardhat";

describe("DecentralizedVotingPoll", function () {
  let Voting, voting, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Voting = await ethers.getContractFactory("DecentralizedVotingPoll");
    voting = await Voting.deploy("Favorite Color?", ["Red", "Blue", "Green"]);
  });

  it("sets creator and options correctly", async function () {
    expect(await voting.creator()).to.equal(owner.address);
    expect(await voting.options(0)).to.equal("Red");
  });

  it("allows only one vote per address", async function () {
    await voting.connect(addr1).vote(1);
    await expect(voting.connect(addr1).vote(1)).to.be.revertedWith("Already voted");
  });

  it("rejects invalid option ID", async function () {
    await expect(voting.connect(addr1).vote(99)).to.be.revertedWith("Invalid option");
  });

  it("increments votes correctly", async function () {
    await voting.connect(addr1).vote(0);
    await voting.connect(addr2).vote(0);

    expect(await voting.votes(0)).to.equal(2);
  });

  it("returns correct results", async function () {
    await voting.connect(addr1).vote(0);
    await voting.connect(addr2).vote(2);

    const results = await voting.getResults();
    expect(results[0]).to.equal(1);
    expect(results[1]).to.equal(0);
    expect(results[2]).to.equal(1);
  });
});
