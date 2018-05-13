---
id: version-1.0.0-api
title: OST KIT⍺ API Overview
sidebar_label: Overview
original_id: api
---

OST KIT⍺ hosts RESTful APIs to help you manage your token economy on the OpenST utility blockchain.  OST KIT⍺ introduces `users` and `transaction-types` to easily integrate the token economy of your application with the blockchain.

A `user` is an object that owns a branded token balance on the utility chain, while meta-data and caching information are kept off-chain to preserve user privacy and enable fast response times.  The end-user can exchange branded tokens with other users or the company through interactions within the application.  The end-user can always redeem her branded tokens for the equivalent amount of OST⍺ through the OpenST protocol.

Within OST KIT⍺, you can set up `transaction-types` to define advanced payments to tokenize your application. A transaction type is of a certain kind: `user_to_user`, `user_to_company`, or `company_to_user`. A transaction type's value is set in branded tokens ($BT) or in fiat ($USD). Note that OST KIT⍺ runs on a testnet and tokens have no market value.  For fiat payments, a price oracle is consulted on-chain to calculate the equivalent amount of branded tokens to transfer.  Lastly, for user-to-user payments, the company can set a transaction fee.

When you create a new `user` through the API, a `uuid` is returned that represents the user object.  The user uuid can be provided in requests to interact with the users when executing transaction types.

### Creating, editing and listing API endpoints

| users          | transaction-types         |
|----------------|---------------------------|
| [/users/create](api_users_create.html)  | [/transaction-types/create](api_transaction-types_create.html)   |
| [/users/edit](api_users_edit.html)      | [/transaction-types/edit](api_transaction-types_edit.html)       |
| [/users/list](api_users_list.html)      | [/transaction-types/list](api_transaction-types_list.html)       |

### Executing transactions types

| transaction-types         |
|---------------------------|
| [/transaction-types/execute](api_transaction-types_execute.html) |
| [/transaction-types/status](api_transaction-types_status.html)   |

### Awarding airdrop tokens to users

To incentivise new or existing users, they can be airdropped tokens to get them started in the economy.  Airdropped tokens remain under ownership of the company, but the user has them available to spend within the application under token rules.  Airdropped tokens cannot be redeemed for OST⍺ before they have been spent (at least once) within the economy.

| users        |
|----------------|
| [/users/airdrop/drop](api_airdrop_drop.html)     |
| [/users/airdrop/status](api_airdrop_status.html) |

NOTE: for OST KIT⍺, users are represented by managed accounts (i.e., OST KIT⍺ stores the encrypted private keys) for the created users as it concerns OST⍺ on Ropsten testnet.  In the future, we will support an on-chain decentralised key management solution to keep end-users self-sovereign owners of their tokens while allowing easy and secure integration of transfers within the application.  Follow us to hear about those updates soon.

>_last updated 14 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
