---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript: JavaScript
  - ruby: Ruby
  - php: PHP
  - java: JAVA

toc_footers:
  - Documentation Powered by Slate

search: true

includes: 
  - errors
---

# OST KIT

> BASE VARIABLES

```json
{ 
  "api_base_url": "https://sandboxapi.ost.com/v1.1",
  // replace with the API Key and secret with the ones you obtained from your account
  "api_key": "2c48e6cc16716e620138", 
  "api_secret": "5af763facaf8222e93aa1b537af1b12b179d21670fd15f0b7780752d6027189d"  
}
```
OST KIT⍺ hosts RESTful APIs to help you manage your token economy on the OpenST utility blockchain.  

* OST KIT⍺ introduces `users` and `actions` to easily integrate the token economy of your application with the blockchain. <br>
* To incentivize new or existing users, you can `airdrop` tokens to get them started in the economy. <br>
* To create an interface for your users to view their balances and transactions and analyze their interactions and the rewards you can use basic Wallet APIs. <br>
* In order to deploy a smart contract on the OpenST-Protocol utility chains, you will have to send a transaction to the chain. For this an account outside of your branded token economy must have a sufficient balance of OST⍺ Prime to cover transaction fees. To transfer OST⍺ Prime to an account outside of your branded token economy `transfers` API should be used. <br>

## Authentication
Every API request on `https://sandboxapi.ost.com/v1.1` requires hash-based message authentication.  You can obtain your API key and shared API secret for your branded token from the OST KIT⍺ Developers API console at [<u>kit.ost.com/developer-api-console</u>](https://kit.ost.com/developer-api-console).

Every request has three mandatory parameters that must be included: <br>
* `api_key`, the API key as provided from [<u>OST KIT⍺</u>](https://kit.ost.com/developer-api-console) <br>
* `request_timestamp`, the current unix timestamp in seconds. <br>
* `signature`, the signature as the sha256 digest of the shared API secret and the correctly formatted query string as described below. <br>

<aside class="warning">The request timestamp will be valid for up to ten seconds. Your computer clock must therefore be synchronised for authentication to succeed.</aside>

The reason for these 3 mandatory parameters in each request is to ensure that the man-in-the-middle cannot change the input params to the request and also so that we can validate the signature on the server side.

When using the [<u>SDKs</u>](/docs/sdks_overview.html) authentication is handled for you. In other languages you can implement the signature generation by computing the HMAC `sha256`digest of the API secret and the query string. The resulting signature must be then included in the request.

### **1. Creating the string to sign.**

> An example code snippet to form string to sign

```javascript
var request = require('request');
var crypto = require('crypto');
var queryString = require('query-string');
var api_key = 'API_KEY';
var api_secret = 'API_SECRET';
var api_base_url = 'API_END_POINT';

function generateQueryString(inputParams) {
  const queryParamsString = queryString.stringify(inputParams, {arrayFormat: 'bracket'}).replace(/%20/g, '+');
  const stringToSign = endpoint + '?' + queryParamsString;
  return stringToSign;
}
function createTimeString() {
	var d = new Date();
	var t = d.getTime();
	var o = t + "";
	return o.substring(0, 10);
}
var requestParams = {api_key: api_key, request_timestamp: createTimeString(), name: 'NAME'};
var stringToSign = generateQueryString(requestParams);
```


To generate the signature you must first form the string to sign. This string to sign can be formed by concatenation of the following elements

-  API endpoint
-  api_key, the API key as provided from [OST KIT⍺](https://dev.ost.com/docs/kit.ost.com/developer-api-console)
-  `request_timestamp`, the current unix timestamp in seconds.
-   API parameters.

<aside class="warning">Note all the inputs must be alphabetically sorted on the keys. (asc)</aside>

### **2. Generating a signature.**

> While the code for creating string to sign remains common for all API requests. Here's an example to generate and send signature in a GET request.

```javascript
function generateApiSignature(stringToSign, api_secret) {
  var buff = new Buffer.from(api_secret, 'utf8');
  var hmac = crypto.createHmac('sha256', buff);
  hmac.update(stringToSign);
  return hmac.digest('hex');
}

endpoint = stringToSign+'&signature='+generateApiSignature(stringToSign, api_secret);

request.get(
        endpoint,
        function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
                console.log(error);
        }
    }
);
```

> Example to generate and send signature in a POST request.

```javascript
function generateApiSignature(stringToSign, api_secret) {
  var buff = new Buffer.from(api_secret, 'utf8');
  var hmac = crypto.createHmac('sha256', buff);
  hmac.update(stringToSign);
  return hmac.digest('hex');
}

requestParams.signature = generateApiSignature(stringToSign, api_secret);

request.post(
    endpoint,
    { form: requestParams },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
                console.log(error);
        }
    }
);
```

The signature is the sha256 digest of the shared API secret and the correctly formatted query string

generated_signature = Hmac_Sha256_Hexdigest(string-to-sign, api-secret)

The parameters for a post request are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string. 

Please ensure that the final URL is encoded while making the API request.

# Users
## The User Object
<aside class="warning">In order to keep end user's balance information safe and private, two parameters '_airdropped_tokens_' and '_token_balance_' have been deprecated. <br> They will be removed from the user object in our next release. To access balances, please use `/balances/{user_id}`</aside>

> Sample User Object :

```json
{
   "success": true,
   "data": {
      "result_type": "user",
      "user": {
         "id": "d9c97f83-85d5-46b5-a4fb-c73011cbd803",
         "addresses": [
            [
               "198",
               "0x9352880A2A4c05c41eC1962980Bb1a0bA4176182"
            ]
         ],
         "name": "Alice",
         "airdropped_tokens": 0,
         "token_balance": 0
      }
   }
}
```


|PARAMETER|TYPE|DESCRIPTION|
|-----------|--------|--------|
| _id_      | string  | user id (uuid copy, deprecated) |
| _addresses_    | array | [(chain id, address)], e.g. [(1409, 0x21bFfb1c7910e9D0393E3f655E921FB47F70ab56)]  |
| _name_    | string |name of the user (not unique)  |
| _airdropped_tokens_| string [number] | _(is going to be deprecated)_ total amount of airdropped tokens to the user |
| _token_balance_           | string [number] | _(is going to be deprecated)_ current balance of the user  |

## Create A User

> Example Request

```javascript
OSTSDK = require('@ostdotcom/ost-sdk-js');
const ostObj = new OSTSDK({apiKey: api_key, apiSecret: api_secret, apiEndpoint: api_base_url});
const userService = ostObj.services.users;
userService.create({name: 'Alice'}).then(function(a){console.log(JSON.stringify(a))}).catch(console.log); 
// returns object containing Alice's id, among other information, which you will need later.
```

```ruby
require('ost-sdk-ruby')
# Initialize SDK object
ost_sdk = OSTSdk::Saas::Services.new({api_key: api_key, api_secret: api_secret, api_base_url: api_base_url})
# Initialize User object
ost_users_object = ost_sdk.services.users
ost_users_object.create(name: 'Alice')
# returns object containing Alice's ID, among other information, which you will need later
```

```php
<?php
require 'vendor/autoload.php';
$params = array();
$params['apiKey']= $api_key ; // replace with the API Key you obtained earlier
$params['apiSecret']= $api_secret_key ; // replace with the API Secret you obtained earlier
$params['apiBaseUrl']= $api_base_url ;
// Initialize SDK object
$ostObj = new OSTSdk($params);
// Initialize User object
$userService = $ostObj->services->users;
// following code returns object containing Jaimme's ID , among other information, which you will need later
$createUserParams = array();
$createUserParams['name'] = 'Jaimme';
$response = $userService->create($createUserParams)->wait();
var_dump($response);
?>
```

```java
import com.google.gson.JsonObject;
import com.ost.OSTSDK;
import com.ost.services.OSTAPIService;
import java.io.IOException;
import java.util.HashMap;

public class QuickStartMain {
    private static com.ost.services.v1_1.Manifest services;

    public static void main(String[] args) throws IOException, OSTAPIService.MissingParameter {
        HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
        sdkConfig.put("apiEndpoint", api_base_url); 
        sdkConfig.put("apiKey", api_key); // replace with the API Key you obtained earlier
        sdkConfig.put("apiSecret", api_secret); // replace with the API Secret you obtained earlier

        // Initialize SDK object
        OSTSDK ostObj = new OSTSDK(sdkConfig);
        services = (com.ost.services.v1_1.Manifest) ostObj.services;

        // Initialize User object
        com.ost.services.v1_1.Users userService = services.users;

        // returns object containing Alice's ID, among other information, which you will need later
        HashMap <String,Object> params = new HashMap<String,Object>();
        params.put("name", "Alice");
        JsonObject response = userService.create( params );
        System.out.println("response: " + response.toString() );

    }
}    
```

Post to `/users` to register a new `user` and obtain a unique identifier to interact with the created user within your application.

A user can own branded tokens within your branded token economy.  Users can exchange branded tokens by performing the respective actions you defined.  Users also hold an airdrop token balance, which consists of tokens the company awards to the user to spend within the economy.

### Input Parameters

| Parameter           | Type        | Definition |
|---------------------|-----------|---------------
| _api_key_           | string      | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com)|
| _request_timestamp_ | number     | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring  | (mandatory) [<u>signature generated</u>](#authentication) for current request |
| _name_              | string     | name of the user (not unique) |

The signature for this request is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted as below.


`/users/?api_key=ed0787e817d4946c7e76&name=Alice&request_timestamp=1526388800`

The request url of this post request reads as

`POST - https://sandboxapi.ost.com/v1.1/users`

and the parameters are sent in the request body with default application/x-www-form-urlencoded content-type so the request body uses the same format as the query string as shown.


### JSON Response Object

> Example Success Response

```json
{
   "success": true,
   "data": {
      "result_type": "user",
      "user": {
         "id": "d9c97f83-85d5-46b5-a4fb-c73011cbd803",
         "addresses": [
            [
               "198",
               "0x9352880A2A4c05c41eC1962980Bb1a0bA4176182"
            ]
         ],
         "name": "Alice",
         "airdropped_tokens": 0,
         "token_balance": 0
      }
   }
}
```

> Example Failure Responses

```json
{
  "success": false,
  "err": {
    "code": "UNAUTHORIZED",
    "msg": "We could not authenticate the request. Please review your credentials and authentication method.",
    "error_data": [ ],
    "internal_id": "a_1"
  }
}
```
> However when a request is invalid the response is returned with successful status code 200, but `success = false` and the `err.msg` and `err.error_data` contain further information.

```json
{
     "success": false,
     "err": {
        "code": "invalid_request",
        "msg": "At least one parameter is invalid or missing. See err.error_data for more details.",
        "error_data": [
           {
              "parameter": "name",
              "msg": "Must be a minimum of 3 characters, a maximum of 20 characters, and can contain only letters, numbers, and spaces, along with other common sense limitations."
           }
        ],
        "internal_id": "s_a_g_2"
     }
  }
```

| Key        | Type   | Description      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users` the `data.result_type` is the string "users"
and the key `data.users` is an array of [<u>`user` objects</u>](#the-user-object).
On successful creation of the user, `users` contains the created user as a single element.


## Update A User 

> Example Request

```javascript
OSTSDK = require('@ostdotcom/ost-sdk-js');
// Initialize SDK object
const ostObj = new OSTSDK({apiKey: api_key, apiSecret: api_secret, apiEndpoint: api_base_url});
// Initialize User object
const userService = ostObj.services.users;
// Update Name to now be Alice M
userService.edit({id: 'd9c97f83-85d5-46b5-a4fb-c73011cbd803', name: 'Alice M'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });// returns object containing Alice's id, among other information, which you will need later.
```

```ruby
require('ost-sdk-ruby')
# Initialize SDK object
ost_sdk = OSTSdk::Saas::Services.new({api_key: api_key, api_secret: api_secret, api_base_url: api_base_url})
# Initialize User object
ost_users_object = ost_sdk.services.users
# Update Name to now be Alice M
ost_users_object.edit(id: 'd9c97f83-85d5-46b5-a4fb-c73011cbd803', name: 'Alice M').to_json
```

```php
<?php
require 'vendor/autoload.php';
$params = array();
$params['apiKey']= $api_key ; // replace with the API Key you obtained earlier
$params['apiSecret']= $api_secret_key ; // replace with the API Secret you obtained earlier
$params['apiBaseUrl']= $api_base_url ;
// Initialize SDK object
$ostObj = new OSTSdk($params);
// Initialize User object
$userService = $ostObj->services->users;
// following code updates name to now be Alice M
$editUserParams = array();
$editUserParams['name'] = 'Alice M';
$editUserParams['id'] = 'd9c97f83-85d5-46b5-a4fb-c73011cbd803';
$response = $userService->edit($editUserParams)->wait();
var_dump($response);
?>
```

```java
import com.google.gson.JsonObject;
import com.ost.OSTSDK;
import com.ost.services.OSTAPIService;
import java.io.IOException;
import java.util.HashMap;

public class QuickStartMain {
    private static com.ost.services.v1_1.Manifest services;

    public static void main(String[] args) throws IOException, OSTAPIService.MissingParameter {
        HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
        sdkConfig.put("apiEndpoint", api_base_url); 
        sdkConfig.put("apiKey", api_key); // replace with the API Key you obtained earlier
        sdkConfig.put("apiSecret", api_secret); // replace with the API Secret you obtained earlier

        // Initialize SDK object
        OSTSDK ostObj = new OSTSDK(sdkConfig);
        services = (com.ost.services.v1_1.Manifest) ostObj.services;

        // Initialize User object
        com.ost.services.v1_1.Users userService = services.users;

        // following code updates name to now be Alice M
        HashMap <String,Object> params = new HashMap<String,Object>();
        params.put("id", "d9c97f83-85d5-46b5-a4fb-c73011cbd803");
        params.put("name", "Alice M");
        JsonObject response = userService.edit( params );
        System.out.println("response: " + response.toString() );

    }
}    
```

Send a POST-request to `/users/{id}` to update an existing user. The `{id}` within the API endpoint is a unique identifier, which is returned during the creation of a user or is returned as id when a GET-request is sent to `/users`.

This API updates the specified user by setting the values of the parameters passed. Any parameter not provided will be left unchanged.

### Input Parameters
| Parameter           | Type      | Definition  |
|---------------------|-----------|--------|
| _api_key_           | string     | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring  |(mandatory) [<u>signature generated</u>](#authentication) for current request |
| _name_              | string    |new name of the user (not unique) |

The signature for this request is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted as below.

`/users/69cc4fcd-39ca-4499-8948-c402dd83fcd8?api_key=ed0787e817d4946c7e76&name=Alice&request_timestamp=1526394008`

The request url of this post request reads as

`POST - https://sandboxapi.ost.com/v1.1/users/{id}`

and the parameters are sent in the request body with default application/x-www-form-urlencoded content-type so the request body uses the same format as the query string

### JSON Response Object

> Example Success Response

```json
{
   "success": true,
   "data": {
      "result_type": "user",
      "user": {
         "id": "d9c97f83-85d5-46b5-a4fb-c73011cbd803",
         "addresses": [
            [
               "198",
               "0x0A302b902Ed27c27c90027A104e6E589261a1987"
            ]
         ],
         "name": "Alice",
         "airdropped_tokens": "0",
         "token_balance": "0"
      }
   }
}
```

> Example Failure Responses

```json
{
 "success": false,
 "err": {
    "code": "NOT_FOUND",
    "msg": "The requested resource could not be located.",
    "error_data": [],
    "internal_id": "s_cu_eu_2.1"
 }
}
```

| Key        | Type   | Description |
|------------|--------|-------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users/{id}` the `data.result_type` is the string "users"
and the key `data.users` is an array of [<u>`user` objects</u>](#the-user-object).
On successful edit of a user, `users` contains the edited user as a single element.


## Retrieve A User 

> Example Request

```javascript
OSTSDK = require('@ostdotcom/ost-sdk-js');
// Initialize SDK object
const ostObj = new OSTSDK({apiKey: api_key, apiSecret: api_secret, apiEndpoint: api_base_url});
// Initialize User object
const userService = ostObj.services.users;
userService.get({id: 'e55feef0-26e6-438a-9f1a-f348ce2e3c44'}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); });
```

```ruby
require('ost-sdk-ruby')
# Initialize SDK object
ost_sdk = OSTSdk::Saas::Services.new({api_key: api_key, api_secret: api_secret, api_base_url: api_base_url})
# Initialize User object
ost_users_object = ost_sdk.services.users
ost_users_object.get(id: 'e55feef0-26e6-438a-9f1a-f348ce2e3c44').to_json
```

```php
<?php
require 'vendor/autoload.php';
$params = array();
$params['apiKey']= $api_key ; // replace with the API Key you obtained earlier
$params['apiSecret']= $api_secret_key ; // replace with the API Secret you obtained earlier
$params['apiBaseUrl']= $api_base_url ;
// Initialize SDK object
$ostObj = new OSTSdk($params);
// Initialize User object
$userService = $ostObj->services->users;
// following code returns object containing Jaimme's ID , among other information, which you will need later
$getUserParams = array();
$getUserParams['id'] = 'e55feef0-26e6-438a-9f1a-f348ce2e3c44';
$response = $userService->get($getUserParams)->wait();
var_dump($response);
?>
```

```java
import com.google.gson.JsonObject;
import com.ost.OSTSDK;
import com.ost.services.OSTAPIService;
import java.io.IOException;
import java.util.HashMap;

public class QuickStartMain {
    private static com.ost.services.v1_1.Manifest services;

    public static void main(String[] args) throws IOException, OSTAPIService.MissingParameter {
        HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
        sdkConfig.put("apiEndpoint", api_base_url); 
        sdkConfig.put("apiKey", api_key); // replace with the API Key you obtained earlier
        sdkConfig.put("apiSecret", api_secret); // replace with the API Secret you obtained earlier

        // Initialize SDK object
        OSTSDK ostObj = new OSTSDK(sdkConfig);
        services = (com.ost.services.v1_1.Manifest) ostObj.services;

        // Initialize User object
        com.ost.services.v1_1.Users userService = services.users;

        // Retrieve's User's information
        HashMap <String,Object> params = new HashMap<String,Object>();
        params.put("id", "e55feef0-26e6-438a-9f1a-f348ce2e3c44");
        JsonObject response = userService.get( params );
        System.out.println("response: " + response.toString() );

    }
}    
```

Send a GET request on `/users/{id}` to get information about a specific user. The `{id}` in the API endpoint is a unique identifier that is returned during the creation of the user.

### Input Parameters

| Parameter           | Type      | Definition  |
|---------------------|-----------|--------|
| _api_key_           | string     | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](#authentication) for current request |
| _name_              | string    |new name of the user (not unique) |

The signature for this request is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted as below.


`/users/69cc4fcd-39ca-4499-8948-c402dd83fcd8?api_key=ed0787e817d4946c7e76&request_timestamp=1526394768`

The request url of this post request reads as

`GET - https://sandboxapi.ost.com/v1.1/users/{id}`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string.

### JSON Response Object

> Example Success Response

```json
{
   "success": true,
   "data": {
      "result_type": "user",
      "user": {
         "id": "69cc4fcd-39ca-4499-8948-c402dd83fcd8",
         "addresses": [
            [
               "198",
               "0x0A302b902Ed27c27c90027A104e6E589261a1987"
            ]
         ],
         "name": "Alice",
         "airdropped_tokens": "0",
         "token_balance": "0"
      }
   }
}
```

> Example Failure Response

```json
{
   "success": false,
   "err": {
      "code": "NOT_FOUND",
      "msg": "The requested resource could not be located.",
      "error_data": [],
      "internal_id": "s_cu_fu_3"
   }
}
```

| Key        | Type   | Description      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users/{id}` the `data.result_type` is the string "users"
and the key `data.users` is an array of [<u>`user` objects</u>](#the-user-object).
On successful edit of a user, `users` contains the edited user as a single element.

## List Users

> Example Request

```javascript
OSTSDK = require('@ostdotcom/ost-sdk-js');
const ostObj = new OSTSDK({apiKey: api_key, apiSecret: api_secret, apiEndpoint: api_base_url});
const userService = ostObj.services.users;
userService.create({name: 'Alice'}).then(function(a){console.log(JSON.stringify(a))}).catch(console.log); 
// returns object containing Alice's id, among other information, which you will need later.
```

```ruby
require('ost-sdk-ruby')
# Initialize SDK object
ost_sdk = OSTSdk::Saas::Services.new({api_key: api_key, api_secret: api_secret, api_base_url: api_base_url})
# Initialize User object
ost_users_object = ost_sdk.services.users
ost_users_object.create(name: 'Alice')
# returns object containing Alice's ID, among other information, which you will need later
```

```php
require 'vendor/autoload.php';
$params = array();
$params['apiKey']= `` ; // replace with the API Key you obtained earlier
$params['apiSecret']= `` ; // replace with the API Secret you obtained earlier
$params['apiBaseUrl']= `` ;
// Initialize SDK object
$ostObj = new OSTSdk($params);
// Initialize User object
$userService = $ostObj->services->users;
// following code returns object containing Jaimme's ID , among other information, which you will need later
$createUserParams = array();
$createUserParams['name'] = 'Jaimme';
$response = $userService->create($createUserParams)->wait();
var_dump($response);

```

```java
import com.google.gson.JsonObject;
import com.ost.OSTSDK;
import com.ost.services.OSTAPIService;
import java.io.IOException;
import java.util.HashMap;

public class QuickStartMain {
    private static com.ost.services.v1_1.Manifest services;

    public static void main(String[] args) throws IOException, OSTAPIService.MissingParameter {
        HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
        sdkConfig.put("apiEndpoint", api_base_url); 
        sdkConfig.put("apiKey", api_key); // replace with the API Key you obtained earlier
        sdkConfig.put("apiSecret", api_secret); // replace with the API Secret you obtained earlier

        // Initialize SDK object
        OSTSDK ostObj = new OSTSDK(sdkConfig);
        services = (com.ost.services.v1_1.Manifest) ostObj.services;

        // Initialize User object
        com.ost.services.v1_1.Users userService = services.users;

        // returns object containing Alice's ID, among other information, which you will need later
        HashMap <String,Object> params = new HashMap<String,Object>();
        params.put("name", "Alice");
        JsonObject response = userService.create( params );
        System.out.println("response: " + response.toString() );

    }
}    
```

Description

### Input Parameters

### JSON Response Object

> Example Success Response

```json
```
Response description

# Actions
## Create an Action

> Example Request

```javascript
```

```ruby
```

```php
```

```java
```

Description

### Input Parameters

### JSON Response Object

> Example Success Response

```json
```
Response description


## Update an Action

> Example Request

```javascript
```

```ruby
```

```php
```

```java
```

Description

### Input Parameters

### JSON Response Object

> Example Success Response

```json
```
Response description

## Retreive an Action

> Example Request

```javascript
```

```ruby
```

```php
```

```java
```

Description

### Input Parameters

### JSON Response Object

> Example Success Response

```json
```
Response description

## List Actions

> Example Request

```javascript
```

```ruby
```

```php
```

```java
```

Description

### Input Parameters

### JSON Response Object

> Example Success Response

```json
```
Response description