---
id: api_users_edit
title: OST KIT⍺ API | Edit A User
sidebar_label: /users/edit
---

Post to `/users/edit` to edit an existing `user` for a given unique identifier within the application.

A user can own branded tokens within your branded token economy.  Users can exchange branded tokens within your application through transaction types.  Users also hold an airdrop token balance, which consists of tokens the company awards to the user to spend within the economy.

### Input Parameters

| Parameter           | Type      | Value  |
|---------------------|-----------|--------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _uuid_              | uuid      | mandatory uuid of the user to edit |
| _name_              | string    | new name of the user |

where the signature is derived from the API secret key and the string to sign is alphabetically sorted

`/users/edit?api_key=API_KEY&name=NAME&request_timestamp=EPOCH_TIME_SEC&uuid=UUID`

so that the full request uri and form reads

> POST - https://playgroundapi.ost.com/users/edit?api_key=API_KEY&name=NAME&request_timepstamp=EPOCH_TIME_SEC&signature=SIGNATURE&uuid=UUID

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users/edit` the `data.result_type` is the string "economy_users"
and the key `data.economy_users` is an array of `user` objects.
On successful edit of a user, `economy_users` contains the edited user as a single element.

### User Object Attributes:

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
        "id": "2f5f6388-fb0e-4812-929f-f37e5ebbfd50",
        "uuid": "2f5f6388-fb0e-4812-929f-f37e5ebbfd50",
        "name": "NAME",
        "total_airdropped_tokens": "0",
        "token_balance": "0"
      }
    ],
    "meta": {
      "next_page_payload": {}
    }
  }
}
```

### Example Failure Responses

```json
{
  "success": false,
  "err": {
    "code": "companyRestFulApi(s_cu_eu_2.1:rJOpl4JtG)",
    "msg": "User not found",
    "error_data": {}
  }
}
```

### Sample Code | Curl
```bash
curl --request POST \
  --url 'https://playgroundapi.ost.com/users/edit' \
  --data name=NAME api_key=API_KEY signature=SIGNATURE \
         request_timestamp=EPOCH_TIME_SEC uuid=UUID
```

>_last updated 14 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
