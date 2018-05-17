---
id: version-0.9.1-api_users_create
title: OST KIT⍺ API | Create A User
sidebar_label: /users/create
original_id: api_users_create
---

Post to `/users/create` to register a new `user` and obtain a unique identifier to interact with the created user within your application.

A user can own branded tokens within your branded token economy.  Users can exchange branded tokens within your application through transaction types.  Users also hold an airdrop token balance, which consists of tokens the company awards to the user to spend within the economy.

### Input Parameters

| Parameter           | Type      | Value  |
|---------------------|-----------|--------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |
| _name_              | string    | name of the user |

where the signature is derived from the API secret key and the string to sign.The string to sign is formed with API parameters alphabetically sorted as below.

`/users/create?api_key=API_KEY&name=NAME&request_timestamp=EPOCH_TIME_SEC`

The request url of this post request reads as

> POST - `https://playgroundapi.ost.com/users/create`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

api_key=API_KEY&request_timestamp=EPOCH_TIME_SEC&name=NAME&signature=SIGNATURE

```
### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users/create` the `data.result_type` is the string "economy_users"
and the key `data.economy_users` is an array of `user` objects.
On successful creation of the user, `economy_users` contains the created user as a single element.

### User Object Attributes

| Parameter | Type   | Value  |
|-----------|--------|--------|
| _name_    | string | name of the user  |
| _id_      | string | (uuid copy, deprecated) |
| _uuid_    | string | unique identifier for the user  |
| _total_airdropped_tokens_ | number | cumulative amount airdropped to the user |
| _token_balance_           | number | balance of the user (including current airdrop budget)  |

### Example Success Response

```json
{
  "success": true,
  "data": {
    "result_type": "economy_users",
    "economy_users": [
      {
        "id": "574b456d-5da6-4353-ad7c-9b70893e757b",
        "uuid": "574b456d-5da6-4353-ad7c-9b70893e757b",
        "name": "NAME",
        "total_airdropped_tokens": 0,
        "token_balance": 0
      }
    ],
    "meta": {
      "next_page_payload": {}
    }
  }
}
```

### Example Failure Responses
On a failed authentication the response is returned with status code 401 and the body will look like this,

```json
{
  "success": false,
  "err": {
    "code": "companyRestFulApi(401:HJg2HK0A_f)",
    "msg": "Unauthorized",
    "error_data": {}
  }
}
```
however when a request is invalid the response is returned with successful status code 200, but `success = false` and the `err.msg` and `err.error_data` contain further information.
```json
{
  "success": false,
  "err": {
    "code": "companyRestFulApi(s_a_g_1:rJndQJkYG)",
    "msg": "invalid params",
    "error_data": [
      {
        "name": "Only letters, numbers and spaces allowed. (Max 20 characters)"
      }
    ]
  }
}
```

### Sample Code | Curl
```bash
curl --request POST \
--url 'https://playgroundapi.ost.com/users/create' \
--header 'Accept: application/x-www-form-urlencoded' \
--form request_timestamp=EPOCH_TIME_SEC \
--form signature=SIGNATURE \
--form api_key=API_KEY \
--form name=NAME \
```

>_last updated 30th April 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
