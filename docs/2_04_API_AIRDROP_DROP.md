---
id: api_airdrop_drop
title: OST KIT⍺ API | Initiate Airdrop
sidebar_label: /users/airdrop/drop
---

Send a POST request on `/users/airdrop/drop` to initiate airdrop of tranded tokens to all the users. This enables the users to participate in the desired token economy for your application. 


### Input Parameters

| Parameter           | Type      | Value  |
|---------------------|-----------|--------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _client_id_         | number    | (optional) identifier of the authorised client |
| _amount_            | number    | mandatory amount of branded tokens to award the users |
| _list_type_         | string    | mandatory list-type of users to award the branded tokens. Two possible values are 'all' and 'never_airdropped'. |

where the signature is derived from the API secret key and the string to sign is alphabetically sorted,

`/users/airdrop/drop?amount=AMOUNT&api_key=API_KEY&client_id=CLIENT_ID&list_type=LIST_TYPE&request_timestamp=EPOCH_TIME_SEC`

so that the full request query reads.

> POST - `/users/airdrop/drop?amount=AMOUNT&api_key=API_KEY&client_id=CLIENT_ID&list_type=LIST_TYPE&request_timestamp=EPOCH_TIME_SEC&signature=SIGNATURE`


### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | get successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users/airdrop/drop` the json response is the object "data" that contains the unique identifier of the airdrop that has been initiated by you.

### Example Success Response

```json
{
    "success": true,
    "data": {
        "airdrop_uuid": "5ee64e69-b0f6-46f0-8f22-4a6f8151a9a3"
}
```


#### Sample Code | Curl

```bash
curl --request POST \
  --url 'https://playgroundapi.ost.com/users/airdrop/drop' \
  --data amount=AMOUNT api_key=API_KEY client_id=CLIENT_ID \
  		 list_type=LIST_TYPE request_timestamp=EPOCH_TIME_SEC signature=SIGNATURE\

```


>_last updated 8 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2