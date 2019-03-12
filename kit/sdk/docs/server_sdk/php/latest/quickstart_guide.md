---
id: quickstart_guide
title: PHP SDK Quickstart Guide
sidebar_label: PHP SDK Quickstart Guide
---


## Introduction
Do we want to explain them about wallet SDK


## 1. Create Token On OST KIT
Signup on [oct.com](https://ost.com) to create an account. Follow [create token guide]() (ADD LINK HERE) to complete the token setup.




## 2. Get Credentials
Once token setup is complete, go to [developers page](kit.ost.com/testnet/developer) inside OST KIT dashboard to get access to API key and API secret.




## 3. Install SDK

To install the SDK run the following command <br>


### Installing composer
> curl -sS https://getcomposer.org/installer | php

**Source code:** [Github - PHP SDK](https://github.com/ostdotcom/ost-sdk-php)

### Install the latest stable version of the SDK:
> php composer.phar require ostdotcom/ost-sdk-php





## 4. Get Token Information
To get the information about the newly created Branded Token we will have to use `tokens` service provided by php server SDK.



### Instantiating the SDK object
Before using any service of SDK we will have to provide API key and API secret to instantiate new SDK object.
We will be using this new SDK object
**Instantiating The SDK Samlpe Code**

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
Now we can call any of the service provided by server SDK. We will call `tokens` service to get the tokens details. 

**Get Tokens Details Sample Code**

```
<?php
$tokenService = $ostObj->services->tokens;

$response = $tokenService->get()->wait();
echo json_encode($response, JSON_PRETTY_PRINT);
?>
```

### Tokens Information 
This is the same information that you had filled during creating the branded token.

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

> Congratulation! You have completed your first API call from server side SDK.

## 5. Register User
We can create users in OST KIT. These user object do not have any personal information about your application users. OST KIT deploys smart contracts for every user in the economy and the user object holds the addresses of smart contracts and can be identified by a unique identifier (uuid v4). 

Partner companies will have to create users from their servers and they will be responsible to maintain the mapping between thier application user and OST KIT users.

### Create User
To create the user object we will use the `user` service. No input parameters are needed to create user.

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
Ideally after user creation you should map the user's `id` with unique identifier of you application user. 
Ex: `jack.ryan@example.com` can be a unique identifier of your application user, this email can be mapped with newly created user's `id`.


A detail explanation about each attribute of user is availaible on [user object](/kit/docs/api/?php#user-object) section of [API docs](/kit/docs/api/?php#user-object).


## 6. Register Device
Device is a mobile device running your mobile application. Your mobile application will use [wallet SDK](/kit/docs/sdk/wallet_sdk/overview/) to add wallet functionality in your app. user's wallet will have keys which are called as device keys. 

Device registeration is a process of associating these device keys onto KIT. When the device keys are generated in a mobile device using wallet SDK, wallet SDK would not be able to communicate directly with OST KIT server.

So device registeration should happen via mappy server (Partner companies server) because wallet SDK can't be trusted OST KIT server at this stage. After the device registeration walet SDK can communicate directly with OST KIT servers.

### Sample device information
Ideally partner companies server will recieve the device information form thier mobile application. But device registeration remains partner companies responsibility. So let's take some dummy device data to register it on OST KIT server.

```php
<?php
$createParams = array();
$createParams['address'] = '0x2Ea365269A3e6c8fa492eca9A531BFaC8bA1649C';
$createParams['api_signer_address'] = '0x5F860598383868e8E8Ee0ffC5ADD92369Db37455';
$createParams['device_uuid'] = '593a967f-87bd-49a6-976c-52edf46c4df4';
$createParams['device_name'] = 'Iphone S';
?>
```
Do not worry about the device data and its attributes. Wallet SDK will provide it to you. <br>


### Device registration
We need to provide the user id of the OST KIT user whose device information we are adding on OST KIT server. 


```php
<?php
$createParams['user_id'] = '7303bd10-5114-423e-9206-04cafafb1708';

$deviceService = $ostObj->services->devices;

$response = $deviceService->create($createParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

### Response 

```json
{
    "success": true,
    "data": {
        "result_type": "device",
        "device": {
            "user_id": "7303bd10-5114-423e-9206-04cafafb1708",
            "address": "0x2ea365269a3e6c8fa492eca9a531bfac8ba1649c",
            "linked_address": null,
            "api_signer_address": "0x5f860598383868e8e8ee0ffc5add92369db37455",
            "device_name": "Iphone S",
            "device_uuid": "593a967f-87bd-49a6-976c-52edf46c4df4",
            "status": "REGISTERED",
            "updated_timestamp": 1552368397
        }
    }
}

```
Default status of device will be registered. It needs to be `AUTHORIZED` before it can be used to do transactions. 
A details explanation about device attributes is available at [device object](/kit/docs/api/?php#device-object) section of [API docs](/kit/docs/api/?php).


## Next Steps


