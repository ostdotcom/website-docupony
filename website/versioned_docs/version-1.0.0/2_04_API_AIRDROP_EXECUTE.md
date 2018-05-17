---
id: version-1.0.0-api_airdrop_execute
title: OST KIT⍺ | Execute an Airdrop
sidebar_label: Execute an Airdrop
original_id: api_airdrop_execute
---

Send a Post request to `/airdrops` to airdrop certain amount of branded tokens to a set of `users`.

You can use this API to send or reward your end-users a selected amount of branded tokens. This enables them to participate in your branded token economy.


### Input Parameters
| Parameter | Type    | Definitions                                    |
|-----------|---------|------------------------------------------|
| _api_key_           | string    | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](/docs/api_authentication.html) for current request |
| _amount_   | Float | (mandatory) The amount of BT that needs to be air-dropped to the selected end-users.  Example:10 |
| _airdropped_ | boolean | true/false. Indicates whether to airdrop tokens to end-users who have been airdropped some tokens **at least once** or to end-users who have **never** been airdropped tokens. |
| _user_ids_ | string |  a comma-separated list of user_ids specifies selected users in the token economy to be air-dropped tokens to. |

### Interdependency of Parameters
Truth Table showing 'airdropped' and 'user_ids' interdependency and expected behaviors

| Value in airdropped | Value in user_ids    | Expected Behavior                                   |
|--------------|---------------------------|------------------------------------------|
| true  | comma-separated list of user ids| Extracts a list of all users you have been airdropped tokens at least once.  Further refines the list to specific user ids passed in parameter 'user_ids'. This refined list is sent the tokens specified in the 'amount' parameter. |
| true | _user_ids_ are not sent in the api request | Extracts a list of all users you have been airdropped tokens at least once. This list is sent the tokens specified in the 'amount' parameter. |
| false | comma-separated list of user ids | Extracts a list of all users you have **never** been airdropped tokens further refines the list to specific user ids passed in parameter 'user_ids'. This refined list is sent the tokens specified in the 'amount' parameter. |
| false | _user_ids_ are not sent in the api request | Extracts a list of all users you have **never** been airdropped tokens. This list is sent the tokens specified in the 'amount' parameter. |
| _airdropped_ value is not set | comma-separated list of user ids | The list to specific user ids is sent the tokens specified in the 'amount' parameter. | 
| _airdropped_ value is not set | _user_ids_ are not sent in the api request | **ALL** users are sent the  tokens specified in the 'amount' parameter. |




The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/airdrops/?amount=10&api_key=6078017455d8be7d9f07&request_timestamp=1526356651&user_ids=f6e750a3-3c20-47b5-b3cc-fd72471efa52%2C+4505bb67-16d8-48bc-8de3-e4313b172e3e%2C+c12390f0-e4f7-45d4-84c2-32ce9aead356`

The request url of this post request reads as

> POST - `https://sandboxapi.ost.com/v1/airdrops`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded
        
amount=10&api_key=6078017455d8be7d9f07&request_timestamp=1526356651&user_ids=f6e750a3-3c20-47b5-b3cc-fd72471efa52%2C+4505bb67-16d8-48bc-8de3-e4313b172e3e%2C+c12390f0-e4f7-45d4-84c2-32ce9aead356&signature=a49aac9aa3e3b0a24f3b8f69a1d4902d737586151220f78eda6bf223b18d1471

```
### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

On calling `/airdrops` the `data.result_type` is a string "airdrop" and the key `data.airdrop` is an object containing the attributes of the airdrop. The 'id' in this object can be used to check the airdrop status using the [<u>retrieve an airdrop</u>](/docs/api_airdrop_retrieve.html) API endpoint.


### Example Success Response
```json
{
   "success": true,
   "data": {
      "result_type": "airdrop",
      "airdrop": {
         "id": "bc6dc9e1-6e62-4032-8862-6f664d8d7541",
         "current_status": "",
         "steps_complete": ""
      }
   }
}
```

### Example Failure Response
```json
{
   "success": false,
   "err": {
      "code": "BAD_REQUEST",
      "msg": "At least one parameter is invalid or missing. See \"err.error_data\" array for more details.",
      "error_data": [
         {
            "parameter": "id",
            "msg": "Invalid airdrop id"
         }
      ],
      "internal_id": "s_am_gas_3"
   }
}
```


### Sample Code | Curl
```bash
curl --request POST \
--url 'https://sandboxapi.ost.com/v1/airdrops/' \
--header 'Accept: application/x-www-form-urlencoded' \
--form request_timestamp=1526549096 \
--form signature=54c488b8f603e614ed45feb3c4a6dc33442b82b8640645a7cd6a80764a381f36 \
--form api_key=7cad25e082390a90114e \
--form amount=1 \
--form user_ids=e55feef0-26e6-438a-9f1a-f348ce2e3c44 \
```

>_last updated 17 May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
