---
id: nodejs
title: Node.js SDK Quickstart Guide
sidebar_label: Node.js
---

The Node.js SDK is a JavaScript wrapper for the [OST Platform API](/platform/docs/api). This Quick Start Guide will show you how to use the Node.js SDK.

You can also view the source code on [GitHub](https://github.com/ostdotcom/ost-sdk-js/tree/v2.0.0)

## 1. Create Token On OST Platform
Follow the [Create Token guide](/platform/docs/1-create/) to complete token setup.

## 2. Get Credentials
Once token setup is complete, go to the [Developers page](https://platform.ost.com/testnet/developer) inside OST Platform dashboard to get access to your API key and API secret.

Every account is provided with two pairs of keys: one for Sandbox and one for Production. Use your Sandbox API keys for development and testing.

## 3. Install SDK
To install the SDK run the following command <br>

> npm install @ostdotcom/ost-sdk-js

**Source code:** [Node.js SDK GitHub Repo](https://github.com/ostdotcom/ost-sdk-js/tree/v2.0.0)


## 4. Get Token Information
To get the information about your Token, you will have to use `tokens` service provided by Node.js SDK.

### Instantiating the SDK object
Before using any service of SDK you will have to provide API key and API secret to instantiate new SDK object.

**Instantiating The SDK Sample Code**

```javascript
const OSTSDK = require('@ostdotcom/ost-sdk-js');

const ostObj = new OSTSDK({
                            apiKey: <api_key>, 
                            apiSecret: <api_secret>, 
                            apiEndpoint: <api_endpoint>,
                            config: {timeout: <request_timeout_in_seconds>}
                        });
```

### Call `tokens` service
Now you can call any of the SDK. You will call `tokens` service to get the tokens details.

**Get Tokens Details Sample Code**

```javascript

const tokensService = ostObj.services.tokens;

tokensService.get({})
    .then(function(res) { 
        console.log(JSON.stringify(res)); 
    })
    .catch(function(err) { 
        console.log(JSON.stringify(err)); 
    });

```

### Token Information 
Token entity has important information about your token which we recommend you to save on your server for further use. 

```json
{
  "success":true,
  "data":{
    "result_type":"token",
    "token":{
      "id":1085,
      "name":"OSTD",
      "symbol":"OSTD",
      "conversion_factor":1,
      "total_supply":"20000000000000000000000",
      "decimals":18,
      "origin_chain":{
        "chain_id":3,
        "branded_token":"0xd31756555d3a28c990c39fb85087e41afc09ff7a",
        "organization":{
          "contract":"0x0a886e74747f5fed2db45c53df5e0c7b2bacc3d7",
          "owner":"0xaa541c16d8bd7f61c2c0ec31f30b481d435bd5c1"
        },
        "stakers":[
          "0xaa541c16d8bd7f61c2c0ec31f30b481d435bd5c1"
        ]
      },
      "auxiliary_chains":[
        {
          "chain_id":199,
          "utility_branded_token":"0xdd7df6a4ec6a0c2edd051da875ab9a32e9567869",
          "company_token_holders":[
            "0xa9632350057c2226c5a10418b1c3bc9acdf7e2ee"
          ],
          "organization":{
            "contract":"0x5e0c62d0f3f286461ef70e1a01e26bc766107912",
            "owner":"0xaa541c16d8bd7f61c2c0ec31f30b481d435bd5c1"
          }
        }
      ],
      "updated_timestamp":1551870482
    }
  }
}
```

:::note **Congratulations** 
You have completed your first API call from Server Side SDK
:::

## 5. Register User
Next, you can set-up your users in OST Platform. User objects in OST Platform do not have any personal information about your application users. OST Platform deploys smart contracts for every user and the user object holds the addresses of smart contracts and can be identified by a unique identifier (uuid v4).

:::note
Create users from your servers. You will be responsible for maintaining the mapping between your application users and OST Platform users.
:::

### Create User
To create the user object you will use the user service. No input parameters are needed to create user.

```javascript

const usersService = ostObj.services.users;

usersService.create({})
    .then(function(res) { 
        console.log(JSON.stringify(res)); 
    })
    .catch(function(err) { 
        console.log(JSON.stringify(err)); 
    });

```

### Response (User Object)
```json
{
    "success": true,
    "data": {
        "result_type": "user",
        "user": {
            "id": "7303bd10-5114-423e-9206-04cafafb1708",
            "token_id": 1085,
            "token_holder_address": null,
            "device_manager_address": null,
            "recovery_address": null,
            "recovery_owner_address": null,
            "type": "user",
            "status": "CREATED",
            "updated_timestamp": 1552365651
        }
    }
}
```

Ideally after user creation you should map the user's id with unique identifier of your application user. E.g.: `jack.ryan@example.com` can be a unique identifier of your application user, this email can be mapped with newly created user's `id`.

A detailed explanation about each attribute of user is available on user object section in [API References](/platform/docs/api/#user-object).


## Next Steps
1. [Android Wallet SDK Setup](/platform/docs/sdk/mobile-wallet-sdks/android/)
2. [iOS Wallet SDK Setup](/platform/docs/sdk/mobile-wallet-sdks/iOS)
3. [API Reference](/platform/docs/api/)
