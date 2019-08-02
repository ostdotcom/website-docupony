---
id: transactions
title: Overview of Transactions in OST Platform
sidebar_label: Transactions Explained
---

## Transactions Types
There are two different types of transactions possible, company to user and user initiated. The latter must be signed by the users private keys on their mobile device.

| Transaction Type | Description |
|---|---|
| **company-to-user** | Client company to end-user<br>**Our Server Side SDKs (available in [PHP](/platform/docs/sdk/server-side-sdks/php/), [Ruby](/platform/docs/sdk/server-side-sdks/ruby/), [Node.js](/platform/docs/sdk/server-side-sdks/nodejs/), [Java](/platform/docs/sdk/server-side-sdks/java/)). facilitate company-to-user transactions** |
| **user initiated** | End-user to another user OR end-user to the client company <br> **Our Mobile Wallet SDKs (available in [Android](/platform/docs/sdk/mobile-wallet-sdks/android/), [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS), [React Native](/platform/docs/sdk/mobile-wallet-sdks/iOS)) facilitate user initiated transactions. The mobile wallet is used to sign transactions.** |


Each transaction is defined by a **Rules** contract. OST provides two **Rules** contracts out of the box:
* `directTransfer`: Transfer Tokens
* `pay`: Transfer fiat value

![TransactionsExplained1]( /platform/docs/assets/transactions_explained_2.png)

## Example
If a client company wants to transfer tokens worth USD5 to a user the following sequence of events occur:
1. Company's **TokenHolder** contract initiates “execute pricer rule” request to client company's **PricerRule** contract.
2. The **TokenHolder** contract also approves company's **TokenRules** contract to spend tokens on its behalf.
3. Company's **PricerRule** contract applies “conversion from USD to tokens rules”. The **PricerRule** contract will pass all this information after applying rules to the **TokenRules** contract.
4. The **TokenRules** contract executes the transfer between all concerned parties as specified by the company's **PricerRule** contract.

