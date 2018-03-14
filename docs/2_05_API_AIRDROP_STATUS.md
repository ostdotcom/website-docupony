---
id: api_airdrop_status
title: OST KIT⍺ API | Aidrop Status
sidebar_label: /users/airdrop/status
---

Send a GET request on `/users/airdrop/status` to query for the status of the client initiated airdrop of branded tokens to users. 


### Input Parameters

| Parameter           | Type      | Value  |
|---------------------|-----------|--------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _client_id_         | number    | (optional) identifier of the authorised client |
| _airdrop_uuid_      | string    | mandatory identifier of the client initiated airdrop |


where the signature is derived from the API secret key and the string to sign is alphabetically sorted,

`/users/airdrop/status?airdrop_uuid=AIRDROP_UUID&api_key=API_KEY&client_id=CLIENT_ID&request_timestamp=EPOCH_TIME_SEC`

so that the full request query reads.

> GET - `/users/airdrop/status?airdrop_uuid=AIRDROP_UUID&api_key=API_KEY&client_id=CLIENT_ID&request_timestamp=EPOCH_TIME_SEC&signature=SIGNATURE`


### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | get successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/users/airdrop/status` the json response is the object `data`, which contains  the `airdrop_uuid` and the information on the status of the transaction, these can be in four stages: "users_identified", "tokens_transfered", "contract_approved", "allocation_done".


### Example Success Response

```json
{
    "success": true,
    "data": {
        "airdrop_uuid": "5ee64e69-b0f6-46f0-8f22-4a6f8151a9a3",
        "current_status": "complete",
        "steps_complete": [
            "users_identified",
            "tokens_transfered",
            "contract_approved",
            "allocation_done"
        ]
    }
}
```


#### Sample Code | Curl

```bash
curl --request POST \
  --url 'https://playgroundapi.ost.com/users/airdrop/drop' \
  --data airdrop_uuid=AIRDROP_UUID api_key=API_KEY \
  		 client_id=CLIENT_ID request_timestamp=EPOCH_TIME_SEC signature=SIGNATURE \

```


>_last updated 8 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2