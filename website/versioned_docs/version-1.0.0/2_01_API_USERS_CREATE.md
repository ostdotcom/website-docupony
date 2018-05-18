---
id: version-1.0.0-api_users_create
title: OST KIT⍺ API | Create a User
sidebar_label: Create a User
original_id: api_users_create
---

Post to `/users` to register a new `user` and obtain a unique identifier to interact with the created user within your application.

A user can own branded tokens within your branded token economy.  Users can exchange branded tokens by performing the respective actions you defined.  Users also hold an airdrop token balance, which consists of tokens the company awards to the user to spend within the economy.

### Input Parameters

| Parameter           | Type        | Definition |
|---------------------|-----------|---------------
| _api_key_           | string      | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com)|
| _request_timestamp_ | number     | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring  | (mandatory) [<u>signature generated</u>](/docs/api_authentication.html) for current request |
| _name_              | string     | name of the user (not unique) |

where the signature is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted as below.


`/users/?api_key=ed0787e817d4946c7e76&name=Alice&request_timestamp=1526388800&`


The request url of this post request reads as

> POST - ` https://sandboxapi.ost.com/v1/users`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

api_key=ed0787e817d4946c7e76&name=Alice&request_timestamp=1526388800&signature=1370bc4398eb5f6811f4713d6fd79ddf8230a64258b7cd4b4a29482ff8ccf7a2

```
### JSON Response Object

| Key        | Type   | Description      |
|------------|--------|------------|
| _success_  | bool   | whether successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

For api calls to `/users` the `data.result_type` is the string "users"
and the key `data.users` is an array of `user` objects.
On successful creation of the user, `users` contains the created user as a single element.

### User Object Attributes

| Parameter | Type      | Description  |
|-----------|--------|--------|
| _id_      | string  | user id (uuid copy, deprecated) |
| _addresses_    | array | [(chain id, address)], e.g. [(1409, 0x21bFfb1c7910e9D0393E3f655E921FB47F70ab56)]  |
| _name_    | string |name of the user (not unique)  |
| _airdropped_tokens_| string\<number\> | total amount of airdropped tokens to the user |
| _token_balance_           | string\<number\> |current balance of the user  |

### Example Success Response Body

```json
{
   "success": true,
   "data": {
      "result_type": "user",
      "user": {
         "id": "d9c97f83-85d5-46b5-a4fb-c73011cbd803",
         "addresses": [
            [
               "1409",
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

### Example Failure Response Bodies
On a failed authentication the response is returned with status code 401 and the body will look like this,

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
however when a request is invalid the response is returned with successful status code 200, but `success = false` and the `err.msg` and `err.error_data` contain further information.
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

### Example Code | Curl
```bash
curl --request POST \
--url 'https://sandboxapi.ost.com/v1/users/' \
--header 'Accept: application/x-www-form-urlencoded' \
--form request_timestamp=1526548630 \
--form signature=e502252993cfa289390ec5d85ee2322e90e4e1fa0fad08376b1dfd2c775413da \
--form api_key=7cad25e082390a90114e \
--form name=Alice \
```

>_last updated 17 May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
