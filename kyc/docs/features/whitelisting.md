---
id: whitelisting
title: Whitelisting Service
sidebar_label: Whitelisting Service
---

One of OST KYC's services is the Ethereum address whitelisting, designed for clients who want to verify their ICO participants with OST KYC. This service ensures that the deposit address of the ICO client will be able to receive funds only from Ethereum addresses that have been whitelisted in the ICO's smart contract. 

## How does it work?
###  Updating the whitelisting contract address
 * ICO client needs to provide Whitelisting contract address.
* This address could be the same or different from the client's deposit address.

### Verified Operator Address (VOA)
This is an OST Ethereum address that needs to be set in the ICO client's contracts. Only this address is allowed to call the whitelisting transaction in the ICO's contract. 

### Whitelisting logic on the blockchain
After the whitelisting transaction was submitted we wait 90 seconds which is the time needed for 6 new blocks to be mined. If the block where the transaction was performed on is still existing after 90 seconds, we can say the transaction is confirmed and therefore the Ethereum address of the investor is whitelisted.

## Whitelisting Setup
OST KYC's whitelisting process integration requires updateWhitelist method and WhitelistUpdated event in your Token Sale contract with the below given specifications. A sample contract with whitelisting functionality is present at the end of this section.

### Interface
function updateWhitelist(address _account, uint8 _phase) external onlyOps returns (bool)

onlyOps is a modifier but clients can implement their own Access Control List (ACL) modifier.  The requirement is that Verified Operator Address (i.e. opsAddress) only has the permission to call updateWhitelist. The opsAddress is set by the owner of the contract using the setOpsAddress function.

### Event
event WhitelistUpdated(address indexed _account, uint8 _phase);

WhitelistUpdated event should always be emitted on successful whitelist/unwhitelist transaction. Where _account is ethereum address and _phase represents the whitelist status (0: unwhitelisted, 1: whitelisted). 

The Abi for the WhitelistUpdated event is :-

{"anonymous":false,"inputs":[{"indexed":true,"name":"_account","type":"address"},{"indexed":false,"name":"_phase","type":"uint8"}],"name":"WhitelistUpdated","type":"event"}

#### Sample Code with Whitelist Functionality:
```
pragma solidity ^0.4.23;

contract TokenSale {

    /** Event emitted when _account is Whitelisted / UnWhitelisted */
    event WhitelistUpdated(address indexed _account, uint8 _phase);

    /** WhiteList users and their phase status */
    mapping(address => uint8) public whitelist;

    /** Contract owner address */
    address public owner;

    /** operator address */
    address public opsAddress;

    /** Check if the sender is the verified operator address */
    /** Verified operator address is termed as the ops address in the contract */
    modifier onlyOps() {
        require(isOps(msg.sender));
        _;
    }

    /** Modifier to check If the sender is the owner of the contract */
    modifier onlyOwner() {
        require(isOwner(msg.sender));
        _;
    }

    /**
     * @notice Contract constructor
     *
     * @dev msg.sender is set as owner
     *
     */
    constructor() public {
        /** Set contract creator as the owner of the contract */
        owner = msg.sender;
    }

    /** Internal Functions */

    /**
     *  @notice checks If the sender is the owner of the contract.
     *
     *  @param _address address to be checked if valid owner or not.
     *
     *  @return bool valid owner or not.
     */
    function isOwner(
        address _address)
        internal
        view
        returns (bool)
    {
        return (_address == owner);
    }

    /**
     *  @notice check If the sender is the ops address.
     *
     *  @param _address address to be checked for ops.
     *
     *  @return bool valid ops or not.
     */
    function isOps(
        address _address)
        internal
        view
        returns (bool)
    {
        return (opsAddress != address(0) && _address == opsAddress);
    }

    /** External Functions */

    /**
     *  @notice Owner can change the verified operator address.
     *
     *  @param _opsAddress address to be set as ops.
     *
     *  @return bool address is successfully set as ops or not.
     */
    function setOpsAddress(
        address _opsAddress)
        external
        onlyOwner
        returns (bool)
    {
        require(_opsAddress != owner);
        require(_opsAddress != address(this));
        require(_opsAddress != address(0));

        opsAddress = _opsAddress;

        return true;
    }

    /**
     *  @notice function to whitelist an address which can be called only by the ops address.
     *
     *  @param _account account address to be whitelisted
     *  @param _phase 0: unwhitelisted, 1: whitelisted
     *
     *  @return bool address is successfully whitelisted/unwhitelisted.
     */
    function updateWhitelist(
        address _account,
        uint8 _phase)
        external
        onlyOps
        returns (bool)
    {
        require(_account != address(0));
        require(_phase <= 1);

        whitelist[_account] = _phase;

        emit WhitelistUpdated(_account, _phase);

        return true;
    }
  }
```

Upon deployment of the above sample contract, the contract deployer address is set as the owner. In the next transaction, the owner of the contract should set the Verified Operator Address using setOpsAddress method call. Once both the transactions are successful, whitelisting transactions can be executed.



