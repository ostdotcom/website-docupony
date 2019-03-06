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
## Authentication
## Staging environment
## Production environment
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
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

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

A POST to `https://kit.ost.com/testnet/v2/users` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users` (Production environment)  will create a `user` object. 

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
        "id": "d9c97f83-85d5-46b5-a4fb-c73011cbd803", //UUID v4
        "token_id": 1234, //Integer
        "token_holder_address": "0xd9c97f83...", // Address
        "device_manager_address": "0xc73011cbd803...", //Address
        "recovery_address": "0xc73011cbd803...",    // RECOVERY Contract address
        "recovery_owner_address": "0xc73011cbd803...",    // RECOVERY Owner address
        "type": "company/user", //String
        "status": "CREATED", //String
        "updated_timestamp": 1234121212 //Timestamp
     }
 }
}
```

## Get a User


```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$userService = $ostObj->services->users;

$getParams = array();
$getParams['user_id'] = '6e4bfe87-*****'; // replace this with your user's id
$response = $userService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

To get a user, you need user's `id` that will be passed in the URL. A GET request to `https://kit.ost.com/testnet/v2/users/{user-id}` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}` (Production environment)  will return the `user` object. 


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
        "id": "d9c97f83-85d5-46b5-a4fb-c73011cbd803", //UUID v4
        "token_id": 1234, //Integer
        "token_holder_address": "0xd9c97f83...", // Address
        "device_manager_address": "0xc73011cbd803...", //Address
        "recovery_address": "0xc73011cbd803...",    // RECOVERY Contract address
        "recovery_owner_address": "0xc73011cbd803...",    // RECOVERY Owner address
        "type": "company/user", //String
        "status": "CREATED", //String
        "updated_timestamp": 1234121212 //Timestamp
     }
 }
}
```


## List all Users

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$userService = $ostObj->services->users;

$getParams = array();

// Uncomment the below code to allow filtering based on the user id's
//$getParams['ids'] = array('91263ebd-****', '91263jgw-****');  // add your user id's
$response = $userService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);
?>
```

A GET call to `https://kit.ost.com/testnet/v2/users` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users` (Production environment) will return a list of users. The users are sorted by creation date, with the most recent users appearing first.


<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **ids** <br> **Optional**   | List of user id's to be retrieved. Max 25 ids can be passed.  |
| **Limit** <br> **Optional**   |  Limit on the number of users to be returned. Max limit is 25. Limit is ignored when user ids are passed.   |

<u>**Returns**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 3 child properties `result_type`, `users` and `meta`.<br><br>

The value of `data.result_type` property will be `users` and list of users will be available under `data.users` property. The pagination data will be available under `data.meta` property. The example response is given on the right hand side. 

> List all Users - Example Response

```json
{
 "success": true,
 "data": {
   "result_type": "users",
   "users": [{
        "id": "d9c97f83-85d5-46b5-a4fb-c73011cbd803", //UUID v4
        "token_id": 1234, //Integer
        "token_holder_address": "0xd9c97f83...", //Address
        "device_manager_address": "0xc73011cbd803...", //Address
        "recovery_address": "0xd9c97f83...",    // RECOVERY Contract
        "recovery_owner_address": "0xd9c97f83...",    // RECOVERY Owner
        "type": "company/user", //String
        "status": "CREATED/ACTIVATING/ACTIVATED", //String
        "updated_timestamp": 12342343434 //Timestamp
     }],
   "meta": {
        "next_page_payload": {
             "pagination_identifier": "sqSSsWkdsfk....", //String (contains filters available in first page request)
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
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);
$deviceService = $ostObj->services->devices;

$createParams = array();
$createParams['user_id'] = '90aee630-2e7c-4fff-91cc-229bc9007ffc';
$createParams['address'] = '0xbE8b3Fa4133E77e72277aF6b3Ea7BB3750511B88';
$createParams['api_signer_address'] = '0xA9C90F80F96D9b896ae5aC3248b64348984aa7bC';
$createParams['device_uuid'] = '593a967f-87bd-49a6-976c-52edf46c4df4';
$createParams['device_name'] = 'Iphone S';
$response = $deviceService->create($createParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

To register a new device for a user you need to do a POST request to `https://kit.ost.com/testnet/v2/users/{user-id}/devices` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}/devices` (Production environment) will create a device.

<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **address** <br> **Required**   | Device address |
| **api_signer_address** <br> **Required**   | Device API signer address, so that subsequent requests from the device can be authorized by OST server.   |
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
       "user_id": "abcd-kdlk...", //UUID V4
       "address": "0x...", //Address
       "linked_address": "0x0..", //Address
       "api_signer_address": "0x...", //Address
       "device_name": "", //String
       "device_uuid": "", //String
       "status": "REGISTERED", //String
       "updated_timestamp": 1234424434 //Timestamp
   }
 }
}
```


## Get a Device

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);
$deviceService = $ostObj->services->devices;

$getParams = array();
$getParams['user_id'] = 'd194aa75-****';
$getParams['device_address'] = '0x1Ea3652......';
$response = $deviceService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

To get a device you need device address that will be passed in the URL. A GET request to `https://kit.ost.com/testnet/v2/users/{user-id}/devices/{device-address}` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}/devices/{device-address}` (Production environment) will return the device object.

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
       "user_id": "abcd-kdlk...", //UUID V4
       "address": "0x...", //Address
       "linked_address": "0x0..", //Address
       "api_signer_address": "0x...", //Address
       "device_name": "", //String
       "device_uuid": "", //String
       "status": "REGISTERED", //String
       "updated_timestamp": 1234424434 //Timestamp
   }
 }
}
```


## List all Devices

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);
$deviceService = $ostObj->services->devices;

$getParams = array();
$getParams['user_id'] = 'd194aa75-****';


//$getParams['pagination_identifier'] = 'eyJsYXN0RXZhbHVhdG.................';


//$getParams['addresses'] = array("0x5906ae******","0xab248ef66*******");
$response = $deviceService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

A GET call to `https://kit.ost.com/testnet/v2/users/{user-id}/devices` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}/devices` (Production environment) will return a list of devices of a user. The devices are sorted by creation date, with the most recently registered devices appearing first.


<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **Addresses** <br> **Optional**   | List of device addresses to be retrieved. Max 25 devices addresses can be passed.  |
| **Limit** <br> **Optional**   |  Limit on the number of devices to be returned. Max limit is 25. Limit is ignored when device addresses are passed.   |

<u>**Returns**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 3 child properties `result_type`, `devices` and `meta`.<br><br>

The value of `data.result_type` property will be `devices` and list of devices will be available under `data.devices` property. The pagination data will be available under `data.meta` property. The example response is given on the right hand side. 

> List all Devices - Example Response

```json
{
 "success": true,
 "data": {
   "result_type": "devices",
   "devices": [{
       "user_id": "abcd-kdlk...", //UUID V4
       "address": "0x...", //Address
       "linked_address": "0x0..", //Address
       "api_signer_address": "0x...", //Address
       "device_name": "", //String
       "device_uuid": "", //String
       "status": "REGISTERED", //String
       "updated_timestamp": 1234424434 //Timestamp
     }],
   "meta": {
        "next_page_payload": {
             "pagination_identifier": "sqSSsWkdsfk...." //String (contains filter addresses)
         }
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
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$sessionService = $ostObj->services->sessions;

$getParams = array();
$getParams['user_id'] = 'd194aa75-*****';
$getParams['session_address'] = '0x1Ea365269A......';
$response = $sessionService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

To get a user's session you need session `address` that can be passed in the URL. A GET request to `https://kit.ost.com/testnet/v2/users/{user-id}/sessions/{address}` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}/sessions/{address}` (Production environment) will return the session object.

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
        "user_id": "9090-2323-ssds...", //UUID V4
        "address": "0x...", //Address
        "expiration_height": 12344, //Block Number - Integer
        "approx_expiration_timestamp": 1234424434, //Timestamp
        "spending_limit": "1234", //Bignumber Wei - String
        "nonce": 0, //Integer
        "status": "AUTHORISED", //String
        "updated_timestamp": 1234424434 //Timestamp
   }
 }
}
```

## List all Sessions

```php
<?php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$sessionService = $ostObj->services->sessions;

$getParams = array();
$getParams['user_id'] = 'e50e252c-****';


//$getParams['pagination_identifier'] = 'eyJsYXN0..................';


//$getParams['addresses'] = array("0x5906ae*****","0xab248ef66e**********");
$response = $sessionService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

A GET call to `https://kit.ost.com/testnet/v2/users/{user-id}/sessions` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}/sessions` (Production environment) will return a list of sessions. The sessions are sorted by creation date, with the most recent sessions appearing first.

<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **Addresses** <br> **Optional**   | List of session addresses to be retrieved. Max 25 session addresses can be passed.  |
| **Limit** <br> **Optional**   |  Limit on the number of sessions to be returned. Max limit is 25. Limit is ignored when session addresses are passed.   |

<u>**Returns**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 3 child properties `result_type`, `sessions` and `meta`.<br><br>

The value of `data.result_type` property will be `sessions` and list of sessions will be available under `data.sessions` property. The pagination data will be available under `data.meta` property. The example response is given on the right hand side. 

> List all Sessions of a User - Example Response

```json
{
 "success": true,
 "data": {
   "result_type": "sessions",
   "sessions": [{
        "user_id": "9090-2323-ssds...", //UUID V4
        "address": "0x...", //Address
        "expiration_height": 12344, //Block Number - Integer
        "approx_expiration_timestamp": 1234424434, //Timestamp
        "spending_limit": "1234", //Bignumber Wei - String
        "nonce": 0, //Integer
        "status": "INITITIALIZING/AUTHORISED/REVOKING/REVOKED", //String
        "updated_timestamp": 1234424434 //Timestamp
     }],
   "meta": {
        "next_page_payload": {
             "pagination_identifier": "sqSSsWkdsfk...." //String (contains filters available in first page request)
         }
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
A POST to `https://kit.ost.com/testnet/v2/users/{user-id}/transactions` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}/transactions` (Production environment)  will create a `transaction` object. 
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
```


## Get a transaction details

To get a transaction, you need transaction's `id` that will be passed in the URL. A GET request to `https://kit.ost.com/testnet/v2/users/{user-id}/transactions/{transaction-id}` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}/transactions/{transaction-id}` (Production environment)  will return the `transaction` object. 


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



A GET call to `https://kit.ost.com/testnet/v2/users/{user-id}/transactions` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}/transactions` (Production environment) will return a list of transactions of a user. The transactions are sorted by creation date, with the most recent transactions appearing first.


<u>**Input Parameters**</u>

| Parameter  | Description  |
|---|---|
| **ids** <br> **Optional**   | List of transaction id's to be retrieved. Max 25 ids can be passed.  |
| **Limit** <br> **Optional**   |  Limit on the number of transactions to be returned. Max limit is 25. Limit is ignored when transaction ids are passed.   |

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
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

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

A GET request to `https://kit.ost.com/testnet/v2/tokens` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/tokens` (Production environment) will return the token object.


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
   "token":{
        "id": 123, //Integer
        "name": "Simple Token", //String
        "symbol": "ST", //String
        "conversion_factor": 1.00001, //Float
        "total_supply": "1234343434343434341212", //Bignumber in wei
        "origin_chain": {
                "chain_id": 3, //Integer
                "branded_token": "0xACe...", //Address
                "organization": {"contract": "0xACe...", "owner": "0xACe..."}, //Addresses
                "stakers": ["0xACe..."] //Addresses
        },
        "auxiliary_chains": [
            {
                "chain_id": 10000, //Integer
                "utility_branded_token": "0xACe...", //Address
                "company_token_holders": ["0xACe..."], //Addresses
                "organization": {"contract": "0xACe...", "owner": "0xACe..."} //Addresses
            }
        ],
        "updated_timestamp": 12736278623 //Timestamp
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
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$balanceService = $ostObj->services->balances;

$getParams = array();
$getParams['user_id'] = 'd194aa75-****';
$response = $balanceService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

A GET request to `https://kit.ost.com/testnet/v2/users/{user-id}/balance` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}/balance` (Production environment) will return the balance object.


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
        "user_id": "090-230", //UUID V4
        "total_balance": "1234", //balance in wei
        "available_balance": "", //balance in wei
        "unsettled_debit": "", //balance in wei
        "updated_timestamp": 1252435624 //Timestamp
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
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

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


A GET request to `https://kit.ost.com/testnet/v2/users/{user-id}/recovery-owners/{recovery-owner-address}` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}/recovery-owners/{recovery-owner-address}` (Production environment) will return the recovery owner object.

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
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

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


A GET request to `https://kit.ost.com/testnet/v2/rules` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/rules` (Production environment) will return all the available rules. Right now this will return 2 rules.

<u>**Input Parameters**</u>

No input params needed to get list of `rules`.


<u>**Returns**</u><br>

This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `rules`.<br><br>

The value of `data.result_type` property will be `rules` and rules array will be available under `data.rules` property. The example response is given on the right hand side. 

> List all Rules - Example Response

```json
{
  "success": true,
   "data": {
        "result_type": "rules",
        "rules": [
          {
            "id": 123, //Integer
            "token_id": 1234, //Integer
            "name": "ASCKJS", //String
            "address": "0x...", //Address
            "abi": "JSON_STRING_NEEDS_PARSING", //ABI
            "updated_timestamp": 1234424434 //Timestamp
          },

          {
            "id": 345, //Integer
            "token_id": 1234, //Integer
            "name": "ASCKJS", //String
            "address": "0x...", //Address
            "abi": "JSON_STRING_NEEDS_PARSING", //ABI
            "updated_timestamp": 1234424434 //Timestamp
          },

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
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$pricePointsService = $ostObj->services->pricePoints;

$getParams = array();
$getParams['chain_id'] = '****';
$response = $pricePointsService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

A GET request to `https://kit.ost.com/testnet/v2/chains/{chain_id}/price-points` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/chains/{chain_id}/price-points` (Production environment) will return the price point object.

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
               "OST" : {
                   "USD": 0.019548, //Float
                    "update_timestamp": 12345678
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
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$chainsService = $ostObj->services->chains;

$getParams = array();
$getParams['chain_id'] = '****';
$response = $chainsService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

A GET request to `https://kit.ost.com/testnet/v2/chains/{chain_id}/` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/chains/{chain_id}/` (Production environment) will return the chain object.

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
        "id": 1234, //Integer
        "type": "Origin/Auxiliary",
        "block_height": 123434, //Integer   // can be approximate to be documented
        "block_time": 3, // Integer
        "updated_timestamp": 15798982938 //Timestamp
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
$params['apiKey']='API KEY';
$params['apiSecret']='API SECRET';
$params['apiBaseUrl']='API BASE URL';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$deviceManagersService = $ostObj->services->deviceManagers;

$getParams = array();
$getParams['user_id'] = 'd194aa75-acd5-4f40-b3fb-e73a7cf7c0d9';
$response = $deviceManagersService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```


A GET request to `https://kit.ost.com/testnet/v2/users/{user-id}/device-managers/` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{user-id}/device-managers/` (Production environment) will return the device manager object.

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
                "user_id": "9090-2323-ssds...", //UUID V4
                "address": "0x...", //Address
                "requirement": 1, //Integer
                "nonce": 0, //Integer
                "status": "ACTIVATED", //String
                "updated_timestamp": 1234424434 //Timestamp
        }
    }
}
```