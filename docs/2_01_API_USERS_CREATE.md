---
id: api_users_create
title: OST KIT API | Create A User
sidebar_label: /users/create
---

Post to `/users/create` to register a new `user` and obtain a unique identifier to interact with the created user within your application.

A user can own branded tokens within your branded token economy.  Users can exchange branded tokens within your application through transaction types.  Users also hold an airdrop token balance which are tokens the company awards to the user to spend within the economy. {Link to further documentation on airdrop}

### Input Parameters

| Parameter           | Type      | Value  |
|---------------------|-----------|--------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _name_              | string    | name of the user |

where the signature is derived from the API secret key and the string to sign

`/users/create?api_key=API_KEY&name=NAME&request_timepstamp=EPOCH_TIME_SEC`

so that the full request uri and form reads

https://playgroundapi.ost.com/users/create?api_key=API_KEY&name=NAME&request_timepstamp=EPOCH_TIME_SEC&signature=SIGNATURE

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users` the `data.result_type` is the string "economy_users"
and the key `data.economy_users` is an array of `user` objects.
On successful creation of the user, `economy_users` contains the created user as a single element.

### User Object Attributes:

| Parameter | Type   | Value  |
|-----------|--------|--------|
| _name_    | string | name of the user  |
| _id_      | string | (uuid copy, deprecated) |
| _uuid_    | string | unique identifier for the user  |
| _total_airdropped_tokens_ | number | airdrop balance of the user |
| _token_balance_           | number | balance of the user         |

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
For a failed authentication the response is returned with status code 401 and the body can look like this,

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
however when a request is invalid the response is returned with status code 200 and the message and error data contain further information.
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
  --data name=NAME api_key=API_KEY signature=SIGNATURE \
         request_timestamp=EPOCH_TIME_SEC
```

>_last updated 8 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT alpha v1 | OpenST Platform v0.9.2
