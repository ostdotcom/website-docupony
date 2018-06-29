---
id: version-1.1.0-api_balance
title: OST KIT⍺ API | Retrieve User Balance
sidebar_label: Retrieve User Balance
original_id: api_balance
---

GET to `/balance/{user_id}` to get balance information about a specific user. The {user_id} in the API endpoint is a unique identifier that is returned during the [<u>creation of the user</u>](/docs/api_users_create.html) OR is returned as `id` when a GET is sent to [<u>`/users`</u>](/docs/api_users_list.html).

A user can own branded tokens within your branded token economy.  Users can earn and spend branded tokens by based on the actions  the defined in your economy. Users also hold an airdrop token balance, which consists of tokens the company awards to the user to spend within the economy. The `/balance/{user_id}` API returns a user's token balances that are available to the user to use.

### Input Parameters

| Parameter           | Type        | Definition |
|---------------------|-----------|---------------
| _api_key_           | string      | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com)|
| _request_timestamp_ | number     | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring  | (mandatory) [<u>signature generated</u>](/docs/api_authentication.html) for current request |

where the signature is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted as below.


`/balance/f5f9b061-b784-4ecd-b599-bc263860f539?api_key=ed0787e817d4946c7e76&request_timestamp=1526388800&`


so that the full request query reads

> GET - `https://sandboxapi.ost.com/v1.1/balance/f5f9b061-b784-4ecd-b599-bc263860f539?api_key=6078017455d8be7d9f07&request_timestamp=1526525211&signature=651c9e8214f4a69f293027dcaf19f1130c153397e4fa3c60bddace920ff1145a`

### JSON Response Object

| Key        | Type   | Description      |
|------------|--------|------------|
| _success_  | bool   | whether successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

For api calls to `/balance/{user_id}` the `data.result_type` is the string "balance"
and the key `data.balance` has a single element of the `balance` object with balance details of the user.

### Balance Object Attributes

| Parameter | Type      | Description  |
|-----------|--------|--------|
| _available_balance_    | string\<float\> |current available balance of the user in BT (airdropped_balance + token_balance) |
| _airdropped_balance_| string\<float\> | current balance of tokens that were airdropped to the user in BT |
| _token_balance_           | string\<float\> | current balance of tokens in BT that users have earned within your branded token economy. |

### Example Success Response Body

```json
{
  "success": true,
  "data": {  
      "result_type": "balance",
      "balance":  {  
         "available_balance": "14.243366506781137",
         "airdropped_balance": "6.231683253390568746",
         "token_balance": "8.011683253390568746"
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
however when the user ID passed in the URL invalid the response is returned with successful status code 200, but `success = false` and the `err.msg` contains further information.

```json
{
     "success": false,
     "err": {
        "code": "NOT_FOUND",
        "msg": "A user matching the id could not be located.",
        "internal_id": "s_a_g_2"
     }
  }
```

### Example Code | Curl
```bash
curl --request GET \
--url 'https://sandboxapi.ost.com/v1.1/balance/f5f9b061-b784-4ecd-b599-bc263860f539' \
--header 'Accept: application/json' \
--form request_timestamp=1526548630 \
--form signature=e502252993cfa289390ec5d85ee2322e90e4e1fa0fad08376b1dfd2c775413da \
--form api_key=7cad25e082390a90114e \
```

>_last updated 2nd July 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1.1 | OpenST Platform v0.9.2
