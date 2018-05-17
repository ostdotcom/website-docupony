---
id: version-1.0.0-api_users_retrieve
title: OST KIT⍺ API | Retrieve A User
sidebar_label: Retrieve a user
original_id: api_users_retrieve
---

Send a GET request on `/users/{id}` to get information about a specific user. The {id} in the API endpoint is a unique identifier that is returned during the [<u>creation of the user</u>](/docs/api_users_create.html) OR is returned as `id` when a GET is sent to [<u>`/users`</u>](/docs/api_users_list.html). 

A user can own branded tokens within your branded token economy.  Users can exchange branded tokens within your application by performing the respective actions you defined.  Users also hold an airdrop token balance, which consists of tokens the company awards to the user to spend within the economy.

### Input Parameters

| Parameter           | Type       | Definitions  |
|---------------------|-----------|--------|
| _api_key_           | string      | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com)|
| _request_timestamp_ | number     | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring  | (mandatory) [<u>signature generated</u>](/docs/api_authentication.html) for current request |


The the signature is derived from the API secret key and the string to sign is alphabetically sorted


`/users/e2f14afd-dac1-4657-9cff-32be1f330263?api_key=6078017455d8be7d9f07&request_timestamp=1526525211`

so that the full request query reads

> GET - `https://sandboxapi.ost.com/v1/users/e2f14afd-dac1-4657-9cff-32be1f330263?api_key=6078017455d8be7d9f07&request_timestamp=1526525211&signature=651c9e8214f4a69f293027dcaf19f1130c153397e4fa3c60bddace920ff1145a`

### JSON Response Object

| Key        | Type   | Description      |
|------------|--------|------------|
| _success_  | bool   | get successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users/{id}` the `data.result_type` is the string "user"
and the key `data.user` is an array of the returned `user` object. 

### User Object Attributes

| Parameter | Type   | Description  |
|-----------|--------|--------|
| _id_      | string | user id |
| _addresses_    | array | [(chain id, address)], e.g. [(1409, 0x21bFfb1c7910e9D0393E3f655E921FB47F70ab56)]  |
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
         "id": "e2f14afd-dac1-4657-9cff-32be1f330263",
         "addresses": [
            [
               "198",
               "0xe26aA749269C09ABF947b86361DCDEfC1A3e620A"
            ]
         ],
         "name": "TRICKS",
         "airdropped_tokens": "100",
         "token_balance": "100.463732635165484394"
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
    "code": "UNAUTHORIZED",
    "msg": "We could not authenticate the request. Please review your credentials and authentication method.",
    "error_data": [ ],
    "internal_id": "a_1"
  }
}
```


### Sample Code | Curl
```bash
curl --request GET \
--url 'https://sandboxapi.ost.com/v1/users'
--header 'Accept: application/x-www-form-urlencoded' \
--form request_timestamp=EPOCH_TIME_SEC \
--form signature=SIGNATURE \
--form api_key=API_KEY \
--form filter=FILTER \
--form order=ORDER \
--form order_by=ORDER_BY \
--form page_no=PAGE_NO \
```

>_last updated 17th May 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
