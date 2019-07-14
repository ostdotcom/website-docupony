---
id: kms
title: Key Management Solution
sidebar_label: Key Management Solution
---

## Background
**Holding cryptocurrency funds**

In the normal course, cryptocurrency funds are held by a private key controlled by a person. For cryptocurrency to be "held" means that the software that administers that cryptocurrency (e.g., a smart contract) maps a balance to the public address of an account on the blockchain of either a private key or smart contract.

A private key is generated with data, the "seed", represented by some number of random words (12 is common), the "seed phrase". The seed phrase can be used to generate multiple private keys. Having access to the seed phrase effectively means having access to any private keys that seed phrase can be used to generate. A private key has a corresponding public key, which has a corresponding public address. Private keys should not exist in more than one location at a time—if a private key is on one device, it should not be on another device—this is both a technical and a security concern.

Typically, when someone sets up a cryptocurrency wallet, she will be shown the seed phrase used to generate the wallet’s private keys and instructed to write down the seed phrase and store that information in a secure location. In the event the person loses access to her wallet, and therefore to her keys, she has lost access to the funds held by those keys. If she can regain access to her keys, then she regains access to her funds. She can regain or “recover” access by inputting the seed phrase into a replacement wallet, which will regenerate the keys that were in the lost wallet. Having access to the keys means having access to the funds.

Typically, and as a decentralization matter, access to the seed phrase that was used to generate private keys is limited to the wallet and the person with access to the wallet—although a service may have provided the wallet, that service does not have access to the seed phrase or any private keys generated from that seed phrase.

Generally, anyone with access to a private key can access the funds held by it. Generally, anyone with access to the seed phrase can regenerate that private key.

## Components
In the context of Brand Tokens used in OST's client economies, the public address is represented by a  **TokenHolder** contract. The configured owner of a  **TokenHolder** contract can authorize "ephemeral" keys, sessionKeys, to transact on the user's behalf for a predetermined amount of time and with a defined maximum spend-per-transaction.

1. These ephemeral sessionKeys obviate the need for the user to sign every transaction within the application thereby creating a more seamless user experience. 
2. The authorization of ephemeral sessionKeys requires the owner to sign the transaction.

A multi-signature contract, the MultiSig, is configured as the owner of the  **TokenHolder** contract and one or more keys are configured as owners to that MultiSig. This means that multiple owner keys can have authority over a  **TokenHolder** contract.  Therefore, a user can have owner keys present on multiple devices (such as mobile phones and tablets), so that when moving between devices, the keys are not shared. 

1. To add additional, remove or replace owner keys, a pre-agreed number of existing owners must sign the transaction.
2. This pre-agreed number is required signatures is intuitively called the threshold of the MultiSig. 
3. To change the number of signatures required, the pre-agreed number of owners must sign the transaction.
4. Using GnosisSafe as the MultiSig enables us to use "executable transactions" (transactions that are signed by one key, but for which the computations are paid by a different key), per [EIP-1077](https://eips.ethereum.org/EIPS/eip-1077). As a result, owner keys do not need to the hold base currency to pay for gas. 


## Creating a user's Brand Token wallet on the blockchain 
It is a 3 step process. [Wallet SDK](/platform/docs/sdkwallet_sdk/overview/) provides a number of functions called as workflows

### Step 1: init
Calling `init` function of wallet SDK will initialize the SDK.

### Step 2: setupDevice
Calling `setupDevice` will Generating public-private key pairs
 
The ephemeral sessionKeys and owner keys are created on the user's mobile device. The OST Wallet SDK uses standard web3 libraries to generate the public-private key pairs on the device. The private key in each pair is stored on the device and encrypted with secure enclave (or the equivalent in Android devices). 


### Step 3: activateUser
calling `activateUser ` function of wallet SDK will deploy smart contracts. Once the contract deployment is complete the `user` is `activated` and can perform transactions

**Creation of the recoveryOwner key pair**

The recoveryOwner is created using inputs from the client, OST and the user. The user's input is a 6-digit pin.

The client and OST must provide pseudorandom inputs that are mapped to the user. For the sake of clarity, the client's input shall be referred to as the client User Secret and OST's input shall be referred to as OST User Salt. 

These inputs are put through a cryptographically-sound key generation process (such as Scrypt) to create the private key that will be used as the recoveryOwner for the DelayedRecoveryModule.


**Creating the wallet**

In order to create a user wallet in a Brand Token economy, the following contracts are deployed

A MultiSig contract. The public addresses from certain keys generated on the user's devices are set as owners for the MultiSig.
A  **TokenHolder** contract. The MultiSig controls the  **TokenHolder** contract, as its owner. The public addresses of certain key-pairs generated on the user's device are authorized as sessionKeys in the TokenHolder.
A DelayedRecoveryModule contract. The public addresses of the recoveryOwner and the recoveryController are stored on this contract. A number that represents blocks added to the blockchain, to approximate a period of delay before recovery can be executed (e.g., 14400 == 12 hours, assuming a block is added every 3 seconds), is also stored on this contract, as the recoveryBlockDelay. 


