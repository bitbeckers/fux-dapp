// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./ERC20_Token.sol";

interface RewardsToken {
    function mint(address to, uint256 amount) external;
}

// Import and refactor of Synthetix StakingRewarder
/// @title Calculates and pays out staking rewards
/// @author bitbeckers
/// @custom:source This is an example contract.
// @custom:source https://github.com/Synthetixio/synthetix/blob/develop/contracts/StakingRewards.sol
contract Staking_Pool is ReentrancyGuard, Pausable, AccessControl {
    bytes32 public constant CONFIG_ROLE = keccak256("CONFIG_ROLE");

    address private _stakeToken;
    address private _rewardToken;

    mapping(address => Stake) private _stakes;

    uint256 private _totalStaked;
    uint256 private _lastUpdateTime;
    uint256 private _rewardPerTokenStored;
    uint256 private _rewardRate = 1 * 1e18; // 1 18 decimal token per second as reward

    struct Stake {
        uint256 balance;
        uint256 timestamp;
        uint256 rewards;
        uint256 userRewardPerTokenPaid;
    }

    constructor(address _owner, address _stakeTokenAddress) {
        _stakeToken = _stakeTokenAddress;
        _rewardToken = address(new ERC20_Token(address(this))); //The staking contract will be the owner of the rewardsToken
        _grantRole(DEFAULT_ADMIN_ROLE, _owner);
        _grantRole(CONFIG_ROLE, _owner);
    }

    // Event
    event AvailableRewardsUpdated(uint256 added, uint256 totalSupply);
    event RewardPaid(address account, uint256 amount);
    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event Recovered(address token, uint256 amount);

    // Views
    function stakeToken() external view returns (address) {
        return _stakeToken;
    }

    function rewardToken() external view returns (address) {
        return _rewardToken;
    }

    function rewardRate() external view returns (uint256) {
        return _rewardRate;
    }

    // Staking
    function totalStaked() external view returns (uint256 amount) {
        amount = _totalStaked;
    }

    function getStakedBalance(address user) public view returns (uint256 stakedBalance) {
        return _stakes[user].balance;
    }

    function getStakingReward(address user) external view returns (uint256 rewardAmount) {
        return earned(user);
    }

    function earned(address user) internal view returns (uint256 rewardAmount) {
        Stake storage _stake = _stakes[user];
        rewardAmount =
            ((_stake.balance * (_getRewardPerToken() - _stake.userRewardPerTokenPaid)) / 1e18) +
            _stake.rewards;
    }

    // Mutative functions
    // Claims
    function claimRewards() external nonReentrant whenNotPaused updateReward(msg.sender) {
        uint256 rewardAmount = earned(msg.sender);
        _stakes[msg.sender].rewards = 0;
        RewardsToken(_rewardToken).mint(msg.sender, rewardAmount);
        emit RewardPaid(msg.sender, rewardAmount);
    }

    // Staking
    function stake(uint256 amount) external nonReentrant whenNotPaused updateReward(msg.sender) {
        Stake storage _stake = _stakes[msg.sender];

        //Stake
        _stake.balance += amount;
        _stake.timestamp = block.timestamp;

        //Stakepool
        _totalStaked += amount;

        IERC20(_stakeToken).transferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount > 0, "Cannot withdraw 0");

        //Stake
        Stake storage _stake = _stakes[msg.sender];
        require(amount <= _stake.balance, "Cannot withdraw more than staked");
        _stake.balance -= amount;

        // Stakepool
        _totalStaked -= amount;

        IERC20(_stakeToken).transfer(msg.sender, amount);
        emit Withdrawn(msg.sender, amount);
    }

    // Internal
    function _getRewardPerToken() internal view returns (uint256) {
        if (_totalStaked == 0) {
            return _rewardPerTokenStored;
        }

        return _rewardPerTokenStored + (((block.timestamp - _lastUpdateTime) * _rewardRate * 1e18) / _totalStaked);
    }

    // Config
    function pause() external onlyRole(CONFIG_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(CONFIG_ROLE) {
        _unpause();
    }

    // Modifiers
    modifier updateReward(address user) {
        _rewardPerTokenStored = _getRewardPerToken();
        _lastUpdateTime = block.timestamp;

        if (user != address(0)) {
            Stake storage _stake = _stakes[user];
            _stake.rewards = earned(user);
            _stake.userRewardPerTokenPaid = _rewardPerTokenStored;
        }
        _;
    }
}
