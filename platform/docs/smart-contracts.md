---
id: smart-contracts
title: Introduction to Smart Contracts - Smart Code Deployed On Chain
sidebar_label: Introduction to Smart Contracts
---

During the set-up stage, multiple smart-contracts are deployed on Ethereum and OpenST Mosaic scalable sidechains or meta-blockchains. _To learn more information on OpenST, check out [OpenST.org](https://openst.org)._

## List of Contracts

| Contact Name | Description | 
| --- | --- |
| **TokenHolder** | - Where a user's balance sits. <br>- A user that has a **TokenHolder** contract associated with their id can earn and spend tokens. <br>- Tokens that belong to them are mapped to the address of the **TokenHolder** contract. | 
| **DeviceManager** ("**MultiSig**") | - The **MultiSig** controls the **TokenHolder** contract, as its owner. <br>- The public addresses from certain keys generated on the user's devices are set as owners of the **MultiSig** and are authorized as sessionKeys in the **TokenHolder**. |
| **Rules** | - To enable client companies to design custom **Rules** that align with their goals and define the behavior of the token transfer, OpenST protocol came up with contracts for "client companies". <br>- Each **Rules** contract contains a specific piece of business logic and can be be written and deployed by anyone. <br>- Each Economy will have at least one custom **Rules** Contract: [**PricerRule**](https://github.com/OpenSTFoundation/openst-contracts/blob/develop/contracts/rules/PricerRule.sol) <br>- Rules that transfer value are required to be registered. Registering means the process of whitelisting a rule for use in an economy. |
| **PricerRule** | - Rule for transferring tokens in amounts equivalent to selected other currencies (EUR, GBP, USD) |
| **TokenRules** | - Maintains a list of the **Rules** contracts that can execute transfers in a given economy. <br>- Enables developers to register and deregister specific **Rules** contracts. <br>- Each Economy will have one **TokenRules** contract deployed on an auxiliary chain. <br>- For executing a token transfer, an end-users **TokenHolder** contract interacts with **TokenRules** and **Rules** contracts. | 
| **DelayedRecoveryModule** | - Supports recovery via a **6 digit PIN**. <br>- The public addresses of the recoveryOwner and the recoveryController are stored on this contract. <br>- A number that represents blocks added to the blockchain, to approximate a period of delay before recovery can be executed (e.g., 14400 == 12 hours, assuming a block is added every 3 seconds), is also stored on this contract, as the recoveryBlockDelay. |

:::note RecoveryOwner
The recoveryOwner is created using inputs from the client, OST and the user. The user's input is a **6 digit PIN**. The client and OST must provide pseudorandom inputs that are mapped to the user. For the sake of clarity, the client's input shall be referred to as the client User Secret and OST's input shall be referred to as OST User Salt. 

These inputs are put through a cryptographically-sound key generation process (such as Scrypt) to create the private key that will be used as the recoveryOwner for the **DelayedRecoveryModule**.
:::

![openst-contracts](/platform/docs/assets/openst-contracts.png)

## Basic Set-up Steps and Contracts Deployed

| Set-up Step | Description |
| --- | --- |
| User | When an end-user registers on a client app a **TokenHolder** contract and a **DeviceManager** (**MultiSig**) contract is created and deployed by the client via OST Platform APIs/SDKs. | 
| User Wallet | Activating a user wallet involves the deployment and registration of the following contracts: **TokenHolder**, **MultiSig**, **DelayedRecoveryModule** |
| Brand Token Economy | OST writes and deploys the **TokenRules** contract for the Economy and writes a **PricerRule** contract and registers the rule with the **TokenRules** contract on the auxiliary sidechain. |
| Execute Transaction | Users can spend tokens by signing transactions using private keys on their registered mobile device. | 