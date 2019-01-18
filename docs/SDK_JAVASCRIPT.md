---
id: sdk_javascript
title: JavaScript SDK Quick Start Guide
sidebar_label: JavaScript SDK Quick Start Guide
---

The OST JavaScript SDK is a JavaScript node module that wraps the OST Developers API. This Quick Start Guide will show you how to use the OST JavaScript SDK to create users, airdrop tokens to those users, create types of transactions, and execute one of those transaction types between two users.

## Prerequisites

To use the SDK, developers will need to:

1. Sign-up on [<u>https://kit.ost.com</u>](https://kit.ost.com).
2. Launch a branded token economy with OST KIT⍺. You can see a step by step guide [<u>here</u>](1_00_KIT_OVERVIEW.md).
3. Obtain an API Key and API Secret from the OST KIT⍺ [<u>Developer API Console</u>](https://kit.ost.com/developer-api-console):

![API Credentials](../assets/Developer_section.jpg)

## Install ost-sdk-js

Make sure Node.js and NPM are installed to run javascript commands from the Terminal. Once the installation is done and the API Key and Secret are obtained, install the npm module.

From your terminal window, enter:

```bash
> npm install @ostdotcom/ost-sdk-js # installs the npm module
```

If you would like to work with the npm module directly, use node, the interactive environment for javascript:

```bash
> node
```

Require the module to use it in your application, we require it in node:

```javascript
> OSTSDK = require('@ostdotcom/ost-sdk-js');
```

## Set Variables

Set the following variables for convenience:

```javascript
apiEndpoint = 'https://playgroundapi.ost.com';  
api_key = '2c48e6cc16716e620138'; // replace with the API Key you obtained earlier
api_secret = '5af763facaf8222e93aa1b537af1b12b179d21670fd15f0b7780752d6027189d'; // replace with the API Secret you obtained earlier
const ostObj = new OSTSDK({apiKey: api_key, apiSecret: api_secret, apiEndpoint: apiEndpoint});
```

## Create Alice and Bob

Initialize a Users object to perform user specific actions, like creating users:

```javascript
> const userService = ostObj.services.user;
```

Create users:

```javascript
userService.create({name: 'Alice'}).then(function(a){console.log(JSON.stringify(a))}).catch(console.log); //  returns object containing Alice's UUID, among other information, which you will need later
userService.create({name: 'Bob'}).then(function(a){console.log(JSON.stringify(a))}).catch(console.log);  // returns object containing Bob's UUID, among other information, which you will need later
```

## Airdrop Tokens to Alice and Bob

Newly created users do not have any tokens; but you can airdrop tokens to them so that they can participate in your branded token economy.

```javascript
userService.airdropTokens({amount: 10, list_type: 'all'}).then(function(a){console.log(JSON.stringify(a))}).catch(console.log); // airdrops 10 branded tokens to all of your economy's users
// returns object containing the UUID of the airdrop transaction, among other information, which you will need later
```

Airdropping involves several asynchronous steps and you can use the UUID of the airdrop transaction to check its status:

```javascript
userService.airdropStatus({airdrop_uuid: 'beea3a5a-49da-48ff-a9df-1ebcd7c92dc4'}).then(function(a){console.log(JSON.stringify(a))}).catch(console.log); 
// actual airdrop UUID will differ
// returns object with "steps_complete"=>["users_identified", "tokens_transfered", "contract_approved", "allocation_done"]
```

## Create a Like Transaction

You can create named transaction types with defined values that are between users or between a user and your company.

For instance, to make a "Like" transaction for your branded token that is priced in USD:

```javascript
const transactionKindService = ostObj.services.transactionKind; // initializes a TransactionKind object
transactionKindService.create({name: 'Like', kind: 'user_to_user', currency_type: 'usd', currency_value: '1.25', commission_percent: '12'}).then(function(a){console.log(JSON.stringify(a))}).catch(console.log);
```

## Alice Likes Bob

Now that you've created a Like transaction type and funded Alice and Bob with airdropped tokens, you can execute a Like transaction from Alice to Bob.

To execute the Like transaction, you will need Alice and Bob's UUIDs. They were returned when you created Alice and Bob. However, you can get them again by retrieving and filtering the list of users:

```javascript
users_list_object = userService.list().then(function(a){console.log(JSON.stringify(a))}).catch(console.log); 
// # returns object that includes the list of users
// fetch UUIDs for Alice and Bob
```
_Note: OST KIT⍺ does not place a uniqueness constraint on user names._

And now, use those UUIDs to execute a Like transaction between Alice and Bob:

```javascript
transactionKindService.execute({from_uuid: 'd6342d31-ebbd-4cca-9436-be6308fd74f6', to_uuid: 'e24f6e23-4f8d-4fe3-b9ab-30cd475b39f8', transaction_kind: 'Likes'}).then(function(a){console.log(JSON.stringify(a))}).catch(console.log); 
// returns object with uuid of executed transaction
//  your UUIDs for Alice and Bob will differ
```
_Note: `transaction_kind` is the `name` of the transaction type._

The UUID of the executed transaction signals that worst-case scenario checks that the transaction will be completed have been performed and you can assume the transaction will be successfully mined. However, you can additionally confirm the status of the executed transaction in a couple of ways.

You can get the status of the specific transaction:

```javascript
transactionKindService.status({transaction_uuids: ['69d048bc-3da9-48ad-a00b-a37cfc64dc3b']}).then(function(a){console.log(JSON.stringify(a))}).catch(console.log); // the UUID of your executed transaction will differ
```

Or you can get the list of users again and see that Alice's branded token balance went down and Bob's branded token balance went up (which Bob is probably happy about):

```javascript
userService.list().then(function(a){console.log(JSON.stringify(a))}).catch(console.log); 
```

And with just a little time and a lot of ease, your branded token economy is up and running!
