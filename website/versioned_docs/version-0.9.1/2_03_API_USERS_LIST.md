---
id: version-0.9.1-api_users_list
title: OST KIT⍺ API | List Users
sidebar_label: /users/list
original_id: api_users_list
---

Send a GET request on `/users/list` to receive a paginated - optionally filtered - ordered array of users within the economy.

A user can own branded tokens within your branded token economy.  Users can exchange branded tokens within your application through transaction types.  Users also hold an airdrop token balance, which consists of tokens the company awards to the user to spend within the economy.

### Input Parameters

| Parameter           | Type      | Value  |
|---------------------|-----------|--------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |
| _page_no_           | number    | page number (starts from 1) |
| _filter_            | string    | (optional) filter to be applied on list. Possible values: 'all' or 'never_airdropped' (default) |
| _order_by_          | string | (optional) order the list by 'creation_time' or 'name' (default) |
| _order_             | string | (optional) order users in 'desc' (default) or 'asc' order. |


where the signature is derived from the API secret key and the string to sign is alphabetically sorted

`/users/list?api_key=API_KEY&filter=FILTER&order=ORDER&order_by=ORDER_BY&page_no=PAGE_NO&request_timestamp=REQUEST_TIMESTAMP`

so that the full request query reads

> GET - `https://playgroundapi.ost.com/users/list?api_key=API_KEY&filter=FILTER&order=ORDER&order_by=ORDER_BY&page_no=PAGE_NO&request_timestamp=REQUEST_TIMESTAMP&signature=SIGNATURE`

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | get successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users/list` the `data.result_type` is the string "economy_users"
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
        "id": "c1e5da9b-787d-4897-aa58-742f2756c71d",
        "name": "User 1",
        "uuid": "c1e5da9b-787d-4897-aa58-742f2756c71d",
        "total_airdropped_tokens": "15",
        "token_balance": "15"
      },
      ...
      {
        "id": "461c10ea-2b6c-42e8-9fea-b997995cdf8b",
        "name": "User 25",
        "uuid": "461c10ea-2b6c-42e8-9fea-b997995cdf8b",
        "total_airdropped_tokens": "15",
        "token_balance": "15"
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

### Sample Code | Curl
```bash
curl --request GET \
--url 'https://playgroundapi.ost.com/users/list'
--header 'Accept: application/x-www-form-urlencoded' \
--form request_timestamp=EPOCH_TIME_SEC \
--form signature=SIGNATURE \
--form api_key=API_KEY \
--form filter=FILTER \
--form order=ORDER \
--form order_by=ORDER_BY \
--form page_no=PAGE_NO \
```

>_last updated 14 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
