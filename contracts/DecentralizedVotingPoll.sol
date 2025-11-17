// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DecentralizedVotingPoll {
    address public creator;
    string public title;
    string[] public options;

    mapping(uint256 => uint256) public votes;
    mapping(address => bool) public hasVoted;

    event Voted(address indexed voter, uint256 indexed optionId);

    constructor(string memory _title, string[] memory _options) {
        require(_options.length >= 2, "Need at least two options");
        creator = msg.sender;
        title = _title;

        for (uint256 i = 0; i < _options.length; i++) {
            options.push(_options[i]);
        }
    }

    function vote(uint256 optionId) external {
        require(!hasVoted[msg.sender], "Already voted");
        require(optionId < options.length, "Invalid option");

        hasVoted[msg.sender] = true;
        votes[optionId] += 1;

        emit Voted(msg.sender, optionId);
    }

    function getResults() external view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](options.length);
        for (uint256 i = 0; i < options.length; i++) {
            result[i] = votes[i];
        }
        return result;
    }
}
