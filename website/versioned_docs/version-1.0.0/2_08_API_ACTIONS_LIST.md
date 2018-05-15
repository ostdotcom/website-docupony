---
id: version-1.0.0-api_actions_list
title: OST KIT⍺ API | List All Actions
sidebar_label: List Actions
original_id: api_actions_list
---

Send a GET request on `/actions` to receive a list of actions. 

Within OST KIT⍺ you can set up actions to define advanced payments to tokenize your application. An action's amount can be set in branded tokens ($BT) or in fiat ($USD). This amount represents how much the action is worth each time one of your customers execute that action. 

An action is of a certain kind: user_to_user, user_to_company, or company_to_user. For user_to_user kind of actions the company has the option to set a transaction fee on that action when it's executed.


### Input Parameters
| Parameter | Type | Value                                         |
|-----------|------|-----------------------------------------------|
| _api_key_           | string    | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |
|_page_no_            | number    | page number (starts from 1)|
| _order_by_          | string    | order the list by when the action was created (default) . Can also order by the 'name' of the action |
| _order_             | string    | orders the list in 'desc' (default). Accepts value 'asc' to order in ascending order. |
| _limit_             | number    | limits the number of action objects to be sent in one request. Possible Values Min 1, Max 100, Default 10.     
| _optional__filters_  | string    | filters can be used to refine your list. The Parameters on which filters are supported are detailed in the table below.|

### Filters on Action List
When you send a GET to `/actions` , actions with default input parameters mentioned above are listed. The resource instances up to the limit based on the offset are sent in one response. You can use filters to further refine your list. The more items you provide in your list query the fewer the number of results. Use filters so they apply to specific fields within the action object.  

Each filter parameter type is a comma-separated string.

|List Filter | Description                                | Example                             |
|------------|--------------------------------------------|-------------------------------------|
| _id_          | Action ids                                 | 'id="ID1, ID2"'                     |
| _name_        | names of the action                         | 'name="Like, Upvote"'               |
| _kind_        | the kind of the action set during the [<u>creation of the action</u>](2_06_API_ACTIONS_CREATE.md) | 'kind="user_to_user"'|
| _arbitrary_amount_ |  actions where the amount is set during creation or provided at execution  | 'arbitrary_amount= false'|
| _arbitrary_commission_ | user_to_user actions where the commission is set during creation or provided at execution | 'arbitrary_commission=true' | 


where the signature is derived from the API secret key and the string to sign is alphabetically sorted

` ** to work on **`

so that the full request query reads

> GET - `** to work on ** `

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/transaction-types` the `data.result_type` is the string "transactions_types" and the key `data.transactions_types` is an array of all `transaction_types` objects. In addition `client_id`, `price_points`, and `client_tokens` are returned.   ** TO TEST FIRST AND THEN PUT IN **

### Data Object attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|-------------------------------------|
|| | ** TO TEST FIRST AND THEN PUT IN ** |


### Action Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _id_                | number | identifier for the created action|
| _name_              | string    | (mandatory) name of the action, unique |
| _kind_              | string    | an action can be one of three kinds:  "user_to_user", "company_to_user", or "user_to_company" to clearly determine whether value flows within the application or from or to the company. |
| _currency_          | string    | (mandatory) type of currency the action amount is specified in. Possible values are "USD" (fixed) or "BT" (floating).  When an action is set in fiat the equivalent amount of branded tokens are calculated on-chain over a price oracle.  The action creation fails if the price point is outside of the accepted margins set by the company. For OST KIT⍺ price points are calculated by and taken from coinmarketcap.com and published to the contract by OST.com. |
| _arbitrary_amount_  | boolean   | (mandatory) True/False. You can choose to set the amount of the action either at the time of creating the action or set it just before the action is executed each time. A 'True' value considers that the amount is to be set before the action is executed each time. And a 'False' means the action has a static amount that is set at the time of creation.  | 
| _amount_            | string<float>  | amount of the action set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer. |
| _arbitrary_commission_ |boolean | True/False. Like '_arbitrary_amount_' you can also choose to set the commission of the action either at the time of creating a user_to_user action or set it just before the user_to_user action is executed each time. |
| _commission_percent_| string<float>  | If the action kind is user_to_user and a commission percentage is set then the commission is inclusive in the _amount_ and the complement goes to the company. Possible values (min 0%, max 100%) |

### Client Tokens Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| | | ** TO TEST FIRST AND THEN PUT IN ** |

### Example Success Response
```json
{
  // ** TO TEST FIRST AND THEN PUT IN THE CORRECT ONE ** //
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

### Sample Code | Curl
```bash
curl --request GET \
#** TO TEST FIRST AND THEN PUT IN **
```

>_last updated 14 May 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
