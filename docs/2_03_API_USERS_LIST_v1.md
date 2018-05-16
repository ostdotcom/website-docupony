---
id: api_users_list
title: OST KIT⍺ API | List Users
sidebar_label: List Users
---

Send a GET request on `/users` to receive a paginated - optionally filtered - ordered array of users within the economy.

A user can own branded tokens within your branded token economy.  Users can exchange branded tokens within your application through transaction types.  Users also hold an airdrop token balance, which consists of tokens the company awards to the user to spend within the economy.

### Input Parameters

| Parameter           | Type       | Definition  |
|---------------------|-----------|--------|
| _api_key_           | string      | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com)|
| _request_timestamp_ | number     | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring  | (mandatory) [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |
| _page_no_           | number    | page number (starts from 1) |
| _airdropped_ | boolean | true == users who have been airdropped tokens, false == users who have not been airdropped tokens
| _order_by_          | string |(optional) order the list by 'creation_time' or 'name' (default) |
| _order_             | string  |(optional) order users in 'desc' (default) or 'asc' order |
| _limit_ | number  | limits the number of user objects to be sent in one request(min. 1, max. 100, default 10) |
|optional__filters|string| filters can be used to refine your list, the parameters on which filters are supported are detailed in the table below|


### Filters on User Lists


When you send a GET to `/users` , `users` with default input parameters mentioned above are listed. The resource instances up to the limit based on the offset are sent in one response. You can use filters to further refine your list. The more items you provide in your list query the fewer the number of results. Use filters so they apply to specific fields within the user object.

| List Filter           | Description       | Definition  |
|---------------------|-----------|--------|
|id|user ids|'id="3b679b8b-b56d-48e5-bbbe-7397899c8ca6, d1c0be68-30bd-4b06-af73-7da110dc62da"'|
|name|specific user names|'name="Alice, Bob"'|


The the signature is derived from the API secret key and the string to sign is alphabetically sorted


`/users/?api_key=ed0787e817d4946c7e76&request_timestamp=1526395328`

so that the full request query reads

> GET - `https://sandboxapi.ost.com/v1/users`

### JSON Response Object

| Key        | Type   | Description      |
|------------|--------|------------|
| _success_  | bool   | get successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users` the `data.result_type` is the string "users"
and the key `data.users` is an array of the returned `user` objects (10 users per page). The field `data.meta.next_page_payload` contains the filter and order information and the `page_no` number for the next page; or is empty for the last page of the list.

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
      "result_type": "users",
      "users": [
         {
            "id": "3b679b8b-b56d-48e5-bbbe-7397899c8ca6",
            "addresses": [
               [
                  "198",
                  "0x0d6fE7995175198bd7ad4242fCa4CA8539b509c7"
               ]
            ],
            "name": "Alice",
            "airdropped_tokens": "0",
            "token_balance": "0"
         },
         {
            "id": "d1c0be68-30bd-4b06-af73-7da110dc62da",
            "addresses": [
               [
                  "198",
                  "0x7b01d73494eb5D2B073eeafB5f8c779CE45853f1"
               ]
            ],
            "name": "Bob",
            "airdropped_tokens": "0",
            "token_balance": "0"
         }
      ],
      "meta": {
         "next_page_payload": {},
         "total_no": 2
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
--header "Accept: application/json" \
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
> OST KIT⍺ v1 | OpenST Platform v0.9.2
