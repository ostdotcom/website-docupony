---
title: KIT API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - php: PHP

toc_footers:
  - Documentation Powered by Slate

search: true

includes: 
  - errors
---

# Introduction

OST KIT is a toolkit built on the OpenST and Mosaic protocol that allows anyone to create, launch, and manage their own branded token economy in 3 easy steps. First set a conversion rate for your token. Next define the actions that you want your users to be able to engage in. Finally mint your tokens and initialize your token economy. 

OST KIT API allows developers to interact with smart contract layer through REST API. The REST URLs are resource oriented and returns JSON response with standard HTTP response codes.

API libraries are called `Server Side SDK` since they include API calls that can only be used by partner company's server. 

Available Server Side SDKs:<br>
1. PHP SDK  <br>
2. Ruby SDK   <br>
3. Java SDK  <br>
4. Node Js SDK  <br>


## Access

> Sandbox Environment API URL

```json
"https://api.ost.com/testnet/v2/"
```

> Production Environment API URL

```json
"https://api.ost.com/testnet/v2/"
```

### Sandbox Environment
You can signup on [ost.com](https://ost.com/) to create your account. By default you will land in sandbox mode. You can create an economy in sandbox mode to test the API. <br><br>

Once you have created your token (refer [create token guide](/kit/)) (Change link) to create token, then you can head over to [developers page ](https://ost.com/) (Change link) to get access to API key and API secret.


### Production Environment
A request to enable the production mode can be made after loggin in to sandbox mode. Our team will reach out to you to check if you are ready to go live. Once our team is done with the check, your account will be moved to production mode. 

A toggle switch will be enabled that can be used to switch back to sandbox mode.



## Authentication
All the server side SDKs will handle authentication for you. You just need to provide your API key and API secret while initializing the Server side SDKs. If you are going to use one of the SDK then you can skip this section.

For other languages you can implement the signature generation by computing the `sha256` digest of the API secret and the query string. The resulting signature must be then included in the request.

Every API request on `https://api.ost.com/testnet/v2/` or `https://api.ost.com/mainnet/v2/` requires hash-based message authentication.

Every request has three mandatory parameters that must be included: <br>
- `api_key`, the API key as provided from [<u>developers page</u>](kit.ost.com/testnet/developer) inside OST KIT dashboard.<br>
- `request_timestamp`, the current unix timestamp in seconds.<br>
- `signature`, the signature as the sha256 digest of the shared API secret and the correctly formatted query string as described below.<br>

The request timestamp will be valid for up to ten seconds.  Your computer clock must therefore be synchronised for authentication to succeed.

The reason for these 3 mandatory parameters in each request is to ensure that the man-in-the-middle cannot change the input params to the request and also so that we can validate the signature on the server side.


### A. Creating the string to sign.

To generate the signature you must first form the string to sign. This string to sign can be formed by concatenation of the following elements

-  API endpoint
-  api_key, the API key as provided from [OST KIT⍺](https://dev.ost.com/docs/kit.ost.com/testnet/developer)
-  `request_timestamp`, the current unix timestamp in seconds.
-   API parameters.

> Sample String-to-sign :

```js
"/users/create?api_key=4b66f566d7596e2b733b&name=Alice+Anderson&request_timestamp=1521073147"
```

Note all the inputs must be alphabetically sorted on the keys. The keys are lower-case, snake case as documented for each API endpoint. Spaces in input values are replaced with plus sign`+`.

### B. Generating a signature

The signature is the sha256 digest of the shared API secret and the correctly formatted query string

generated_signature = Hmac_Sha256_Hexdigest(string-to-sign, api-secret)

> Sample Final URL

```json
"https://https://api.ost.com/testnet/v2/users/list?api_key=API_KEY&request_timestamp=REQUEST_TIMESTAMP&signature=SIGNATURE"
```

Please ensure that the final URL is encoded while making the API request.

## Versioning












# Users
`Users` object allows you to retrieve all the contract addresses associated with it. This API allows you to create, get, list and get the salt of the user. Below you can find details about `Users` object.

## User Object

| Attribute  | Description  |
|---|---|
| **id** <br> **uuid v4**    | UUID V4  |
| **token_id** <br> **Integer** | Unique integer for an economy |
|  **token\_holder\_address** <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address) | Holds a 20 byte value (size of an Ethereum address). This will be the address for token-holder contract.  |
| **device\_manager\_address** <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address)  |  Holds a 20 byte value (size of an Ethereum address). This will be the address for [multi-sig](https://en.bitcoin.it/wiki/Multisignature) contract.   |
|  **recovery_address** <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address) | Holds a 20 byte value (size of an Ethereum address). This will be the address of recovery contract.  |
| **recovery\_owner\_address** <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address) | Holds a 20 byte value (size of an Ethereum address). This will be the recovery owner address.  |
| **type** <br> **String** | `type` string will determine the type of user. It can have two possible values `user` and `company`. <br> `user`: All economy users will be of type `user`<br> `company`: Accounts used by Partner companies will have type `company`   |
| **status** <br> **String**| A list of contracts is deployed on blockchains for each economy user. This `status` string gives us the status about contracts deployment.<br> It can have 3 possible string values described below. <br> `CREATED`: This will be the default status when a user is created. <br> `ACTIVATING`: This will be the users status when token holder contract is being deployed. <br> `ACTIVATED`: This will be the users status when token holder deployment is complete.|
| **updated_timestamp** <br> **EPOCH time**| Last update timestamp.  |



## Create User

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$userService = $ostObj->services->users;
$createParams = array();
$response = $userService->create($createParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

A POST to `https://api.ost.com/testnet/v2/users` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users` (Production environment)  will create a `user` object. 

<u>**Input Parameters**</u>

No input params needed to create a user.


<u>**Returns**</u><br>
For API calls to `/users` the `data.result_type` will be the string "user" and the key `data.user` will be the newaly created user object. The user object will have an identifier `id`. This `id` will be used to get any user specific details like `devices`, etc. <br>

The user's `id` should be mapped with user entity on partner company's server. One example of this mapping could be storing user's `id` along with it's `email_id` on parter company's server. 

> Example Response

```json
{
  "success": true,
  "data": {
      "result_type": "user",
      "user": {
          "id": "5ff57c15-f54f-45fe-acf5-6c6fbfdf815a",
          "token_id": 1085,
          "token_holder_address": null,
          "device_manager_address": null,
          "recovery_address": null,
          "recovery_owner_address": null,
          "type": "user",
          "status": "CREATED",
          "updated_timestamp": 1552289121
      }
  }
}

```

## Get a User


```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$userService = $ostObj->services->users;

$getParams = array();
$getParams['id'] = '5ff57c15-f54f-45fe-acf5-6c6fbfdf815a'; // replace this with your user's id
$response = $userService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

To get a user, you need user's `id` that will be passed in the URL. A GET request to `https://api.ost.com/testnet/v2/users/{user-id}` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}` (Production environment)  will return the `user` object. 


<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user's id** <br> **Required** | Identifier of the user to be retrieved  |


<u>**Returns**</u><br>
This call will return a hash if the valid `id` was provided. The example of response is given on the right hand side.

> Example Response

```json
{
  "success": true,
  "data": {
    "result_type": "user",
    "user": {
      "id": "5ff57c15-f54f-45fe-acf5-6c6fbfdf815a",
      "token_id": 1085,
      "token_holder_address": null,
      "device_manager_address": null,
      "recovery_address": null,
      "recovery_owner_address": null,
      "type": "user",
      "status": "CREATED",
      "updated_timestamp": 1552289121
    }
  }
}

```


## List all Users

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$userService = $ostObj->services->users;

// List users without any filters. This will return 10 users because the default limit is 10.
$getParams = array();
$response = $userService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

// List 4 users.
$getParams = array();
$getParams['limit']='4';
$response = $userService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

// List users with `ids` parameter. This will list only 2 users whose id matches with the ids passed as parameter.
$getParams = array();
$getParams['ids'] = array('fd836794-96fe-4841-a486-f3d2966d3ac8', 'fbb7990a-c396-46d2-a179-b69e783bf231');
$response = $userService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

// List next 10 users using pagination.
$getParams = array();
$getParams['pagination_identifier'] = 'eyJsYXN0RXZhbHVhdGVkS2V5Ijp7InRpZCI6eyJOIjoiMTA4NSJ9LCJ1aWQiOnsiUyI6ImU2NmQ5MjEwLTlmNDctNGJkZi1hYjQ5LTM0ZDVjYTJlZGI5YiJ9fSwicGFnZSI6MiwibGltaXQiOjEwfQ==';
$response = $userService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

// 

?>
```

A GET call to `https://api.ost.com/testnet/v2/users` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users` (Production environment) will return a list of users. The users are sorted by creation date, with the most recent users appearing first.


<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **ids** <br> **Optional**   | List of user id's to be retrieved. Max 25 ids can be passed.  |
| **Limit** <br> **Optional**   |  Limit on the number of users to be returned. Max limit is 25. Limit is ignored when user ids are passed. **Default value of limit is 10**  |

<u>**Returns**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 3 child properties `result_type`, `users` and `meta`.<br><br>

The value of `data.result_type` property will be `users` and list of users will be available under `data.users` property. The pagination data will be available under `data.meta` property. The example response is given on the right hand side. 

> List all Users - Example Response

```json
{
  "success": true,
  "data": {
    "result_type": "users",
    "users": [
        {
            "id": "fd836794-96fe-4841-a486-f3d2966d3ac8",
            "token_id": 1085,
            "token_holder_address": "0x3c20b6063aae91716efa7c4c20ecc5ae8be739d1",
            "device_manager_address": "0xa86701116f6dccbb6b7e7c1fa7e815ef444fd0ca",
            "recovery_address": "0x6f472b55a989009a261bac3ae14db3ba4c1a9a15",
            "recovery_owner_address": "0xf481c20ada19d60f96ae4051845e34408d55b541",
            "type": "user",
            "status": "ACTIVATED",
            "updated_timestamp": 1552055725
        },
        {
            "id": "fbb7990a-c396-46d2-a179-b69e783bf231",
            "token_id": 1085,
            "token_holder_address": null,
            "device_manager_address": null,
            "recovery_address": null,
            "recovery_owner_address": null,
            "type": "user",
            "status": "CREATED",
            "updated_timestamp": 1551975577
        },
        {
            "id": "f909d31d-5f6d-4440-ab1f-bfb40709f5aa",
            "token_id": 1085,
            "token_holder_address": "0xc835b03fbb0bf630df39ccce0af75cb201d91eb6",
            "device_manager_address": "0xd0de2b520b72804116c0987b733b776232de1f94",
            "recovery_address": "0x8562281b40937b2227ba6042fc77b76b78fa666f",
            "recovery_owner_address": "0x986c7bc12ee02f7c08d89d5951f0d0f86ad7d6ae",
            "type": "user",
            "status": "ACTIVATED",
            "updated_timestamp": 1552287905
        },
        {
            "id": "f6a0a826-02fc-4403-822c-b506bea9b3e7",
            "token_id": 1085,
            "token_holder_address": null,
            "device_manager_address": null,
            "recovery_address": null,
            "recovery_owner_address": null,
            "type": "user",
            "status": "CREATED",
            "updated_timestamp": 1552243644
        },
        {
            "id": "f16bab15-95a5-4e4a-a404-6cbe3901bca2",
            "token_id": 1085,
            "token_holder_address": null,
            "device_manager_address": null,
            "recovery_address": null,
            "recovery_owner_address": null,
            "type": "user",
            "status": "CREATED",
            "updated_timestamp": 1551972063
        },
        {
            "id": "f0e07d5d-a26b-4c86-9e1f-d6f74bcb1310",
            "token_id": 1085,
            "token_holder_address": "0x579ab7e6529bc581c93c0c7d0adc9c0a1dba4437",
            "device_manager_address": "0x2d9e1318e61ca76a10b9eb89cbe9842b55cbd6f0",
            "recovery_address": "0x88dfcec86125f3b3bf2b0aef207f7ecd69dc72d6",
            "recovery_owner_address": "0x770ebef3ffb78d6d395fc1e3e6acf00b6057abc1",
            "type": "user",
            "status": "ACTIVATED",
            "updated_timestamp": 1551943048
        },
        {
            "id": "ee3aef76-b883-402b-addf-2ade7f6af2b2",
            "token_id": 1085,
            "token_holder_address": null,
            "device_manager_address": null,
            "recovery_address": null,
            "recovery_owner_address": null,
            "type": "user",
            "status": "CREATED",
            "updated_timestamp": 1551942824
        },
        {
            "id": "ea77075b-c262-45d2-9c91-607a830c4cf2",
            "token_id": 1085,
            "token_holder_address": null,
            "device_manager_address": null,
            "recovery_address": null,
            "recovery_owner_address": null,
            "type": "user",
            "status": "CREATED",
            "updated_timestamp": 1552243474
        },
        {
            "id": "e9404642-64f1-4c44-8fa3-800cb463b776",
            "token_id": 1085,
            "token_holder_address": null,
            "device_manager_address": null,
            "recovery_address": null,
            "recovery_owner_address": null,
            "type": "user",
            "status": "CREATED",
            "updated_timestamp": 1552243749
        },
        {
            "id": "e66d9210-9f47-4bdf-ab49-34d5ca2edb9b",
            "token_id": 1085,
            "token_holder_address": "0x8e4a581c59d9feb59753a018f12451334b9e57e4",
            "device_manager_address": "0x3594de752d941b9e6cd97dabe6aecf7185e6bf93",
            "recovery_address": "0xfbb43a8c5a659fbf88ed0720a94350a063a70e0b",
            "recovery_owner_address": "0x7306c650e874fd0f365482aecd10fff8d86c7383",
            "type": "user",
            "status": "ACTIVATED",
            "updated_timestamp": 1551879248
        }
    ],
    "meta": {
        "next_page_payload": {
            "pagination_identifier": "eyJsYXN0RXZhbHVhdGVkS2V5Ijp7InRpZCI6eyJOIjoiMTA4NSJ9LCJ1aWQiOnsiUyI6ImU2NmQ5MjEwLTlmNDctNGJkZi1hYjQ5LTM0ZDVjYTJlZGI5YiJ9fSwicGFnZSI6MiwibGltaXQiOjEwfQ=="
        }
    }
  }
}
```
















# Devices

Devices are the wallet devices that are added by a user. `Devices` API allows you to `register`, `get` and `list` the devices.  

## Device Object

| Attribute  | Description  |
|---|---|
|  **user_id** <br> **String \<uuid v4\>**| uuid of the user in the token economy.  |
|  **address** <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address) | Holds a 20 byte value (size of an Ethereum address) that's the public address of the owner key of  user's Token Holder Contract.  |
|  **linked_address** <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address)  |   |
|  **api\_signer_address** <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address) | Will be used to validate the request coming from client SDK.  |
|  **device_name** <br> **String** | Name that the user has set for its device  |
|  **device_uuid** <br> **String**| device unique identifier set by the deviceOS  |
|   **status** <br> **String**| REGISTERED / AUTHORIZING / AUTHORIZED / REVOKING / REVOKED / RECOVERING / ABORTING. <br> `REGISTERED`: Default status when a partner company associates a user-id with a device <br>`AUTHORIZING `: Status when a user authorizes its device using its MultiSig contract and the transaction on blockchain for it is still in progress. <br>`AUTHORIZED `: Status when the authorization transaction on blockchain is complete.<br>`REVOKING `: Status when a user revokes its device using its MultiSig contract and the transaction on blockchain for it is still in progress. <br>`REVOKED `: Status when the revoke transaction on blockchain is complete. <br> `RECOVERING`: Status when device is being recovered. <br> `ABORTING`: Status when recovery is being aborted. |
|   **updated_timestamp** <br> **EPOCH \<time\>**| Last update timestamp.   |


## Register Devices

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$deviceService = $ostObj->services->devices;

$createParams = array();
$createParams['user_id'] = '5ff57c15-f54f-45fe-acf5-6c6fbfdf815a';
$createParams['address'] = '0x2Ea365269A3e6c8fa492eca9A531BFaC8bA1649C';
$createParams['api_signer_address'] = '0x5F860598383868e8E8Ee0ffC5ADD92369Db37455';
$createParams['device_uuid'] = '593a967f-87bd-49a6-976c-52edf46c4df4';
$createParams['device_name'] = 'Iphone S';
$response = $deviceService->create($createParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

To register a new device for a user you need to do a POST request to `https://api.ost.com/testnet/v2/users/{user-id}/devices` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}/devices` (Production environment) will create a device.

<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **address** <br> **Required**   | Device address |
| **api_signer_address** <br> **Required**   | Device API signer address, so that subsequent requests from the device can be authorized by OST server. This address is generated by wallet SDK when the device keys are created.  |
| **device_name** <br> **Required**   | Device name. |
| **device_uuid** <br> **Required**   | Unique identifier (uuid) for the device.  |

<u>**Returns**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `users`.<br><br>

The value of `data.result_type` property will be `users` and list of users will be available under `data.users` property. The example response is given on the right hand side. 

> Register Device - Example Response

```json
{
  "success": true,
  "data": {
    "result_type": "device",
    "device": {
      "user_id": "5ff57c15-f54f-45fe-acf5-6c6fbfdf815a",
      "address": "0x2ea365269a3e6c8fa492eca9a531bfac8ba1649c",
      "linked_address": null,
      "api_signer_address": "0x5f860598383868e8e8ee0ffc5add92369db37455",
      "device_name": "Iphone S",
      "device_uuid": "593a967f-87bd-49a6-976c-52edf46c4df4",
      "status": "REGISTERED",
      "updated_timestamp": 1552291023
    }
  }
}

```


## Get a Device

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);
$deviceService = $ostObj->services->devices;

$getParams = array();
$getParams['user_id'] = '5ff57c15-f54f-45fe-acf5-6c6fbfdf815a';
$getParams['device_address'] = '0x2ea365269a3e6c8fa492eca9a531bfac8ba1649c';
$response = $deviceService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

To get a device you need device address that will be passed in the URL. A GET request to `https://api.ost.com/testnet/v2/users/{user-id}/devices/{device-address}` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}/devices/{device-address}` (Production environment) will return the device object.

<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **address** <br> **Required**   | Device address |

<u>**Returns**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `device`.<br><br>

The value of `data.result_type` property will be `device` and device object will be available under `data.device` property. The example response is given on the right hand side. 

> Get Device - Example Response

```json
{
  "success": true,
  "data": {
    "result_type": "device",
    "device": {
      "user_id": "5ff57c15-f54f-45fe-acf5-6c6fbfdf815a",
      "address": "0x2ea365269a3e6c8fa492eca9a531bfac8ba1649c",
      "linked_address": null,
      "api_signer_address": "0x5f860598383868e8e8ee0ffc5add92369db37455",
      "device_name": "Iphone S",
      "device_uuid": "593a967f-87bd-49a6-976c-52edf46c4df4",
      "status": "REGISTERED",
      "updated_timestamp": 1552291023
    }
  }
}

```


## List all Devices

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);
$deviceService = $ostObj->services->devices;

$getParams = array();
$getParams['user_id'] = '5ff57c15-f54f-45fe-acf5-6c6fbfdf815a';

// This will list all the devices of the above user. 
$response = $deviceService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

A GET call to `https://api.ost.com/testnet/v2/users/{user-id}/devices` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}/devices` (Production environment) will return a list of devices of a user. The devices are sorted by creation date, with the most recently registered devices appearing first.


<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **Addresses** <br> **Optional**   | List of device addresses to be retrieved. Max 25 devices addresses can be passed.  |
| **Limit** <br> **Optional**   |  Limit on the number of devices to be returned. Max limit is 25. Limit is ignored when device addresses are passed. **Default value of limit is 10**   |

<u>**Returns**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 3 child properties `result_type`, `devices` and `meta`.<br><br>

The value of `data.result_type` property will be `devices` and list of devices will be available under `data.devices` property. The pagination data will be available under `data.meta` property. The example response is given on the right hand side. 

> List all Devices - Example Response

```json
{
  "success": true,
  "data": {
    "result_type": "devices",
    "devices": [
      {
        "user_id": "5ff57c15-f54f-45fe-acf5-6c6fbfdf815a",
        "address": "0x2ea365269a3e6c8fa492eca9a531bfac8ba1649c",
        "linked_address": null,
        "api_signer_address": "0x5f860598383868e8e8ee0ffc5add92369db37455",
        "device_name": "Iphone S",
        "device_uuid": "593a967f-87bd-49a6-976c-52edf46c4df4",
        "status": "REGISTERED",
        "updated_timestamp": 1552291023
      }
    ],
    "meta": {
      "next_page_payload": []
    }
  }
}
```












# Sessions
`Sessions` object holds information about ephemeral keys of the user in an economy. Using `sessions`
API you can `get` and `list` user's sessions. 

## Session Object

| Attribute  | Description  |
|---|---|
|  **user_id** <br> **String \<uuid v4\>** | uuid of the user in the token economy.   |
|  **address** <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address)  | Holds a 20 byte value (size of an Ethereum address). This will be the session key address.   |
|  **expiration_height** <br> **Integer** | Expiration block height calculated using approx expiration timestamp.  |
|   **approx\_expiration\_timestamp** <br> **EPOCH \<time\>**| Approximate time at which the session key will expire.  |
|  **spending_limit** <br> **String** |   |
|   **nonce** <br> **Integer**|   |
|  **status** <br> **String**| Status gives us status of session key. It can take one of these values. INITITIALIZING / AUTHORISED / REVOKING / REVOKED <br>  |
|  **updated_timestamp** <br> **EPOCH \<time\>**| Last update timestamp.  |

## Get a User's Session

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$sessionService = $ostObj->services->sessions;

$getParams = array();
$getParams['user_id'] = '10543373-5eb5-4dce-8fac-dff38ba941ba';
$getParams['session_address'] = '0xf531dc2f474ae13b5f45c0fe19f5fb8988c2d0aa';
$response = $sessionService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

To get a user's session you need session `address` that can be passed in the URL. A GET request to `https://api.ost.com/testnet/v2/users/{user-id}/sessions/{address}` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}/sessions/{address}` (Production environment) will return the session object.

<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **address** <br> **Required**   | Session address |

<u>**Returns**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `session`.<br><br>

The value of `data.result_type` property will be `session` and session object will be available under `data.session` property. The example response is given on the right hand side. 

> Get Session - Example Response

```json
{
 "success": true,
 "data": {
   "result_type": "session",
   "session": {
      "user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
      "address": "0xf531dc2f474ae13b5f45c0fe19f5fb8988c2d0aa",
      "expiration_height": 716529,
      "approx_expiration_timestamp": 1553252223,
      "spending_limit": "10000000000000",
      "nonce": 2,
      "status": "AUTHORIZED",
      "updated_timestamp": 1552038943
    }
 }
}
```

## List all Sessions

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$sessionService = $ostObj->services->sessions;

$getParams = array();
$getParams['user_id'] = '10543373-5eb5-4dce-8fac-dff38ba941ba';

$response = $sessionService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

A GET call to `https://api.ost.com/testnet/v2/users/{user-id}/sessions` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}/sessions` (Production environment) will return a list of sessions. The sessions are sorted by creation date, with the most recent sessions appearing first.

<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **Addresses** <br> **Optional**   | List of session addresses to be retrieved. Max 25 session addresses can be passed.  |
| **Limit** <br> **Optional**   |  Limit on the number of sessions to be returned. Max limit is 25. Limit is ignored when session addresses are passed. **Default value of limit is 10**  |

<u>**Returns**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 3 child properties `result_type`, `sessions` and `meta`.<br><br>

The value of `data.result_type` property will be `sessions` and list of sessions will be available under `data.sessions` property. The pagination data will be available under `data.meta` property. The example response is given on the right hand side. 

> List all Sessions of a User - Example Response

```json
{
  "success": true,
  "data": {
      "result_type": "sessions",
      "sessions": [
          {
            "user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
            "address": "0xf531dc2f474ae13b5f45c0fe19f5fb8988c2d0aa",
            "expiration_height": 716529,
            "approx_expiration_timestamp": 1553252140,
            "spending_limit": "10000000000000",
            "nonce": 2,
            "status": "AUTHORIZED",
            "updated_timestamp": 1552038943
          },
          {
            "user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
            "address": "0xe0e34fc1828b3363b507b7b314f62ba74ac1175b",
            "expiration_height": 689792,
            "approx_expiration_timestamp": 1553171929,
            "spending_limit": "1000000000000",
            "nonce": 0,
            "status": "AUTHORIZED",
            "updated_timestamp": 1551958755
          },
          {
            "user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
            "address": "0x9e2b6e125ed05f5c78695095124da8bff16c00f1",
            "expiration_height": 10948394,
            "approx_expiration_timestamp": 1583947735,
            "spending_limit": "10000",
            "nonce": 0,
            "status": "AUTHORIZED",
            "updated_timestamp": 1552066139
          },
          {
            "user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
            "address": "0x760ee642bab9c80b4ed27e437cd6e4515c4764a7",
            "expiration_height": 10948295,
            "approx_expiration_timestamp": 1583947438,
            "spending_limit": "100000",
            "nonce": 1,
            "status": "AUTHORIZED",
            "updated_timestamp": 1552065841
          },
          {
            "user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
            "address": "0x24845e9cd9dde48eaa28c9c2bc7a3c9dc39922c9",
            "expiration_height": 31821558,
            "approx_expiration_timestamp": 1646567227,
            "spending_limit": "123",
            "nonce": 9,
            "status": "AUTHORIZED",
            "updated_timestamp": 1551959229
          }
      ],
      "meta": {
          "next_page_payload": []
      }
  }
}

```











# Transactions
`Transactions` API allows you to do company-to-user transactions. You can also `get` a user's transaction and `list` all user's transaction.



## Transaction Object

| Attribute  | Description  |
|---|---|
| **id** <br> **String \<uuid v4\>** |   |
| **transaction_hash** <br> **String** |   |
|  **from**  <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address) |   |
|  **to** <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address) |   |
|  **nonce** <br> **Integer**|   |
| **value**  <br> **String**|   |
| **gas_price**<br> **String** |   |
| **gas_used** <br> **Integer**|   |
| **transaction_fee** <br> **String** |   |
| **block_confirmation** <br>  **Integer**|   |
| **status**  <br> **String**|   |
| **updated_timestamp** <br>  **EPOCH \<time\>**|   |
| **block_timestamp** <br>  **EPOCH \<time\>** |   |
| **block_number** <br> **Integer** |   |
| **rule_name** <br> **String**|  |
| **transfers** <br>|  |
| **meta_property** <br>|  |


## Execute a transaction


Execute transaction API allows you to do company-to-user transactions, user-to-user transactions will be managed by Wallet SDK. <br> <br>
A POST to `https://api.ost.com/testnet/v2/users/{user-id}/transactions` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}/transactions` (Production environment)  will create a `transaction` object. 
<br>

You can transfer any amount of Branded Tokens to users or you can choose a fiat currency like Dollar to do fix the fiat value of transaction then this fixed amount in fiat will be converted into Branded tokens needed to be transfered. More details are provided in input parameters below.

<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **to** <br> **Required**   | Rule address |
| **raw_calldata** <br> **Required** <br> <span class="child-table-toggle" data-target="transaction-row-calldata">Show child attributes</span>  | Device API signer address, so that subsequent requests from the device can be authorized by OST server.   |
| **meta_property** <br> **Required** <br> <span class="child-table-toggle" data-target="transaction-meta-property">Show child attributes</span>  | Device API signer address, so that subsequent requests from the device can be authorized by OST server.   |

<table id="transaction-row-calldata" style="display:none;">
  <tr class="transaction-row-calldata child-row" >
    <td>
      <strong>method</strong> 
      <br> 
      <strong>Required</strong>
    </td>

    <td>
      Method can take one of the two possibe values:<br>
      1. <code>directTransfer</code>: Value should be <code>directTransfer</code> if you want to do transfers in Branded Token as a currency.<br>
      2. <code>pay</code>: Value should be <code>pay</code>  if you want to do transfers in any fiat currency. The transfer happens in Branded Token but here the value of Branded Token to be transfered is derived by converting the fiat into Branded Token.
    </td>
  </tr>

  <tr class="transaction-row-calldata child-row" >
    <td>
      <strong>parameters</strong>
      <br> 
      <strong>Required</strong>
    </td>

    <td>
      
    </td>
  </tr>
</table>

<table id="transaction-meta-property" style="display:none;">
  <tr class="transaction-meta-property child-row" >
    <td>
      <strong>name</strong> 
      <br> 
      <strong>Required</strong>
    </td>

    <td>
      You can name the transaction. For ex: 'download' or 'story-submit'.
    </td>
  </tr>

  <tr class="transaction-meta-property child-row" >
    <td>
      <strong>type</strong>
      <br> 
      <strong>Required</strong>
    </td>

    <td>
      This value will be "company-to-user". 
    </td>
  </tr>

  <tr class="transaction-meta-property child-row" >
    <td>
      <strong>details</strong>
      <br> 
      <strong>Optional</strong>
    </td>

    <td>
      Extra field to add additional details about transaction.
    </td>
  </tr>
</table>

<u>**Returns**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `transaction`.<br><br>

The value of `data.result_type` property will be `transaction` and transaction object will be available under `data.transaction` property. The example response is given on the right hand side. 

> Execute Transaction - Example Response


```json
{
 "success": true,
 "data": {
   "result_type": "transactions",
      "transactions": [{
             "id": "a90we-23909-sasa...", // UUID V4
             "transaction_hash": "0xksjagjkd...", //TX Hash
             "from": "0x232...", // Address
             "to": "0x232...", // Address
             "nonce": 12, // Integer
             "value": "0", // String in Wei
             "gas_price": "12121212", //String in Wei
             "gas_used": 1212121212, //Integer
             "transaction_fee": "12121212", //String in wei
             "status": "CREATED/SUBMITTED/MINED/SUCCESS/FAILED", //String
             "updated_timestamp": 1212121212, //Timestamp
             "block_timestamp": 12123434334, //Timestamp
             "block_number": 234, //Integer
             "rule_name": "...", //String
              "transfers": [
                  {
                     "from": "0x12..", // Address
                     "from_user_id": "a90we-23909-sasa...", // UUID V4
                     "to": "0x12..", // Address
                     "to_user_id": "a90we-23909-sasa...", // UUID V4
                     "amount": "2323232323", // String in Wei
                     "kind": "credit/transfer"
                  }
             ],
             "meta_property" : {
                    "name":  "transaction_name" , //like, download
                    "type":  "user_to_user", // user_to_user, company_to_user, user_to_company
                    "details" : "" // memo field to add additional info about the transaction
             }
       }],
     "meta": {
        "total_no" : 200, //Integer
        "next_page_payload": {
             "pagination_identifier": "sqSSsWkdsfk...." //String (contains filters available in first page request)
         }
     }
 }
}

```



## Get a transaction details

To get a transaction, you need transaction's `id` that will be passed in the URL. A GET request to `https://api.ost.com/testnet/v2/users/{user-id}/transactions/{transaction-id}` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}/transactions/{transaction-id}` (Production environment)  will return the `transaction` object. 


<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **transactions's id** <br> **Required** | Identifier of the transaction to be retrieved  |


<u>**Returns**</u><br>
This call will return a hash if the valid `id` was provided. The example of response is given on the right hand side.

> Get Transaction - Example Response

```json
{
 "success": true,
 "data": {
   "result_type": "transactions",
      "transactions": [{
             "id": "a90we-23909-sasa...", // UUID V4
             "transaction_hash": "0xksjagjkd...", //TX Hash
             "from": "0x232...", // Address
             "to": "0x232...", // Address
             "nonce": 12, // Integer
             "value": "0", // String in Wei
             "gas_price": "12121212", //String in Wei
             "gas_used": 1212121212, //Integer
             "transaction_fee": "12121212", //String in wei
             "status": "CREATED/SUBMITTED/MINED/SUCCESS/FAILED", //String
             "updated_timestamp": 1212121212, //Timestamp
             "block_timestamp": 12123434334, //Timestamp
             "block_number": 234, //Integer
             "rule_name": "...", //String
              "transfers": [
                  {
                     "from": "0x12..", // Address
                     "from_user_id": "a90we-23909-sasa...", // UUID V4
                     "to": "0x12..", // Address
                     "to_user_id": "a90we-23909-sasa...", // UUID V4
                     "amount": "2323232323", // String in Wei
                     "kind": "credit/transfer"
                  }
             ],
             "meta_property" : {
                    "name":  "transaction_name" , //like, download
                    "type":  "user_to_user", // user_to_user, company_to_user, user_to_company
                    "details" : "" // memo field to add additional info about the transaction
             }
       }],
     "meta": {
        "total_no" : 200, //Integer
        "next_page_payload": {
             "pagination_identifier": "sqSSsWkdsfk...." //String (contains filters available in first page request)
         }
     }
 }
}

```


## Get all User's Transactions



A GET call to `https://api.ost.com/testnet/v2/users/{user-id}/transactions` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}/transactions` (Production environment) will return a list of transactions of a user. The transactions are sorted by creation date, with the most recent transactions appearing first.


<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **ids** <br> **Optional**   | List of transaction id's to be retrieved. Max 25 ids can be passed.  |
| **Limit** <br> **Optional**   |  Limit on the number of transactions to be returned. Max limit is 25. Limit is ignored when transaction ids are passed. **Default value of limit is 10**  |

<u>**Returns**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 3 child properties `result_type`, `transactions` and `meta`.<br><br>

The value of `data.result_type` property will be `transactions` and list of transactions will be available under `data.transactions` property. The pagination data will be available under `data.meta` property. The example response is given on the right hand side. 

> List all Transactions - Example Response

```json
{
 "success": true,
 "data": {
   "result_type": "transactions",
      "transactions": [{
             "id": "a90we-23909-sasa...", // UUID V4
             "transaction_hash": "0xksjagjkd...", //TX Hash
             "from": "0x232...", // Address
             "to": "0x232...", // Address
             "nonce": 12, // Integer
             "value": "0", // String in Wei
             "gas_price": "12121212", //String in Wei
             "gas_used": 1212121212, //Integer
             "transaction_fee": "12121212", //String in wei
             "status": "CREATED/SUBMITTED/MINED/SUCCESS/FAILED", //String
             "updated_timestamp": 1212121212, //Timestamp
             "block_timestamp": 12123434334, //Timestamp
             "block_number": 234, //Integer
             "rule_name": "...", //String
              "transfers": [
                  {
                     "from": "0x12..", // Address
                     "from_user_id": "a90we-23909-sasa...", // UUID V4
                     "to": "0x12..", // Address
                     "to_user_id": "a90we-23909-sasa...", // UUID V4
                     "amount": "2323232323", // String in Wei
                     "kind": "credit/transfer"
                  }
             ],
             "meta_property" : {
                    "name":  "transaction_name" , //like, download
                    "type":  "user_to_user", // user_to_user, company_to_user, user_to_company
                    "details" : "" // memo field to add additional info about the transaction
             }
       }],
     "meta": {
        "total_no" : 200, //Integer
        "next_page_payload": {
             "pagination_identifier": "sqSSsWkdsfk...." //String (contains filters available in first page request)
         }
     }
 }
}

```












# Tokens

Tokens object contains details about economy and various contract addresses. One economy will have only one `tokens` object. This object is created during economy setup in dashboard so using API you can only make a `GET` request.

## Token Object


| Attribute  | Description  |
|---|---|
| **id** <br> **Integer**  | Unique identifier for an economy.  |
| **name** <br> **String** | Name of the economy set by administrator |
| **symbol** <br> **String** | Symbol of Branded Token economy.  |
| **conversion_factor** <br> **Float**  | Ratio of OST: Branded Token  |
| **total_supply** <br> **String** | Total supply of Branded Tokens  |
| **origin_chain** <br> **Hash** <br> <span class="child-table-toggle" data-target="token-origin-chain">Show child attributes</span>|   |
| **auxiliary_chain** <br> **Hash** <br> <span class="child-table-toggle" data-target="token-auxiliary-chain">Show child attributes</span> |   |
| **updated_timestamp** <br> **EPOCH \<time\>**| Last update timestamp.  |


<table id="token-origin-chain" style="display:none;">
  <tr class="token-origin-chain child-row" >
    <td>
      <strong>chain_id</strong> 
      <br> 
      <strong>Integer</strong>
    </td>

    <td>

    </td>
  </tr>

  <tr class="token-origin-chain child-row" >
    <td>
      <strong>branded_token</strong>
      <br> 
      <strong>String</strong> <a href="https://solidity.readthedocs.io/en/v0.4.24/types.html#address"><strong>&lt;Address&gt;</strong></a>
    </td>

    <td>
      
    </td>
  </tr>


  <tr class="token-origin-chain child-row" >
    <td>
      <strong>organization</strong>
      <br> 
      <strong>Hash</strong>
    </td>

    <td>
      
    </td>
  </tr>


  <tr class="token-origin-chain child-row" >
    <td>
      <strong>stakers</strong>
      <br> 
      <strong>Array</strong>
    </td>

    <td>
      
    </td>
  </tr>

  
</table>

<table id="token-auxiliary-chain" style="display:none;">
  <tr class="token-auxiliary-chain child-row" >
    <td>
      <strong>chain_id</strong> 
      <br> 
      <strong>Integer</strong>
    </td>

    <td>
     
    </td>
  </tr>

  <tr class="token-auxiliary-chain child-row" >
    <td>
      <strong>utility_branded_token</strong>
      <br> 
      <strong>String</strong> <a href="https://solidity.readthedocs.io/en/v0.4.24/types.html#address"><strong>&lt;Address&gt;</strong></a>
    </td>

    <td>
      
    </td>
  </tr>

  <tr class="token-auxiliary-chain child-row" >
    <td>
      <strong>company_token_holders</strong>
      <br> 
      <strong>Array</strong> 
    </td>

    <td>
      
    </td>
  </tr>

  <tr class="token-auxiliary-chain child-row" >
    <td>
      <strong>organization</strong>
      <br> 
      <strong>Hash</strong> 
    </td>

    <td>
      
    </td>
  </tr>

</table>


## Get Token

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$tokenService = $ostObj->services->tokens;

$getParams = array();
$response = $tokenService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);


?>
```

A GET request to `https://api.ost.com/testnet/v2/tokens` (Sandbox environment) or `https://api.ost.com/mainnet/v2/tokens` (Production environment) will return the token object.


<u>**Input Parameters**</u>

No input params needed to get `token` object.


<u>**Returns**</u><br>

This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `token`.<br><br>

The value of `data.result_type` property will be `token` and token object will be available under `data.token` property. The example response is given on the right hand side. 


> Get Token - Example Response

```json
{
  "success": true,
  "data": {
      "result_type": "token",
      "token": {
          "id": 1085,
          "name": "OSTD",
          "symbol": "OSTD",
          "conversion_factor": 1,
          "total_supply": "20000000000000000000000",
          "decimals": 18,
          "origin_chain": {
              "chain_id": 3,
              "branded_token": "0xd31756555d3a28c990c39fb85087e41afc09ff7a",
              "organization": {
                  "contract": "0x0a886e74747f5fed2db45c53df5e0c7b2bacc3d7",
                  "owner": "0xaa541c16d8bd7f61c2c0ec31f30b481d435bd5c1"
              },
              "stakers": [
                  "0xaa541c16d8bd7f61c2c0ec31f30b481d435bd5c1"
              ]
          },
          "auxiliary_chains": [
              {
                  "chain_id": 199,
                  "utility_branded_token": "0xdd7df6a4ec6a0c2edd051da875ab9a32e9567869",
                  "company_token_holders": [
                      "0xa9632350057c2226c5a10418b1c3bc9acdf7e2ee"
                  ],
                  "organization": {
                      "contract": "0x5e0c62d0f3f286461ef70e1a01e26bc766107912",
                      "owner": "0xaa541c16d8bd7f61c2c0ec31f30b481d435bd5c1"
                  }
              }
          ],
          "updated_timestamp": 1551870482
      }
  }
}

```










# Balance

## Balance Object

| Attribute  | Description  |
|---|---|
| **user_id** <br> **String \<uuid v4\>** |   |
| **total_balance** <br> **String**|   |
| **available_balance** <br> **String** |   |
| **unsettled_debit** <br> **String** |   |
| **updated_timestamp** <br> **EPOCH \<time\>**| Last update timestamp.  |


## Get users balance

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$balanceService = $ostObj->services->balances;

$getParams = array();
$getParams['user_id'] = '10543373-5eb5-4dce-8fac-dff38ba941ba';
$response = $balanceService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

A GET request to `https://api.ost.com/testnet/v2/users/{user-id}/balance` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}/balance` (Production environment) will return the balance object.


<u>**Input Parameters**</u>

No input params needed to get `balance` object.


<u>**Returns**</u><br>

This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `balance`.<br><br>

The value of `data.result_type` property will be `balance` and balance object will be available under `data.balance` property. The example response is given on the right hand side. 

> Get Balance - Example Response

```json
{
  "success": true,
  "data": {
    "result_type": "balance",
    "balance": {
      "user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
      "total_balance": "2100001999999999954",
      "available_balance": "2100001999999999954",
      "unsettled_debit": "0",
      "updated_timestamp": 1552302438
    }
  }
}

```










# Recovery Owner

## Recovery Owner Object

| Attribute  | Description  |
|---|---|
| **user_id**  <br> **String \<uuid v4\>** | uuid of the user in the token economy.  |
| **address**  <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address) | Recovery contract address.  |
| **status** <br> **String** | Status can be one of the following values: <br> AUTHORIZATION_FAILED / AUTHORIZING / AUTHORIZED / REVOKING/REVOKED  |
| **updated_timestamp** <br> **EPOCH \<time\>**| Last update timestamp.  |


## Get recovery owner

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$recoveryOwnersService = $ostObj->services->recoveryOwners;

$getParams = array();
$getParams['user_id'] = 'd194aa75-acd5-4f40-b3fb-e73a7cf7c0d9';
$response = $recoveryOwnersService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```


A GET request to `https://api.ost.com/testnet/v2/users/{user-id}/recovery-owners/{recovery-owner-address}` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}/recovery-owners/{recovery-owner-address}` (Production environment) will return the recovery owner object.

<u>**Input Parameters**</u>

No input params needed to get `recovery owner` object.


<u>**Returns**</u><br>

This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `recovery_owner`.<br><br>

The value of `data.result_type` property will be `recovery_owner` and recovery_owner object will be available under `data.recovery_owner` property. The example response is given on the right hand side. 

> Get Recovery Owner - Example Response

```json
{
   "success": true,
   "data": {
     "result_type": "recovery_owner",
     "recovery_owner": {
        "user_id": "{user_id}", //UUID V4
        "address": "0x...", //Address
        "status": "AUTHORIZATION_FAILED/AUTHORIZING/AUTHORIZED/REVOKING/REVOKED", //String
        "updated_timestamp": "12344.." //Timestamp
    }
  } 
}

```






# Rules 

## Rules Object

| Attribute  | Description  |
|---|---|
|  **id** <br> **Integer**| Integer identifier of the rule |
| **token_id**  <br> **Integer** | Token id is the unique identifier for your branded token.  |
| **name** <br> **String** | Name of the rule  |
| **address** <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address)  | Holds a 20 byte value (size of an Ethereum address). This will be the rule address.   |
|  **abi** <br> **String** | A stringified JSON string which will need parsing. This string has rule contract abi (Application Binary Interface).  |
|  **updated_timestamp** <br> **EPOCH \<time\>**| Last update timestamp.  |

## List all Rules

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$rulesService = $ostObj->services->rules;

$getParams = array();
$response = $rulesService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```


A GET request to `https://api.ost.com/testnet/v2/rules` (Sandbox environment) or `https://api.ost.com/mainnet/v2/rules` (Production environment) will return all the available rules. Right now this will return 2 rules.

<u>**Input Parameters**</u>

No input params needed to get list of `rules`.


<u>**Returns**</u><br>

This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `rules`.<br><br>

The value of `data.result_type` property will be `rules` and rules array will be available under `data.rules` property. The example response is given on the right hand side. 

> List all Rules - Example Response

```json
{
  "success":true,
  "data":{
    "result_type":"rules",
    "rules":[
      {
        "id":1,
        "token_id":1085,
        "name":"Pricer",
        "address":"0x1a83bc05cc3ae1b19f2359d847e2589d9d91fb90",
        "abi":[
          {
            "constant":true,
            "inputs":[
              {
                "name":"",
                "type":"bytes3"
              }
            ],
            "name":"baseCurrencyPriceAcceptanceMargins",
            "outputs":[
              {
                "name":"",
                "type":"uint256"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[

            ],
            "name":"organization",
            "outputs":[
              {
                "name":"",
                "type":"address"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[

            ],
            "name":"eip20Token",
            "outputs":[
              {
                "name":"",
                "type":"address"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[
              {
                "name":"",
                "type":"bytes3"
              }
            ],
            "name":"baseCurrencyPriceOracles",
            "outputs":[
              {
                "name":"",
                "type":"address"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[

            ],
            "name":"conversionRateFromBaseCurrencyToToken",
            "outputs":[
              {
                "name":"",
                "type":"uint256"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[

            ],
            "name":"tokenRules",
            "outputs":[
              {
                "name":"",
                "type":"address"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[

            ],
            "name":"requiredPriceOracleDecimals",
            "outputs":[
              {
                "name":"",
                "type":"uint8"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[

            ],
            "name":"conversionRateDecimalsFromBaseCurrencyToToken",
            "outputs":[
              {
                "name":"",
                "type":"uint256"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[

            ],
            "name":"baseCurrencyCode",
            "outputs":[
              {
                "name":"",
                "type":"bytes3"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "inputs":[
              {
                "name":"_organization",
                "type":"address"
              },
              {
                "name":"_eip20Token",
                "type":"address"
              },
              {
                "name":"_baseCurrencyCode",
                "type":"bytes3"
              },
              {
                "name":"_conversionRate",
                "type":"uint256"
              },
              {
                "name":"_conversionRateDecimals",
                "type":"uint8"
              },
              {
                "name":"_requiredPriceOracleDecimals",
                "type":"uint8"
              },
              {
                "name":"_tokenRules",
                "type":"address"
              }
            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"constructor"
          },
          {
            "anonymous":false,
            "inputs":[
              {
                "indexed":false,
                "name":"_priceOracle",
                "type":"address"
              }
            ],
            "name":"PriceOracleAdded",
            "type":"event"
          },
          {
            "anonymous":false,
            "inputs":[
              {
                "indexed":false,
                "name":"_priceOracle",
                "type":"address"
              }
            ],
            "name":"PriceOracleRemoved",
            "type":"event"
          },
          {
            "anonymous":false,
            "inputs":[
              {
                "indexed":false,
                "name":"_quoteCurrencyCode",
                "type":"bytes3"
              },
              {
                "indexed":false,
                "name":"_acceptanceMargin",
                "type":"uint256"
              }
            ],
            "name":"AcceptanceMarginSet",
            "type":"event"
          },
          {
            "anonymous":false,
            "inputs":[
              {
                "indexed":false,
                "name":"_quoteCurrencyCode",
                "type":"bytes3"
              }
            ],
            "name":"AcceptanceMarginRemoved",
            "type":"event"
          },
          {
            "constant":false,
            "inputs":[
              {
                "name":"_from",
                "type":"address"
              },
              {
                "name":"_toList",
                "type":"address[]"
              },
              {
                "name":"_amountList",
                "type":"uint256[]"
              },
              {
                "name":"_payCurrencyCode",
                "type":"bytes3"
              },
              {
                "name":"_baseCurrencyIntendedPrice",
                "type":"uint256"
              }
            ],
            "name":"pay",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          },
          {
            "constant":false,
            "inputs":[
              {
                "name":"_priceOracle",
                "type":"address"
              }
            ],
            "name":"addPriceOracle",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          },
          {
            "constant":false,
            "inputs":[
              {
                "name":"_payCurrencyCode",
                "type":"bytes3"
              }
            ],
            "name":"removePriceOracle",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          },
          {
            "constant":false,
            "inputs":[
              {
                "name":"_payCurrencyCode",
                "type":"bytes3"
              },
              {
                "name":"_acceptanceMargin",
                "type":"uint256"
              }
            ],
            "name":"setAcceptanceMargin",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          },
          {
            "constant":false,
            "inputs":[
              {
                "name":"_payCurrencyCode",
                "type":"bytes3"
              }
            ],
            "name":"removeAcceptanceMargin",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          }
        ],
        "updated_timestamp":1551870435
      },
      {
        "id":2,
        "token_id":1085,
        "name":"Direct Transfer",
        "address":"0x64315ba1018307d6bc0380fa8eb8af210991ccbc",
        "abi":[
          {
            "constant":true,
            "inputs":[
              {
                "name":"",
                "type":"uint256"
              }
            ],
            "name":"rules",
            "outputs":[
              {
                "name":"ruleName",
                "type":"string"
              },
              {
                "name":"ruleAddress",
                "type":"address"
              },
              {
                "name":"ruleAbi",
                "type":"string"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[
              {
                "name":"",
                "type":"bytes32"
              }
            ],
            "name":"rulesByNameHash",
            "outputs":[
              {
                "name":"index",
                "type":"uint256"
              },
              {
                "name":"exists",
                "type":"bool"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[

            ],
            "name":"organization",
            "outputs":[
              {
                "name":"",
                "type":"address"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[
              {
                "name":"",
                "type":"address"
              }
            ],
            "name":"allowedTransfers",
            "outputs":[
              {
                "name":"",
                "type":"bool"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[

            ],
            "name":"areDirectTransfersEnabled",
            "outputs":[
              {
                "name":"",
                "type":"bool"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[
              {
                "name":"",
                "type":"address"
              }
            ],
            "name":"rulesByAddress",
            "outputs":[
              {
                "name":"index",
                "type":"uint256"
              },
              {
                "name":"exists",
                "type":"bool"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "constant":true,
            "inputs":[

            ],
            "name":"token",
            "outputs":[
              {
                "name":"",
                "type":"address"
              }
            ],
            "payable":false,
            "stateMutability":"view",
            "type":"function"
          },
          {
            "inputs":[
              {
                "name":"_organization",
                "type":"address"
              },
              {
                "name":"_token",
                "type":"address"
              }
            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"constructor"
          },
          {
            "anonymous":false,
            "inputs":[
              {
                "indexed":false,
                "name":"_ruleName",
                "type":"string"
              },
              {
                "indexed":false,
                "name":"_ruleAddress",
                "type":"address"
              }
            ],
            "name":"RuleRegistered",
            "type":"event"
          },
          {
            "constant":false,
            "inputs":[
              {
                "name":"_ruleName",
                "type":"string"
              },
              {
                "name":"_ruleAddress",
                "type":"address"
              },
              {
                "name":"_ruleAbi",
                "type":"string"
              }
            ],
            "name":"registerRule",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          },
          {
            "constant":false,
            "inputs":[

            ],
            "name":"allowTransfers",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          },
          {
            "constant":false,
            "inputs":[

            ],
            "name":"disallowTransfers",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          },
          {
            "constant":false,
            "inputs":[
              {
                "name":"_from",
                "type":"address"
              },
              {
                "name":"_transfersTo",
                "type":"address[]"
              },
              {
                "name":"_transfersAmount",
                "type":"uint256[]"
              }
            ],
            "name":"executeTransfers",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          },
          {
            "constant":false,
            "inputs":[

            ],
            "name":"enableDirectTransfers",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          },
          {
            "constant":false,
            "inputs":[

            ],
            "name":"disableDirectTransfers",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          },
          {
            "constant":false,
            "inputs":[
              {
                "name":"_transfersTo",
                "type":"address[]"
              },
              {
                "name":"_transfersAmount",
                "type":"uint256[]"
              }
            ],
            "name":"directTransfers",
            "outputs":[

            ],
            "payable":false,
            "stateMutability":"nonpayable",
            "type":"function"
          }
        ],
        "updated_timestamp":1551870362
      }
    ]
  }
}
```












# Price Point


## Price Point Object

| Attribute  | Description  |
|---|---|
| **OST** <br> **Hash** <br> <span class="child-table-toggle" data-target="price-point-ost">Show child attributes</span> |   |


<table id="price-point-ost" style="display:none;">
  <tr class="price-point-ost child-row" >
    <td>
      <strong>USD</strong> 
      <br> 
      <strong>Float</strong>
    </td>

    <td>
     
    </td>
  </tr>

  <tr class="price-point-ost child-row" >
    <td>
      <strong>updated_timestamp</strong> 
      <br> 
      <strong>EPOCH &lt;time&gt;</strong>
    </td>

    <td>
      Last update timestamp.
    </td>
  </tr>

</table>



## Get price point information

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$pricePointsService = $ostObj->services->pricePoints;

$getParams = array();
$getParams['chain_id'] = "199";
$response = $pricePointsService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

A GET request to `https://api.ost.com/testnet/v2/chains/{chain_id}/price-points` (Sandbox environment) or `https://api.ost.com/mainnet/v2/chains/{chain_id}/price-points` (Production environment) will return the price point object.

<u>**Input Parameters**</u>

| Parameter  |  Description  |
|---|---|
| **chain_id** <br> **Required** | Chain Identifier for your auxiliary chain on which your token is setup. |



<u>**Returns**</u><br>

This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `price_point`.<br><br>

The value of `data.result_type` property will be `price_point` and price point object will be available under `data.price_point` property. The example response is given on the right hand side. 

> Get Price Point - Example Response

```json
{
    "success": true,
    "data": {
        "result_type": "price_point",
        "price_point": {
            "OST": {
                "USD": 0.025231,
                "decimals": 18,
                "updated_timestamp": 1552352460
            }
        }
    }
}

```














# Chains

## Chain Object

| Attribute  | Description  |
|---|---|
|  **id** <br> **Integer**| Unique identifier for chain  |
| **type**  <br> **String**| Type can take one of the two values:<br> 1. `Origin`: Chain on ethereum blockchain<br>2.`Auxiliary`: Chain on private blockchain   |
| **block_height**  <br> **Integer** | Current block height  |
|  **block_time** <br> **Integer** |   |
| **updated_timestamp** <br> **EPOCH \<time\>**| Last update timestamp.  |


## Get chain information

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$chainsService = $ostObj->services->chains;

$getParams = array();
$getParams['chain_id'] = '3';
$response = $chainsService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

A GET request to `https://api.ost.com/testnet/v2/chains/{chain_id}/` (Sandbox environment) or `https://api.ost.com/mainnet/v2/chains/{chain_id}/` (Production environment) will return the chain object.

<u>**Input Parameters**</u>

| Parameter  |  Description  |
|---|---|
| **chain_id** <br> **Required** | Chain Identifier for your auxiliary chain on which your token is setup. |



<u>**Returns**</u><br>

This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `chain`.<br><br>

The value of `data.result_type` property will be `chain` and chain object will be available under `data.chain` property. The example response is given on the right hand side. 

> Get Chain Information - Example Response

```json
{
    "success": true,
    "data": {
        "result_type": "chain",
        "chain": {
            "id": 3,
            "type": "Origin",
            "block_height": 5186119,
            "block_time": 15,
            "updated_timestamp": 1552354245
        }
    }
}


```








# Device Manager

Device manager is an object which stores information about multi-signature contract.


## Device manager Object

| Attribute  | Description  |
|---|---|
| **user_id** <br> **String \<uuid v4\>** | User id of the `user` to which this device manager belongs.  |
|  **address** <br> **String** \<[**Address**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address)\>  | Holds a 20 byte value (size of an Ethereum address). This will be the address for multi-signature contract.   |
|  **requirement** <br> **Integer** | Requirement for multi-sig transactions   |
|  **nonce** <br> **Integer** |   |
|  **status** <br> **String** | The status of device manager.   |
| **updated_timestamp** <br> **EPOCH \<time\>**| Last update timestamp.  |



## Get device manager

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$deviceManagersService = $ostObj->services->deviceManagers;

$getParams = array();
$getParams['user_id'] = 'fd836794-96fe-4841-a486-f3d2966d3ac8';
$response = $deviceManagersService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```


A GET request to `https://api.ost.com/testnet/v2/users/{user-id}/device-managers/` (Sandbox environment) or `https://api.ost.com/mainnet/v2/users/{user-id}/device-managers/` (Production environment) will return the device manager object.

<u>**Input Parameters**</u>

| Parameter  |  Description  |
|---|---|
| **user_id** <br> **Required** |  uuid of the user in the token economy. |



<u>**Returns**</u><br>

This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `device_manager`.<br><br>

The value of `data.result_type` property will be `device_manager` and device manager object will be available under `data.device_manager` property. The example response is given on the right hand side. 

> Get Device Manager Information - Example Response

```json
{
    "success": true,
    "data": {
        "result_type": "device_manager",
        "device_manager": {
            "user_id": "fd836794-96fe-4841-a486-f3d2966d3ac8",
            "address": "0xa86701116f6dccbb6b7e7c1fa7e815ef444fd0ca",
            "requirement": 1,
            "nonce": 0,
            "status": "ACTIVATED",
            "updated_timestamp": 1552354981
        }
    }
}

```