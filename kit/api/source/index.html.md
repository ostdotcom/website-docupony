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
## Error codes
## Versioning


# Users
`Users` object allows you to retrieve all the contract addresses associated with it. This API allows you to create, get, list and get the salt of the user. Below you can find details about `Users` object.


| Attributes  | Description  |
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
For api calls to `/users` the `data.result_type` will be the string "user" and the key `data.user` will be the newaly created user object. The user object will have an identifier `id`. This `id` will be used to get any user specific details like `devices`, etc. <br>

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

To get a user, you need user's `id` that will be passed in the URL. A GET request to `https://kit.ost.com/testnet/v2/users/{id}` (Sandbox environment) or `https://kit.ost.com/mainnet/v2/users/{id}` (Production environment)  will return the `user` object. 


<u>**Input Parameters**</u>

| Parameter  | Mandatory  | Description  |
|---|---|---|
| **user's id** <br> **String \<uuid v4\>**   | Yes  | Identifier of the user to be retrieved  |


<u>**Returns**</u><br>
This call will return a JSON object if the valid `id` was provided. The example of response is given on the right hand side.

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

## Get salt














# Devices

| Attributes  | Description  |
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










# Sessions

| Attributes  | Description  |
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



# Transactions

| Attributes  | Description  |
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


## Execute a transaction from company

## Get a transaction details

## Get all Transactions for a user





# Tokens

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


# Balance


| Attributes  | Description  |
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



# Recovery

| Attributes  | Description  |
|---|---|
| **user_id**  <br> **String \<uuid v4\>** | uuid of the user in the token economy.  |
| **address**  <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address) | Recovery contract address.  |
| **status** <br> **String** | Status can be one of the following values: <br> AUTHORIZATION_FAILED / AUTHORIZING / AUTHORIZED / REVOKING/REVOKED  |
| **updated_timestamp** <br> **EPOCH \<time\>**| Last update timestamp.  |


## Get recovery Owner










# Rules 

| Attributes  | Description  |
|---|---|
|  **id** <br> **Integer**| Integer identifier of the rule |
| **token_id**  <br> **Integer** | Token id is the unique identifier for your branded token.  |
| **name** <br> **String** | Name of the rule  |
| **address** <br> **String** [**\<Address\>**](https://solidity.readthedocs.io/en/v0.4.24/types.html#address)  | Holds a 20 byte value (size of an Ethereum address). This will be the rule address.   |
|  **abi** <br> **String** | A stringified JSON string which will need parsing. This string has rule contract abi (Application Binary Interface).  |
|  **updated_timestamp** <br> **EPOCH \<time\>**| Last update timestamp.  |

## List all Rules





# Price Point



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
$response = $pricePointsService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

# Chains


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






# Device Manager



## Get device manager