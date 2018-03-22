---
id: api_transaction-types_status
title: OST KIT⍺ API | Query Transaction Status
sidebar_label: /transaction-types/status
---

Send a POST request on `/transaction-types/status` to query the status of executed transactions. Multiple uuids can be passed in a single request to receive the status of all.

### Input Parameters
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |
| _transaction_uuids[]_ | string | unique identifier for an executed transaction that is part of an array |

where the signature is derived from the API secret key and the string to sign is alphabetically sorted,

`/transaction-types/status?api_key=API_KEY&transaction_uuids[]=TRANSACTION_UUID&request_timestamp=EPOCH_TIME_SEC`

so that the full request uri and form reads

> POST - `https://playgroundapi.ost.com/transaction-types/status?api_key=API_KEY&transaction_uuids[]=TRANSACTION_UUID&request_timepstamp=EPOCH_TIME_SEC&signature=SIGNATURE`

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For API calls to `/transaction-types/status` the `result_type` is a string "transactions", that is an array containing objects each with the attributes described below, which are the details of the executed transaction.

### Response Transaction Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _from_user_id_    | string | origin user of the branded token transaction   |
| _to_user_id_      | string | destination user of the branded token transaction  |
| _transaction_uuid_| string | id of the executed transaction type|
| _client_token_id_ | number | id of the branded token |
| _transaction_hash_ | hexstring | the generated transaction hash |
| _status_ | string | the execution status of the transaction type: "processing", "failed" or "complete" |
| _gas_price_ | string | value of the gas utilized for the transaction |
| _transaction_timestamp_  |string| universal time stamp value of execution of the transaction in milliseconds|
| _uts_  |number | universal time stamp value in  milliseconds|
| _gas_used_ | string | (optional) hexadecimal value of the gas used to execute the tranaction
| _transaction_fee_ | string | (optional) the value of the gas used at the gas price
| _block_number_ | number | (optional) the block on the chain in which the transaction was included
| _bt_transfer_value_ | string | (optional) the amount of branded tokens transferred to the destination user
| _bt_commission_amount_ | string | (optional) the amount of branded tokens transferred to the company

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
        "id": "4bc71630-c131-4b8d-814a-33184d1e6fe1",
        "transaction_uuid": "4bc71630-c131-4b8d-814a-33184d1e6fe1",
        "from_user_id": "ae5b9aa6-a45d-439a-bb22-027df78727a1",
        "to_user_id": "91af390d-843d-44eb-b554-5ad01f874eba",
        "transaction_type_id": "20334",
        "client_token_id": 30117,
        "transaction_hash": "0xe945362504b20eab78b51fdc9e699686eabf3089d40ea57fe552d147ab11f1ba",
        "status": "complete",
        "gas_price": "0x12A05F200",
        "transaction_timestamp": 1520165780,
        "uts": 1520182157540,
        "gas_used": "99515",
        "transaction_fee": "0.000497575",
        "block_number": 213100,
        "bt_transfer_value": "5",
        "bt_commission_amount": "0"
      }
    ]
  }
}
```

### Sample Code | Curl
```bash
curl --request POST \
--url 'https://playgroundapi.ost.com/transaction-types/status'
--header "Accept: application/json" \
--form request_timestamp=EPOCH_TIME_SEC \
--form signature=SIGNATURE \
--form api_key=API_KEY \
--form transaction_uuids[]=TRANSACTION_UUID \
```

>_last updated 14 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
