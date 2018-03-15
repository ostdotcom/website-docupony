---
id: api_authentication
title: OST KIT⍺ API | Authenticate
sidebar_label: authentication
---

Every API request on `https://playgroundapi.ost.com` requires hash-based message authentication.  You can obtain your API key and shared API secret for your branded token from the OST KIT⍺ Developers API console at [<u>kit.ost.com/developer-api-console</u>](https://kit.ost.com/developer-api-console).

Every request has three mandatory parameters that must be included:
- `api_key`, the API key as provided from [<u>OST KIT⍺</u>](kit.ost.com/developer-api-console)
- `request_timestamp`, the current unix timestamp in seconds.
- `signature`, the signature as the sha256 digest of the shared API secret and the correctly formatted query string as described below.

The request timestamp will be valid for up to ten seconds.  Your computer clock must therefore be synchronised for authentication to succeed.

To generate the signature you must form the query string as follows

```json
endpoint?input1=INPUT1&input2=INPUT2&...
```

where the inputs must include `api_key` and `request_timestamp` and the functional inputs. As an example

```json
"/users/create?api_key=4b66f566d7596e2b733b&name=Alice+Anderson&request_timestamp=1521073147"
```

and all the inputs must be alphabetically sorted on the keys.  The keys are lower-case, snake case as documented for each API endpoint.  Spaces in input values are replaced with plus sign `+`.

When using the [<u>Ruby SDK</u>](3_01_SDK_RUBY.md) authentication is handled for you.  In other languages you can implement the signature generation by computing the `sha256` digest of the API secret and the query string.  The resulting signature must be then included in the request.

### NodeJS Authentication Example

An example code snippet to generate the API signature given the API key and the API shared secret for a request can be implemented as follows:

```javascript
const queryString = require('query-string');

generateQueryString: function (endpoint, inputParams, apiKey, requestTimestamp) {
  inputParams["api_key"] = apiKey;
  inputParams["request_timestamp"] = requestTimestamp;
  const queryParamsString = queryString.stringify(inputParams, {arrayFormat: 'bracket'}).replace(/%20/g, '+');
  const stringToSign = endpoint + '?' + queryParamsString;
  return stringToSign;
}
```

```javascript
const crypto = require('crypto');

generateApiSignature: function (stringToSign, apiSecret) {
  var buff = new Buffer.from(apiSecret, 'utf8');
  var hmac = crypto.createHmac('sha256', buff);
  hmac.update(stringToSign);
  return hmac.digest('hex');
}
```
