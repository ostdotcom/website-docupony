---
id: version-0.1.0-api_airdrop_drop
title: OST KIT⍺ | API Airdrop
sidebar_label: /users/airdrop/drop
original_id: api_airdrop_drop
---

Post to `/users/airdrop/drop` to request an airdrop of a certain amount of branded tokens to a set of `users`.

This API allows end-users to receive or be awarded a selected amount of branded tokens to be able participate in the branded token economy.


### Input Parameters
| Parameter | Type    | Value                                    |
|-----------|---------|------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |
| _amount_   | Float | The amount of BT that needs to be air-dropped to the selected end-users.  Example:10 |
| [_list_type_](https://dev.ost.com/ostkit-restful-api/docs/user.html#list-type-sub-attributes)   | String | The list type of end-users that need to be airdropped tokens. Example:all|

### Airdrop Sub-Attributes

#### **_list_type_**
| Values | Type    | Description                                   |
|-----------|---------|------------------------------------------|
| _all_   | String | All the end-users that have been previously airdropped tokens. |
| _never_airdropped_   | String | All the end-users that have **never** been previously airdropped tokens. |


where the signature is derived from the API secret key and the string to sign.The string to sign is formed with API parameters alphabetically sorted as below.

`/users/airdrop/drop?amount=AMOUNT&api_key=API_KEY&list_type=LIST_TYPE&request_timestamp=EPOCH_TIME_SEC`

The request url of this post request reads as

> POST - `https://playgroundapi.ost.com/users/airdrop/drop`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded
        
amount=AMOUNT&api_key=API_KEY&list_type=LIST_TYPE&request_timestamp=EPOCH_TIME_SEC&signature=SIGNATURE

```
### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

On calling `/users/airdrop/drop` the `data.airdrop_uuid` is a string containing the airdrop reference id, that can be used to check the airdrop status using the AIRDROP STATUS API endpoint.


### Example Success Response
```
{
 "success": true,
 "data": {
   "airdrop_uuid": "cbc20092-7326-4517-b851-ec211e3ced7d"
 }
}
```

### Example Failure Response
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
```
{
 "success": false,
 "err": {
   "code": "companyRestFulApi(s_am_sa_7:HypBvRPFM)",
   "msg": "Insufficient funds to airdrop users",
   "display_text": "",
   "display_heading": "",
   "error_data": [
     {
       "amount": "Available token amount is insufficient. Please mint more tokens or reduce the amount to complete the process."
     }
   ]
 },
 "data": {
 }
}
```


### Sample Code | Curl
```bash
curl --request POST \
--url 'https://playgroundapi.ost.com/users/airdrop/drop'
--header 'Accept: application/json' \
--form request_timestamp=EPOCH_TIME_SEC \
--form signature=SIGNATURE \
--form api_key=API_KEY \
--form amount=AMOUNT \
--form list_type=LIST_TYPE \
```

>_last updated 22 May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
