---
id: version-1.0.0-sdk_javascript
title: JavaScript SDK Quick Start Guide
sidebar_label: JavaScript SDK Quick Start Guide
original_id: sdk_javascript
---

The [OST JavaScript SDK](https://github.com/OpenSTFoundation/ost-sdk-js/tree/release-1.0) is a JavaScript node module that wraps the OST Developers API. This Quick Start Guide will show you how to use the OST JavaScript SDK to create users, airdrop tokens to those users, create actions, and execute one of those actions.


### Prerequisites

To use the SDK, developers will need to:

1. Sign-up on [<u>https://kit.ost.com</u>](https://kit.ost.com).
2. Launch a branded token economy with OST KIT⍺. You can see a step by step guide [<u>here</u>](/docs/kit_overview.html).
3. Obtain an API Key and API Secret from the OST KIT⍺ [<u>Developer API Console</u>](https://kit.ost.com/developer-api-console):

![API Credentials](assets/Developer_section.jpg)

### Install ost-sdk-js

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

### Set Variables

Set the following variables for convenience:

```javascript
apiEndpoint = 'https://sandboxapi.ost.com/v1/';  
api_key = '2c48e6cc16716e620138'; // replace with the API Key you obtained earlier
api_secret = '5af763facaf8222e93aa1b537af1b12b179d21670fd15f0b7780752d6027189d'; // replace with the API Secret you obtained earlier
const ostObj = new OSTSDK({apiKey: api_key, apiSecret: api_secret, apiEndpoint: apiEndpoint});
```

### Create Alice and Bob

Initialize a Users object to perform user specific actions, like creating users:

```javascript
> const userService = ostObj.services.user;
```

Create users:

```javascript
userService.create({name: 'Alice'}).then(function(a){console.log(JSON.stringify(a))}).catch(console.log); //  returns object containing Alice's id, among other information, which you will need later
userService.create({name: 'Bob'}).then(function(a){console.log(JSON.stringify(a))}).catch(console.log);  // returns object containing Bob's id, among other information, which you will need later
```

### Airdrop Tokens to Alice and Bob

Newly created users do not have any tokens; but you can airdrop tokens to them so that they can participate in your branded token economy.

Initialize an Airdrop Object to execute an airdrop, get airdrop status and list airdrops.  

```javascript
const airdropService = ostObj.services.airdrops;
```

Execute an airdrop to one or many users, by using their user ids returned when creating users.

```javascript
airdropService.execute({amount: 1, user_ids: 'f87346e4-61f6-4d55-8cb8-234c65437b01'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); }); //airdrops 1 BT to the selected user id.
```

Airdropping involves several asynchronous steps and you can use the ids of the returned airdrop object to check its status:

```javascript
airdropService.get({id: 'ecd9b0b2-a0f4-422c-95a4-f25f8fc88334'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
// the airdrop id will differ
// returns object with "steps_complete"=>["users_identified", "tokens_transfered", "contract_approved", "allocation_done"]
```

### Create a Like Action

You can create named actions with defined values that are between users or between a user and your company. For instance, to make a "Like" action for your branded token between users, that is priced in USD. First Initialize an action object:

```javascript
const actionService = ostObj.services.actions; // initializes an action object

```
Now create a new action called 'Like':

```javascript
actionService.create({name: 'Like', kind: 'user_to_user', currency: 'USD', arbitrary_amount: false, amount: 1.01, commission_percent: 1}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); }); 
```
To understand more about how to use arbitrary amounts for action checkout the [action documentation.](/docs/api_actions_create.html) 

### Alice Likes Bob

Now that you've created a Like action, funded Alice and Bob with airdropped tokens, you can execute a Like action from Alice to Bob.

To execute the Like action, you will need Alice and Bob's ids and the action id. The user id are returned when you created Alice and Bob. However, you can get them again by retrieving and filtering the list of users:

```javascript
userService.list({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
// returns object that includes the list of users
// fetch ids for Alice and Bob
```
_Note: OST KIT⍺ does not place a uniqueness constraint on user names_

To retrieve the action id, list the actions object as follows:

```javascript
actionService.list({}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); }); 
```

And now inititalize a transactions object to execute transactions:

```javascript
const transactionService = ostObj.services.transactions;
```

To execute a Like action between Alice and Bob, use the users ids and the action id as follows:

```javascript
transactionService.execute({from_user_id:'0a201640-77a7-49c8-b289-b6b5d7325323', to_user_id:'24580db2-bf29-4d73-bf5a-e1d0cf8c8928', action_id:'22599'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
// returns object with id of executed transaction
// the ids of your Alice and Bob users and the "Upvote" action type will differ
```

You can query for the status of the executed transaction in a couple of ways.
You can get the status of the specific transaction with its id:

```javascript
transactionService.get({id: '84d97848-074f-4a9a-a214-19076cfe9dd1'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
// the id of your executed transaction will differ 
```

Or you can get the list of all transactions:

```javascript
transactionService.list({page_no: 1, limit: 10}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

And with just a little time and a lot of ease, your branded token economy is up and running!

>_last updated 17th May 2018_; for support see [help.ost.com](https://help.ost.com/support/home)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
