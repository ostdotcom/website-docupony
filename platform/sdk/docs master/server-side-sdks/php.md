---
id: php
title: PHP SDK Quickstart Guide
sidebar_label: PHP
---


## Introduction
The PHP SDK is a PHP wrapper for the [OST Platform API](/platform/docs/api). This Quick Start Guide will show you how to use the PHP SDK.

You can also view the source code on [Github](https://github.com/ostdotcom/ost-sdk-php/tree/v2.0.0)

## 1. Create Token On OST Platform
Sign up on [platform.ost.com](https://platform.ost.com) to create an account. Follow the [create token guide](/platform/docs/guides/create_token/) to complete the token setup.




## 2. Get Credentials
Once token set up is complete, go to [Developers page](https://platform.ost.com/testnet/developer) inside OST Platform dashboard to get access to your API key and API secret.

Every account is provided with two pairs of keys: one for sandbox environment and one for production environment. Use your sandbox environment API keys for testing and development.




## 3. Install SDK

To install the SDK run the following command <br>


### Installing composer
> curl -sS https://getcomposer.org/installer | php

**Source code:** [PHP SDK - Github Repo](https://github.com/ostdotcom/ost-sdk-php/tree/v2.0.0)

### Install the latest stable version of the SDK:
> php composer.phar require ostdotcom/ost-sdk-php





## 4. Get Token Information
To get the information about your Brand Token, you will have to use `tokens` service provided by PHP SDK.


### Instantiating the SDK object
Before using any service of SDK you will have to provide API key and API secret to instantiate new SDK object.

**Instantiating The SDK Sample Code**

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);
?>
```

### Call `tokens` service
Now you can call any of the service provided by Server Side SDK. You will call `tokens` service to get the tokens details.

**Get Tokens Details Sample Code**

```
<?php
$tokenService = $ostObj->services->tokens;

$response = $tokenService->get()->wait();
echo json_encode($response, JSON_PRETTY_PRINT);
?>
```

### Tokens Information 
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

> Congratulation! You have completed your first API call from Server Side SDK.

## 5. Register User
You can set up your users in OST Platform. User objects in OST Platform do not have any personal information about your application users. OST Platform deploys smart contracts for every user in the economy and the user object holds the addresses of smart contracts and can be identified by a unique identifier (uuid v4).

Developers will create users from your servers and you will be responsible to maintain the mapping between your application user and OST Platform users.

### Create User
To create the user object you will use the user service. No input parameters are needed to create user.

```php
<?php

$userService = $ostObj->services->users;

$createParams = array();
$response = $userService->create($createParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);
?>
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


A detailed explanation about each attribute of user is available on user object section in [API References](/platform/docs/api/?php#user-object).


## Next Steps

### [Android Wallet SDK Setup](/platform/docs/wallet_sdk_setup/android/)

### [iOS Wallet SDK Setup](/platform/docs/wallet_sdk_setup/iOS/)

### [API Reference](/platform/docs/api/)
