---
id: api_users_edit
title: OST KIT⍺ API | Update A User
sidebar_label: Update A User
---

Post to `/users/{id}` to edit an existing `user` for a given unique identifier within the application.

A user can own branded tokens within your branded token economy.  Users can exchange branded tokens within your application through transaction types.  Users also hold an airdrop token balance, which consists of tokens the company awards to the user to spend within the economy.

### Input Parameters

| Parameter           | Type      | Mandatory| Description  |
|---------------------|-----------|--------|
| _api_key_           | string    | yes | API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | yes| epoch time in seconds of current time |
| _signature_         | hexstring | yes | [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |
| _uuid_              | uuid      | yes| uuid of the user to edit |
| _name_              | string    | no |new name of the user (not unique) |

where the signature is derived from the API secret key and the string to sign.The string to sign is formed with API parameters alphabetically sorted as below.

`/users/69cc4fcd-39ca-4499-8948-c402dd83fcd8?api_key=ed0787e817d4946c7e76&name=Alice&request_timestamp=1526394008`

The request url of this post request reads as

> POST - `https://playgroundapi.ost.com/users/{id}`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

api_key=API_KEY&request_timestamp=EPOCH_TIME_SEC&name=NAME&signature=SIGNATURE&uuid=UUID

```
### JSON Response Object

| Key        | Type   | Description      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users/{id}` the `data.result_type` is the string "users"
and the key `data.users` is an array of `user` objects.
On successful edit of a user, `users` contains the edited user as a single element.

### User Object Attributes

| Parameter | Type   | Description  |
|-----------|--------|--------|
| _id_      | string | user id |
| _addresses_    | array | [(chain id, address),(chain id, address)]  |
| _name_    | string | name of the user (not unique)  |
| _airdropped_tokens_ | string [number] | 	total amount of airdropped tokens to the user |
| _token_balance_           | string [number] | current balance of the user |

### Example Success Response

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

### Example Failure Responses

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

### Sample Code | Curl
```bash
curl --request POST \
--url 'https://playgroundapi.ost.com/users/{id}' \
--header 'Accept: application/json' \
--form request_timestamp=EPOCH_TIME_SEC \
--form signature=SIGNATURE \
--form api_key=API_KEY \
--form name=NAME \
--form uuid=UUID \
```

>_last updated 30th April 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2