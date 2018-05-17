---
id: version-1.0.0-api_authentication
title: OST KIT⍺ API | Authenticate
sidebar_label: Authentication
original_id: api_authentication
---

Every API request on `https://sandboxapi.ost.com/v1` requires hash-based message authentication.  You can obtain your API key and shared API secret for your branded token from the OST KIT⍺ Developers API console at [<u>kit.ost.com/developer-api-console</u>](https://kit.ost.com/developer-api-console).

Every request has three mandatory parameters that must be included:
- `api_key`, the API key as provided from [<u>OST KIT⍺</u>](kit.ost.com/developer-api-console)
- `request_timestamp`, the current unix timestamp in seconds.
- `signature`, the signature as the sha256 digest of the shared API secret and the correctly formatted query string as described below.

The request timestamp will be valid for up to ten seconds.  Your computer clock must therefore be synchronised for authentication to succeed.

The reason for these 3 mandatory parameters in each request is to ensure that the man-in-the-middle cannot change the input params to the request and also so that we can validate the signature on the server side.

When using the [<u>Ruby SDK</u>](/docs/sdk_ruby.html) authentication is handled for you. In other languages you can implement the signature generation by computing the HMAC `sha256`digest of the API secret and the query string. The resulting signature must be then included in the request.

#### **1. Creating the string to sign.**

To generate the signature you must first form the string to sign. This string to sign can be formed by concatenation of the following elements

-  API endpoint
-  api_key, the API key as provided from [OST KIT⍺](https://dev.ost.com/docs/kit.ost.com/developer-api-console)
-  `request_timestamp`, the current unix timestamp in seconds.
-   API parameters.

As an example :

```json
string-to-sign = "/users/?api_key=ed0787e817d4946c7e76&name=Alice&request_timestamp=1526388800&"
```

Note all the inputs must be alphabetically sorted on the keys. The keys are lower-case, snake case as documented for each API endpoint. Spaces in input values are replaced with plus sign`+`.

#### **2. Generating a signature.**

The signature is the sha256 digest of the shared API secret and the correctly formatted query string

generated_signature = Hmac_Sha256_Hexdigest(string-to-sign, api-secret)

As an example final API url : 

> POST - ` https://sandboxapi.ost.com/v1/users`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

api_key=ed0787e817d4946c7e76&name=Alice&request_timestamp=1526388800&signature=1370bc4398eb5f6811f4713d6fd79ddf8230a64258b7cd4b4a29482ff8ccf7a2

```

Please ensure that the final URL is encoded while making the API request.


### NodeJS Authentication Example

#### **1. Create String to Sign**   
 
An example code snippet to form string to sign can be implemented as follows:


```javascript
var request = require('request');
var crypto = require('crypto');
var queryString = require('query-string');
var apiKey = 'API_KEY';
var apiSecret = 'API_SECRET';
var endpoint = 'API_END_POINT';

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
var requestParams = {api_key: apiKey, request_timestamp: createTimeString(), name: 'NAME'};
var stringToSign = generateQueryString(requestParams);
```

#### **2A. Generate and send signature in a GET REQUEST**  

While the code snippet shared above for creating string to sign remains common for all API requests. Shown below is an example code snippet to generate and send signature in a GET request.


```javascript
function generateApiSignature(stringToSign, apiSecret) {
  var buff = new Buffer.from(apiSecret, 'utf8');
  var hmac = crypto.createHmac('sha256', buff);
  hmac.update(stringToSign);
  return hmac.digest('hex');
}

endpoint = stringToSign+'&signature='+generateApiSignature(stringToSign, apiSecret);

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
#### **2B. Generate and send signature in a POST REQUEST**

While the code snippet shared above for creating string to sign remains common for all API requests. Shown below is an example code snippet to generate and send signature in a POST request.

```javascript
function generateApiSignature(stringToSign, apiSecret) {
  var buff = new Buffer.from(apiSecret, 'utf8');
  var hmac = crypto.createHmac('sha256', buff);
  hmac.update(stringToSign);
  return hmac.digest('hex');
}

requestParams.signature = generateApiSignature(stringToSign, apiSecret);

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
>_last updated 17 May 2018_; for support see [help.ost.com](https://help.ost.com/support/home)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2