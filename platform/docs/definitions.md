---
id: definitions
title: Useful Definitions
sidebar_label: Useful Definitions
---

## Tokens
Tokens are value-backed tokens created on Etherum and running on scalable side-chains. Tokens serve as a medium of exchange and can be used to power all sorts of actions, increase user retention, and drive growth.

## Contract Address
An Ethereum address represents an account. For external owned accounts, the address is derived as the last 20 bytes of the hash of the public key controlling the account, e.g. cd2a3d9f938e13cd947ec05abc7fe734df8dd826. This is a hexadecimal format (base 16 notation), which is often indicated explicitly by prepending 0x to the address. Since each byte of the address is represented by 2 hex characters, a prefixed address is 42 characters long.

## **TokenHolder** Contract
Each user is represented by a smart contract. This smart contract is the **TokenHolder** contract.
* It “holds” the tokens for the user on blockchain
* The **TokenHolder** contract has a configured owner
* And it has multiple disposable keys called `sessionKeys`
* Whenever an end-user does an action, a rule execution request is initialized. This contract verifies that this request is initiated by an authorized key. The authorized key can be an owner key or a session key.

## **Rules** Contract
* A **Rules** contract is a smart contract that contains a specific piece of business logic
* A **Rules** contract can be written and deployed by anyone
* Each client company will have at least one custom **Rules** contract. In this latest release OST has written one rule contract, the [**PricerRule**](https://github.com/OpenSTFoundation/openst-contracts/blob/develop/contracts/rules/PricerRule.sol) contract for partner companies to use.
* Rules that transfer value are required to be registered. Registering means the process of whitelisting a rule.

## **TokenRules** Contract
* **TokenRules** contract maintains a list of the **Rules** contracts that can execute transfers
* It enables developers to register and deregister specific **Rules** contracts
* One Company will have one **TokenRules** contract deployed on an auxiliary chain

## **DeviceManager** ("**MultiSig**") Contract
* In order to enable user to access funds or **TokenHolder** contract from multiple devices without having to share private keys across devices we came up with a multi-signature contract. We refer to this entity as device manager in OST APIs.
* The purpose of this **DeviceManager** contract is to enable multiple parties ---devices in our case--- to have authority over one **TokenHolder** contract.
* This contract is configured as the owner of the user's **TokenHolder** contract. And one or more user's device keys / owner keys are configured as owners of this contract.
* Thus, a user can have device keys present on different devices (such as mobile phones and tablets), enabling movement between devices without the keys being shared. 

![openst-contracts](/platform/docs/assets/openst-contracts.png)

## Owner/Device Key
* This is a private key created on the mobile device of the end-user. This private key is limited to the device and the person with access to the device. It has a corresponding public key, which in-turn has a corresponding public address.
* This public address ---also known as device address--- can be configured as the owner of the user's **TokenHolder** contract.

## Ephemeral Session Keys
* In order to create a seamless user experience so that users don't have to sign a new transaction at every move we came up with the concept of disposable sessionKeys.
* Disposable in the sense that they are used to sign messages on a users behalf for a predetermined amount of time and with a defined maximum spending limit per-transaction.
* These keys are created on the mobile device of the end-user
* The configured owner of a **TokenHolder** contract can authorize sessionKeys.

![entity-relationship](/platform/docs/assets/ERD_user_setup.jpg)

## uuid v4
Each and every bit of a UUID v4 is generated randomly and with no inherent logic.

## Tx Hash
Transaction hash is an identifier used to uniquely identify a particular transaction. All on-chain transactions have a unique transaction hash that can be seen in transaction details. A transaction hash usually looks like a random set of letters and numbers.

## Pessimistic Debit
For a sender in OST platform the step of a transaction in OST Platform is pessimistic debit. Pessimistic debit is a temporary debit from senders account, the debit will be settled once the transaction is confirmed on [origin chain](#origin-chain).