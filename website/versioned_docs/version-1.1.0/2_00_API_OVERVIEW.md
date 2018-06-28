---
id: version-1.1.0-api
title: OST KIT⍺ API | Overview
sidebar_label: Overview
original_id: api
---

OST KIT⍺ hosts RESTful APIs to help you manage your token economy on the OpenST utility blockchain.  OST KIT⍺ introduces `users` and `actions` to easily integrate the token economy of your application with the blockchain.

A `user` is an object that owns a branded token balance on the utility chain, while meta-data and caching information are kept off-chain to preserve user privacy and enable fast response times.  The end-user can exchange branded tokens with other users or your company through interactions within your application.  The end-users can always redeem their branded tokens for the equivalent amount of $OST⍺ through the OpenST protocol.

Within OST KIT⍺, you can set up `actions` to define advanced payments to tokenize your application. An  action is of a certain kind: `user_to_user`, `user_to_company`, or `company_to_user`. The amount of the actions is set in branded tokens ($BT) or in fiat ($USD). Note that OST KIT⍺ runs on a testnet and tokens have no market value.  For fiat payments, a price oracle is consulted on-chain to calculate the equivalent amount of branded tokens to transfer.  Lastly, for user-to-user payments, the company can set a transaction fee.

When you create a new `user` through the API, an `id` is returned that represents the user object.  The user id can be provided in requests to interact with the users when executing action.

### Creating, editing and listing API endpoints

| Users          | Actions         |
|----------------|---------------------------|
| [Create a User](/docs/api_users_create.html)  | [Create an Action](/docs/api_actions_create.html)   |
| [Update a User](/docs/api_users_edit.html)      | [Update an Action](/docs/api_actions_update.html)       |
| [List Users](/docs/api_users_list.html)      | [List Actions](/docs/api_actions_list.html)       |
| [Retrieve a User](/docs/api_users_list.html) | [Retrieve an Action](/docs/api_actions_retrieve.html) |

### Transactions - Executing Actions

| Transactions       |
|---------------------------|
| [Execute an Action](/docs/api_action_execute.html) |
| [List Transactions](/docs/api_transaction_list.html)   |
| [Retrieve a Transaction](/docs/api_transaction_retrieve.html) |

### Awarding airdrop tokens to users

To incentivize new or existing users, you can airdrop tokens to get them started in the economy. Airdropped tokens remain under ownership of the company, but the user has them available to spend within the application under token rules.  Airdropped tokens cannot be redeemed for $OST⍺ before they have been spent (at least once) within the economy.

| Airdrop        |
|----------------|
| [Execute an Airdrop](/docs/api_airdrop_execute.html)     |
| [Retrieve an Airdrop](/docs/api_airdrop_retrieve.html)   |
| [List Airdrops](/docs/api_airdrop_list.html)   |


### Setting up a basic wallet
To create an interface for your users to view their balances and transactions and analyze their interactions and the rewards you can use the following set of APIs along with a few others mentioned in this page.

| Wallet  |
|----------|
|[Fetch User's Balance](/docs/api_balance.html)|
|[List User's transactions](/docs/api_ledger.html)|

NOTE: For OST KIT⍺, users are represented by managed accounts for the created users i.e. OST KIT⍺ stores the encrypted private keys. Any of the APIs do not support key-management, signing of transactions or buy-in and cash-out at this point in time. In the future, we will support an on-chain decentralised key management solution to keep end-users self-sovereign owners of their tokens while allowing easy and secure integration of transfers within the application.

### Transferring Funds

In order to deploy a smart contract on the OpenST-Protocol utility chains, you will have to send a transaction to the chain. For this an account outside of your branded token economy must have a sufficient balance of OST⍺ Prime to cover transaction fees. OST⍺ Prime is the base token on the OpenST-Protocol utility chains.

To transfer OST⍺ Prime to an account outside of your branded token economy `/transfers` API should be used.

|Transfers |
|---------------|
| [Create a Transfer](/docs/api_transfers_create.html) |
| [List Transfers](/docs/api_transfers_list.html) |
| [Retrieve a Transfers](/docs/api_transfers_retrieve.html) |

### Fetching branded token details
| Token Details |
|----------------|
| [Token Details](/docs/api_token.html)|




>_last updated 17 May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1.1 | OpenST Platform v0.9.2
