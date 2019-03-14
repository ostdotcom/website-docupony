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
1. [PHP SDK](/kit/docs/sdk/getting_started/server_sdk_quickstart_guide/php/)  <br>
2. Ruby SDK   <br>
3. Java SDK  <br>
4. Node.js SDK  <br>


## Access

> Sandbox Environment Base API URL

```json
"https://api.ost.com/testnet/v2/"
```

> Production Environment Base API URL

```json
"https://api.ost.com/mainnet/v2/"
```

### Sandbox Environment
You can signup on [OST KIT](https://kit.ost.com/) to create your account. By default you will land in sandbox mode. You can create an economy in sandbox mode to test the API. <br><br>

Once you have created your token (refer [create token guide](/kit/)) (Change link) to create token, then you can head over to [developers page ](https://ost.com/) (Change link) to get access to API key and API secret.


### Production Environment
A request to enable the production mode can be made after login in to sandbox mode. Our team will reach out to you to check if you are ready to go live. Once our team is done with the check, your account will be moved to production mode. 

A toggle switch will be enabled that can be used to switch back to sandbox mode.



## Authentication
All the server side SDKs will handle authentication for you. You just need to provide your API key and API secret while initializing the Server side SDKs. If you are going to use one of the SDK then you can skip this section.

For other languages you can implement the signature generation by computing the `sha256` digest of the API secret and the query string. The resulting signature must be then included in the request.

Every API request on `https://api.ost.com/testnet/v2/` or `https://api.ost.com/mainnet/v2/` requires hash-based message authentication.

Every request has 4 mandatory parameters that must be included: <br>
- `api_key`, the API key as provided from [<u>developers page</u>](kit.ost.com/testnet/developer) inside OST KIT dashboard.<br>
- `api_request_timestamp`, the current unix timestamp in seconds.<br>
- `api_signature`, the signature as the sha256 digest of the shared API secret and the correctly formatted query string as described below.<br>
- `api_signature_kind`, the value for this parameter should be `OST1-HMAC-SHA256`.
<br>

The request timestamp will be valid for up to 60 seconds.  Your computer clock must therefore be synchronised for authentication to succeed.

The reason for these 4 mandatory parameters in each request is to ensure that the man-in-the-middle cannot change the input params to the request and also so to validate the signature on the server side.


### A. Creating the string to sign.

To generate the signature you must first form the string to sign. This string to sign can be formed by concatenation of the following elements

-  Resource endpoint without trailing slash("/"). Ex: `/users`, `/users/{id}/devices`
-  `api_key`, the API key as provided from [OST KIT](kit.ost.com/testnet/developer)
-  `api_request_timestamp`, the current unix timestamp in seconds.
-  `api_signature_kind`, the value for this parameter should be `OST1-HMAC-SHA256`
-   API parameters.

> Sample String-to-sign :

```js
"/users?api_key=4b66f566d7596e2b733b&api_request_timestamp=1521073147&api_signature_kind=OST1-HMAC-SHA256"
```

**Note:** All the parameters must be alphabetically sorted on the keys. The keys are lower-case, snake case (Ex: `user_id`)  as documented for each API endpoint. Spaces in input values are replaced with plus sign `+`.

### B. Generating a signature

The signature is the sha256 digest of the shared API secret and the correctly formatted query string

SIGNATURE = Hmac_Sha256_Hexdigest(string-to-sign, api-secret)

### C. Final URL

> Sample Final URL

```json
"https://api.ost.com/testnet/v2/users?api_key=4b66f566d7596e2b733b&api_request_timestamp=1521073147&api_signature_kind=OST1-HMAC-SHA256&api_signature=SIGNATURE"
```


Please ensure that the signature is appended in the final URL and it is encoded while making the API request.

## Pagination
OST KIT API v2 supports pagination. All `list` API has extra attributes to support (`meta` attribute) pagination. Response of all `list` API like [list user](/kit/docs/api/#list-all-users), [list device](/kit/docs/api/#list-all-devices) has a common structure. 


To explain pagination we will take example of [list user API](/kit/docs/api/#list-all-users).

### Pagination Example

### List user API call


> Pagination Example: List User Sample code

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

$userService = $ostObj->services->users;

// List users without any filters. This will return 10 users because the default limit is 10.
$getParams = array();
$response = $userService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

On the right hand side, a sample cod eis given to get a list of user. By default the `limit` of entities in 1 page is 10. **Max value of limit is 25**.


**List user API call response:**
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 3 child properties `result_type`, `users` and `meta`.<br><br>

The value of `data.result_type` property will be `users` and list of users will be available under `data.users` property. The pagination data will be available under `data.meta` property. The example response is given on the right hand side.

> Pagination Example: List all user response 



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

### Requesting next page

> Pagination Exmaple: Requesting next page users

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

$userService = $ostObj->services->users;

$getParams = array();

// Requesting next page using the pagination_identifier recieved in last page under `meta` attribute.
$getParams['pagination_identifier'] = 'eyJsYXN0RXZhbHVhdGVkS2V5Ijp7InRpZCI6eyJOIjoiMTA4NSJ9LCJ1aWQiOnsiUyI6ImU2NmQ5MjEwLTlmNDctNGJkZi1hYjQ5LTM0ZDVjYTJlZGI5YiJ9fSwicGFnZSI6MiwibGltaXQiOjEwfQ==';
$response = $userService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

// 

?>
```

Now to request next page, we will use the `pagination_identifier` present in `data.meta.next_page_payload` of response object. Sample code is on the right hand side.


> Pagination Example: List users 2nd page example response

```json
{
    "success": true,
    "data": {
        "result_type": "users",
        "users": [
            {
                "id": "e5f124e1-e171-4d08-9765-21da77be625b",
                "token_id": 1085,
                "token_holder_address": null,
                "device_manager_address": null,
                "recovery_address": null,
                "recovery_owner_address": null,
                "type": "user",
                "status": "CREATED",
                "updated_timestamp": 1552451707
            },
            {
                "id": "e52580d4-9df2-4f9b-a418-e4aebd5d95db",
                "token_id": 1085,
                "token_holder_address": "0x5b15418780e33eab59ed2b977d52f8b304c87893",
                "device_manager_address": "0x7a10cd5b7e9cca7d88b7f84d909c61d1a6339b24",
                "recovery_address": "0xec502f6431e9cfbf61980d825406203a68666b0d",
                "recovery_owner_address": "0x6083b8498006e29211e6150ce3c1176196ec0840",
                "type": "user",
                "status": "ACTIVATED",
                "updated_timestamp": 1552486489
            },
            {
                "id": "e4aee71b-c152-4c6e-bd6a-d547c87730c5",
                "token_id": 1085,
                "token_holder_address": "0x9f0b2cc749b3bfd7fc35bee1a7e7370ccae8405e",
                "device_manager_address": "0x6f181b74123aa169a078d4135b7f66f947dad427",
                "recovery_address": "0x724e83bb8a52a7744f663dcc38f01a1f7bd36b83",
                "recovery_owner_address": "0xba4d884fb0d6a3d938e584154593cf53a5c3f883",
                "type": "user",
                "status": "ACTIVATED",
                "updated_timestamp": 1552392315
            },
            {
                "id": "dfe634c0-e00b-41ce-b2d2-9d7f89575a8e",
                "token_id": 1085,
                "token_holder_address": "0x95192701980c88996bead742ed195034b6bffc42",
                "device_manager_address": "0x9bdb4b337d9ad6b42369bddaff67f6d5f54a3be1",
                "recovery_address": "0x711868d2ad9c02199aa3568118a619bc936bf21f",
                "recovery_owner_address": "0xe1dd14462ae381c30ed7dc2608e5cc7f063e36ad",
                "type": "user",
                "status": "ACTIVATED",
                "updated_timestamp": 1552028211
            },
            {
                "id": "df9917bd-a5ab-41a7-9867-02605816ece3",
                "token_id": 1085,
                "token_holder_address": "0x79414aad96ddbdfb7202f5b626996f8805641f98",
                "device_manager_address": "0xa6cd5936f17a146085540b20d2b7f6ae154ae7af",
                "recovery_address": "0xc5ae6d3ea728924053128c01ea6d498ed289e3b6",
                "recovery_owner_address": "0x734d3f5e8e51c40dd5e166fda7b8329655d49ef6",
                "type": "user",
                "status": "ACTIVATED",
                "updated_timestamp": 1551871595
            },
            {
                "id": "dc2a3554-ec6b-4a90-aa13-4ce243512e60",
                "token_id": 1085,
                "token_holder_address": "0xa8a4849aee244aad079dde66c32f333a8b1cb83c",
                "device_manager_address": "0x66c1ab9f7bd8f8a6365f60e4083a9254fc9cc641",
                "recovery_address": "0xdbca6f5bcfb03310a679e34a46f151a4378ee006",
                "recovery_owner_address": "0x9c9a013bcdcb082205ded160413f10b3d1747d5c",
                "type": "user",
                "status": "ACTIVATED",
                "updated_timestamp": 1551974220
            },
            {
                "id": "dbe569f5-913b-41db-bccb-2566d4ecf7ea",
                "token_id": 1085,
                "token_holder_address": "0xca4bd87323ad55cfac61168b40358fb27005a28b",
                "device_manager_address": "0xf24d09ba5a031ad105d1aca279a0d09dae83f555",
                "recovery_address": "0xbd1ad20e083ffae0814e90fe975e2dc7e4ce5fce",
                "recovery_owner_address": "0x9efc04c7f182cbf9f0e2a3df12d534b1067b5a0a",
                "type": "user",
                "status": "ACTIVATED",
                "updated_timestamp": 1552405647
            },
            {
                "id": "d8d47aef-fbde-41d4-9ed6-d202cf2a31fc",
                "token_id": 1085,
                "token_holder_address": null,
                "device_manager_address": null,
                "recovery_address": null,
                "recovery_owner_address": null,
                "type": "user",
                "status": "CREATED",
                "updated_timestamp": 1551976307
            },
            {
                "id": "cdbea777-2296-4220-a2e2-d35ac22e6d0b",
                "token_id": 1085,
                "token_holder_address": "0x1dad53d2446567fa8cb928af7a0713ea999c8270",
                "device_manager_address": "0xc91286afca54fd3b9675ab6760c2e118ab269669",
                "recovery_address": "0x48084ec9ff53332ec973c749b86d14440aa60d3b",
                "recovery_owner_address": "0x0e49e20ca9dc329d951933b73f09042faa4afadc",
                "type": "user",
                "status": "ACTIVATED",
                "updated_timestamp": 1552401247
            },
            {
                "id": "c9e1bf13-dc31-414a-be01-35b151f9a5e0",
                "token_id": 1085,
                "token_holder_address": "0x5609d8068be61f2122567819f4b46e5bf17c3866",
                "device_manager_address": "0x1294b9d5fbc99d6d3a203d69f6bd192e5945611c",
                "recovery_address": "0x7a8934a1182c9b71e6605f63cf3144fcacd520e2",
                "recovery_owner_address": "0x2450815eb770acff67d92dca12adce91fdbd1003",
                "type": "user",
                "status": "ACTIVATED",
                "updated_timestamp": 1551978377
            }
        ],
        "meta": {
            "next_page_payload": {
                "pagination_identifier": "eyJsYXN0RXZhbHVhdGVkS2V5Ijp7InRpZCI6eyJOIjoiMTA4NSJ9LCJ1aWQiOnsiUyI6ImM5ZTFiZjEzLWRjMzEtNDE0YS1iZTAxLTM1YjE1MWY5YTVlMCJ9fSwicGFnZSI6MywibGltaXQiOjEwfQ=="
            }
        }
    }
}

```


## Versioning

This is version 2 (v2) OST KIT API. Earlier versions have been removed from the platform.







# Users
`Users` API allows you to create, get and list user. Below you can find details about `Users` object.

## User Object

| Attribute  | Description  |
|---|---|
| **id** <br> **String \<uuid v4\>**  | UUID V4  |
| **token_id** <br> **Integer** | Unique integer for the token |
|  **token\_holder\_address** <br> **String**,  [**\<Address\>**](/kit/docs/glossary/#contract-address),<br> **default is null** | This will be the address of [token-holder contract](/kit/docs/wallet/fundamentals/#tokenholder-contracts).|
| **device\_manager\_address** <br> **String** [**\<Address\>**](/kit/docs/glossary/#contract-address), <br> **default is null**   | This will be the address of [device manager contract](/kit/docs/wallet/fundamentals/#device-manager-a-multisig-contract) contract.   |
|  **recovery_address** <br> **String** [**\<Address\>**](/kit/docs/glossary/#contract-address), <br> **default is null**  | This will be the address of recovery contract.  |
| **recovery\_owner\_address** <br> **String** [**\<Address\>**](/kit/docs/glossary/#contract-address), <br> **default is null**  | This will be the recovery owner address.  |
| **type** <br> **String** | `type` string will determine the type of user. It can have two possible values `user` and `company`. <br> `user`: All economy users will be of type `user`<br> `company`: Accounts used by Partner companies will have type `company`   |
| **status** <br> **String**| This will be the user's status.<br> It can have 3 possible string values described below. <br> `CREATED`: This will be the default status when a user is created. At this stage there are no smart contracts deployed on blockchain.  <br> `ACTIVATING`: This will be the user's status when smart contracts for the user are being deployed. <br> `ACTIVATED`: This will be the user's status when all the smart contracts for the user are deployed and user now can now perform the wallet actions.|
| **updated_timestamp** <br> **EPOCH \<time in seconds\>**| Last update timestamp.  |



## Create User

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

$userService = $ostObj->services->users;
$createParams = array();
$response = $userService->create($createParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

#### <span> POST </span> &nbsp; &nbsp; /users

<u>**Input Parameters**</u>

No input params needed to create a user.


<u>**Success Response**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `user`.<br><br>

The value of `data.result_type` property will be `user` and user object will be available under `data.user` property. The example response is given on the right hand side. 

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
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';

// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;

$ostObj = new OSTSdk($params);

$userService = $ostObj->services->users;

$getParams = array();
$getParams['user_id'] = '5ff57c15-f54f-45fe-acf5-6c6fbfdf815a'; // replace this with your user's id
$response = $userService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

#### <span> GET </span> &nbsp; &nbsp; /users/{user_id}

<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |


<u>**Success Response**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `user`.<br><br>

The value of `data.result_type` property will be `user` and user object will be available under `data.user` property. The example response is given on the right hand side.

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
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';

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
#### <span> GET </span> &nbsp; &nbsp; "/users"


<u>**Query Parameters**</u>

| Parameter  | Description  |
|---|---|
| **ids** <br> **Optional**   | List of user id's to be retrieved. Max 25 ids can be passed.  |
| **Limit** <br> **Optional**   |  Limit on the number of users to be returned. Max limit is 25.  **Default value of limit is 10** <br> **Limit is ignored when user ids are passed.**  |

<u>**Success Response**</u><br>
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
|  **address** <br> **String** [**\<Address\>**](/kit/docs/glossary/#contract-address) | This will be the address of the owner key of user's [Token Holder Contract](http://localhost:3000/kit/docs/wallet/fundamentals/#tokenholder-contracts).  |
|  **linked_address** <br> **String** [**\<Address\>**](/kit/docs/glossary/#contract-address), <br> **default is null** | Address that points to the device's address in the device manager contract linked list. This is used during recovery.?  |
|  **api\_signer_address** <br> **String** [**\<Address\>**](/kit/docs/glossary/#contract-address) | Will be used to validate the request coming from client SDK.  |
|  **device_name** <br> **String** | Name that the user has set for its device  |
|  **device_uuid** <br> **String**| device unique identifier set by the deviceOS  |
|   **status** <br> **String**| REGISTERED / AUTHORIZING / AUTHORIZED / REVOKING / REVOKED / RECOVERING / ABORTING. <br> `REGISTERED`: Status when partner company registers device in OST. After this status wallet SDK can start communicating with OST KIT directly. <br>`AUTHORIZING `: Status when device is being authorized in user's device manager contract. <br>`AUTHORIZED `: Status when the authorization is complete.<br>`REVOKING `: Status when device is being revoked from user's device manager contract.<br>`REVOKED `: Status when the device revocation is complete. <br> `RECOVERING`: Status when device is being recovered in user's device manager contract. <br> `ABORTING`: Status when device recovery is being aborted. |
| **updated_timestamp** <br> **EPOCH \<time in seconds\>**| Last update timestamp.   |


## Register Devices

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

#### <span> POST </span> &nbsp; &nbsp; "/users/{user_id}/devices"

<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |

<u>**Body Parameters**</u>

| Parameter  | Description  |
|---|---|
| **address** <br> **Required**   | This device address is generated by wallet SDK when the device keys are created.  |
| **api_signer_address** <br> **Required**   | Device API signer address, so that subsequent requests from the device can be authorized by OST server. This address is generated by wallet SDK when the device keys are created.  |
| **device_name** <br> **Required**   | Device name. |
| **device_uuid** <br> **Required**   | Unique identifier (uuid) for the device.  |

<u>**Success Response**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `device`.<br><br>

The value of `data.result_type` property will be `device` and device object will be available under `data.device` property. The example response is given on the right hand side. 

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
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';

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

#### <span> GET </span> &nbsp; &nbsp; /users/{user_id}/devices/{device_address}




<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |
| **device_address** <br> **Required**   | Device address |

<u>**Success Response**</u><br>
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
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';

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

#### <span> GET </span> &nbsp; &nbsp; /users/{user_id}/devices/


<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |



<u>**Query Parameters**</u>

| Parameter  | Description  |
|---|---|
| **addresses** <br> **Optional**   | List of device addresses to be retrieved. Max 25 devices addresses can be passed.  |
| **limit** <br> **Optional**   |  Limit on the number of devices to be returned. Max limit is 25. **Default value of limit is 10** <br> **Limit is ignored when device addresses are passed.**  |

<u>**Success Response**</u><br>
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
`Sessions` object holds information about ephemeral address of the user in an economy. Using `sessions`
API you can `get` and `list` user's sessions. Sessions are generated by wallet SDK.

## Session Object

| Attribute  | Description  |
|---|---|
|  **user_id** <br> **String \<uuid v4\>** | uuid of the user in the token economy.   |
|  **address** <br> **String** [**\<Address\>**](/kit/docs/glossary/#contract-address)  | This will be the [session key address](http://localhost:3000/kit/docs/wallet/fundamentals/#session-key).   |
|  **expiration_height** <br> **Integer** | Block height when the session address will expire |
|   **approx\_expiration\_timestamp** <br> **EPOCH \<time in seconds\>**, <br> **default is null**| Approximate time at which the session address will expire.  |
|  **spending_limit** <br> **String \<BigInt\>** | Maximum allowed branded token amount in `Wei` that can be transfered in one transaction by this session address. |
|   **nonce** <br> **Integer**,<br> **default is null**| Transaction counter of session address which helps prevents replay attacks.  |
|  **status** <br> **String**| Status gives us status of session key. It can take one of these values. INITITIALIZING / AUTHORIZED / REVOKING / REVOKED <br> INITITIALIZING: Status when the session address is being authorized in user's token holder contract. <br>AUTHORIZED: Status when the authorization is complete <br> REVOKING: Status when the session is beign revoked from token holder contract<br> REVOKED: Status when the session revocation is complete|
|  **updated_timestamp** <br> **EPOCH \<time in seconds\>**| Last update timestamp.  |

## Get a User's Session

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

$sessionService = $ostObj->services->sessions;

$getParams = array();
$getParams['user_id'] = '10543373-5eb5-4dce-8fac-dff38ba941ba';
$getParams['session_address'] = '0xf531dc2f474ae13b5f45c0fe19f5fb8988c2d0aa';
$response = $sessionService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

#### <span> GET </span> &nbsp; &nbsp; /users/{user_id}/sessions/{session_address}

<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |
| **session_address** <br> **Required**   | Session address |


<u>**Success Response**</u><br>
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
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';

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

#### <span> GET </span> &nbsp; &nbsp; /users/{user_id}/sessions


<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |

<u>**Query Parameters**</u>

| Parameter  | Description  |
|---|---|
| **adresses** <br> **Optional**   | List of session addresses to be retrieved. Max 25 session addresses can be passed.  |
| **limit** <br> **Optional**   |  Limit on the number of sessions to be returned. Max limit is 25.  **Default value of limit is 10**. <br> **Limit is ignored when session addresses are passed.** |

<u>**Success Response**</u><br>
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
| **id** <br> **String \<uuid v4\>** | Unique Indentifeir of transaction   |
| **transaction_hash** <br> **String \<tx hash\>**, <br> **default is null** | Hash of the transaction in blockchain  |
|  **from**  <br> **String**,  [**\<Address\>**](/kit/docs/glossary/#contract-address),<br> **default is null** | Sender address of transaction on blockchain.  |
|  **to** <br> **String** [**\<Address\>**](/kit/docs/glossary/#contract-address) |   This will be the token holder address of transaction initiator.|
|  **nonce** <br> **Integer**, <br> **default is null**| Transaction counter of sender address which helps prevents replay attacks.  |
| **value**  <br> **String \<BigInt\>**, <br> **default is null**| Transfered OST amount in `Wei`   |
| **gas_price**<br> **String \<BigInt\>** | The wei per unit of gas provided by the sender in wei.   |
| **gas_used** <br> **Integer**, <br> **default is null**| Gas used by this transaction  |
| **transaction_fee** <br> **String \<BigInt\>**, <br> **default is null** | This is calculated by multiplying `gas_price` and `gas_used` (gas_price * gas_used) in `Wei`  |
| **block_confirmation** <br>  **Integer**, <br> **default is null**| Number of blocks mined after the transaction was mined  |
| **status**  <br> **String**| Status can take one of the following values: <br> CREATED / SUBMITTED / MINED / SUCCESS / FAILED <br> `CREATED`: Transaction is accepted by OST KIT.<br> `SUBMITTED`: Transaction is submitted on blockchain. <br> `MINED`: Transaction is successful but waiting for 6 block confirmation. At this stage transaction is not be visible in the ledger of `to` address of `transfers`.<br>`SUCCESS`: Transaction succeeded<br>`FAILED`: Transaction failed. |
| **updated_timestamp** <br>  **EPOCH \<time in seconds\>**| Last update timestamp.   |
| **block_timestamp** <br>  **EPOCH \<time in seconds\>**, <br> **default is null** | Timestamp when the block was collated  |
| **block_number** <br> **Integer** , <br> **default is null**| Block number in which the transaction was present.  |
| **rule_name** <br> **String**, <br> **default is null**| Name of the rule which is to be executed.  |
| **transfers** <br> **Array** <br> <span class="child-table-toggle" data-target="transaction-transfers">Show child attributes</span>| Array of transfer details object |
| **meta_property** <br> **Hash** <br> <span class="child-table-toggle" data-target="transaction-meta-property-1">Show child attributes</span>| Extra information about the transfer.   |


<table id="transaction-transfers" style="display:none;">
  <tr class="transaction-transfers child-row" >
    <td>
      <strong>From</strong> 
      <br> 
      <strong>String</strong> <a href="/kit/docs/glossary/#contract-address"><strong>&lt;Address&gt;</strong></a>
    </td>

    <td>
     Branded token sender's address.
    </td>

  </tr>

  <tr class="transaction-transfers child-row" >
    <td>
      <strong>from_user_id</strong>
      <br> 
      <strong>String 	&lt;uuid v4&gt;</strong>
      , <br> <strong>default is null</strong>
    </td>

    <td>
    user <code>User id</code> of <code>from</code> address if the user is known.
    </td>
  </tr>

  <tr class="transaction-transfers child-row" >
    <td>
      <strong>to </strong>
      <br> 
      <strong>String</strong> <a href="/kit/docs/glossary/#contract-address"><strong>&lt;Address&gt;</strong></a>
    </td>

    <td>
    Branded token receiver address
    </td>
  </tr>

  <tr class="transaction-transfers child-row" >
    <td>
      <strong>to_user_id</strong>
      <br> 
      <strong>String 	&lt;uuid v4&gt;</strong>
      , <br> <strong>default is null</strong>
    </td>

    <td>
     user <code>User id</code> of <code>to</code> address if the user is known.
    </td>
  </tr>

  <tr class="transaction-transfers child-row" >
    <td>
      <strong>amount</strong>
      <br> 
      <strong>String &lt;BigInt&gt; </strong> 
    </td>

    <td>
    Branded token amount transferred in Wei
    </td>
  </tr>

  <tr class="transaction-transfers child-row" >
    <td>
      <strong>kind</strong>
      <br> 
      <strong>String</strong>
    </td>

    <td>
    The value for this will be <code>transfer</code>
    </td>
  </tr>

</table>


<table id="transaction-meta-property-1" style="display:none;">
  <tr class="transaction-meta-property-1 child-row" >
    <td>
      <strong>name</strong> 
      <br> 
      <strong>String</strong>
      
      
    </td>

    <td>
      Name for the transaction. Only numbers, alphabets, spaces, "-" and "_" are allowed.<br> <strong>Max length is 25 characters</strong> .
    </td>

  </tr>

  <tr class="transaction-meta-property-1 child-row" >
    <td>
      <strong>type</strong>
      <br> 
      <strong>String</strong>
    </td>

    <td>
    String representing the type of transaction. It can have one of the following value: 
    <code>user_to_user</code>, <code>company_to_user</code> and <code>user_to_company</code>.
    </td>
  </tr>

  <tr class="transaction-meta-property-1 child-row" >
    <td>
      <strong>details</strong>
      <br> 
      <strong>String</strong>
    </td>

    <td>
    String value having some extra information about transaction. <br> <strong>Max length is 120 characters</strong> .
    </td>
  </tr>
</table>


## Execute a transaction

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

$transactionService = $ostObj->services->transactions;

$executeParams = array();


// Direct Branded Token Transfer 
$executeParams['user_id'] = '724ed66c-8a0a-477e-b303-b0486e2a3797';
$executeParams['to'] = '0x64315ba1018307d6bc0380fa8eb8af210991ccbc';
$rawCallData = array();
$transferTo = array("0xc3B9B4A5c1997D73cd8d9D0fb95AA945e68e0496");
$transferAmount = array("10");
$rawCallData['method'] = 'directTransfers';
$rawCallData['parameters'] = array($transferTo, $transferAmount);
$metaPropererty['details']='this is test';
$metaPropererty['type']='company_to_user';
$metaPropererty['name']='download_download_';
$executeParams['meta_property']=$metaPropererty;
$executeParams['raw_calldata'] = json_encode($rawCallData);
$response = $transactionService->execute($executeParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);


// Branded Token Transfer Based On Fiat Value. We will take an example of USD as fiat value.
$transactionService = $ostObj->services->transactions;
$executeParams = array();
$executeParams['user_id'] = '724ed66c-8a0a-477e-b303-b0486e2a3797';
$executeParams['to'] = '0x1a83bc05cc3ae1b19f2359d847e2589d9d91fb90';
$rawCallData = array();
$transferTo = array("0xE0b6B80d7f1f492410C53c10f279051Ec5B836a2");
$transferAmount = array("1000000000000000000");
$rawCallData['method'] = 'pay';
$tokenHolderAddress = '0xa9632350057c2226c5a10418b1c3bc9acdf7e2ee';
$payCurrencyCode = 'USD';
$ostToUsdInWei = '1000000000000';
$rawCallData['parameters'] = array($tokenHolderAddress, $transferTo, $transferAmount, $payCurrencyCode, $ostToUsdInWei);
$executeParams['raw_calldata'] = json_encode($rawCallData);
echo json_encode($executeParams, JSON_PRETTY_PRINT);
$response = $transactionService->execute($executeParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);



?>
```

#### <span> POST </span> &nbsp; &nbsp; /users/{user_id}/transactions


Execute transaction API allows you to do `company-to-user` transactions. `user-to-user` and `user-to-company` transactions will be managed by Wallet SDK. <br>

**Types of company-to-user transactions:**
[Rules contract](/kit/docs/wallet/fundamentals/#rules-contract) for both the types of transactions are different.


1. Transfering amount in branded tokens (`directTransfer`) : In this type of `company-to-user` transaction the amount of branded token set by partner company server will be transfered directly to the receiver user. 


2. Transfering branded token by fixing the fiat currency value (`pay`): In this type of `company-to-user` transaction the amount of fiat passed will first be converted into branded token. After this conversion the transfer will for converted branded token amount.


<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |

<u>**Body Parameters**</u>

| Parameter  | Description  |
|---|---|
| **to** <br> **Required**   | Rule address |
| **raw_calldata** <br> **Required** <br> <span class="child-table-toggle" data-target="transaction-row-calldata">Show child attributes</span>  | Parameters required for rule execution |
| **meta_property** <br> **Required** <br> <span class="child-table-toggle" data-target="transaction-meta-property-2">Show child attributes</span>  | Extra information about the transfer.  |

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
    Array of parameters to be sent to the method. <br> [['0xasd..', '0xasas..'], ['121212', '232323']].
    </td>
  </tr>
</table>

<table id="transaction-meta-property-2" style="display:none;">
  <tr class="transaction-meta-property-2 child-row" >
    <td>
      <strong>name</strong> 
      <br> 
      <strong>String</strong>
      
      
    </td>

    <td>
      Name for the transaction. Only numbers, alphabets, spaces, "-" and "_" are allowed.<br> <strong>Max length is 25 characters</strong> .
    </td>
  </tr>

  <tr class="transaction-meta-property-2 child-row" >
    <td>
      <strong>type</strong>
      <br> 
      <strong>String</strong>
    </td>

    <td>
      String representing the type of transaction. It can have one of the following value: 
      <code>user_to_user</code>, <code>company_to_user</code> and <code>user_to_company</code>.
    </td>
  </tr>

  <tr class="transaction-meta-property-2 child-row" >
     <td>
      <strong>details</strong>
      <br> 
      <strong>String</strong>
    </td>

    <td>
    String value having some extra information about transaction. <br> <strong>Max length is 120 characters</strong> .
    </td>
  </tr>
</table>

<u>**Success Response**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 2 child properties `result_type` and `transaction`.<br><br>

The value of `data.result_type` property will be `transaction` and transaction object will be available under `data.transaction` property. The example response is given on the right hand side. 

> directTransfer Execute Transaction - Example Response

```json
{
  "success":true,
  "data":{
    "result_type":"transaction",
    "transaction":{
      "id":"e2c6cba9-ef2a-4da2-8a23-f6b3421a938c",
      "transaction_hash":null,
      "from":null,
      "to":"0xa9632350057c2226c5a10418b1c3bc9acdf7e2ee",
      "nonce":null,
      "value":null,
      "gas_price":"1000000000",
      "gas_used":null,
      "transaction_fee":null,
      "block_confirmation":null,
      "status":"CREATED",
      "updated_timestamp":1552536269,
      "block_timestamp":null,
      "block_number":null,
      "rule_name":null,
      "meta_property":{
        "name":"download_download_",
        "type":"company_to_user",
        "details":"this is test"
      },
      "transfers":[
        {
          "from":"0xa9632350057c2226c5a10418b1c3bc9acdf7e2ee",
          "from_user_id":"724ed66c-8a0a-477e-b303-b0486e2a3797",
          "to":"0xc3b9b4a5c1997d73cd8d9d0fb95aa945e68e0496",
          "to_user_id":"9e847ac4-1bd8-498f-b601-51a56bbca076",
          "kind":"transfer"
        }
      ]
    }
  }
}
```


> pay Execute Transaction  - Example response

```json
{
  "success":true,
  "data":{
    "result_type":"transaction",
    "transaction":{
      "id":"217f8731-0215-4fb6-85b0-a37bb40e0c3d",
      "transaction_hash":null,
      "from":null,
      "to":"0xa9632350057c2226c5a10418b1c3bc9acdf7e2ee",
      "nonce":null,
      "value":null,
      "gas_price":"1000000000",
      "gas_used":null,
      "transaction_fee":null,
      "block_confirmation":null,
      "status":"CREATED",
      "updated_timestamp":1552502121,
      "block_timestamp":null,
      "block_number":null,
      "rule_name":null,
      "meta_property":[

      ],
      "transfers":[
        {
          "from":"0xa9632350057c2226c5a10418b1c3bc9acdf7e2ee",
          "from_user_id":"724ed66c-8a0a-477e-b303-b0486e2a3797",
          "to":"0xe0b6b80d7f1f492410c53c10f279051ec5b836a2",
          "to_user_id":"80fad9b8-d25c-45d9-a6a8-38ca4f6ece5d",
          "kind":"transfer"
        }
      ]
    }
  }
}
```

## Get a transaction details


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


$transactionService = $ostObj->services->transactions;


$getParams = array();
$getParams['user_id'] = '724ed66c-8a0a-477e-b303-b0486e2a3797';
$getParams['transaction_id'] = 'c03dde62-5baa-417d-8e64-8cd94dc950e9';
$response = $transactionService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);


?>
```

#### <span> GET </span> &nbsp; &nbsp; /users/{user_id}/transactions/{transaction_id}



<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |
| **transaction_id** <br> **Required**   | Unique Identifier of the transaction to be retrieved  |



<u>**Success Response**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 3 child properties `result_type`, `transaction`.<br><br>

The value of `data.result_type` property will be `transaction` and transaction object will be available under `data.transaction` property. The pagination data will be available under `data.meta` property. The example response is given on the right hand side. 

> Get Transaction - Example Response

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


$transactionService = $ostObj->services->transactions;


$getParams = array();
$getParams['user_id'] = '724ed66c-8a0a-477e-b303-b0486e2a3797';
$getParams['transaction_id'] = 'c03dde62-5baa-417d-8e64-8cd94dc950e9';
$response = $transactionService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);


?>
```

```json
{
  "success":true,
  "data":{
    "result_type":"transaction",
    "transaction":{
      "id":"c03dde62-5baa-417d-8e64-8cd94dc950e9",
      "transaction_hash":"0x635e685f0c7d0c376c181ae277937b222bd2d0f4f06500975713ee32a5300429",
      "from":"0x27b071bd8d486bf54e13a449127f2625b8da96b6",
      "to":"0xa9632350057c2226c5a10418b1c3bc9acdf7e2ee",
      "nonce":261,
      "value":"0",
      "gas_price":"1000000000",
      "gas_used":109931,
      "transaction_fee":"109931000000000",
      "block_confirmation":77940,
      "status":"SUCCESS",
      "updated_timestamp":1552302936,
      "block_timestamp":1552302935,
      "block_number":400120,
      "rule_name":"Direct Transfer",
      "meta_property":{
        "name":"test name",
        "type":"user_to_user",
        "details":"verifying meta property"
      },
      "transfers":[
        {
          "from":"0xa9632350057c2226c5a10418b1c3bc9acdf7e2ee",
          "from_user_id":"724ed66c-8a0a-477e-b303-b0486e2a3797",
          "to":"0xa7261667e6ec6768f6309c7d907dcad7acf0bafa",
          "to_user_id":"8caa6412-ab11-41d6-8177-2928e948a9a8",
          "amount":"5",
          "kind":"transfer"
        }
      ]
    }
  }
}
```

## Get all User's Transactions

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

$transactionService = $ostObj->services->transactions;

$getParams = array();
$getParams['user_id'] = '10543373-5eb5-4dce-8fac-dff38ba941ba';
$getParams['limit']='2';
//$getParams['status']=array('FAILED');
//$getParams['pagination_identifier'] = 'eyJmcm9tIjoyLCJsaW1pdCI6MSwibWV0YV9wcm9wZXJ0eSI6W10sInN0YXR1cyI6WyJGQUlMRUQiXX0=';
$response = $transactionService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);


?>
```

#### <span> GET </span> &nbsp; &nbsp; /users/{user_id}/transactions/


<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |

<u>**Query Parameters**</u>

| Parameter  | Description  |
|---|---|
| **meta_property** <br> **Optional**   | List of meta properties. |
| **status** <br> **Optional**   | List of status values. |
| **limit** <br> **Optional**   |  Limit on the number of transactions to be returned. Max limit is 25.  **Default value of limit is 10**. <br> **Limit is ignored when transaction ids are passed.**  |

<u>**Success Response**</u><br>
This call will return a hash with 2 properties `success` and `data`. If valid inputs were provided then value of success attribute will be `true`. The `data` property will have 3 child properties `result_type`, `transactions` and `meta`.<br><br>

The value of `data.result_type` property will be `transactions` and list of transactions will be available under `data.transactions` property. The pagination data will be available under `data.meta` property. The example response is given on the right hand side. 

> List all Transactions - Example Response

```json
{
  "success": true,
  "data": {
    "result_type": "transactions",
    "transactions": [
      {
        "id": "5247144a-5773-4aa8-95df-e50900744e89",
        "transaction_hash": "0xcb66cfeb819c7516a1599eee05b482b47360b85849d725fec65f3bcb19069673",
        "from": "0x27b071bd8d486bf54e13a449127f2625b8da96b6",
        "to": "0xb72adba79137132f59e8f75cf9e471088771e1bd",
        "nonce": 87,
        "value": "0",
        "gas_price": "1000000000",
        "gas_used": 171526,
        "transaction_fee": "171526000000000",
        "block_confirmation": 175101,
        "status": "SUCCESS",
        "updated_timestamp": 1551977293,
        "block_timestamp": 1551977290,
        "block_number": 291588,
        "rule_name": "Direct Transfer",
        "meta_property": [],
        "transfers": [
          {
            "from": "0xb72adba79137132f59e8f75cf9e471088771e1bd",
            "from_user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
            "to": "0xa8a4849aee244aad079dde66c32f333a8b1cb83c",
            "to_user_id": "dc2a3554-ec6b-4a90-aa13-4ce243512e60",
            "amount": "1",
            "kind": "transfer"
          },
          {
            "from": "0xb72adba79137132f59e8f75cf9e471088771e1bd",
            "from_user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
            "to": "0xccb16ddecf1f1d9630d41403727262f21a2f78d4",
            "to_user_id": "11b928e7-12c6-47f6-9892-ac1beb375e29",
            "amount": "1",
            "kind": "transfer"
          },
          {
            "from": "0xb72adba79137132f59e8f75cf9e471088771e1bd",
            "from_user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
            "to": "0xe41663ed79b7ba0bcb79a7314277cb53d3833467",
            "to_user_id": "9ea4ae81-c866-44b4-afb4-2c9ca7081bd7",
            "amount": "1",
            "kind": "transfer"
          }
        ]
      },
      {
        "id": "fdad6521-2ae1-4e71-b955-f33f426e6755",
        "transaction_hash": "0x9c63556c8daf9affdcb25c762ce652df5cd929b244b63aa300689f3a5d86de5b",
        "from": "0x27b071bd8d486bf54e13a449127f2625b8da96b6",
        "to": "0xb72adba79137132f59e8f75cf9e471088771e1bd",
        "nonce": 85,
        "value": "0",
        "gas_price": "1000000000",
        "gas_used": 148228,
        "transaction_fee": "148228000000000",
        "block_confirmation": 176048,
        "status": "SUCCESS",
        "updated_timestamp": 1551974451,
        "block_timestamp": 1551974449,
        "block_number": 290641,
        "rule_name": "Direct Transfer",
        "meta_property": [],
        "transfers": [
          {
            "from": "0xb72adba79137132f59e8f75cf9e471088771e1bd",
            "from_user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
            "to": "0xccb16ddecf1f1d9630d41403727262f21a2f78d4",
            "to_user_id": "11b928e7-12c6-47f6-9892-ac1beb375e29",
            "amount": "1",
            "kind": "transfer"
          },
          {
            "from": "0xb72adba79137132f59e8f75cf9e471088771e1bd",
            "from_user_id": "10543373-5eb5-4dce-8fac-dff38ba941ba",
            "to": "0x8b31c35d65b15ff7b0e2f625d136051f5cc7f69c",
            "to_user_id": "96814662-ae0b-461d-a85f-73a8c4706769",
            "amount": "3",
            "kind": "transfer"
          }
        ]
      }
    ],
    "meta": {
      "next_page_payload": {
        "pagination_identifier": "eyJmcm9tIjoyLCJsaW1pdCI6MiwibWV0YV9wcm9wZXJ0eSI6W10sInN0YXR1cyI6W119"
      },
      "total_no": 22
    }
  }
}
```











# Tokens

Tokens object contains details about economy and various contract addresses. One economy will have only one `tokens` object. This object is created during economy setup in dashboard so using API you can only make a `GET` request.

## Token Object


| Attribute  | Description  |
|---|---|
| **id** <br> **Integer**  | Unique identifier of token.  |
| **name** <br> **String** | Token name |
| **symbol** <br> **String** | Token symbol |
| **conversion_factor** <br> **Float**  | Number of Branded token in one OST.  |
| **total_supply** <br> **String \<BigInt\>** | Total supply of Branded Tokens  |
| **decimals** <br> **Integer** | `10^decimals` branded token wei makes one Branded Token  |
| **origin_chains** <br> **Hash** <br> <span class="child-table-toggle" data-target="token-origin-chain">Show child attributes</span>| Origin chain details  |
| **auxiliary_chain** <br> **Array** <br> <span class="child-table-toggle" data-target="token-auxiliary-chain">Show child attributes</span> | List of auxiliary chain details  |
| **updated_timestamp** <br> **EPOCH \<time in seconds\>**| Last update timestamp.  |


<table id="token-origin-chain" style="display:none;">
  <tr class="token-origin-chain child-row" >
    <td>
      <strong>chain_id</strong> 
      <br> 
      <strong>Integer</strong>
    </td>

    <td>
    Unique identifier for origin chain. For ethereum it is 1, for ropsten it is 3.

    </td>
  </tr>

  <tr class="token-origin-chain child-row" >
    <td>
      <strong>branded_token</strong>
      <br> 
      <strong>String</strong> <a href="/kit/docs/glossary/#contract-address"><strong>&lt;Address&gt;</strong></a>
    </td>

    <td>
      Branded token contract address on origin chain 
    </td>
  </tr>


  <tr class="token-origin-chain child-row" >
    <td>
      <strong>organization</strong>
      <br> 
      <strong>Hash</strong>

      <br> <span class="child-table-toggle" data-target="origin-org">Show child attributes</span>
    </td>

    <td>
      Branded token organisation contract details
    </td>
  </tr>


  <tr class="token-origin-chain child-row" >
    <td>
      <strong>stakers</strong>
      <br> 
      <strong>Array</strong>
    </td>

    <td>
      List of addresses that can stake and mint branded tokens.
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
     Unique identifier for auxiliary chain
    </td>
  </tr>

  <tr class="token-auxiliary-chain child-row" >
    <td>
      <strong>utility_branded_token</strong>
      <br> 
      <strong>String</strong> <a href="/kit/docs/glossary/#contract-address"><strong>&lt;Address&gt;</strong></a>
    </td>

    <td>
      Uitility branded token contract address on auxiliary chain.
    </td>
  </tr>

  <tr class="token-auxiliary-chain child-row" >
    <td>
      <strong>company_token_holders</strong>
      <br> 
      <strong>Array</strong> 
    </td>

    <td>
      Company token holder addresses.
    </td>
  </tr>

  <tr class="token-auxiliary-chain child-row" >
    <td>
      <strong>organization</strong>
      <br> 
      <strong>Hash</strong> 
    </td>

    <td>
      Utility Branded token organisation contract details
    </td>
  </tr>

</table>


<table id="origin-org" style="display:none;">
  <tr class="origin-org child-row" >
    <td>
      <strong>name</strong> 
      <br> 
      <strong>String</strong>
      
      
    </td>

    <td>
      Name for the transaction. Only numbers, alphabets, spaces, "-" and "_" are allowed.<br> <strong>Max length is 25 characters</strong> .
    </td>
  </tr>

  <tr class="origin-org child-row" >
    <td>
      <strong>type</strong>
      <br> 
      <strong>String</strong>
    </td>

    <td>
      String representing the type of transaction. It can have one of the following value: 
      <code>user_to_user</code>, <code>company_to_user</code> and <code>user_to_company</code>.
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
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';

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

#### <span> GET </span> &nbsp; &nbsp; /tokens

<u>**Input Parameters**</u>

No input params needed to get `token` object.


<u>**Success Response**</u><br>

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
| **user_id**  <br> **String \<uuid v4\>** | uuid of the user in the token economy.  |
| **total_balance** <br> **String**| Setteled branded token balance on blockchain.  |
| **available_balance** <br> **String** | Total branded token balance - unsettled balance  |
| **unsettled_debit** <br> **String** | Unsettled branded token balance. When the transaction is initiated branded token sender's balance gets pessimistically debited. When transaction is either is successful or failed, usettled debits are settled.   |
| **updated_timestamp** <br> **EPOCH \<time in seconds\>**| Last update timestamp.  |


## Get users balance

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

$balanceService = $ostObj->services->balances;

$getParams = array();
$getParams['user_id'] = '10543373-5eb5-4dce-8fac-dff38ba941ba';
$response = $balanceService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```
#### <span> GET </span> &nbsp; &nbsp; /users/{user_id}/balance


<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |



<u>**Success Response**</u><br>

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
| **address**  <br> **String** [**\<Address\>**](/kit/docs/glossary/#contract-address) | Recovery contract address.  |
| **status** <br> **String** | Status can be one of the following values: <br> AUTHORIZATION_FAILED / AUTHORIZING / AUTHORIZED / REVOKING/REVOKED  |
| **updated_timestamp** <br> **EPOCH \<time in seconds\>**| Last update timestamp.  |


## Get recovery owner

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

$recoveryOwnersService = $ostObj->services->recoveryOwners;

$getParams = array();
$getParams['user_id'] = 'd194aa75-acd5-4f40-b3fb-e73a7cf7c0d9';
$response = $recoveryOwnersService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

#### <span>GET</span> &nbsp; &nbsp; /users/{user_id}/recovery-owners/{recovery_owner_address}

<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |
| **recovery_owner_address** <br> **Required**   | recovery contract owner's public address. This will be the token holder contract address of the user ? **confirm**. |


<u>**Success Response**</u><br>

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
| **address** <br> **String** [**\<Address\>**](/kit/docs/glossary/#contract-address)  | Holds a 20 byte value (size of an Ethereum address). This will be the rule address.   |
|  **abi** <br> **String** | A stringified JSON string which will need parsing. This string has rule contract abi (Application Binary Interface).  |
|  **updated_timestamp** <br> **EPOCH \<time in seconds\>**| Last update timestamp.  |

## List all Rules

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

$rulesService = $ostObj->services->rules;

$getParams = array();
$response = $rulesService->getList($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

#### <span>GET</span> &nbsp; &nbsp; /rules

<u>**Input Parameters**</u>

No input params needed to get list of `rules`.


<u>**Success Response**</u><br>

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
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';

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

#### <span>GET</span> &nbsp; &nbsp; /chains/{chain_id}/price-points


<u>**URL Parameters**</u>

| Parameter  |  Description  |
|---|---|
| **chain_id** <br> **Required** | Chain Identifier for your auxiliary chain on which your token is setup. |



<u>**Success Response**</u><br>

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
| **updated_timestamp** <br> **EPOCH \<time in seconds\>**| Last update timestamp.  |


## Get chain information

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

$chainsService = $ostObj->services->chains;

$getParams = array();
$getParams['chain_id'] = '3';
$response = $chainsService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```

#### <span>GET</span> &nbsp; &nbsp; /chains/{chain_id}


<u>**URL Parameters**</u>

| Parameter  |  Description  |
|---|---|
| **chain_id** <br> **Required** | Chain Identifier for your auxiliary chain on which your token is setup. |



<u>**Success Response**</u><br>

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
|  **address** <br> **String** \<[**Address**](/kit/docs/glossary/#contract-address)\>  | Holds a 20 byte value (size of an Ethereum address). This will be the address for multi-signature contract.   |
|  **requirement** <br> **Integer** | Requirement for multi-sig transactions   |
|  **nonce** <br> **Integer** |   |
|  **status** <br> **String** | The status of device manager.   |
| **updated_timestamp** <br> **EPOCH \<time in seconds\>**| Last update timestamp.  |



## Get device manager

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

$deviceManagersService = $ostObj->services->deviceManagers;

$getParams = array();
$getParams['user_id'] = 'fd836794-96fe-4841-a486-f3d2966d3ac8';
$response = $deviceManagersService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);

?>
```


#### <span>GET</span> &nbsp; &nbsp; /users/{user_id}/device-managers


<u>**URL Parameters**</u>

| Parameter  | Description  |
|---|---|
| **user_id** <br> **Required**   | Unique identifier for the user of economy |



<u>**Success Response**</u><br>

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