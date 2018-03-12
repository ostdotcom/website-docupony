---
id: api_transaction-types_list
title: OST KIT API | List All Transaction Types
sidebar_label: /transaction-types/list
---

Send a GET request on `/transaction-types/` to receive a all transaction types. In addition `client_id`, `price_points`, and `client_tokens` are returned.

Within OST KITα you can set up transaction-types to define advanced payments to tokenize your application. A transaction type is of a certain kind: user_to_user, user_to_company, or company_to_user. A transaction type's value is set in branded tokens ($BT) or in fiat ($USD). Note that OST KITα runs on a testnet and tokens have no market value. For fiat payments a price oracle is consulted on-chain to calculate the equivalent amount of branded tokens to transfer. Lastly for user to user payments the company can set a transaction fee to earn on a user-to-user payment.

#### Input Parameters
| Parameter | Type | Value                                         |
|-----------|------|-----------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |


where the signature is derived from the API secret key and the string to sign is alphabetically sorted

`/transaction-types/list?api_key=API_KEY&request_timestamp=REQUEST_TIMESTAMP`

so that the full request query reads

> GET - https://playgroundapi.ost.com/transaction-types/list?api_key=API_KEY&request_timestamp=REQUEST_TIMESTAMP&signature=SIGNATURE

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/transaction-types` the `data.result_type` is the string "transactions_types" and the key `data.transactions_types` is an array of all `transaction_types` objects. In addition `client_id`, `price_points`, and `client_tokens` are returned.

### Data Object attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|-------------------------------------|
| _client_id_         | number | identifier of the authorised client |
| _result_type_       | string | type identifier "transaction_types" |
| _transaction_types_ | array  | array of all transaction types      |
| _meta_              | object | response is not paginated           |
| _price_points_      | object | contains the OST price point in USD |
| _client_tokens_     | object | token information                   |


### Transaction-types Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _id_               | number | identifier of the client |
| _client_transaction_id_ | number | identifier for the transaction type (equals `id`) |
| _name_              | string | name of the transaction type |
| _kind_              | string | transaction types can be one of three kinds:  "user_to_user", "company_to_user", or "user_to_company" to clearly determine whether value flows within the application or from or to the company. |
| _currency_type_     | string    | type of currency the transaction is valued in. Possible values are "USD" (fixed) or "BT" (floating). |
| _currency_value_    | float  | value of the transaction set in "USD" (min USD 0.01, max USD 100) or branded token "BT" (min BT 0.00001, max BT 100). |
| _commission_percent_| float  | inclusive percentage of the value that is paid to the company (min 0%, max 100%) |
| _status_            | string | the status of the transaction type (default "active") |

### Client Tokens Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _client_id_         | number | identifier of the client |
| _name_              | string | name of the token |
| _symbol_            | string | name of the symbol |
| _symbol_icon_       | string | icon reference |
| _conversion_factor_ | float  | conversion factor of the branded token to OST |
| _token_erc20_address | address | prefixed hexstring address of the branded token erc20 contract on the utility chain |
| _airdrop_contract_addr_ | address | prefixed hexstring address of the airdrop / pricer contract that regulates payments of branded tokens with transaction types |
| _simple_stake_contract_addr_ | address | prefixed hexstring address of the simple stake contract which holds the OST alpha on Ethereum Ropsten testnet which has been staked to mint branded tokens |

### Example Success Response
```json
{
  "success": true,
  "data": {
    "client_id": 1018,
    "result_type": "transaction_types",
    "transaction_types": [
      {
        "id": "20216",
        "client_transaction_id": "20216",
        "name": "Upvote",
        "kind": "user_to_user",
        "currency_type": "USD",
        "currency_value": "0.20000",
        "commission_percent": "0.1",
        "status": "active"
      },
      ...
      {
        "id": "20221",
        "client_transaction_id": "20221",
        "name": "Download",
        "kind": "user_to_company",
        "currency_type": "USD",
        "currency_value": "0.10000",
        "commission_percent": "0",
        "status": "active"
      }
    ],
    "meta": {
      "next_page_payload": {}
    },
    "price_points": {
      "OST": {
        "USD": "0.197007"
      }
    },
    "client_tokens": {
      "client_id": 1018,
      "name": "ACME",
      "symbol": "ACM",
      "symbol_icon": "token_icon_6",
      "conversion_factor": "0.21326",
      "token_erc20_address": "0xEa1c45D934d287fec813C74021A5d692278bE5e9",
      "airdrop_contract_addr": "0xaA5460105E39184B5e43a925bf8Da17EED64BE68",
      "simple_stake_contract_addr": "0xf892f80567A97C54b2852316c0F2cA5eb186a0AD"
    }
  }
}
```


>_last updated 8 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT alpha v1 | OpenST Platform v0.9.2
