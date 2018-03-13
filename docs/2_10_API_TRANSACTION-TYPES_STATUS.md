---
id: api_transaction-types_status
title: OST KIT⍺ API | Query Transaction Status 
sidebar_label: /transaction-types/status
---

Send a GET request on `/transaction-types/status` to query the status of a token exchange of a transaction type between any two branded token holders. 


#### Input Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _transaction_uuid_ | string | unique identifier for the transaction executed between two branded token holders |

where the signature is derived from the API secret key and the string to sign is alphabetically sorted

`/transaction-types/status?api_key=API_KEY&name=NAME&request_timestamp=EPOCH_TIME_SEC`
so that the full request uri and form reads

> GET - `https://playgroundapi.ost.com/transaction-types/status?api_key=API_KEY&transaction_uuid=TRANSACTION_UUID&request_timepstamp=EPOCH_TIME_SEC&signature=SIGNATURE`

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/transaction-types/status` the `result_type` is a string "transactions", that is an object containing the attributes described below, which has the details of the transaction type execution. 

### Response Transaction Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _from_user_id_    | string | origin user of the branded token transaction   |
| _to_user_id_      | string | destination user of the branded token transaction  |
| _transaction_uuid_| string | id of the executed transaction type|
| _client_token_id_ | number | id of the branded token |
| _transaction_hash_ | hexstring | the generated transaction hash |
| _status_ | string | the execution status of the transaction type |
| _gas_price_ | string | value of the gas utilized for the transaction |
| _transaction_timestamp_  |string| universal time stamp value of execution of the transaction in milliseconds|
| _uts_  |number | universal time stamp value in  milliseconds|



### Sample Success Response
```json
{
  "success": true,
  "data": {
    "client_tokens": {
      "30117": {
        "id": "30117",
        "client_id": 1124,
        "name": "hkedgrd 3",
        "symbol": "ghpi",
        "symbol_icon": "token_icon_4",
        "conversion_factor": "0.03085",
        "airdrop_contract_addr": "0x3afd9f2273af535c513c2a35f56aF1Fe65E1dBaA",
        "uts": 1520182157543
      }
    },
    "transaction_types": {
      "20334": {
        "id": "20334",
        "name": "Reward",
        "kind": "company_to_user",
        "currency_type": "BT",
        "currency_value": "5",
        "commission_percent": "0.00",
        "status": "active",
        "uts": 1520182157546
      }
    },
    "economy_users": {
      "ae5b9aa6-a45d-439a-bb22-027df78727a1": {
        "id": "ae5b9aa6-a45d-439a-bb22-027df78727a1",
        "uuid": "ae5b9aa6-a45d-439a-bb22-027df78727a1",
        "name": "",
        "kind": "reserve",
        "uts": 1520182157551
      },
      "91af390d-843d-44eb-b554-5ad01f874eba": {
        "id": "91af390d-843d-44eb-b554-5ad01f874eba",
        "uuid": "91af390d-843d-44eb-b554-5ad01f874eba",
        "name": "User 4",
        "kind": "user",
        "uts": 1520182157551
      }
    },
    "result_type": "transactions",
    "transactions": [
      {
        "id": "5e292934-67e5-49c4-adf2-886adedb7103",
        "transaction_uuid": "5e292934-67e5-49c4-adf2-886adedb7103",
        "from_user_id": "ae5b9aa6-a45d-439a-bb22-027df78727a1",
        "to_user_id": "91af390d-843d-44eb-b554-5ad01f874eba",
        "transaction_type_id": "20334",
        "client_token_id": 30117,
        "transaction_hash": null,
        "status": "processing",
        "gas_price": "50000000000",
        "transaction_timestamp": 1520165780,
        "uts": 1520182157540
      }
    ]
  }
}
```


### Sample Code | Curl 
```bash
curl --request GET \
  --url 'https://playgroundapi.ost.com/transaction-types/status?
  --data 'transaction_uuids[]=5f79063f-e22a-4d28-99d7-dd095f02c72e'
```

>_last updated 8 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT alpha v1 | OpenST Platform v0.9.2
