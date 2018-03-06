---
id: api
title: OST KIT API
sidebar_label: overview
---

OST KIT&#945; hosts RESTful APIs to help you manage your token economy on the OpenST utility blockchain.  OST KIT&#945; introduces `users` and `transaction-types` to easily integrate the token economy of your application with the blockchain.

A `user` is an object that owns branded token balance on the utility chain, while meta-data and caching information are kept off-chain to preserve user privacy and guarantee instant response times.  The end-user can exchange branded tokens with other users or the company through interactions within the application.  The end-user can always redeem their branded tokens for the equivalent amount of $OST through the OpenST protocol.

Within OST KIT&#945; you can set up `transaction-types` to define advanced payments to tokenize your application. A transaction type is of a certain kind: `user_to_user`, `user_to_company`, or `company_to_user`. A transaction type's value is set in branded tokens ($BT) or in fiat ($USD). Note that OST KIT&#945; runs on a testnet and tokens have no market value.  For fiat payments a price oracle is consulted on-chain to calculate the equivalent amount of branded tokens to transfer.  Lastly for user to user payments the company can set a transaction fee to earn on each user to user payments.

When you create a new `user` through the API a `uuid` is returned that represents the user object.  The user uuid can be provided in the

NOTE: for OST KIT&#945; users are represented by managed accounts (i.e. OST KIT&#945; stores the encrypted private keys) for the created users as it concerns test-$OST on Ropsten testnet.  OpenST and OST KIT will support a decentralised key managenent solution to keep key- and token-ownership with

>_last updated 6 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT alpha v1 | OpenST Platform v0.9.2
