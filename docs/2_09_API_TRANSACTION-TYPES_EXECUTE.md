---
id: api_transaction-types_execute
title: OST KIT API | Execute A Transaction Type 
sidebar_label: /transaction-types/execute
---

Send a POST request on `/transaction-types/execute` to execute a token exchange of a transaction type between any two branded token holders. 

#### Input Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _client_id_     | Integer | id of client who is performing the transaction |
| _from_uuid_    | string | origin user of the transaction branded token.  |
| _to_uuid_      | string | destination user of the transaction.           |
| _transaction_kind_  | string | type of transaction dependent on the owners involved in the token exchange. Possible values are "user_to_user" - token exchange from one user to another user  , "user_to_company" - from a user to you (the application service provider), "company_to_user" - exchange from you (the application service provider) to an end-user  |
| _token_symbol_ | string | token symbol whose transaction has to be executed. |

where the signature is derived from the API secret key and the string to sign is alphabetically sorted

`/transaction-types/execute?api_key=API_KEY&name=NAME&request_timestamp=EPOCH_TIME_SEC`

so that the full request uri and form reads

> POST - https://playgroundapi.ost.com/transaction-types/execute?api_key=API_KEY&client_id=CLIENT_ID&from_uuid=FROM_UUID&token_symbol=TOKEN_SYMBOL&to_uuid=TO_UUID&transaction_kind_=TRANSACTION_KIND&request_timepstamp=EPOCH_TIME_SEC&signature=SIGNATURE

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
| _transaction_kind_  | string | type of transaction dependent on the owners involved in the token exchange. Possible values are "user_to_user" - token exchange from one user to another user  , "user_to_company" - from a user to you (the application service provider), "company_to_user" - exchange from you (the application service provider) to an end-user  |


### Sample Success Response
```json
{
  "success": true,
  "data": {
    "transaction_uuid": "49cc3411-7ab3-4478-8fac-beeab09e3ed2",
    "transaction_hash": "nil",
    "from_uuid": "1b5039ea-323f-416c-9007-7fe2d068d42d",
    "to_uuid": "286d2cb9-421b-495d-8a82-034d8e2c96e2",
    "transaction_kind": "Download"
  }
}
```

### Sample Failure Response
```json
{
  "success": false,
  "err": {
    "code": "companyRestFulApi(s_t_et_6BJlY1jKuG)",
    "msg": "Invalid Token Symbol",
    "display_text": "",
    "display_heading": "",
    "error_data": {}
  },
  "data": {}
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