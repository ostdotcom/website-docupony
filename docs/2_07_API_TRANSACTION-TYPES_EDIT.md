---
id: api_transaction-types_edit
title: OST KIT API | Edit A Transaction Type
sidebar_label: /transaction-types/edit
---

Send a POST request to `/transaction-types/edit` to edit an exisiting `transaction-type` for a given unique identifier that was returned during the creation of a new [transaction type](api_transaction-types_create.html). This updates the specified transaction type by setting the values of the parameters passed. Any parameter not provided will be left unchanged. Individual keys can be unset by posting an empty value to them.

Within OST KITα you can set up transaction-types to define advanced payments to tokenize your application. A transaction type is of a certain kind: user_to_user, user_to_company, or company_to_user. A transaction type's value is set in branded tokens ($BT) or in fiat ($USD). Note that OST KITα runs on a testnet and tokens have no market value. For fiat payments a price oracle is consulted on-chain to calculate the equivalent amount of branded tokens to transfer. Lastly for user to user payments the company can set a transaction fee to earn on a user-to-user payment.

### Input Parameters
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _client_transaction_id_ | number | mandatory id for transaction to edit (returned as `id` on `/create` or `/list`) |  
| _name_              | string    | (optional) change to new name for the transaction-type |
| _kind_              | string    | (optional) change transaction type which can be one of three kinds:  "user_to_user", "company_to_user", or "user_to_company" to clearly determine whether value flows within the application or from or to the company. |
| _currency_type_     | string    | (optional) change the type of currency the transaction is valued in. Possible values are "USD" (fixed) or "BT" (floating).  When a transaction type is set in fiat value the equivalent amount of branded tokens are calculated on-chain over a price oracle. |
| _currency_value_    | float  | (optional) change the value of the transaction set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and for fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer. |
| _commission_percent_ | float  | (optional) inclusive percentage of the value that is paid to the company. Possible only for "user_to_user" transaction kind. (min 0%, max 100%) |


where the signature is derived from the API secret key and the string to sign is alphabetically sorted

`/transaction-types/edit?api_key=API_KEY&client_transaction_id=CLIENT_TRANSACTION_ID&commission_percent=COMMISSION_PERCENT&currency_type=CURRENCY_TYPE&currency_value=CURRENCY_VALUE&kind=KIND&name=NAME&request_timestamp=REQUEST_TIMESTAMP`

so that the full request uri and form reads

> POST - https://playgroundapi.ost.com/transaction-types/edit?api_key=API_KEY&client_transaction_id=CLIENT_TRANSACTION_ID&commission_percent=COMMISSION_PERCENT&currency_type=CURRENCY_TYPE&currency_value=CURRENCY_VALUE&kind=KIND&name=NAME&request_timestamp=REQUEST_TIMESTAMP&signature=SIGNATURE&&

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/transaction-types` the `data.result_type` is the string "transactions" and the key `data.transactions` is an array of `transactions` objects.
On successful editing of the transaction type, `transactions` contains the edited transaction type as a single element with only the attributes as passed in the request.

### Transaction-types Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _id_                | number | identifier for the edited transaction type (identical to `client_transaction_id` in the request) |
| _client_id_         | number | identifier of the authorised client |
| _name_              | string    | (optional) change to new name for the transaction-type |
| _kind_              | string    | (optional) change transaction type which can be one of three kinds:  "user_to_user", "company_to_user", or "user_to_company" to clearly determine whether value flows within the application or from or to the company. |
| _currency_type_     | string    | (optional) change the type of currency the transaction is valued in. Possible values are "USD" (fixed) or "BT" (floating).  When a transaction type is set in fiat value the equivalent amount of branded tokens are calculated on-chain over a price oracle. |
| _currency_value_    | float  | (optional) change the value of the transaction set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and for fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer. |
| _commission_percent_ | float  | (optional) inclusive percentage of the value that is paid to the company. Possible only for "user_to_user" transaction kind. (min 0%, max 100%) |
| _uts_               | number | unix timestamp in  milliseconds |


### Example Success Response
```json
{
  "success": true,
  "data": {
    "result_type": "transactions",
    "transactions": [
      {
        "id": "20198",
        "client_id": 1018,
        "name": "Reward",
        "kind": "company_to_user",
        "currency_type": "BT",
        "currency_value": "0.1",
        "commission_percent": "0",
        "uts": 1520876285325
      }
    ]
  }
}
```

>_last updated 8 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT alpha v1 | OpenST Platform v0.9.2
