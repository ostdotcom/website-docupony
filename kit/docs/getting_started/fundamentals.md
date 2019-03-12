---
id: fundamentals
title: OST KIT Fundamentals
sidebar_label: Fundamentals
---

## Overview:
The Technical overview page outlines the different components that are involved to integrate the OST solution. It also provides the different authentication approaches that are support in these different components.

## Background:

**Holding cryptocurrency funds : Public-private key pairs**

In the normal course, cryptocurrency funds are held by a private key controlled by a person. For cryptocurrency to be "held" means that the software that administers that cryptocurrency (e.g., a smart contract) maps a balance to the public address of an account on the blockchain of either a private key or smart contract.

A private key is generated with data, the "seed", represented by some number of random words (12 is common), the "seed phrase". The seed phrase can be used to generate multiple private keys.  A private key has a corresponding public key, which has a corresponding public address. Private keys should not exist in more than one location/device at a time, this is both a technical and a security concern.

Typically, when someone sets up a cryptocurrency wallet, they will be shown the seed phrase used to generate the wallet’s private keys and instructed to write it down and store it in a secure location and never share it. In the event the person loses access to their device, and therefore the keys, they've also lost access to the funds held by those keys. She can regain or “recover” access by inputting the seed phrase into a replacement wallet, which will regenerate the keys that were in the lost wallet. Having access to the seed phrase and keys means having access to the funds. 

As a decentralization matter, access to the seed phrase that was used to generate private keys is limited to the wallet and the person with access to the wallet—although a service may have provided the wallet, that service does not have access to the seed phrase or any private keys generated from that seed phrase.

## Creating a user's Brand Token wallet on blockchain :

The OST platform is built on OpenST-protocol to enable partner companies to deploy Branded Token economies. The OpenST Protocol provides a framework which has collection of smart contracts for "End-users of the economy" and for "Partner Companies". 

Companies that use OST KIT do not need to write interact with the OpenST protocol. The OST KIT dashboards, APIs, and SDKs enable mainstream apps to get the benefits of OpenST without writing blockchain code. The information below is provided to help you understand API entities and relationship between them better.

## For end-users of the economy

### TokenHolder Contracts :
* In the context of your token economy, each user in the economy will be represented by a smart contract. This smart contract is the TokenHolder contract.
* It “holds” the tokens for the user on blockchain. 
* This TokenHolder Contract has a configured owner. 
* And it has multiple disposable keys called sessionKeys. 
* Whenever an economy user does an action, a rule execution request is initialized. This Contract verifies that this request is initiated by an authorized key. The authorized key can be an owner key or a session key.

### Owner key / Device Key:
* This is a private key created on the mobile device from where the end user participates in the economy. This private key is limited to the device and the person with access to the device. It has a corresponding public key, which in-turn has a corresponding public address.
* This public address--- also known as device address--- can be configured as the owner of the user's TokenHolder contract. 

### Session Key
* In order to create a seamless user experience so that users don't have to sign a new transaction at every move we came up with the concept of sessionKeys. These keys are disposable keys.
* Disposable in the sense that they are used to sign messages on user's behalf for a predetermined amount of time and with a defined maximum spending limit per-transaction.
* These keys are created on the mobile device from where the end user participates in the economy. 
* The configured owner of a TokenHolder contract can authorize sessionKeys.

### Device Manager (A MultiSig Contract)

* In order to enable user to access funds or TokenHolder contract  from multiple devices without having to share private keys across devices we came up with a multi-signature contract. We refer to this entity as device manager from OST APIs
* The purpose of this device manager contract is to enable multiple parties-- devices in our case — to have authority over one TokenHolder contract
* This contract is configured as the owner of the user's TokenHolder contract.  And one or more user's device keys / owner keys are configured as owners of this contract.
* Thus, a user can have device keys present on different devices (such as mobile phones and tablets), enabling movement between devices without the keys being shared. 


![entity-relationship](/kit/docs/assets/entity-relationship.png)




## Creating the wallet.
1. owner key is created on the user's mobile device. The OST Wallet SDK uses standard web3 libraries to generate the public-private key pairs on the device. 
2. The private key in each pair is encrypted and stored on the device.
A MultiSig contract is deployed on the blockchain. The public addresses from device keys generated on the user's devices are set as owners for the MultiSig.
3. A TokenHolder contract is deployed on the blockchain. The MultiSig controls the TokenHolder contract, as its owner.
4. The sessionKey is created on the user's mobile device and are authorized by device key in TokenHolder.
5. Whenever a user does an action, which triggers token transfer a message signed by an authorized sessionKey is sent from the user's device to the user's TokenHolder contract.  
6. The TokenHolder contract verifies that the request is initiated by an authorized sessionKey and executes the transfer.


## Executing a token transfer : 
To enable partner companies to design custom Rules that align with their economy goals and define the behavior of the token transfer, OpenST protocol came up with contracts for "Partner Companies"

### Rules Contract
* A Rule contract is a smart contract that contains a specific piece of business logic.
* They can be written and deployed by anyone.
* Each Partner Company will have at least one Custom Rules Contract. In this latest release OST has written one rule contract the [PricerRule](https://github.com/OpenSTFoundation/openst-contracts/blob/develop/contracts/rules/PricerRule.sol) Contract  for partner companies to use. 
* Rules that transfer value are required to be registered. Registering means the process of whitelisting a Rule for use in an economy. 


### TokenRules contract
* TokenRules contract maintains a list of the Rules contracts that can execute transfers in a given Token Economy .
* It enable developers to register and de-register specific Rules contracts.
* One Economy will have one TokenRules Contract deployed on the auxiliary chain.


### TokenHolder contract
* For executing a token transfer, end-user's TokenHolder contract interacts with TokenRules Contract and Rules Contract.



#### Steps for executing a token trasnfer
1. OST writes and deploys the TokenRules Contract for the partner company.
2. OST writes a PricerRule Contract and registers the rule with TokenRules Contract on its auxiliary chain.
3. When end-users register on a partner company application a TokenHolder Contract and a DeviceManager(MultiSig) Contract for each of them will be created and deployed by partner company via APIs.
4. If partner company wants to transfer tokens worth 5$ to a user the following sequence of events occur:
	* Company's TokenHolder contract initiates “execute pricer rule” request to partner company's  PricerRule Contract. The TokenHolder contract also approves company's TokenRules Contract to spend tokens on its behalf.
	* Company's PriceRule Contract applies “conversion from USD to tokens rules”.   The PriceRule Contract will pass all this information after applying rules to the TokenRules Contract.
	* The TokenRules Contract executes the transfer between all concerned parties as specified by the company's PriceRule Contract.


![openst-contracts](/kit/docs/assets/openst-contracts.png)