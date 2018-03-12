---
id: api_transaction-types_list
title: OST KIT API | List All Transaction Types
sidebar_label: /transaction-types/list
---

Send a GET request on `/transaction-types/` to receive a paginated and ordered array of transaction types previously created. The transactions-types are returned in creation order, with the transaction types created first, appearing at the top.

Within OST KITα you can set up transaction-types to define advanced payments to tokenize your application. A transaction type is of a certain kind: user_to_user, user_to_company, or company_to_user. A transaction type's value is set in branded tokens ($BT) or in fiat ($USD). Note that OST KITα runs on a testnet and tokens have no market value. For fiat payments a price oracle is consulted on-chain to calculate the equivalent amount of branded tokens to transfer. Lastly for user to user payments the company can set a transaction fee to earn on a user-to-user payment.

#### Input Parameters
| Parameter | Type | Value                                         |
|-----------|------|-----------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _page_no_           | number    | page number (starts from 1) |


where the signature is derived from the API secret key and the string to sign is alphabetically sorted

`/transaction-types/list?api_key=API_KEY&filter=FILTER&order=ORDER&order_by=ORDER_BY&page_no=PAGE_NO&request_timestamp=REQUEST_TIMESTAMP`

so that the full request uri and form reads

> GET - https://playgroundapi.ost.com/transaction-types/list?api_key=API_KEY&page_no=PAGE_NO&request_timestamp=REQUEST_TIMESTAMP&signature=SIGNATURE

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/transaction-types` the `data.result_type` is the string "transactions_types" and the key `data.transactions_types` is an array of `transactions_types` objects. The field `data.meta.next_page_payload` contains the information on the `page_no` number for the next page; or is empty for the last page of the list.

### Transaction-types Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _id_                | number | unique identifier for the created transaction type|
| _client_id_         | number| unique identifier of the client|
| _name_              | string | name of the transaction type |
| _kind_              | string | type of transaction dependent on the owners involved in the token exchange. Possible values are "user_to_user" - token exchange from one user to another user  , "user_to_company" - from a user to you (the application service provider), "company_to_user" - exchange from you (the application service provider) to an end-user |
| _currency_type_     | string | type of currency the transaction is valued in. Possible values are "USD" or "BT"   |
| _currency_value_    | float  | positive value of the currency with respect to _currency_type_ "USD" (min - 0.01$ , max - 100$ ) and "BT" (min - 0.00001, max - 100)|
| _commission_percent_| float  | percentage of transaction value that you set as a service provider on a transaction. Possible only for _user_to_user_ transaction type. (min - 0, max - 100) |
| _status_            |string | the status of the creation of the user|
| _device_id_         |number | an id used to identify if the created transaction types was by the OST KIT standard examples or by you|
| _uts_               |number | universal time stamp value in  milliseconds|

### Example Success Response
```json
{
  "success": true,
  "data": {
    "client_id": 1124,
    "result_type": "transaction_types",
    "transaction_types": [
      {
        "id": "20332",
        "client_id": "20332",
        "name": "Download",
        "kind": "user_to_company",
        "currency_type": "BT",
        "currency_value": "0.1",
        "commission_percent": "64.95",
        "status": "active"
      },
      {
        "id": "20333",
        "client_id": "20333",
        "name": "Purchase",
        "kind": "user_to_user",
        "currency_type": "USD",
        "currency_value": "1.00000",
        "commission_percent": "1.00",
        "status": "active"
      },
      {
        "id": "20334",
        "client_id": "20334",
        "name": "Reward",
        "kind": "company_to_user",
        "currency_type": "BT",
        "currency_value": "5",
        "commission_percent": "0.00",
        "status": "active"
      },
      {
        "id": "20335",
        "client_id": "20335",
        "name": "Upvote",
        "kind": "user_to_user",
        "currency_type": "USD",
        "currency_value": "0.05000",
        "commission_percent": "0.00",
        "status": "active"
      }
    ],
    "meta": {
      "next_page_payload": {}
    },
    "price_points": {
      "OST": {
        "USD": "0.310465"
      }
    },
    "client_tokens": {
      "client_id": 1124,
      "name": "hkedgrd 3",
      "symbol": "ghpi",
      "symbol_icon": "token_icon_4",
      "conversion_factor": "0.03085",
      "token_erc20_address": "0x482095c5C7c3C3F3dC7F365f81baB80Ff87aEf7d",
      "airdrop_contract_addr": "0x3afd9f2273af535c513c2a35f56aF1Fe65E1dBaA",
      "simple_stake_contract_addr": "0x89df946ce158E128e223428Cb4e50D4032Fcc91c"
    }
  }
}
```


### Example Failure Responses
```json
TODO
```

### Sample Code | Curl
```bash
curl --request GET \
  --url 'https://playgroundapi.ost.com/transaction-types/list?'
  --data 'api_key=API_KEY&page_no=PAGE_NO&request_timestamp=REQUEST_TIMESTAMP&signature=SIGNATURE'
```



>_last updated 8 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT alpha v1 | OpenST Platform v0.9.2
