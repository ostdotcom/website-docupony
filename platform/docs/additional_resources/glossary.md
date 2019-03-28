---
id: glossary
title: Glossary
sidebar_label: Glossary
---


## TokenHolder Contracts:
* In the context of your token economy, each user in the economy will be represented by a smart contract. This smart contract is the TokenHolder contract.
* It “holds” the tokens for the user on blockchain. 
* This TokenHolder Contract has a configured owner. 
* And it has multiple disposable keys called sessionKeys. 
* Whenever an economy user does an action, a rule execution request is initialized. This contract verifies that this request is initiated by an authorized key. The authorized key can be an owner key or a session key.

## Owner/Device Key:
* This is a private key created on the mobile device from where the end user participates in the economy. This private key is limited to the device and the person with access to the device. It has a corresponding public key, which in-turn has a corresponding public address.
* This public address ---also known as device address--- can be configured as the owner of the user's TokenHolder contract.

## Session Key:
* In order to create a seamless user experience so that users don't have to sign a new transaction at every move we came up with the concept of disposable sessionKeys.
* Disposable in the sense that they are used to sign messages on a users behalf for a predetermined amount of time and with a defined maximum spending limit per-transaction.
* These keys are created on the mobile device from where the end user participates in the economy. 
* The configured owner of a TokenHolder contract can authorize sessionKeys.

## Device Manager (A MultiSig Contract):
* In order to enable user to access funds or TokenHolder contract from multiple devices without having to share private keys across devices we came up with a multi-signature contract. We refer to this entity as device manager in OST APIs.
* The purpose of this device manager contract is to enable multiple parties ---devices in our case--- to have authority over one TokenHolder contract.
* This contract is configured as the owner of the user's TokenHolder contract. And one or more user's device keys / owner keys are configured as owners of this contract.
* Thus, a user can have device keys present on different devices (such as mobile phones and tablets), enabling movement between devices without the keys being shared. 

![entity-relationship](/platform/docs/assets/ERD_user_setup.jpg)


## Creating the wallet:
1. Owner/Device key is created on the user's mobile device. The OST Wallet SDK uses standard web3 libraries to generate the public-private key pairs on the device.
2. The private key in each pair is encrypted and stored on the device.
A MultiSig contract is deployed on the blockchain. The public addresses from device keys generated on the user's devices are set as owners for the MultiSig.
3. A TokenHolder contract is deployed on the blockchain. The MultiSig controls the TokenHolder contract, as its owner.
4. The sessionKey is created on the user's mobile device and is authorized by device key in TokenHolder.
5. Whenever a user does an action which triggers a token transfer a message signed by an authorized sessionKey is sent from the user's device to the user's TokenHolder contract. 
6. The TokenHolder contract verifies that the request is initiated by an authorized sessionKey and executes the transfer.


## Executing a token transfer: 
To enable client companies to design custom Rules that align with their economy goals and define the behavior of the token transfer, OpenST protocol came up with contracts for "client Companies".

## Rules Contract:
* A rules contract is a smart contract that contains a specific piece of business logic.
* They can be written and deployed by anyone.
* Each client company will have at least one Custom Rules Contract. In this latest release OST has written one rule contract, i.e. the [PricerRule](https://github.com/OpenSTFoundation/openst-contracts/blob/develop/contracts/rules/PricerRule.sol) Contract for partner companies to use.
* Rules that transfer value are required to be registered. Registering means the process of whitelisting a Rule for use in an economy. 


## TokenRules Contract:
* TokenRules contract maintains a list of the Rules contracts that can execute transfers in a given Token Economy.
* It enable developers to register and de-register specific Rules contracts.
* One Economy will have one TokenRules Contract deployed on the auxiliary chain.


## TokenHolder Contract
* For executing a token transfer, end-user's TokenHolder contract interacts with TokenRules Contract and Rules Contract.

## Setting up Token Economy 
1. OST writes and deploys the TokenRules Contract for the client company.
2. OST writes a PricerRule Contract and registers the rule with TokenRules Contract on its auxiliary chain.

## Setting up user in the economy
Steps outlined above in creating a wallet section. When end-users register on a client company application a TokenHolder Contract and a DeviceManager(MultiSig) Contract for each of them will be created and deployed by client company via APIs.


## Steps for executing a token trasnfer
 Its important to understand the token economy setup and user setup outlined above before a client company can execute their first transaction. If client company wants to transfer tokens worth 5$ to a user the following sequence of events occur:
	1. Company's TokenHolder contract initiates “execute pricer rule” request to client company's  PricerRule Contract. The TokenHolder contract also approves company's TokenRules Contract to spend tokens on its behalf.
	2.  Company's PriceRule Contract applies “conversion from USD to tokens rules”.   The PriceRule Contract will pass all this information after applying rules to the TokenRules Contract.
	3. The TokenRules Contract executes the transfer between all concerned parties as specified by the company's PriceRule Contract.


![openst-contracts](/platform/docs/assets/openst-contracts.png)

## Contract Address

An Ethereum address represents an account. For external owned accounts, the address is derived as the last 20 bytes of the hash of the public key controlling the account, e.g., cd2a3d9f938e13cd947ec05abc7fe734df8dd826. This is a hexadecimal format (base 16 notation), which is often indicated explicitly by prepending 0x to the address. Since each byte of the address is represented by 2 hex characters, a prefixed address is 42 characters long.

## uuid v4
Each and every bit of a UUID v4 is generated randomly and with no inherent logic.

## Tx Hash
Transaction hash is an identifier used to uniquely identify a particular transaction. All on-chain transactions have a unique transaction hash that can be seen in transaction details. A transaction hash usually looks like a random set of letters and numbers.

## Pessimistic Debit
For a sender in OST platform the step of a transaction in OST Platform is pessimistic debit. Pessimistic debit is a temporary debit from senders account, the debit will be settled once the transaction is confirmed on [origin chain](#origin-chain).





