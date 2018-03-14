---
id: api_users_list
title: OST KIT⍺ API | List Users
sidebar_label: /users/list
---

Send a POST request on `/users/list` to receive a paginated - optionally filtered - ordered array of users within the economy.

A user can own branded tokens within your branded token economy.  Users can exchange branded tokens within your application through transaction types.  Users also hold an airdrop token balance which are tokens the company awards to the user to spend within the economy.

### Input Parameters

| Parameter           | Type      | Value  |
|---------------------|-----------|--------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _page_no_           | number    | page number (starts from 1) |
| _filter_            | string    | (optional) filter to be applied on list. Possible values: 'all' or 'never_airdropped' (default) |
| _order_by_          | string | (optional) order the list by 'creation_time' or 'name' (default) |
| _order_             | string | (optional) order users in 'desc' (default) or 'asc' order. |


where the signature is derived from the API secret key and the string to sign is alphabetically sorted,

`/users/list?api_key=API_KEY&filter=FILTER&order=ORDER&order_by=ORDER_BY&page_no=PAGE_NO&request_timestamp=EPOCH_TIME_SEC`

so that the full request query reads

> POST - `https://playgroundapi.ost.com/users/list?api_key=API_KEY&filter=FILTER&order=ORDER&order_by=ORDER_BY&page_no=PAGE_NO&request_timestamp=EPOCH_TIME_SEC&signature=SIGNATURE`

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | get successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users` the `data.result_type` is the string "economy_users"
and the key `data.economy_users` is an array of the returned `user` objects (25 users per page). The field `data.meta.next_page_payload` contains the filter and order information and the `page_no` number for the next page; or is empty for the last page of the list.

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
                "id": "38e55c8c-9d74-4ff4-b2b2-970d37af2ab8",
                "name": "User 2",
                "uuid": "38e55c8c-9d74-4ff4-b2b2-970d37af2ab8",
                "total_airdropped_tokens": "11",
                "token_balance": "15.672930292535913679"
            },
            {
                "id": "013a153e-9dca-4469-90d0-0cb952232462",
                "name": "User 0",
                "uuid": "013a153e-9dca-4469-90d0-0cb952232462",
                "total_airdropped_tokens": "11",
                "token_balance": "7.235361237159729792"
            },
            {
                "id": "914db0a3-72a0-4e71-8d4e-777fc97bae59",
                "name": "User 1",
                "uuid": "914db0a3-72a0-4e71-8d4e-777fc97bae59",
                "total_airdropped_tokens": "11",
                "token_balance": "10.925001587479912272"
            }
    ],
    "meta": {
      "next_page_payload": {
        "order_by": "creation_time",
        "order": "asc",
        "filter": "all",
        "page_no": 2
      }
    }
  }
}
```

>_last updated 8 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
