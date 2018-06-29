---
id: version-1.1.0-api_ledger
title: OST KIT⍺ API | List User Transactions
sidebar_label: List User Transactions
original_id: api_ledger
---

Send a GET request to `/ledger/{user_id}` to get a list of transactions a user has been either the sender or a recipient of tokens .

Within OST KIT⍺ you can set up actions to define advanced actions to tokenize your application. And when your end-users perform these actions in your application tokens are transferred between two entities. To view all transactions a user in your economy was involved in, `/ledger/{user_id}` API should be used.

### Input Parameters
| Parameter           | Type   | Definition                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](/docs/api_authentication.html) for current request |
|_page_no_            | number    | page number (starts from 1)|
| _order_by_          | string    | order the list by when the transaction was created (default) . Can only be ordered by transaction creation date. |
| _order_             | string    | orders the list in 'desc' (default). Accepts value 'asc' to order in ascending order. |
| _limit_             | number    | limits the number of transaction objects to be sent in one request. Possible Values Min 1, Max 100, Default 10.     
| _optional__filters_  | string    | filters can be used to refine your list. The Parameters on which filters are supported are detailed in the table below.|


The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/ledger/54a4648d-5959-4b44-8d28-86b85428e785?api_key=6078017455d8be7d9f07&limit=5&page_no=1&request_timestamp=1526452463`

The request url of this GET request reads as

> GET - `https://sandboxapi.ost.com/v1.1/ledger/54a4648d-5959-4b44-8d28-86b85428e785?api_key=6078017455d8be7d9f07&limit=5&page_no=1&request_timestamp=1526452463&signature=b6edbce2f37ef5fa50818bbdd2e1eeb3a877d555b928b0b9665a367c9a02fa00`


### JSON Response Object

| Key        | Type   | Definition      |
|------------|--------|------------|
| _success_  | bool   | whether successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

For API calls to `/ledger/{user_id}` the `result_type` is a string "transactions", that is an array containing objects each with the attributes described below, which are the details of all transactions a user did.

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
A user at any point in time can have two types of balances:<br />
  a.  token balance : tokens that were earned by performing defined actions and <br />
  b.  airdrop balance : tokens the company awards to the user to spend within the economy.<br />
While executing a transaction of _amount_ the airdop balance is first used. If the airdrop balance is not sufficient, then the user's token balance is used. <br /> User's balance information can be fetched with the help of [<u>balance API</u>.](/docs/api_balance.html)

Specifically in a case when airdrop balance of a user is not sufficient while executing a commissioned transaction:  _amount_ = available airdropped tokens + commission amount set for the action + remaining no. of tokens to be picked from token_balance.

### Example Success Response Body
```json
{
   "success": true,
   "data": {
      "result_type": "transactions",
      "meta": {
         "next_page_payload": {}
      },
      "transactions": [
         {
            "id": "24f6476d-fdec-4b79-b6ac-9b56c14baa1d",
            "from_user_id": "54a4648d-5959-4b44-8d28-86b85428e785",
            "to_user_id": "f5f9b061-b784-4ecd-b599-bc263860f539",
            "transaction_hash": "0x5a78704ec17647f3cf1b024de9fa368edc52b07ed635fe462bfef7f4771da91e",
            "action_id": 22613,
            "timestamp": 1530107114601,
            "status": "complete",
            "gas_price": "1000000000",
            "gas_used": "119952",
            "transaction_fee": "0.000119952",
            "block_number": 4142744,
            "amount": "4.052205306455120373",
            "commission_amount": "0.040522053064551203",
            "airdropped_amount": "4.092727359519671576"
         },
         {
            "id": "562d48f8-7261-4896-b804-6893f79ff1a9",
            "from_user_id": "f5f9b061-b784-4ecd-b599-bc263860f539",
            "to_user_id": "54a4648d-5959-4b44-8d28-86b85428e785",
            "transaction_hash": "0x71b2545f3c81e93f021ac2cf0311840ecaf2ec00411fca76587aeb2bffb93484",
            "action_id": 22613,
            "timestamp": 1530107078785,
            "status": "complete",
            "gas_price": "1000000000",
            "gas_used": "105080",
            "transaction_fee": "0.00010508",
            "block_number": 4142726,
            "amount": "4.052205306455120373",
            "commission_amount": "0.040522053064551203",
            "airdropped_amount": "4.092727359519671576"
         },
         {
            "id": "dfbf803e-a1ba-4410-a597-8ef846d69821",
            "from_user_id": "f5f9b061-b784-4ecd-b599-bc263860f539",
            "to_user_id": "54a4648d-5959-4b44-8d28-86b85428e785",
            "transaction_hash": "0xea3dbf9639762522c95a0c7a8824f56ced22e737a02c594b9491d78a7158a311",
            "action_id": 22613,
            "timestamp": 1530107072130,
            "status": "complete",
            "gas_price": "1000000000",
            "gas_used": "119952",
            "transaction_fee": "0.000119952",
            "block_number": 4142723,
            "amount": "4.052205306455120373",
            "commission_amount": "0.040522053064551203",
            "airdropped_amount": "4.092727359519671576"
         }
      ]
   }
}
```

### Example Code | Curl
```bash
curl --request GET \
--url 'https://sandboxapi.ost.com/v1.1/ledger/54a4648d-5959-4b44-8d28-86b85428e785' \
--header 'Accept: application/json' \
--form request_timestamp=1526550545 \
--form signature=47c3ffc5aa919ae3d61113bcb96d4be0bbdc3bb559dbc48e8567f08ca3d655ef \
--form api_key=7cad25e082390a90114e \
--form page_no=1 \
--form limit=50 \
```

>_last updated 2nd July 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1.1 | OpenST Platform v0.9.2
