---
id: version-1.0.0-api_action_execute
title: OST KIT⍺ API | Execute An Action
sidebar_label: Execute an Action
original_id: api_action_execute
---

Send a POST request on `/transactions` to execute an action.

Within OST KIT⍺ you can [<u>set up actions</u>](/docs/api_actions_create.html) to define advanced payments to tokenize your application. When your end-users perform these actions in your application tokens need to be transfered between two entities. To  transfers your branded tokens POST request to `/transactions` is sent. These transfers can happen between users or company_to_user or user_to_company.


### Input Parameters
| Parameter           | Type   | Definitions                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |
| _from_uuid_    | string | user or company from whom to send the funds |
| _to_uuid_      | string | user or company to whom to send the funds |
| _action_id_ | number | id of the action that is to be executed. |
| _amount_            | string<float>  | amount of the action set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100). _amount_ is set at execution when parameter  _arbitrary_amount_ is set to true while  [<u>defining the action</u>](/docs/api_actions_create.html) specified in _action_id_ .    |
| _commission_percent_| string<float>  | for a user_to_user action commission percentage is set at execution when parameter _arbitrary_commission_ is set to true while  [<u>defining the action</u>](/docs/api_actions_create.html) specified in _action_id_ . The commission is inclusive in the _amount_ and the percentage commission goes to the OST partner company. Possible values (min 0%, max 100%) |

The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/transactions/?action_id=20346&api_key=6078017455d8be7d9f07&from_user_id=f6e750a3-3c20-47b5-b3cc-fd72471efa52&request_timestamp=1526456922&to_user_id=4505bb67-16d8-48bc-8de3-e4313b172e3e`

The request url of this post request reads as

> POST - `https://sandboxapi.ost.com/v1/transactions`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

?action_id=20346&api_key=6078017455d8be7d9f07&from_user_id=f6e750a3-3c20-47b5-b3cc-fd72471efa52&request_timestamp=1526456922&to_user_id=4505bb67-16d8-48bc-8de3-e4313b172e3e&signature=182480d60d630ed8b5c88355917e2c6a61af5a7b0ee2fb471a8bf2c6cb6bf605

```

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For API calls to `/transactions` the `result_type` is a string "transaction" and the key `data.transaction` is an object containing the attributes of the transaction.

We have disabled pessimistic concurrency control to ensure that no false positives are returned. As a result you must query `/transactions/{id}` for successful completion of the transaction.  

### Transaction Object Attributes
| Parameter           | Type   | Definitions  |
|---------------------|--------|----------------------------------|
| _id_| string | id of the transaction |
| _from_user_id_    | string | origin user of the branded token transaction   |
| _to_user_id_      | string | destination user of the branded token transaction  |
| _transaction_hash_ | hexstring | the generated transaction hash |
| _action_id_ | number | id of the action that was executed. |
| _timestamp_  |string| universal time stamp value of execution of the transaction in milliseconds|
| _status_ | string | the execution status of the transaction: "processing", "failed" or "complete" |
| _gas_price_ | string | value of the gas utilized for the transaction |
| _gas_used_ | string | (optional) hexadecimal value of the gas used to execute the tranaction
| _transaction_fee_ | string | (optional) the value of the gas used at the gas price
| _block_number_ | number | (optional) the block on the chain in which the transaction was included
| _amount_ | string | (optional) the amount of branded tokens transferred to the destination user  |
| _commission_amount_ | string | (optional) the amount of branded tokens transferred to the company |



### Sample Success Response

```json
{
   "success": true,
   "data": {
      "result_type": "transaction",
      "transaction": {
         "id": "7a02d0be-802d-45aa-a17b-99d5147427b8",
         "from_user_id": "f6e750a3-3c20-47b5-b3cc-fd72471efa52",
         "to_user_id": "4505bb67-16d8-48bc-8de3-e4313b172e3e",
         "transaction_hash": null,
         "action_id": "20346",
         "timestamp": 1526456925000,
         "status": "processing",
         "gas_price": "5000000000",
         "gas_used": null,
         "transaction_fee": null,
         "block_number": null,
         "amount": null,
         "commission_amount": null
      }
   }
}
```

### Sample Failure Response   -  TO PUT AFTER BUGFIX
```json
{
   "success": false,
   "err": {
      "code": "BAD_REQUEST",
      "msg": "At least one parameter is invalid or missing. See \"err.error_data\" array for more details.",
      "error_data": [],
      "internal_id": "cm_ctt_bi_1"
   }
}
```

### Sample Code | Curl
```bash
curl --request POST \
## to work on##
```

>_last updated 17 May 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
