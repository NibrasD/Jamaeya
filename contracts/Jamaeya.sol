// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Jamaeya DApp - Community Savings Circle on Celo using cUSD
/// @notice This contract implements the traditional Arab savings circle (جميعة) using the Celo blockchain and cUSD stablecoin
interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract Jamaeya {
    address public admin;
    IERC20 public cUSD;                         // cUSD stablecoin contract on Celo
    uint256 public roundAmount;                // Amount each member deposits per round (e.g., 1 cUSD)
    uint256 public payoutAmount;               // Total amount paid out to one member (e.g., 10 cUSD)
    uint256 public totalRounds;
    uint256 public currentRound;
    uint256 public roundInterval;
    uint256 public lastRoundTime;

    address[] public members;
    mapping(address => bool) public deposited;
    mapping(uint256 => address) public payoutSchedule;

    /// @notice Initializes the Jamaeya savings circle
    /// @param _members List of participant addresses
    /// @param _roundAmount Deposit amount per person (e.g., 1 cUSD)
    /// @param _payoutAmount Total payout per round (e.g., 10 cUSD)
    /// @param _totalRounds Total number of rounds (equals number of members typically)
    /// @param _roundInterval Time in seconds between each round
    /// @param _cUSDAddress Address of the cUSD token contract on Celo
    constructor(
        address[] memory _members,
        uint256 _roundAmount,
        uint256 _payoutAmount,
        uint256 _totalRounds,
        uint256 _roundInterval,
        address _cUSDAddress
    ) {
        admin = msg.sender;
        members = _members;
        roundAmount = _roundAmount;
        payoutAmount = _payoutAmount;
        totalRounds = _totalRounds;
        roundInterval = _roundInterval;
        currentRound = 1;
        lastRoundTime = block.timestamp;
        cUSD = IERC20(_cUSDAddress); // Connect to cUSD on Celo
    }

    /// @notice Member deposits cUSD for the current round
    function deposit() public {
        require(isMember(msg.sender), "Not a member");
        require(!deposited[msg.sender], "Already deposited this round");

        // Transfer cUSD from member to contract
        require(
            cUSD.transferFrom(msg.sender, address(this), roundAmount),
            "cUSD transfer failed"
        );

        deposited[msg.sender] = true;
    }

    /// @notice Admin or member can trigger payout once all have deposited and interval passed
    function triggerPayout() public {
        require(block.timestamp >= lastRoundTime + roundInterval, "Too early");
        require(depositsComplete(), "Not all members have deposited");

        address winner = payoutSchedule[currentRound];
        require(cUSD.transfer(winner, payoutAmount), "Payout failed");

        resetDeposits();
        currentRound++;
        lastRoundTime = block.timestamp;

        if (currentRound <= totalRounds) {
            selectWinnerForNextRound();
        }
    }

    function isMember(address _member) internal view returns (bool) {
        for (uint256 i = 0; i < members.length; i++) {
            if (members[i] == _member) return true;
        }
        return false;
    }

    function depositsComplete() internal view returns (bool) {
        for (uint256 i = 0; i < members.length; i++) {
            if (!deposited[members[i]]) return false;
        }
        return true;
    }

    function resetDeposits() internal {
        for (uint256 i = 0; i < members.length; i++) {
            deposited[members[i]] = false;
        }
    }

    function selectWinnerForNextRound() internal {
        uint256 winnerIndex = (currentRound - 1) % members.length;
        payoutSchedule[currentRound] = members[winnerIndex];
    }
}
