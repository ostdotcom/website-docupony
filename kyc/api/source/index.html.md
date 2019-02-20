---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - python: Python
  - ruby: Ruby
  - javascript: NodeJs
  - java: Java
  - php: PHP


toc_footers:
  - Documentation Powered by Slate

search: true

includes: 
  - errors
---

# Introduction
OST KYC is the first plug-and-play KYC/AML management solution for token sales to process
thousands of applicants smoothly and securely. Once you sign up for the KYC services and an OST KYC client account is activated, the following details are provided :

|Account Activation | Elements |
-------------------|----------
| |<img width=1200/>|
|<u>**Account Details**</u>| Link to KYC Dashboard <br> Login Credentials for KYC Dashboard <br> Link to Cynopsis Environment <br>Login credentials to Cynopsis Environment |
|<u>**API Access:​**</u> API access is authorized using secret key. Please share the key with trusted entities only. | API Key <br> API Secret Key |
|<u>**Whitelisting Address:​**</u> This is the address which will be communicating to the Sale contract to whitelist registered Eth addresses. This is also known as Verified Operator Address. | Whitelisting Address |
|<u>**DNS records for domain verification:**</u>It is required to add the DNS records for the domain authentication in the DNS provider in order to start sending emails.| DNS records will be provided in the form of a CSV file. |
|<u>**Participating Countries:**</u> ​This is the list of countries and nationalities in yml file format to be used in the submission formfor API validation. This list shall be adjusted by the client based on his specific requirements. |List of Countries and Nationalities. |


As part of the complete solution one of the product offerings is the robust set of OST KYC APIs. They allow access to several functionality used for KYC/AML verification. Here are the APIs that we deliver through OST KYC.

## Authentication

> To authorize, you can use this sample code:

```ruby
require 'rails'
# Generate Signature
def generate_signature(string_to_sign)
  digest = OpenSSL::Digest.new('sha256')
  puts "--------string_to_sign=>#{string_to_sign}-----"
  OpenSSL::HMAC.hexdigest(digest, 'API_SECRET', string_to_sign) # Make sure to replace `API_SECRET` with your API secret key.
end
# Create Base Parameters
def base_params(endpoint, custom_params = {})
  request_time = Time.now.to_i
  request_params = custom_params.merge("request_timestamp" => request_time, "api_key" => 'API_KEY') # Make sure to replace `API_KEY` with your API key.
  query_param = request_params.to_query.gsub(/^&/, '')
  str = "#{endpoint}?#{query_param}"
  signature = generate_signature(str)
  request_params.merge!("signature" => signature)
  request_params
end
custom_params = {email: 'kyc@ost.com'}
endpoint = "/api/v2/users"
request_params = base_params(endpoint, custom_params)
```
Every API request on `https://kyc.ost.com/api/v2` requires hash-based message authentication. Every request has three mandatory parameters that must be included:

* api_key :  the API key as provided post KYC client account activation.
* request_timestamp : the current unix timestamp in seconds.
* signature : the signature as the sha256 digest of the API secret and the correctly formatted query string as described below.

<aside class="warning">The request timestamp will be valid for up to ten seconds. Your computer clock must therefore be synchronised for authentication to succeed.</aside>

You can implement the signature generation by computing the HMAC sha256 digest of the API secret and the query string. The resulting signature must be then included in the request.

### 1. Creating the string to sign.
To generate the signature you must first form the string to sign. This string to sign can be formed by concatenation of the following elements:

* API endpoint
* api_key
* request_timestamp
* API parameters

<aside class="warning">Note all the inputs must be alphabetically sorted on the keys. (asc)</aside>

### 2. Generating a signature.
The signature is the sha256 digest of the shared API secret and the correctly formatted query string.

generated_signature = Hmac_Sha256_Hexdigest(string-to-sign, api-secret)

<aside class="warning">Please ensure that the final URL is encoded while making the API request.</aside>

For a Post request, the parameters are sent in the request body with default content-type `application/x-www-form-urlencoded`  so the request body uses the same format as the query string.
 

# Users
## The User Object 
> Sample User Object :

```jason
{
  "id": 11428,
  "email": "kycuser@ost.com",
  "properties": [
            "kyc_submitted",
            "doptin_mail_sent",
            "doptin_done"
            ],
  "created_at": 1539163614
}
```
|PARAMETER|TYPE|DESCRIPTION|
----------|----|------------
|id|bigint| Unique identifier for the user |
|email| string | Email Id of the user|
|properties|array<strings>|Properties of the user:<br> "kyc_submitted",<br> "doptin_mail_sent",<br> "doptin_done".<br> Remains empty when the user is created. |
|created_at| timestamp |Timestamp at which user was created. (epoch time in seconds)|

## Add a User
> Example Request code:

```python
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({ 'api_key': '9864024263fc2a20a3fc0f795f776819' , 
                                        'api_secret': 'a999622f480d8689e491b0aaa3f0c5f8' , 
                                        'api_base_url': 'https://kyc.stagingost.com',
                                        'config': {'timeout': 10 }
                                        })
Services = kyc_sdk.services
Users = Services.users

user = Users.create({'email': 'bob@example-domain.com'})
print(user)
```

```ruby
require('ost-kyc-sdk-ruby')

# The timeout in the config is the timeout in seconds for which the socket connection will remain open
CONFIG = {timeout: 10}

ost_kyc_sdk = OstKycSdkRuby::Saas::Services.new({
    api_key: 'Your API key', 
    api_secret: 'Your API Secret', 
    api_base_url: 'API base URL', 
    config: CONFIG})

user_service = ost_kyc_sdk.services.users
params = {email: 'email1@domain.com'}
user = user_service.create(params).to_json
```



```javascript
const KYCSDK = require('@ostdotcom/ost-kyc-sdk-js');

const kycObj = new KYCSDK({
   apiKey: <api_key>, 
   apiSecret: <api_secret>, 
   apiEndpoint: <api_endpoint>, 
   config: {timeout: <timeout>}
   });
const userService = kycObj.services.users;

userService.create({email: 'alice+1@ost.com'})
.then(function(res) { 
   console.log(JSON.stringify(res)); 
})
.catch(function(err) { 
   console.log(JSON.stringify(err)); 
});
```



```java
import java.io.IOException;
import java.util.HashMap;

import com.ost.kyc.OSTKYCSDK;
import com.ost.kyc.services.OSTKYCAPIService;

import com.google.gson.JsonObject;

public class Test {
    public static void main(String[] args) throws IOException, OSTKYCAPIService.MissingParameter, OSTKYCAPIService.InvalidParameter {
         HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
         
         sdkConfig.put("apiEndpoint", "API base URL");
         sdkConfig.put("apiKey", "Your API key");
         sdkConfig.put("apiSecret", "API secret"); 

         OSTKYCSDK ostObj = new OSTKYCSDK(sdkConfig);
         com.ost.kyc.services.v2.Manifest services = (com.ost.kyc.services.v2.Manifest) ostObj.services;
         
         // User Services
         com.ost.kyc.services.v2.User userService = services.user;

         HashMap <String,Object> params = new HashMap<String,Object>();
         params.put("email", "something@domain.com");
         JsonObject response = userService.create( params );
         System.out.println("response: " + response.toString() );

    }
}
```

```php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API_KEY';
$params['apiSecret']='API_SECRET';
$params['apiBaseUrl']='API_BASE_URL';

// The config field is optional for $ostKycSdkObj Object
$nestedparams = array();
// This is the timeout in seconds for which the socket connection will remain open
$nestedparams["timeout"] = 15;
$params["config"] = $nestedparams;

$ostKycSdkObj = new OSTKYCSDK($params);

$userService = $ostKycSdkObj->services->user;

$params = array();
$params['email'] = 'email@domain.com';
$user = $userService->create($params)->wait();

```

A POST to `https://kyc.ost.com/api/v2/users` creates a new `user` object for the user in OST KYC database. Only user's signup information is sent via this endpoint. For sending user's KYC details a POST request to a different endpoint `/users-kyc/{{user_id}}` has to be sent.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|email | string | yes | A unique email id of the user whose KYC entry has to be made|

<aside class="warning"> This API cannot be used by OST KYC clients who are using OST KYC Frontend solution.</aside>

<u>**Returns**</u><br>
For api calls to `/users` the data.result\_type is the string "user" and the key data.user is a user object. On successful creation of the user, user contains the created user as a single element. The returned user object will return an ID in it that can be used to fetch the user information using the retrieve user endpoint.

> Example Response

```jason
{
  "success": true,
   "data": {
      "result_type": "user",
      "user": {
         "id": 11428,
         "email": "kycuser@ost.com",
         "properties": [],
         "created_at": 1539163614
      }
   }
}
```



## Retrieve a User
> Example Request code:

```ruby
require('ost-kyc-sdk-ruby')

# The timeout in the config is the timeout in seconds for which the socket connection will remain open
CONFIG = {timeout: 10}

ost_kyc_sdk = OstKycSdkRuby::Saas::Services.new({
    api_key: 'Your API key', 
    api_secret: 'Your API Secret', 
    api_base_url: 'API base URL', 
    config: CONFIG})

user_service = ost_kyc_sdk.services.users

user = user_service.get(id: 11007).to_json
```

```python
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({ 'api_key': '9864024263fc2a20a3fc0f795f776819' , 
                                        'api_secret': 'a999622f480d8689e491b0aaa3f0c5f8' , 
                                        'api_base_url': 'https://kyc.stagingost.com',
                                        'config': {'timeout': 10 }
                                        })
Services = kyc_sdk.services
Users = Services.users
user = Users.get({'id': '11003'})
print(user)
```

```javascript
const KYCSDK = require('@ostdotcom/ost-kyc-sdk-js');

const kycObj = new KYCSDK({
   apiKey: <api_key>, 
   apiSecret: <api_secret>, 
   apiEndpoint: <api_endpoint>, 
   config: {timeout: <timeout>}
   });
const userService = kycObj.services.users;

userService.get({id: '123454333'})
.then(function(res) { 
   console.log(JSON.stringify(res)); })
.catch(function(err) { 
   console.log(JSON.stringify(err)); 
});
```

```php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API_KEY';
$params['apiSecret']='API_SECRET';
$params['apiBaseUrl']='API_BASE_URL';

// The config field is optional for $ostKycSdkObj Object
$nestedparams = array();
// This is the timeout in seconds for which the socket connection will remain open
$nestedparams["timeout"] = 15;
$params["config"] = $nestedparams;

$ostKycSdkObj = new OSTKYCSDK($params);

$userService = $ostKycSdkObj->services->user;

$params = array();
$params['id'] = '11007';
$response = $userService->get($params)->wait();
var_dump($response);

```

```java
import java.io.IOException;
import java.util.HashMap;

import com.ost.kyc.OSTKYCSDK;
import com.ost.kyc.services.OSTKYCAPIService;

import com.google.gson.JsonObject;

public class Test {
    public static void main(String[] args) throws IOException, OSTKYCAPIService.MissingParameter, OSTKYCAPIService.InvalidParameter {
         HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
         
         sdkConfig.put("apiEndpoint", "API base URL");
         sdkConfig.put("apiKey", "Your API key");
         sdkConfig.put("apiSecret", "API secret"); 

         OSTKYCSDK ostObj = new OSTKYCSDK(sdkConfig);
         com.ost.kyc.services.v2.Manifest services = (com.ost.kyc.services.v2.Manifest) ostObj.services;
         
         // User Services
         com.ost.kyc.services.v2.User userService = services.user;

         HashMap <String,Object> params = new HashMap<String,Object>();
         params.put("id", "11007");
         JsonObject response = userService.get( params );
         System.out.println("response: " + response.toString() );

    }
}
```

A GET to `https://kyc.ost.com/api/v2/users/{id}` retrieves the information of an existing user. You need to supply the identifier that was returned upon user creation.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|id | bigint | yes | Unique identifier of the user whose information is to be retrieved|

<u>**Returns**</u><br>
For api calls to `/users` the data.result\_type is the string "user" and the key data.user is a user object if a valid identifier was provided. When the requesting ID of a user is not found a 404, resource could not be located error will be returned.

> Example Response

```jason
{
  "success": true,
   "data": {
    "result_type": "user",
    "user": {
         "id": 11428,
         "email": "kycuser@ost.com",
         "properties": [],
         "created_at": 1539163614
    }
  }
}
```

> Example Error Response

```jason
{
  "success": false,
  "err": {
    "internal_id": "um_u_g_favu_2",
    "msg": "The requested resource could not be located.",
    "code": "NOT_FOUND"
  }
}
```

## List Users
> Example Request code:

```ruby
require('ost-kyc-sdk-ruby')

# The timeout in the config is the timeout in seconds for which the socket connection will remain open
CONFIG = {timeout: 10}

ost_kyc_sdk = OstKycSdkRuby::Saas::Services.new({
    api_key: 'Your API key', 
    api_secret: 'Your API Secret', 
    api_base_url: 'API base URL', 
    config: CONFIG})

user_service = ost_kyc_sdk.services.users

users = ost_kyc_user_object.list().to_json
```

```python
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({ 'api_key': '9864024263fc2a20a3fc0f795f776819' , 
                                        'api_secret': 'a999622f480d8689e491b0aaa3f0c5f8' , 
                                        'api_base_url': 'https://kyc.stagingost.com',
                                        'config': {'timeout': 10 }
                                        })
Services = kyc_sdk.services
Users = Services.users
users = Users.list()
print(users)
```

```javascript
const KYCSDK = require('@ostdotcom/ost-kyc-sdk-js');

const kycObj = new KYCSDK({
   apiKey: <api_key>, 
   apiSecret: <api_secret>, 
   apiEndpoint: <api_endpoint>, 
   config: {timeout: <timeout>}
   });
const userService = kycObj.services.users;

userService.list({})
.then(function(res) { 
   console.log(JSON.stringify(res)); })
.catch(function(err) { 
   console.log(JSON.stringify(err)); 
});

```

```php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API_KEY';
$params['apiSecret']='API_SECRET';
$params['apiBaseUrl']='API_BASE_URL';

// The config field is optional for $ostKycSdkObj Object
$nestedparams = array();
// This is the timeout in seconds for which the socket connection will remain open
$nestedparams["timeout"] = 15;
$params["config"] = $nestedparams;

$ostKycSdkObj = new OSTKYCSDK($params);

$userService = $ostKycSdkObj->services->user;

$params = array();
$response = $userService->getList($params)->wait();
var_dump($response);
```

```java
import java.io.IOException;
import java.util.HashMap;

import com.ost.kyc.OSTKYCSDK;
import com.ost.kyc.services.OSTKYCAPIService;

import com.google.gson.JsonObject;

public class Test {
    public static void main(String[] args) throws IOException, OSTKYCAPIService.MissingParameter, OSTKYCAPIService.InvalidParameter {
         HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
         
         sdkConfig.put("apiEndpoint", "API base URL");
         sdkConfig.put("apiKey", "Your API key");
         sdkConfig.put("apiSecret", "API secret"); 

         OSTKYCSDK ostObj = new OSTKYCSDK(sdkConfig);
         com.ost.kyc.services.v2.Manifest services = (com.ost.kyc.services.v2.Manifest) ostObj.services;
         
         // User Services
         com.ost.kyc.services.v2.User userService = services.user;

         HashMap <String,Object> params = new HashMap<String,Object>();
         JsonObject response = userService.list( params );
         System.out.println("response: " + response.toString() );

    }
}
```

A GET to `https://kyc.ost.com/api/v2/users` returns a list of all users who have signed up. This doesn't imply that all these users have submitted their required KYC details. The users are returned sorted by creation date, with the most recent users appearing first. 

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|filters | object | no | A filter on the list based on the object `filters` field. The value can be a boolean or a string |
|page\_number|integer|no | A field that helps in pagination. page\_number is an integer that defines the page of  the list to fetch. For instance, if you make a list request and receive 100 objects, each page sends 10 objects as default limit is 10. If you want to access 45th object your subsequent call can include page\_number=5 in order to fetch the 5th page of the list|
|order|string|no| A sort order to be applied based on the user creation time. default is desc ( asc / desc ) |
|limit|integer|no| A limit on the number of user objects to be sent in one request(min. 1, max. 100, default 10)|

<br>
<u>**Filter Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|is\_kyc\_submitted| boolean | no | A filter on users list who have submitted there kyc data. (true/false)|
|is\_doptin\_done|boolean|no| A filter on users list who have done email double opt in.(true/false)|
|is_doptin_mail_sent|boolean| no | A filter on users list who have been sent the double opt in email. (true/false)| 
|email| string | no | A filter on the users list based on the user's email field.|

<br>
<u>**Returns**</u><br>
> Example Response

```jason
{
   "success": true,
   "data": {
      "result_type": "users",
      "users": [
         {
            "id": 11442,
            "email": "kycuser10@ost.com",
            "properties": [],
            "created_at": 1539339413
         },
         {
            "id": 11430,
            "email": "kycuser9@ost.com",
            "properties": [
               "kyc_submitted"
            ],
            "created_at": 1539169109
         },
         {
            "id": 11429,
            "email": "kycuser8@ost.com",
            "properties": [],
            "created_at": 1539169086
         },
         {
            "id": 11428,
            "email": "kycuser7@ost.com",
            "properties": [],
            "created_at": 1539163614
         },
         {
            "id": 11427,
            "email": "kycuser6@ost.com",
            "properties": [
               "kyc_submitted"
            ],
            "created_at": 1539154855
         },
         {
            "id": 11426,
            "email": "kycuser5@ost.com",
            "properties": [
               "kyc_submitted"
            ],
            "created_at": 1539092212
         },
         {
            "id": 11420,
            "email": "kycuser4@ost.com",
            "properties": [
               "kyc_submitted"
            ],
            "created_at": 1538992711
         },
         {
            "id": 11417,
            "email": "kycuser3@ost.com",
            "properties": [
               "kyc_submitted"
            ],
            "created_at": 1538979927
         },
         {
            "id": 11414,
            "email": "kycuser2@ost.com",
            "properties": [],
            "created_at": 1538747355
         },
         {
            "id": 11413,
            "email": "kycuser1@ost.com",
            "properties": [],
            "created_at": 1538747119
         }
      ],
      "meta": {
         "total": 39,
         "next_page_payload": {
            "page_number": 2,
            "filters": {
              "email": "kycuser"
            },
            "order": "desc",
            "limit": 10
         }
      }
   }
}
```

For api calls to `/users` the data.result\_type is the string "users" and the key data.users is an array of the returned user objects (10 users per page). The field data.meta.next_page_payload contains the filter and order information and the page_no number for the next page or is empty for the last page of the list.

Passing an optional email will result in filtering of users with that email address. Each entry in the array is a separate user object. If no more user are available, the resulting array will be empty without an error thrown.

# Users KYC Details
## The User KYC Detail Object 
> Example Response:

```jason
{
  "id": 727,
  "created_at": 1539622156,
  "first_name": "yogesh",
  "last_name": "sawant",                 
  "birthdate": "23/07/1991",
  "country": "INDIA",
  "nationality": "INDIAN",
  "document_id_number": "Ab0bd1234",
  "document_id_file": "https://s3.amazonaws.com/kyc.stagingost.com/3/i/anm15395b85581eab3068cb43ftc0rt1_ROTATE_0?X-Amz-Algorithm=AWS4-HMAC-SHA256..",
  "selfie_file": "https://s3.amazonaws.com/kyc.stagingost.com/3/i/b3vvte895rt5581eab3068cb43ftc0vg1_ROTATE_0?X-Amz-Algorithm=AWS4-HMAC-SHA256..",
  "residence_proof_file": "https://s3.amazonaws.com/kyc.stagingost.com/3/i/bty153op985581eab3068cb43ftcqw21_ROTATE_0?X-Amz..",
  "investor_proof_files": [
      "https://s3.amazonaws.com/kyc.stagingost.com/3/i/a3991395b852serab3068cb43ftc0f61_ROTATE_0?X-Amz..",
      "https://s3.amazonaws.com/kyc.stagingost.com/3/i/a5565395b85581eiop3068cb43ftc0f61_ROTATE_0?X-Amz.."
  ],
  "ethereum_address": "0xEC305b4c269dEd899b6fBA12776fbbDBdC564793",
  "estimated_participation_amount": 1.1,
  "street_address": "Hadapsar",
  "city": "pune",
  "state": "Maharashtra",
  "postal_code": "411028"
}
```

|PARAMETER|TYPE|DESCRIPTION|
----------|----|------------
|||<img width=1000/>|
|id|bigint| Unique identifier of the last submitted kyc of a user. |
|first_name|string| The user's first name. |
|last_name| string | The user's last name.|
|birthdate| string | The user's birthdate in dd/mm/yyyy format.|
|country|string|The user's country of residence.|
|nationality|string| The user's nationality.|
|document\_id\_number| string| The users identification number from their identification document.|
|document_id_file|string|S3 file url of the document id file. This link expires in 12 hours.|
|selfie_file|string|S3 file url of the selfile file. This link expires in 12 hours.|
|residence_proof_file|string| S3 file url of the residence proof file. This link expires in 12 hours.|
|investor_proof_files|array\<string\>| An array of S3 file urls of investor proof files. These links expire in 12 hours|
|ethereum_address|string|Ethereum address from where the user intends to transfer Eth to company to buy tokens|
|estimated_participation_amount|float|Estimated participation amount that user intends to invest during the token sale|
|street_address|string|The user's current address|
|city|string|The user's current city of residence|
|state|string|The user's state|
|postal\_code|string|Postal code|
|created_at|timestamp|Timestamp at which kyc was submitted. (epoch time in seconds)|



## Add or Update User KYC Details
> Example Request code :

```ruby
require('ost-kyc-sdk-ruby')

# The timeout in the config is the timeout in seconds for which the socket connection will remain open
CONFIG = {timeout: 10}

ost_kyc_sdk = OstKycSdkRuby::Saas::Services.new({
    api_key: 'Your API key', 
    api_secret: 'Your API Secret', 
    api_base_url: 'API base URL', 
    config: CONFIG})

users_kyc_service = ost_kyc_sdk.services.users_kyc

params = {
    user_id: 11007, 
    first_name:'YOGESH',  
    last_name:'SAWANT',  
    birthdate:'29/07/1992', 
    country:'INDIA', 
    nationality:'INDIAN', 
    document_id_number:'ABCD123', 
    document_id_file_path:'10/i/4ae058629d4b384edcda8decdfbf0dd1', selfie_file_path:'10/i/4ae058629d4b384edcda8decdfbf0dd2', ethereum_address:'0x04d39e0b112c20917868ffd5c42372ecc5df577b',estimated_participation_amount:'1.2',
    residence_proof_file_path:'10/i/4ae058629d4b384edcda8decdfbf0dd3',investor_proof_files_path: ['10/i/4ae058629d4b384edcda8decdfbf0da1', '10/i/4ae058629d4b384edcda8decdfbf0da2'], 
    city:'pune',
    street_address:'hadapsar',
    postal_code:'411028',
    state:'maharashtra'}

users_kyc_service.submit_kyc(params).to_json
```

```python
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({ 'api_key': '9864024263fc2a20a3fc0f795f776819' , 
                                        'api_secret': 'a999622f480d8689e491b0aaa3f0c5f8' , 
                                        'api_base_url': 'https://kyc.stagingost.com',
                                        'config': {'timeout': 10 }
                                        })
Services = kyc_sdk.services

response = Services.users_kyc.submit_kyc({
        'user_id': 11035,
        'first_name':'aniket',
        'last_name':'ayachit', 
        'birthdate':'21/12/1991', 
        'country':'india', 
        'nationality':'indian', 
        'document_id_number':'arqpa7659a',
        'document_id_file_path': '4/i/f6417391000fae92b5d074b2e5928a3b', 
        'selfie_file_path':'4/i/dc71d140532b1a7b55ba29f35b7a16d2', 
        'residence_proof_file_path':'4/d/6c6c6e759bee4c496c325decdeeef007', 
        'ethereum_address': '0xdfbc84ccac430f2c0455c437adf417095d7ad68e', 
        'estimated_participation_amount':'2', 
        'street_address':'afawfveav ',
        'city':'afawfveav', 
        'state':'afawfveav',
        'postal_code':'afawfveav',
        'investor_proof_files_path':[
            '4/d/5cfaefa078eb75f3a6470474053ef175', 
            '4/d/5ccc6d4b167e12af4616f1c96eb6505a']
        })
print(response)
```

```javascript
const KYCSDK = require('@ostdotcom/ost-kyc-sdk-js');

const kycObj = new KYCSDK({
   apiKey: <api_key>, 
   apiSecret: <api_secret>, 
   apiEndpoint: <api_endpoint>, 
   config: {timeout: <timeout>}
   });

const usersKYCService = kycObj.services.usersKyc;

usersKYCService.submitKyc({
   user_id:11003, 
   first_name:'RAJESH',  
   last_name:'KUMAR',  
   birthdate:'29/07/1992', 
   country:'INDIA', 
   nationality:'INDIAN', 
   document_id_number:'ADDHBDHBSH', 
   document_id_file_path:'10/i/4ae058629d4b384edcda8decdfbf0dd1', selfie_file_path:'10/i/4ae058629d4b384edcda8decdfbf0dd2', ethereum_address:'0x04d39e0b112c20917868ffd5c42372ecc5df577b',estimated_participation_amount:'1.2',
   residence_proof_file_path:'10/i/4ae058629d4b384edcda8decdfbf0dd3',investor_proof_files_path: ['10/i/4ae058629d4b384edcda8decdfbf0da1', '10/i/4ae058629d4b384edcda8decdfbf0da2'], 
   city:'pune',
   street_address:'hadapsar',
   postal_code:'411028',
   state:'maharashtra'
   })
.then(function(res) {
   console.log(JSON.stringify(res)); })
.catch(function(err) { 
   console.log(JSON.stringify(err)); 
});
```

```php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API_KEY';
$params['apiSecret']='API_SECRET';
$params['apiBaseUrl']='API_BASE_URL';

// The config field is optional for $ostKycSdkObj Object
$nestedparams = array();
// This is the timeout in seconds for which the socket connection will remain open
$nestedparams["timeout"] = 15;
$params["config"] = $nestedparams;

$ostKycSdkObj = new OSTKYCSDK($params);

$usersKycService = $ostKycSdkObj->services->usersKyc;

$params = array();
$params['user_id'] = "11035";
$params['first_name'] = "aniket";
$params['last_name'] = "ayachit";
$params['birthdate'] = "21/12/1991";
$params['country'] = "india";
$params['nationality'] = "indian";
$params['document_id_number'] = "arqpa7659a";
$params['document_id_file_path'] = "2/i/016be96da275031de2787b57c99f1471";
$params['selfie_file_path'] = "2/i/9e8d3a5a7a58f0f1be50b7876521aebc";
$params['residence_proof_file_path'] = "2/i/4ed790b2d525f4c7b30fbff5cb7bbbdb";
$params['ethereum_address'] = "0xdfbc84ccac430f2c0455c437adf417095d7ad68e";
$params['postal_code'] = "afawfveav";
$params['investor_proof_files_path'] = array("2/i/9ff6374909897ca507ba3077ee8587da", "2/i/4872730399670c6d554ab3821d63ebce");

$response = $usersKycService->submit_kyc($params)->wait();
```

```java
import java.io.IOException;
import java.util.HashMap;

import com.ost.kyc.OSTKYCSDK;
import com.ost.kyc.services.OSTKYCAPIService;

import com.google.gson.JsonObject;

public class Test {
    public static void main(String[] args) throws IOException, OSTKYCAPIService.MissingParameter, OSTKYCAPIService.InvalidParameter {
         HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
         
         sdkConfig.put("apiEndpoint", "API base URL");
         sdkConfig.put("apiKey", "Your API key");
         sdkConfig.put("apiSecret", "API secret"); 

         OSTKYCSDK ostObj = new OSTKYCSDK(sdkConfig);
         com.ost.kyc.services.v2.Manifest services = (com.ost.kyc.services.v2.Manifest) ostObj.services;
         
         com.ost.kyc.services.v2.UsersKyc usersKycService = services.usersKyc;

         HashMap <String, Object> params = new HashMap<String, Object>();

         params.put("user_id", "11052");
         params.put("first_name", "YOGESH");
         params.put("last_name", "SAWANT");
         params.put("birthdate", "29/07/1992");
         params.put("country", "INDIA");
         params.put("document_id_number", "ABCD123");
         params.put("document_id_file_path", "2/i/016be96da275031de2787b57c99f1471");
         params.put("selfie_file_path", "2/i/9e8d3a5a7a58f0f1be50b7876521aebc");
         params.put("ethereum_address", "0x04d39e0b112c20917868ffd5c42372ecc5df577b");
         params.put("estimated_participation_amount", "1.2");
         params.put("residence_proof_file_path", "2/i/4ed790b2d525f4c7b30fbff5cb7bbbdb");
         params.put("city", "pune");
         params.put("nationality", "INDIAN");
         params.put("state", "maharashtra");
         params.put("postal_code", "411028");

         JsonObject response = usersKycService.submit_kyc( params );
         System.out.println("response: " + response.toString() );

    }
}
```

A POST to `https://kyc.ost.com/api/v2/users-kyc/{{user_id}}` creates a new `user-kyc-detail` object for a user with the details provided through the input parameters. The same endpoint has to be used to update a user's KYC details in case of re-submissions. All parameters are required to be re-sent in an update request. You need to supply the user identifier as part of the endpoint that was returned upon user creation.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|first_name|string| yes | The user's first name. |
|last_name| string | yes| The user's last name.|
|birthdate| string | yes |The user's birthdate in dd/mm/yyyy format.|
|country|string| yes |The user's country of residence.|
|nationality|string| yes |The user's nationality.|
|document\_id\_number| string| yes| The users identification number from their identification document.|
|document_id_file_path|string| yes | File path of the document id file. The value for this parameter is fetched from the response object of Get Pre-Signed URL endpoint.|
|selfie_file_path|string| yes |File path of the selfile file. The value for this parameter is fetched from the response object of Get Pre-Signed URL endpoint.|
|residence_proof_file_path|string|no | File path of the residence proof file. The value for this parameter is fetched from the response object of Get Pre-Signed URL endpoint.|
|investor_proof_files_path|array\<string\>|no| An array of file paths of investor proof files. The value for this parameter is fetched from the response object of Get Pre-Signed URL endpoint.|
|ethereum_address|string|yes|Ethereum address from where the user intends to transfer Eth to company to buy tokens|
|estimated_participation_amount|float|yes|Estimated participation amount that user intends to invest during the token sale|
|street_address|string|yes|The user's current address|
|city|string|yes|The user's current city of residence|
|state|string|yes|The user's state|
|postal\_code|string|yes|Postal_code|

The Input parameters above list all the fields accepted as input. KYC clients should send only those fields which they have selected for their users' kyc.

<br>

<u>**Returns**</u><br>
> Example Response

```jason
{
   "success": true,
   "data": {
      "result_type": "user_kyc",
      "user_kyc": {
         "id": 290,
         "user_kyc_detail_id": 727,
         "user_id": 11420,
         "kyc_status": "pending",
         "admin_status": "unprocessed",
         "aml_status": "unprocessed",
         "whitelist_status": "unprocessed",
         "admin_action_types": [],
         "submission_count": 7,
         "last_acted_by": "Admin Name",
         "created_at": 1538995369
      }
   }
}

```
For POST calls to `/users-kyc/{{user_id}}` the data.result\_type is the string "user_kyc" and the key data.user\_kyc is an **user-kyc** object if a valid user identifier was provided. A `user-kyc` object provides properties and status related information of the kyc details that a user had last submitted.
 
## Retrieve User KYC Details
> Example Request code :

```ruby
require('ost-kyc-sdk-ruby')

# The timeout in the config is the timeout in seconds for which the socket connection will remain open
CONFIG = {timeout: 10}

ost_kyc_sdk = OstKycSdkRuby::Saas::Services.new({
    api_key: 'Your API key', 
    api_secret: 'Your API Secret', 
    api_base_url: 'API base URL', 
    config: CONFIG})

users_kyc_details_service = ost_kyc_sdk.services.users_kyc_detail

response = users_kyc_details_service.get(user_id: 11007).to_json
print(response)
```

```python
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({ 'api_key': '9864024263fc2a20a3fc0f795f776819' , 
                                        'api_secret': 'a999622f480d8689e491b0aaa3f0c5f8' , 
                                        'api_base_url': 'https://kyc.stagingost.com',
                                        'config': {'timeout': 10 }
                                        })
Services = kyc_sdk.services
users_kyc_details_service = Services.users_kyc_details
response = users_kyc_details_service.get({'user_id':11767})
print(response)
```

```javascript
const KYCSDK = require('@ostdotcom/ost-kyc-sdk-js');

const kycObj = new KYCSDK({
   apiKey: <api_key>, 
   apiSecret: <api_secret>, 
   apiEndpoint: <api_endpoint>, 
   config: {timeout: <timeout>}
   });

const usersKYCDetailsService = kycObj.services.usersKycDetails;

usersKYCDetailsService.get({user_id:11003})
.then(function(res) { 
   console.log(JSON.stringify(res)); })
.catch(function(err) { 
   console.log(JSON.stringify(err)); 
});

```

```php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API_KEY';
$params['apiSecret']='API_SECRET';
$params['apiBaseUrl']='API_BASE_URL';

// The config field is optional for $ostKycSdkObj Object
$nestedparams = array();
// This is the timeout in seconds for which the socket connection will remain open
$nestedparams["timeout"] = 15;
$params["config"] = $nestedparams;

$ostKycSdkObj = new OSTKYCSDK($params);

$usersKycDetailService = $ostKycSdkObj->services->usersKycDetail;

$params = array();
$params['user_id'] = '11007';
$response = $usersKycDetailService->get($params)->wait();
var_dump($response);
```

```java
import java.io.IOException;
import java.util.HashMap;

import com.ost.kyc.OSTKYCSDK;
import com.ost.kyc.services.OSTKYCAPIService;

import com.google.gson.JsonObject;

public class Test {
    public static void main(String[] args) throws IOException, OSTKYCAPIService.MissingParameter, OSTKYCAPIService.InvalidParameter {
         HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
         
         sdkConfig.put("apiEndpoint", "API base URL");
         sdkConfig.put("apiKey", "Your API key");
         sdkConfig.put("apiSecret", "API secret"); 

         OSTKYCSDK ostObj = new OSTKYCSDK(sdkConfig);
         com.ost.kyc.services.v2.Manifest services = (com.ost.kyc.services.v2.Manifest) ostObj.services;
         
         com.ost.kyc.services.v2.UsersKycDetail usersKycDetailService = services.usersKycDetail;

         HashMap <String, Object> params = new HashMap<String, Object>();
         params.put("user_id", "11007");

         JsonObject response = usersKycDetailService.get( params );
         System.out.println("response: " + response.toString() );

    }
}
```

A GET to `https://kyc.ost.com/api/v2/users-kyc-detail/{{user_id}}` retrieves the details of KYC data an existing user has submitted. You need to supply the user identifier that was returned while creating the user. 

<aside class="warning">The kyc data submitted by users is included in the response only based on KYC client's setting in the admin management dashboard. This adds an additional layer of security towards user's data protection.</aside>

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|user_id | bigint | yes | Unique identifier of the user that is returned upon user creation.|


<u>**Returns**</u><br>

> Example Response 

```jason
# If the setting in admin management dashboard if OFF
{
   "success": true,
   "data": {
      "result_type": "user_kyc_detail",
      "user_kyc": {
         "id": 727,
         "created_at": 1539622156
      }
   }
}

# If the setting in admin management dashboard if ON
# All fields in the response are not mandatory. They vary based on fields which KYC clients have selected for their users' kyc.
{
    "success": true,
    "data": {
        "result_type": "user_kyc_detail",
        "user_kyc_detail": {
            "id": 727,
            "created_at": 1539622156,
            "first_name": "yogesh",
            "last_name": "sawant",                 
            "birthdate": "23/07/1991",
            "country": "INDIA",
            "nationality": "INDIAN",
            "document_id_number": "Ab0bd1234",
            "document_id_file": "https://s3.amazonaws.com/kyc.stagingost.com/3/i/anm15395b85581eab3068cb43ftc0rt1_ROTATE_0?X-Amz-Algorithm=AWS4-HMAC-SHA256..",
            "selfie_file": "https://s3.amazonaws.com/kyc.stagingost.com/3/i/b3vvte895rt5581eab3068cb43ftc0vg1_ROTATE_0?X-Amz-Algorithm=AWS4-HMAC-SHA256..",
            "residence_proof_file": "https://s3.amazonaws.com/kyc.stagingost.com/3/i/bty153op985581eab3068cb43ftcqw21_ROTATE_0?X-Amz..",
            "investor_proof_files": [
                "https://s3.amazonaws.com/kyc.stagingost.com/3/i/a3991395b852serab3068cb43ftc0f61_ROTATE_0?X-Amz..",
                "https://s3.amazonaws.com/kyc.stagingost.com/3/i/a5565395b85581eiop3068cb43ftc0f61_ROTATE_0?X-Amz.."
            ],
            "ethereum_address": "0xEC305b4c269dEd899b6fBA12776fbbDBdC564793",
            "estimated_participation_amount": 1.1,
            "street_address": "Hadapsar",
            "city": "pune",
            "state": "Maharashtra",
            "postal_code": "411028"
        }
    }
}
```
For GET calls to `/users-kyc-detail/{{user_id}}` the data.result\_type is the string "user\_kyc\_detail" and the key in data is dependent on the setting done by the KYC client's in their admin management dashboard. 

If the setting to send KYC data is `ON` then the key data.user\_kyc\_detail is an **user\_kyc\_detail** object if a valid user identifier was provided.

If the setting to send KYC data is `OFF` then the key data.user\_kyc is an object with a few default fields if a valid user identifier was provided.



# Users KYC Status
## The User KYC Object 
> Example Response:

```jason
{
   "id": 304,
   "user_kyc_detail_id": 702,
   "user_id": 11430,
   "kyc_status": "pending",
   "admin_status": "unprocessed",
   "aml_status": "cleared",
   "whitelist_status": "unprocessed",
   "admin_action_types": [],
   "submission_count": 2,
   "last_acted_by": "",
   "created_at": 1539279352
}
```
|PARAMETER|TYPE|DESCRIPTION|
----------|----|------------
|id|bigint| Unique identifier of the last submitted kyc of a user |
|user\_kyc\_detail\_id| bigint | A unique identifier of the `user kyc details` object that is returned upon submitting  a user's kyc details|
|user_id|bigint| Unique identifier of the user that is returned upon user creation|
|kyc_status|string|A kyc status will be `pending` until it has been taken up for processing. If the KYC goes through successfully the status will change to `approved` otherwise `denied` |
|admin_status|string | Admin status is helpful for actors doing the KYC checks. `unprocessed` admin status indicates that the kyc entry needs to be taken care of. If any one of the admins approves a KYC entry the status changes to `qualified` and in case of a disapproval the status changes to `denied` |
|aml_status|string |AML status of KYC will be `unprocessed` until it has been taken up for processing. It changes to `pending` while the KYC is being processed. As a result of processing it is either `cleared` or `rejected`. If a KYC is cleared via an AML check the admin actor does a manual check and further approves the submission and the status changes to `approved` or rejects the submission which changes the status to `rejected`. `failed` status indicates there was an error in aml processing. |
|whitelist_status| string | Whitelisting status will be `unprocessed` until an approved KYC has been taken up for whitelisting. It changes to `started` while the whitelisting is in progress. Based on the result of whitelisting process the status is `done` if it finishes successfully or the status is `failed` if a technical issue occurs during the process of whitelisting. This is very rare but you will have to contact the OST KYC support team in such situation. |
|admin\_action\_types |array | An array that shows the different kyc issue emails that are sent to the user. The triggers to send emails are `data_mismatch` , `document_issue ` or an email with custom instructions with action type `other_issue` ] |
|submission_count | integer | A count of number of time KYC is submitted by a user| 
|last\_acted\_by | string | Name of the last admin actor who took an action on the KYC. `nil` value indicates the last action was by the ost kyc system or no action has been taken. |
|created_at | timestamp| Timestamp at which user KYC was created. (epoch time in seconds)| 


## Retrieve KYC Status 
> Example Request code:

```ruby
require('ost-kyc-sdk-ruby')

# The timeout in the config is the timeout in seconds for which the socket connection will remain open
CONFIG = {timeout: 10}

ost_kyc_sdk = OstKycSdkRuby::Saas::Services.new({
    api_key: 'Your API key', 
    api_secret: 'Your API Secret', 
    api_base_url: 'API base URL', 
    config: CONFIG})

users_kyc_service = ost_kyc_sdk.services.users_kyc

response = users_kyc_service.get(user_id: '11007').to_json
print(response)
```

```python
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({ 'api_key': '9864024263fc2a20a3fc0f795f776819' , 
                                        'api_secret': 'a999622f480d8689e491b0aaa3f0c5f8' , 
                                        'api_base_url': 'https://kyc.stagingost.com',
                                        'config': {'timeout': 10 }
                                        })
Services = kyc_sdk.services
response = Services.users_kyc.get({'user_id': 11767})
print(response)
```


```javascript
const KYCSDK = require('@ostdotcom/ost-kyc-sdk-js');

const kycObj = new KYCSDK({
   apiKey: <api_key>, 
   apiSecret: <api_secret>, 
   apiEndpoint: <api_endpoint>, 
   config: {timeout: <timeout>}
   });

const usersKYCService = kycObj.services.usersKyc;

usersKYCService.get({'user_id':11003})
.then(function(res) { 
   console.log(JSON.stringify(res)); })
.catch(function(err) { 
   console.log(JSON.stringify(err)); 
});
```

```php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API_KEY';
$params['apiSecret']='API_SECRET';
$params['apiBaseUrl']='API_BASE_URL';

// The config field is optional for $ostKycSdkObj Object
$nestedparams = array();
// This is the timeout in seconds for which the socket connection will remain open
$nestedparams["timeout"] = 15;
$params["config"] = $nestedparams;

$ostKycSdkObj = new OSTKYCSDK($params);

$usersKycService = $ostKycSdkObj->services->usersKyc;

$params = array();
$params['user_id'] = '11007';
$response = $usersKycService->get($params)->wait();
var_dump($response);
```

```java
import java.io.IOException;
import java.util.HashMap;

import com.ost.kyc.OSTKYCSDK;
import com.ost.kyc.services.OSTKYCAPIService;

import com.google.gson.JsonObject;

public class Test {
    public static void main(String[] args) throws IOException, OSTKYCAPIService.MissingParameter, OSTKYCAPIService.InvalidParameter {
         HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
         
         sdkConfig.put("apiEndpoint", "API base URL");
         sdkConfig.put("apiKey", "Your API key");
         sdkConfig.put("apiSecret", "API secret"); 

         OSTKYCSDK ostObj = new OSTKYCSDK(sdkConfig);
         com.ost.kyc.services.v2.Manifest services = (com.ost.kyc.services.v2.Manifest) ostObj.services;
         
         com.ost.kyc.services.v2.UsersKyc usersKycService = services.usersKyc;

         HashMap <String,Object> params = new HashMap<String,Object>();
         params.put("user_id", "11007");
         JsonObject response = usersKycService.get( params );
         System.out.println("response: " + response.toString() );

    }
}
```

A user can submit their KYC details multiple times, a GET to `https://kyc.ost.com/api/v2/users-kyc/{{user_id}}` retrieves some properties and status related information of the last KYC that a user had submitted. This endpoint however doesn't returns `KYC data` submitted by users. You need to supply the identifier that was returned upon user creation for fetching the information.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|user_id | bigint | yes | Unique identifier of the user whose KYC status information is to be retrieved|

<u>**Returns**</u><br>
For api calls to `/users-kyc/{{user_id}}` the data.result\_type is the string "user_kyc" and the key data.user\_kyc is an user-kyc object if a valid identifier was provided. When the requesting ID of a user is not found a 404, resource could not be located error will be returned.

> Example Response

```jason
{
   "success": true,
   "data": {
      "result_type": "user_kyc",
      "user_kyc": {
         "id": 304,
         "user_kyc_detail_id": 702,
         "user_id": 11430,
         "kyc_status": "pending",
         "admin_status": "unprocessed",
         "aml_status": "cleared",
         "whitelist_status": "unprocessed",
         "admin_action_types": [],
         "submission_count": 2,
         "last_acted_by": "Admin Name",
         "created_at": 1539279352
      }
   }
}
```

## List KYC Statuses 
> Example Request code:


```ruby
require('ost-kyc-sdk-ruby')

# The timeout in the config is the timeout in seconds for which the socket connection will remain open
CONFIG = {timeout: 10}

ost_kyc_sdk = OstKycSdkRuby::Saas::Services.new({
    api_key: 'Your API key', 
    api_secret: 'Your API Secret', 
    api_base_url: 'API base URL', 
    config: CONFIG})

users_kyc_service = ost_kyc_sdk.services.users_kyc

response = users_kyc_service.list().to_json
print(response)
```

```python
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({ 'api_key': '9864024263fc2a20a3fc0f795f776819' , 
                                        'api_secret': 'a999622f480d8689e491b0aaa3f0c5f8' , 
                                        'api_base_url': 'https://kyc.stagingost.com',
                                        'config': {'timeout': 10 }
                                        })
Services = kyc_sdk.services
response = Services.users_kyc.list()
print(response)
```

```javascript
const KYCSDK = require('@ostdotcom/ost-kyc-sdk-js');

const kycObj = new KYCSDK({
   apiKey: <api_key>, 
   apiSecret: <api_secret>, 
   apiEndpoint: <api_endpoint>, 
   config: {timeout: <timeout>}
   });

const usersKYCService = kycObj.services.usersKyc;

usersKYCService.list()
.then(function(res) { 
   console.log(JSON.stringify(res)); })
.catch(function(err) { 
   console.log(JSON.stringify(err)); 
});
```

```php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API_KEY';
$params['apiSecret']='API_SECRET';
$params['apiBaseUrl']='API_BASE_URL';

// The config field is optional for $ostKycSdkObj Object
$nestedparams = array();
// This is the timeout in seconds for which the socket connection will remain open
$nestedparams["timeout"] = 15;
$params["config"] = $nestedparams;

$ostKycSdkObj = new OSTKYCSDK($params);

$usersKycService = $ostKycSdkObj->services->usersKyc;

$params = array();
$response = $usersKycService->getList($params)->wait();
var_dump($response);
```

```java
import java.io.IOException;
import java.util.HashMap;

import com.ost.kyc.OSTKYCSDK;
import com.ost.kyc.services.OSTKYCAPIService;

import com.google.gson.JsonObject;

public class Test {
    public static void main(String[] args) throws IOException, OSTKYCAPIService.MissingParameter, OSTKYCAPIService.InvalidParameter {
         HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
         
         sdkConfig.put("apiEndpoint", "API base URL");
         sdkConfig.put("apiKey", "Your API key");
         sdkConfig.put("apiSecret", "API secret"); 

         OSTKYCSDK ostObj = new OSTKYCSDK(sdkConfig);
         com.ost.kyc.services.v2.Manifest services = (com.ost.kyc.services.v2.Manifest) ostObj.services;
         
         com.ost.kyc.services.v2.UsersKyc usersKycService = services.usersKyc;

         HashMap <String,Object> params = new HashMap<String,Object>();
         JsonObject response = usersKycService.list( params );
         System.out.println("response: " + response.toString() );
    }
}
```

A GET to `https://kyc.ost.com/api/v2/users-kyc` returns a list of all user-kyc objects. A `user-kyc` object provides some properties and status related information of the kyc details that a user had last submitted. The `user-kyc` objects are returned sorted by the time when the latest kyc details were submitted, with the most recent `user-kyc` object appearing first.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|filters | object | no | A filter on the list based on the object `filters` field. The value can be a boolean or a string |
|page\_number|integer|no | A field that helps in pagination. page\_number is an integer that defines the page of  the list to fetch. For instance, if you make a list request and receive 100 objects, each page sends 10 objects as default limit is 10. If you want to access 45th object your subsequent call can include page\_number=5 in order to fetch the 5th page of the list|
|order|string|no| A sort order to be applied based on the `user-kyc` entry creation time. default is desc ( asc / desc ) |
|limit|integer|no| A limit on the number of `user-kyc` objects to be sent in one request(min. 1, max. 100, default 10)|

<br>
<u>**Filter Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|admin_status| string | no | A filter on `user-kyc` "admin status" :<br> "unprocessed", <br> "qualified", <br> "denied"|
|aml_status|string|no| A filter on `user-kyc` aml\_status :<br> "cleared:approved", <br> "unprocessed", <br> "pending", <br> "cleared", <br> "approved", <br> "rejected", <br> "failed".|
|whitelist_status|string| no | A filter on `user-kyc` whitelist\_status:<br>"unprocessed", <br> "started", <br> "done", <br> "failed".| 
|admin\_action\_types| string | no | A filter on `user-kyc` admin\_action_types:<br> "no\_admin\_action", <br> "data\_mismatch", <br> "document\_issue", <br> "other\_issue"|

<br>
<u>**Returns**</u><br>

> Example Response code

```jason
{
   "success": true,
   "data": {
      "result_type": "users_kyc",
      "users_kyc": [
         {
            "id": 298,
            "user_kyc_detail_id": 688,
            "user_id": 11434,
            "kyc_status": "pending",
            "admin_status": "unprocessed",
            "aml_status": "cleared",
            "whitelist_status": "unprocessed",
            "admin_action_types": [],
            "submission_count": 25,
            "last_acted_by": "Admin Name",
            "created_at": 1539178516
         },
         {
            "id": 297,
            "user_kyc_detail_id": 663,
            "user_id": 11333,
            "kyc_status": "pending",
            "admin_status": "unprocessed",
            "aml_status": "cleared",
            "whitelist_status": "unprocessed",
            "admin_action_types": [],
            "submission_count": 2,
            "last_acted_by": "",
            "created_at": 1539171237
         },
         {
            "id": 294,
            "user_kyc_detail_id": 656,
            "user_id": 11425,
            "kyc_status": "pending",
            "admin_status": "unprocessed",
            "aml_status": "cleared",
            "whitelist_status": "unprocessed",
            "admin_action_types": [],
            "submission_count": 16,
            "last_acted_by": "",
            "created_at": 1539093563
         },
         {
            "id": 281,
            "user_kyc_detail_id": 601,
            "user_id": 11401,
            "kyc_status": "approved",
            "admin_status": "qualified",
            "aml_status": "cleared",
            "whitelist_status": "failed",
            "admin_action_types": [],
            "submission_count": 1,
            "last_acted_by": "Admin Name",
            "created_at": 1538642905
         },
         {
            "id": 279,
            "user_kyc_detail_id": 598,
            "user_id": 11399,
            "kyc_status": "pending",
            "admin_status": "unprocessed",
            "aml_status": "cleared",
            "whitelist_status": "unprocessed",
            "admin_action_types": [],
            "submission_count": 1,
            "last_acted_by": "Admin Name",
            "created_at": 1538577254
         },
         {
            "id": 238,
            "user_kyc_detail_id": 509,
            "user_id": 11341,
            "kyc_status": "approved",
            "admin_status": "qualified",
            "aml_status": "cleared",
            "whitelist_status": "done",
            "admin_action_types": [],
            "submission_count": 1,
            "last_acted_by": "Admin Name",
            "created_at": 1537282934
         },
         {
            "id": 232,
            "user_kyc_detail_id": 502,
            "user_id": 11332,
            "kyc_status": "approved",
            "admin_status": "qualified",
            "aml_status": "cleared",
            "whitelist_status": "done",
            "admin_action_types": [],
            "submission_count": 2,
            "last_acted_by": "",
            "created_at": 1536909857
         },
         {
            "id": 229,
            "user_kyc_detail_id": 497,
            "user_id": 11329,
            "kyc_status": "approved",
            "admin_status": "qualified",
            "aml_status": "cleared",
            "whitelist_status": "done",
            "admin_action_types": [],
            "submission_count": 1,
            "last_acted_by": "Admin Name",
            "created_at": 1536755792
         },
         {
            "id": 228,
            "user_kyc_detail_id": 496,
            "user_id": 11327,
            "kyc_status": "approved",
            "admin_status": "qualified",
            "aml_status": "cleared",
            "whitelist_status": "failed",
            "admin_action_types": [],
            "submission_count": 1,
            "last_acted_by": "Admin Name",
            "created_at": 1536755131
         },
         {
            "id": 225,
            "user_kyc_detail_id": 493,
            "user_id": 11322,
            "kyc_status": "approved",
            "admin_status": "qualified",
            "aml_status": "cleared",
            "whitelist_status": "failed",
            "admin_action_types": [],
            "submission_count": 3,
            "last_acted_by": "Admin Name",
            "created_at": 1536739936
         }
      ],
      "meta": {
         "total": 13,
         "next_page_payload": {
            "page_number": 2,
            "filters": {},
            "order": "desc",
            "limit": 10
         }
      }
   }
}
```
For api calls to `/users-kyc/` the data.result_type is the string "users_kyc" and the key data.users\_kyc is an array of the returned `user-kyc` objects (10 objects per page). The field data.meta.next_page_payload contains the filter and order information and the page_no number for the next page or is empty for the last page of the list.

Each entry in the array is a separate user\_kyc object. If no more `user-kyc` objects are available, the resulting array will be empty without an error thrown.


# Utilities
## Get Pre-signed URL - PUT
> Example request code

```ruby
require('ost-kyc-sdk-ruby')

# The timeout in the config is the timeout in seconds for which the socket connection will remain open
CONFIG = {timeout: 10}

ost_kyc_sdk = OstKycSdkRuby::Saas::Services.new({
    api_key: 'Your API key', 
    api_secret: 'Your API Secret', 
    api_base_url: 'API base URL', 
    config: CONFIG})

users_kyc_service = ost_kyc_sdk.services.users_kyc

params = {
    'files': {
        'residence_proof': 'application/pdf',
        'investor_proof_file1': 'application/pdf',
        'investor_proof_file2': 'application/pdf',
        'document_id': 'image/jpeg',
        'selfie': 'image/jpeg'
}

signed_urls = users_kyc_service.get_presigned_url_put(params).to_json
```

```python
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({ 'api_key': '9864024263fc2a20a3fc0f795f776819' , 
                                        'api_secret': 'a999622f480d8689e491b0aaa3f0c5f8' , 
                                        'api_base_url': 'https://kyc.stagingost.com',
                                        'config': {'timeout': 10 }
                                        })
Services = kyc_sdk.services
response = Services.users_kyc.get_pre_signed_url_put({'files': {
    'residence_proof': 'application/pdf',
    'investor_proof_file1': 'application/pdf',
    'investor_proof_file2': 'application/pdf',
    'document_id': 'image/jpeg',
    'selfie': 'image/jpeg'
}})
print(response)
```

```javascript
const KYCSDK = require('@ostdotcom/ost-kyc-sdk-js');

const kycObj = new KYCSDK({
   apiKey: <api_key>, 
   apiSecret: <api_secret>, 
   apiEndpoint: <api_endpoint>, 
   config: {timeout: <timeout>}
   });

const usersKYCService = kycObj.services.usersKyc

usersKYCService.getPresignedUrlPut({
   files: {
      residence_proof: 'application/pdf',
      investor_proof_file1: 'application/pdf',
      investor_proof_file2: 'application/pdf',
      document_id: 'image/jpeg',
      selfie: 'image/jpeg'
   }
})
.then(function(res) { 
   console.log(JSON.stringify(res, null, "  ")); })
.catch(function(err) { 
   console.log(JSON.stringify(err)); 
});
```

```php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API_KEY';
$params['apiSecret']='API_SECRET';
$params['apiBaseUrl']='API_BASE_URL';

// The config field is optional for $ostKycSdkObj Object
$nestedparams = array();
// This is the timeout in seconds for which the socket connection will remain open
$nestedparams["timeout"] = 15;
$params["config"] = $nestedparams;

$ostKycSdkObj = new OSTKYCSDK($params);

$usersKycService = $ostKycSdkObj->services->usersKyc;

$params = array();
$nestedparams = array();

$nestedparams['selfie'] = 'image/jpeg';
$nestedparams['document_id'] = 'image/jpeg';
$nestedparams['investor_proof_file1'] = 'application/pdf';
$nestedparams['investor_proof_file2'] = 'application/pdf';
$nestedparams['residence_proof'] = 'application/pdf';

$params['files'] = $nestedparams;

$response = $usersKycService->get_presigned_url_put($params)->wait();
var_dump($response);
```

```java
import java.io.IOException;
import java.util.HashMap;

import com.ost.kyc.OSTKYCSDK;
import com.ost.kyc.services.OSTKYCAPIService;

import com.google.gson.JsonObject;

public class Test {
    public static void main(String[] args) throws IOException, OSTKYCAPIService.MissingParameter, OSTKYCAPIService.InvalidParameter {
         HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
         
         sdkConfig.put("apiEndpoint", "API base URL");
         sdkConfig.put("apiKey", "Your API key");
         sdkConfig.put("apiSecret", "API secret"); 

         OSTKYCSDK ostObj = new OSTKYCSDK(sdkConfig);
         com.ost.kyc.services.v2.Manifest services = (com.ost.kyc.services.v2.Manifest) ostObj.services;
         
         com.ost.kyc.services.v2.UsersKyc usersKycService = services.usersKyc;

         HashMap <String, Object> params = new HashMap<String, Object>();
         HashMap <String, String> nestedparams = new HashMap<String, String>();

         nestedparams.put("selfie", "image/jpeg");
         nestedparams.put("residence_proof", "application/pdf");
         nestedparams.put("investor_proof_file1", "application/pdf");
         nestedparams.put("investor_proof_file2", "application/pdf");
         nestedparams.put("document_id", "image/jpeg");


         params.put("files", nestedparams);
         JsonObject response = usersKycService.get_presigned_url_put( params );
         System.out.println("response: " + response.toString());
    }
}
```

While filling in KYC details there are identification and other documents that a user submits which are required to be uploaded for verification. The upload functionality is achieved by generating a pre-signed S3 URL. These URLs are used to get temporary access to an otherwise private OST KYC S3 bucket and can be used for putting user documents in that bucket. 

A GET to `https://kyc.ost.com/api/v2/users-kyc/pre-signed-urls/for-put` will generate the pre-signed URL for uploading the documents which we return in the response. We also show example code for consuming the response this endpoint sends.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|files | object | yes | A 'files' object. Where data.unique identifier is a key and its content type is a value. <br> Supported content types: <br> 'image/jpeg',<br> 'image/png', <br>'image/jpg',<br>'application/pdf '|

<u>**Returns**</u><br>
For api calls to `/users-kyc/pre-signed-urls/for-put` the data.result\_type is the string "file\_upload\_put" and the key data.file\_upload_put is a `file_upload_put` object. The pre-signed URLs will be sent against the unique key. The pre-signed URLs are generated with an expiration time of 15 minutes after which they can not used anymore. 

For instance, the value in the key `data.file_upload_put.document_id.fields.key` in the response will be used to set the value of input parameter `document_id_file_path` while adding or updating kyc details for a user using the endpoint `/users-kyc/{{user_id}}`

> Example Response code

```jason
{
    "success": "true",
    "data": {
        "result_type": "file_upload_put",
        "file_upload_put": {
            "document_id": {
                "url": "https://s3.amazonaws.com/kyc.stagingost.com/3/i/anm15395b85581eab3068cb43ftc0rt1?X-Amz-Algorithm=AWS4..",
                "fields": {
                    "key": "3/i/anm15395b85581eab3068cb43ftc0rt1"
                    }
                },
            "selfie": {
                "url": "https://s3.amazonaws.com/kyc.stagingost.com/3/i/b3vvte895rt5581eab3068cb43ftc0vg?X-Amz-Algorithm=AWS4..",
                "fields": {
                    "key": "3/i/b3vvte895rt5581eab3068cb43ftc0vg"
                    }
                },
            "residence_proof": {
                "url": "https://s3.amazonaws.com/kyc.stagingost.com/3/d/276dv5b85581eab3068cb43ftc0rt1?X-Amz-Algorithm=AWS4..",
                "fields": {
                    "key": "3/d/276dv5b85581eab3068cb43ftc0rt1"
                    }
                },
            "investor_proof_file1": {
                "url": "https://s3.amazonaws.com/kyc.stagingost.com/3/d/anm1539uhu33eab3068cb4c0rt1?X-Amz-Algorithm=AWS4..",
                "fields": {
                    "key": "3/d/anm1539uhu33eab3068cb4c0rt1"
                    }
                },
            "investor_proof_file2": {
                "url": "https://s3.amazonaws.com/kyc.stagingost.com/3/d/bcbeu8558ksoso68cb43ftc0?X-Amz-Algorithm=AWS4..",
                "fields": {
                    "key": "3/d/bcbeu8558ksoso68cb43ftc0"
                    }
                }
        }
    }
}
```

> Example reference code on how to consume response to upload files:

```ruby
require 'openssl'
require 'net/http'

file_path = 'Local_File_Path' # path of the file to be uploaded
pre_signed_url = response['data']['file_upload_put']['document_id']['url'] # pre signed url for document id
uri = URI.parse(pre_signed_url)

r = Net::HTTP.start(uri.host, :use_ssl => true) do |http|
        http.send_request("PUT", uri.request_uri, File.read(file_path), {
          # This is required, or Net::HTTP will add a default unsigned content-type.
          "content-type" => content_type
        })
    end
```

## Get Pre-signed URL - POST
> Example request code

```ruby
require('ost-kyc-sdk-ruby')

# The timeout in the config is the timeout in seconds for which the socket connection will remain open
CONFIG = {timeout: 10}

ost_kyc_sdk = OstKycSdkRuby::Saas::Services.new({
    api_key: 'Your API key', 
    api_secret: 'Your API Secret', 
    api_base_url: 'API base URL', 
    config: CONFIG})

users_kyc_service = ost_kyc_sdk.services.users_kyc

params = {
    'files': {
        'residence_proof': 'application/pdf',
        'investor_proof_file1': 'application/pdf',
        'investor_proof_file2': 'application/pdf',
        'document_id': 'image/jpeg',
        'selfie': 'image/jpeg'
}

signed_urls = users_kyc_service.get_presigned_url_post(params).to_json
```

```python
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({ 'api_key': '9864024263fc2a20a3fc0f795f776819' , 
                                        'api_secret': 'a999622f480d8689e491b0aaa3f0c5f8' , 
                                        'api_base_url': 'https://kyc.stagingost.com',
                                        'config': {'timeout': 10 }
                                        })
Services = kyc_sdk.services
response = Services.users_kyc.get_pre_signed_url_put({'files': {
    'residence_proof': 'application/pdf',
    'investor_proof_file1': 'application/pdf',
    'investor_proof_file2': 'application/pdf',
    'document_id': 'image/jpeg',
    'selfie': 'image/jpeg'
}})
print(response)
```

```javascript
const KYCSDK = require('@ostdotcom/ost-kyc-sdk-js');

const kycObj = new KYCSDK({
   apiKey: <api_key>, 
   apiSecret: <api_secret>, 
   apiEndpoint: <api_endpoint>, 
   config: {timeout: <timeout>}
   });

const usersKYCService = kycObj.services.usersKyc

usersKYCService.getPresignedUrlPost({
   files: {
      residence_proof: 'application/pdf',
      investor_proof_file1: 'application/pdf',
      investor_proof_file2: 'application/pdf',
      document_id: 'image/jpeg',
      selfie: 'image/jpeg'
   }
})
.then(function(res) { 
   console.log(JSON.stringify(res, null, "  ")); })
.catch(function(err) { 
   console.log(JSON.stringify(err)); 
});
```

```php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API_KEY';
$params['apiSecret']='API_SECRET';
$params['apiBaseUrl']='API_BASE_URL';

// The config field is optional for $ostKycSdkObj Object
$nestedparams = array();
// This is the timeout in seconds for which the socket connection will remain open
$nestedparams["timeout"] = 15;
$params["config"] = $nestedparams;

$ostKycSdkObj = new OSTKYCSDK($params);

$usersKycService = $ostKycSdkObj->services->usersKyc;

$params = array();
$nestedparams = array();

$nestedparams['selfie'] = 'image/jpeg';
$nestedparams['document_id'] = 'image/jpeg';
$nestedparams['investor_proof_file1'] = 'application/pdf';
$nestedparams['investor_proof_file2'] = 'application/pdf';
$nestedparams['residence_proof'] = 'application/pdf';

$params['files'] = $nestedparams;

$response = $usersKycService->get_presigned_url_post($params)->wait();
var_dump($response);
```

```java
import java.io.IOException;
import java.util.HashMap;

import com.ost.kyc.OSTKYCSDK;
import com.ost.kyc.services.OSTKYCAPIService;

import com.google.gson.JsonObject;

public class Test {
    public static void main(String[] args) throws IOException, OSTKYCAPIService.MissingParameter, OSTKYCAPIService.InvalidParameter {
         HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
         
         sdkConfig.put("apiEndpoint", "API base URL");
         sdkConfig.put("apiKey", "Your API key");
         sdkConfig.put("apiSecret", "API secret"); 

         OSTKYCSDK ostObj = new OSTKYCSDK(sdkConfig);
         com.ost.kyc.services.v2.Manifest services = (com.ost.kyc.services.v2.Manifest) ostObj.services;
         
         com.ost.kyc.services.v2.UsersKyc usersKycService = services.usersKyc;

         HashMap <String, Object> params = new HashMap<String, Object>();
         HashMap <String, String> nestedparams = new HashMap<String, String>();

         nestedparams.put("selfie", "image/jpeg");
         nestedparams.put("residence_proof", "application/pdf");
         nestedparams.put("investor_proof_file1", "application/pdf");
         nestedparams.put("investor_proof_file2", "application/pdf");
         nestedparams.put("document_id", "image/jpeg");


         params.put("files", nestedparams);
         JsonObject response = usersKycService.get_presigned_url_post( params );
         System.out.println("response: " + response.toString());
    }
}
```


While filling in KYC details there are identification and other documents that a user submits which are required to be uploaded for verification. The upload functionality is achieved by generating a pre-signed S3 URL. These URLs are used to get temporary access to an otherwise private OST KYC S3 bucket and can be used for putting user documents in that bucket. 

A GET to `https://kyc.ost.com/api/v2/users-kyc/pre-signed-urls/for-post` will generate the pre-signed URL for uploading the documents which we return in the response. It allows to upload documents to S3 directly from browser using an HTML form. 

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|files | object | yes | A 'files' object. Where data.unique identifier is a key and its content type is a value. <br> Supported content types: <br> 'image/jpeg',<br> 'image/png', <br>'image/jpg',<br>'application/pdf '|


<u>**Returns**</u><br>
For api calls to `/users-kyc/pre-signed-urls/for-post` the data.result\_type is the string "file\_upload\_post" and the key data.file_upload\_post is a `file_upload_post` object. The pre-signed URLs will be sent against the unique key. The pre-signed URLs are generated with an expiration time of 15 minutes after which they can not used anymore.

> Example Response code

```jason
{
    "success": true,
    "data": {
        "result_type": "file_upload_post",
        "file_upload_post": {
            "document_id": {
                "url": "https://s3.amazonaws.com/kyc.ost.com",
                "fields": {
                    "key": "3/i/b3vvte895rt5581eab3068cb43ftc0vg1",
                    "x-amz-server-side-encryption": "aws:kms",
                    "x-amz-server-side-encryption-aws-kms-key-id": "5734c3ab-c4ae-4424-a464-2253ui828296",
                    "policy": "abcdefghijklmnopqrstuvwxvz",
                    "x-amz-credential": "akiajudralnurkavs5iq/20180123/us-east-1/s3/aws4_request",
                    "x-amz-algorithm": "aws4-hmac-sha256",
                    "x-amz-date": "20180123t091405z",
                    "x-amz-signature": "34cc2f3925c360ecf0ed2ed5a1074f23537807005ffa21e4bc1ebb5225f9875a"                

                }
            }
        }
    }
}
```

For using the pre-signed URL to build an HTML Form it is recommended to use some helper to build the form tag and input tags that properly escapes values. To upload a file to S3 using a browser, you need to create a post form. The key `data.file_upload_post.document_id.url` in the response is the value you should use as the form action.

<aside class="success">
< form action="<%= @data.file_upload_post.document_id.url %>" method="post" enctype="multipart/form-data">
 <br> ... <br>
<\/form>
</aside>

Also the value in the key `data.file_upload_post.document_id.fields.key` in the response will be used to set the value of input parameter `document_id_file_path` while adding or updating kyc details for a user using the endpoint `/users-kyc/{{user_id}}`


## Validate Ethereum Address
> Example Request code:

```ruby
require('ost-kyc-sdk-ruby')

# The timeout in the config is the timeout in seconds for which the socket connection will remain open
CONFIG = {timeout: 10}

ost_kyc_sdk = OstKycSdkRuby::Saas::Services.new({
    api_key: 'Your API key', 
    api_secret: 'Your API Secret', 
    api_base_url: 'API base URL', 
    config: CONFIG})

validators_service = ost_kyc_sdk.services.validators
validators_service.verify_ethereum_address({ethereum_address: '0x7f2ED21D1702057C7d9f163cB7e5458FA2B6B7c4'}).to_json
```

```python
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({ 'api_key': '9864024263fc2a20a3fc0f795f776819' , 
                                        'api_secret': 'a999622f480d8689e491b0aaa3f0c5f8' , 
                                        'api_base_url': 'https://kyc.stagingost.com',
                                        'config': {'timeout': 10 }
                                        })
Services = kyc_sdk.services
validator_service = Services.validators
response = validator_service.verify_ethereum_address({'ethereum_address': '0x32be343b94f860124dc4fee278fdcbd38c102d88'})
print(response)
```

```javascript
const KYCSDK = require('@ostdotcom/ost-kyc-sdk-js');

const kycObj = new KYCSDK({
   apiKey: <api_key>, 
   apiSecret: <api_secret>, 
   apiEndpoint: <api_endpoint>, 
   config: {timeout: <timeout>}
   });

const validatorService = kycObj.services.validators;

validatorService.verifyEthereumAddress({
   ethereum_address: '0x32be343b94f860124dc4fee278fdcbd38c102d88'})
.then(function(res) { 
   console.log(JSON.stringify(res)); })
.catch(function(err) { 
   console.log(JSON.stringify(err)); 
});
```

```php
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API_KEY';
$params['apiSecret']='API_SECRET';
$params['apiBaseUrl']='API_BASE_URL';

// The config field is optional for $ostKycSdkObj Object
$nestedparams = array();
// This is the timeout in seconds for which the socket connection will remain open
$nestedparams["timeout"] = 15;
$params["config"] = $nestedparams;

$ostKycSdkObj = new OSTKYCSDK($params);

$validatorsService = $ostKycSdkObj->services->validators;

$params = array();
$params['ethereum_address'] = '0x7f2ED21D1702057C7d9f163cB7e5458FA2B6B7c4';
$response = $validatorsService->verify_ethereum_address($params)->wait();
var_dump($response);
```

```java
import java.io.IOException;
import java.util.HashMap;

import com.ost.kyc.OSTKYCSDK;
import com.ost.kyc.services.OSTKYCAPIService;

import com.google.gson.JsonObject;

public class Test {
    public static void main(String[] args) throws IOException, OSTKYCAPIService.MissingParameter, OSTKYCAPIService.InvalidParameter {
         HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
         
         sdkConfig.put("apiEndpoint", "API base URL");
         sdkConfig.put("apiKey", "Your API key");
         sdkConfig.put("apiSecret", "API secret"); 

         OSTKYCSDK ostObj = new OSTKYCSDK(sdkConfig);
         com.ost.kyc.services.v2.Manifest services = (com.ost.kyc.services.v2.Manifest) ostObj.services;
         
         com.ost.kyc.services.v2.Validators validatorService = services.validators;

         HashMap <String, Object> params = new HashMap<String, Object>();
         params.put("ethereum_address", "0x7f2ED21D1702057C7d9f163cB7e5458FA2B6B7c4");
         JsonObject response = validatorService.verify_ethereum_address( params );
         System.out.println("response: " + response.toString() );
    }
}
```

A GET to `https://kyc.ost.com/api/v2/ethereum-address-validation` checks if Ethereum Address format is correct.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|ethereum_address | string | yes | Ethereum address to be validated.|

<u>**Returns**</u><br>
For api calls to `/ethereum-address-validation` a success `true` is sent if the ethereum address is in correct format. And a `false` in case the format of the ethereum address is in correct.

> Example Response

```jason
{
  "success": true
}
```

# WebHooks

 Webhooks will notify a URL of your choice with information about events that occur while a user registers or user's KYC is being processed. You can use this data to delete users, determine when a double opt-in is done by a user, react to when a user adds or updates their KYC information, identify when status of a KYC entry is updated, determine when an ethereum address is updated. With different `Event Type` and `Source` parameters we provide, you can filter events that can be recieved on a URL which will help you give a clear structure to your KYC processes and flows.

| Source  | Description | 
-----------|------------------
|  web | If the source is web it indicates the action is taken by the user or admin from the website. |
|  api | If the source is api it indicates an api call was made by the client triggering the event. |
|  kyc_system |  If the source is kyc\_system it indicates event was triggered due to internal KYC system updates. |

## Creat A Webhook

 To get started with the Webhooks :

 1. Go to the [<u>OST KYC Dashboard</u>](https://kyc.ost.com/admin/login).
 2. In the Window, click on to your profile at top-right, open Settings > WebHooks
 3. Click on Add New Webhook.
 4. In the URL field, paste the unique URL that you want to recieve events on.
 5. Select the Filters based on Event Source and Event Type whose notifications you would like to recieve.
 6. Click the ADD button to save these updates.

<aside class="success">Each webhook has a Secret Key that does not changes when a webhook is updated. If you wish to change the secret key you will have to independently hit the refresh icon beside the `SECRET KEY` field.</aside>

<aside class="warning">You can configure upto 3 URLs to recieve OST KYC Events information.</aside>

## Important Details

Now that you've setup Webhooks on the KYC Dashboard, it's important to note a few points before you start integration. Webhooks notify the URL of your choice via HTTP POST requests. Every https post request is sent with a signature. Details of how the signature is generated are given below. 

OST KYC server expects to receive 200 OK in http status code as response within 10 seconds from KYC client server otherwise event will be marked as failed.

Failed events will be retried upto 6 times at an interval of 1 hour increasing exponentially with a factor of 2. Consequently the intervals of retrial will be 1 hr, 2 hrs, 4 hrs, 8 hrs, 16 hrs, 32 hrs. 

## Signature Generation
Every request sent will have two mandatory parameters mentioned below:

* request_timestamp : the current unix timestamp in seconds.
* signature : the signature as the sha256 digest of the secret key and the correctly formatted query string as described below.

### 1. Creating the string to sign.

> Example code to generate signature


```ruby
to generate signature

# For example Webhook url is - https://webhook.ost.com/test/
# Event parameter to send - {"created_at"=>"1541144915", "data"=>{"result_type"=>"user", "user"=>{"created_at"=>"1541144915", "email"=>"yogesh+13233@ost.com", "id"=>"11493", "properties"=>["doptin_mail_sent"]}}, "description"=>"User has signed up", "id"=>"236", "name"=>"user_register", "source"=>"web", "type"=>"user", "version"=>"v1"} 

require 'rails'

event_data = {"created_at"=>"1541144915", "data"=>{"result_type"=>"user", "user"=>{"created_at"=>"1541144915", "email"=>"yogesh+13233@ost.com", "id"=>"11493", "properties"=>["doptin_mail_sent"]}}, "description"=>"User has signed up", "id"=>"236", "name"=>"user_register", "source"=>"web", "type"=>"user", "version"=>"v1"} 

webhook_url= "https://webhook.ost.com/test/"

def generate_signature(string_to_sign)
  digest = OpenSSL::Digest.new('sha256')
  OpenSSL::HMAC.hexdigest(digest, 'WEBHOOK_SECRET_KEY', string_to_sign) # Make sure to replace `API_SECRET` with your API secret key.
end

params = event_data.merge("request_timestamp" => Time.now.to_i)
string_to_sign = webhook_url + "?" + params.to_query

#generated string_to_sign
#https://webhook.ost.com/test/?created_at=1541144915&data%5Bresult_type%5D=user&data%5Buser%5D%5Bcreated_at%5D=1541144915&data%5Buser%5D%5Bemail%5D=yogesh%2B13233%40ost.com&data%5Buser%5D%5Bid%5D=11493&data%5Buser%5D%5Bproperties%5D%5B%5D=doptin_mail_sent&description=User+has+signed+up&id=236&name=user_register&request_timestamp=1542185198&source=web&type=user&version=v1

signature = generate_signature(string_to_sign)

#generated signature -> "34e852b1bb2b73357483ce7d35a837611f098f9e7df580edb0bb735993868c0a"

```

The string to sign is formed by concatenating the following elements:

* Webhook URL given for notification
* request_timestamp
* Event parameters 

<aside class="warning">Note all the inputs must be alphabetically sorted on the keys. (asc)</aside>

### 2. Generating a signature.

> Example code to verify signature.

```ruby
require 'rails'

received_params = {"created_at"=>"1541144915", "data"=>{"result_type"=>"user", "user"=>{"created_at"=>"1541144915", "email"=>"yogesh+13233@ost.com", "id"=>"11493", "properties"=>["doptin_mail_sent"]}}, "description"=>"User has signed up", "id"=>"236", "name"=>"user_register", "source"=>"web", "type"=>"user", "version"=>"v1", "signature" => "34e852b1bb2b73357483ce7d35a837611f098f9e7df580edb0bb735993868c0a", "request_timestamp" => 1542185198} 

webhook_url= "https://webhook.ost.com/test/"
signature = received_params.delete("signature")


string_to_sign = webhook_url + "?" + received_params.to_query
# parameters sorted alphabetically
#string_to_sign = "https://webhook.ost.com/test/?created_at=1541144915&data%5Bresult_type%5D=user&data%5Buser%5D%5Bcreated_at%5D=1541144915&data%5Buser%5D%5Bemail%5D=yogesh%2B13233%40ost.com&data%5Buser%5D%5Bid%5D=11493&data%5Buser%5D%5Bproperties%5D%5B%5D=doptin_mail_sent&description=User+has+signed+up&id=236&name=user_register&request_timestamp=1542185198&source=web&type=user&version=v1"

digest = OpenSSL::Digest.new('sha256')
generated_signature = OpenSSL::HMAC.hexdigest(digest, 'WEBHOOK_SECRET_KEY', string_to_sign) # Make sure to replace `WEBHOOK_SECRET_KEY` with your Webhook secret key.

if signature == generated_signature
#signature authenticated
else
# invalid signature
end

```

The signature is the sha256 digest of the secret key and the correctly formatted string-to-sign.

generated_signature = Hmac_Sha256_Hexdigest(string-to-sign, secret-key)

## User Events

> Example Webhook Response for register event

```jason
{
   "created_at": "1541144915",
   "data": {
      "result_type": "user",
      "user": {
         "created_at": "1541144915",
         "email": "yogesh+13233@ost.com",
         "id": "11493",
         "properties": [
            "doptin_mail_sent"
         ]
      }
   },
   "description": "User has signed up",
   "id": "236",
   "name": "user_register",
   "request_timestamp": "1541144919",
   "signature": "fae67f17bf5b2ae39e8816952cac76a189997ebaf0f42dcae79ca649dafa6f51",
   "source": "web",
   "type": "user",
   "version": "v1"
}
```


> Example Webhook Response for double opt-in event

```jason
{
   "created_at": "1541152654",
   "data": {
      "result_type": "user",
      "user": {
         "created_at": "1541144915",
         "email": "yogesh+13233@ost.com",
         "id": "11493",
         "properties": [
            "doptin_mail_sent",
            "doptin_done"
         ]
      }
   },
   "description": "User has done double opt in",
   "id": "241",
   "name": "user_dopt_in",
   "request_timestamp": "1541152655",
   "signature": "4f98e901170adad77278ced8fa4f76dbbf7080058bbb8bd5d2b8755dd72251ce",
   "source": "web",
   "type": "user",
   "version": "v1"
}
```

> Example Webhook Response for delete user event

```jason
{
   "created_at": "1541144571",
   "data": {
      "result_type": "user",
      "user": {
         "created_at": "1541144915",
         "email": "yogesh@ost.com",
         "id": "11404",
         "properties": [
            "doptin_mail_sent",
            "doptin_done",
            "kyc_submitted"
         ]
      }
   },
   "description": "User was deletd by admin",
   "id": "234",
   "name": "user_deleted",
   "request_timestamp": "1541144575",
   "signature": "d044b907f7aa8f17b14fbf792612714e65e76097136ca2d6ec7018f1c61dcf86",
   "source": "web",
   "type": "user",
   "version": "v1"
}
```

User events indicate a user's status in the system at that point in time. User events include register, double\_opt_in and delete.

| Event Name | Type | Description | 
------|-----------|------------------
| user_register | user | User has successfully registered. |
| user\_dopt\_in | user | User has accepted the double opt-in email.   |
| user_deleted | user |  User has been deleted from the system.   |



## User KYC Events

> Example Webhook Response for user KYC submit event

```jason
{
   "created_at": "1541753766",
   "data": {
      "result_type": "user_kyc",
      "user_kyc": {
         "admin_status": "unprocessed",
         "aml_status": "cleared",
         "created_at": "1541753703",
         "id": "337",
         "kyc_status": "pending",
         "last_acted_by": "",
         "submission_count": "2",
         "user_id": "11483",
         "user_kyc_detail_id": "820",
         "whitelist_status": "unprocessed"
      }
   },
   "description": "User has submitted kyc data",
   "id": "345",
   "name": "kyc_submit",
   "request_timestamp": "1541753770",
   "signature": "ef55a8e894b0ff94b4cfc245921aafb1644938c101c8d8e27c8397c938d9c07f",
   "source": "api",
   "type": "user_kyc",
   "version": "v1"
}
```

> Example Webhook Response for Etherum Address Update event

```jason
{
   "created_at": "1541756913",
   "data": {
      "result_type": "user_kyc",
      "user_kyc": {
         "admin_status": "unprocessed",
         "aml_status": "cleared",
         "created_at": "1541755701",
         "id": "338",
         "kyc_status": "pending",
         "last_acted_by": "all is well kyc",
         "submission_count": "2",
         "user_id": "11497",
         "user_kyc_detail_id": "823",
         "whitelist_status": "unprocessed"
      }
   },
   "description": "Admin has updates ethereum address of user",
   "id": "353",
   "name": "update_ethereum_address",
   "request_timestamp": "1541756919",
   "signature": "d489a5c8a796ac0652df7d76c62b2d5d6819c78f4d68040929d99490dad9cfc9",
   "source": "web",
   "type": "user_kyc",
   "version": "v1"
}
```

> Example Webhook Response when a KYC entry is re-opened

```jason
{
   "created_at": "1541144431",
   "data": {
      "result_type": "user_kyc",
      "user_kyc": {
         "admin_status": "unprocessed",
         "aml_status": "cleared",
         "created_at": "1538648382",
         "id": "284",
         "kyc_status": "pending",
         "last_acted_by": "yogesh + 6",
         "submission_count": "5",
         "user_id": "11404",
         "user_kyc_detail_id": "613",
         "whitelist_status": "unprocessed"
      }
   },
   "description": "user kyc case was reopened by admin",
   "id": "232",
   "name": "kyc_reopen",
   "request_timestamp": "1541144436",
   "signature": "475dd44692bf50cd206fb29df4c023ed056b63e6f84933586242d056f72fc025",
   "source": "web",
   "type": "user_kyc",
   "version": "v1"
}
```

> Example Webhook Response when status of a KYC entry changes

```jason
{
   "created_at": "1541154581",
   "data": {
      "result_type": "user_kyc",
      "user_kyc": {
         "admin_status": "qualified",
         "aml_status": "cleared",
         "created_at": "1541152723",
         "id": "328",
         "kyc_status": "approved",
         "last_acted_by": "yogesh + 6",
         "submission_count": "3",
         "user_id": "11493",
         "user_kyc_detail_id": "790",
         "whitelist_status": "unprocessed"
      }
   },
   "description": "user kyc state has changed",
   "id": "256",
   "name": "kyc_status_update",
   "request_timestamp": "1541154583",
   "signature": "5edf777d1283bd37397285288cd27d73d06f4b912250ebf579455103e2a2927a",
   "source": "web",
   "type": "user_kyc",
   "version": "v1"
}
```

User KYC events indicate the status of user's KYC entry in the system at a given point in time. User KYC events include submit KYC, Update Ethereum Address, KYC entry re-opened and KYC entry status changes. 

| Event Name | Type | Description | 
------|-----------|------------------
| kyc_submit | user\_kyc | User has added or updated the KYC information in the system. |
| update\_ethereum\_address | user\_kyc | User's ethereum address has been updated. |
| kyc_reopen | user\_kyc |  An approved or rejected KYC application of a user has been re-opened. |
| kyc\_status\_update| user\_kyc | Status of KYC entry changes in following cases <br> `aml_status` :  When AML status for a KYC entry changes the event is triggered. <br> `admin_action_types` : When admin reports any issue against a KYC entry in the OST KYC dashboard the event is triggered. <br> `admin_status` : Whenever the admin qualifies or denies the KYC entry the event is triggered. <br> `whitelist_status` :  When the whitelist status for a KYC entry changes after kyc is approved the event is triggered. |










