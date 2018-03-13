---
id: api_transaction-types_execute
title: OST KIT⍺ API | Execute A Transaction Type
sidebar_label: /transaction-types/execute
---

Send a POST request on `/transaction-types/execute` to execute a token exchange of a transaction type between any two branded token holders.

#### Input Parameters
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _from_uuid_    | string | origin user of the transaction branded token.  |
| _to_uuid_      | string | destination user of the transaction.           |
| _transaction_kind_  | string | name of the transaction to be executed. "upvote" etc. |


where the signature is derived from the API secret key and the string to sign is alphabetically sorted

`/transaction-types/execute?api_key=API_KEY&name=NAME&request_timestamp=EPOCH_TIME_SEC`

so that the full request uri and form reads

> POST - `https://playgroundapi.ost.com/transaction-types/execute?api_key=API_KEY&client_id=CLIENT_ID&from_uuid=FROM_UUID&request_timestamp=1520960959&to_uuid=796fa0c4-d584-4d56-ba49-1e985f805831&transaction_kind=Upvote`

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/transaction-types/execute` the `data` is an object containing the attributes described below.


### Executed Transaction Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _from_uuid_    | string | origin user of the transaction branded token.  |
| _to_uuid_      | string | destination user of the transaction.           |
| _transaction_uuid_      | string | id of the transaction type that has been executed|
| _transaction_hash_ | hexstring | the generated transaction hash |
| _transaction_kind_  | string | name of the transaction to be executed. "upvote" etc. |


### Sample Success Response
```json
{
    "success": true,
    "data": {
        "transaction_uuid": "978efb00-68ce-418e-a039-10036b7ba451",
        "transaction_hash": null,
        "from_uuid": "6d0cae63-0df5-4042-9f16-4ee534770f75",
        "to_uuid": "796fa0c4-d584-4d56-ba49-1e985f805831",
        "transaction_kind": "Upvote"
    }
}
```

### Sample Failure Response
```json
{
    "success": false,
    "err": {
        "code": "companyRestFulApi(cm_ctt_1:r1MZsYrtz)",
        "msg": "Not found",
        "error_data": {}
    }
}
```

### Sample Code | Curl
```bash
curl --request POST \
  --url 'https://playgroundapi.ost.com/transaction-types/execute' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form from_uuid=1b5039ea-323f-416c-9007-7fe2d068d42d \
  --form to_uuid=286d2cb9-421b-495d-8a82-034d8e2c96e2 \
  --form transaction_kind=Download \
  --form token_symbol=aMnN
```


>_last updated 8 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT alpha v1 | OpenST Platform v0.9.2
