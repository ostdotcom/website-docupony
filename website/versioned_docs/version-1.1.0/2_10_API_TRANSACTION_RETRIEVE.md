---
id: version-1.1.0-api_transaction_retrieve
title: OST KIT⍺ API | Retrieve a Transaction
sidebar_label: Retrieve a Transaction
original_id: api_transaction_retrieve
---

Send a GET request on `/transactions/{id}` to get a specific transaction executed. The {id} in the API endpoint is a unique identifier that is returned during the [<u>execution of the action</u>](/docs/api_action_execute.html)

Within OST KIT⍺ you can [<u>set up actions</u>](/docs/api_actions_create.html). When your end-users perform these defined actions in your application tokens are transfered between two entities. If you want to know status of a specific token transfer `/transactions/{id}` API can be used.


### Input Parameters
| Parameter           | Type   | Definition                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](/docs/api_authentication.html) for current request |


The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/transactions/fd145a92-c97c-422b-9e51-552e1c2c2723?api_key=6078017455d8be7d9f07&request_timestamp=1526362759`

The request url of this GET request reads as

> GET - `https://sandboxapi.ost.com/v1.1/transactions/fd145a92-c97c-422b-9e51-552e1c2c2723?api_key=6078017455d8be7d9f07&request_timestamp=1526362759&signature=347ba9531100e86ba4199468bdc3ef14d99a8e0b45cd36a48fa45a05de694376`


### JSON Response Object

| Key        | Type   | Definition      |
|------------|--------|------------|
| _success_  | bool   | whether successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

For API calls to `/transactions/{id}` the `result_type` is a string "transaction" and the key `data.transaction` is an object containing the attributes of the transaction.


### Response Transaction Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _id_| string | id of the transaction |
| _from_user_id_    | string | origin user of the branded token transaction   |
| _to_user_id_      | string | destination user of the branded token transaction  |
| _transaction_hash_ | hexstring | the generated transaction hash |
| _action_id_ | number | id of the action that was executed. |
| _timestamp_  | number | universal time stamp value of execution of the transaction in milliseconds|
| _status_ | string | the execution status of the transaction: "processing", "failed" or "complete" |
| _gas_price_ | string\<number\> | value of the gas utilized for the transaction |
| _gas_used_ | number | (optional) hexadecimal value of the gas used to execute the tranaction
| _transaction_fee_ | string\<float\> | (optional) the value of the gas used at the gas price
| _block_number_ | string\<number\> | (optional) the block on the chain in which the transaction was included
| _amount_ | string\<float\> | (optional) the amount of branded tokens transferred to the destination user in BT |
| _commission_amount_ | string\<float\> | (optional) the amount of branded tokens transferred to the company in BT |
| _airdropped_amount_ | string\<float\> | the amount of branded tokens that were deducted from airdrop balance while executing the transaction. |

#### ** amount **
A user at one point in time can have two types of balances,
  a.  token balance : tokens that were earned by performing defined actions and 
  b.  airdrop balance : tokens the company awards to the user to spend within the economy.
In such a case, while executing a transaction the _amount_ for the transaction is first picked from user's airdrop balance. If the airdrop balance is not sufficient the remaning amount is picked from user's token balance to complete the execution. User's balance information can be fetched with the help of [<u>balance API</u>.](/docs/api_balance.html)

Specifically in a case when airdrop balance of a user is not sufficient while executing a commissioned transaction:  _amount_ = available airdropped tokens + commission amount set for the action + remaining no. of tokens to be picked from token_balance.

### Example Success Response Body
```json
{
"success": true,
   "data": {
      "result_type": "transactions",
      "transactions": {
            "id": "fd145a92-c97c-422b-9e51-552e1c2c2723",
            "from_user_id": "70c17e7e-1801-471c-9276-c2d9286f1cdb",
            "to_user_id": "bc23ee11-bbda-41ee-8c4f-6153b4f391df",
            "transaction_hash": "0x38a7d88d0259ceb16b527e9f1f4558412887144e62572fe422fb8ed8216fe616",
            "action_id": 20608,
            "timestamp": 1530256818851,
            "status": "complete",
            "gas_price": "1000000000",
            "gas_used": "119742",
            "transaction_fee": "0.000119742",
            "block_number": 38552,
            "amount": "4.999281063583474048",
            "commission_amount": "0.04999281063583474",
            "airdropped_amount": "5.049273874219308788"
         }
    }
}   
```

### Example Code | Curl
```bash
curl --request GET \
--url 'https://sandboxapi.ost.com/v1.1/transactions/0ab712ec-dc41-4e31-ac31-c93bc148bbb9' \
--header 'Accept: application/json' \
--form request_timestamp=1526550517 \
--form signature=f6f12004842a480f96d88e00901a3b7f02603267ced8d9f5a3d257c18afadc8d \
--form api_key=7cad25e082390a90114e \
```

>_last updated 2nd July 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1.1 | OpenST Platform v0.9.2