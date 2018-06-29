---
id: version-1.1.0-api_transaction_list
title: OST KIT⍺ API | List Transactions
sidebar_label: List Transactions
original_id: api_transaction_list
---

Send a GET request to `/transactions` to get a list of executed transactions. 

Within OST KIT⍺ you can set up actions to define advanced payments to tokenize your application. And when your end-users perform these actions in your application tokens are transfered between two entities. These  token transfers are listed via `/transactions` API and can happen between users or company_to_user or user_to_company.

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

### Filters on Transaction List
When you send a GET to `/transactions` , a paginated response listing the transaction instanaces is sent. You can use filters to further refine your list.  The more items you provide in your list query the fewer the number of results. 

Each filter parameter type is a comma-separated string.

|List Filter | Description                                | Example                             |
|------------|--------------------------------------------|-------------------------------------|
| _id_          | Transaction ids                                 | 'id="e1f95fcb-5853-453a-a9b3-d4f7a38d5beb, e7800825-fd24-4574-b7a6-06472ca1ef9d"'                     |

The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/transactions/?api_key=6078017455d8be7d9f07&limit=5&page_no=1&request_timestamp=1526452463`

The request url of this GET request reads as

> GET - `https://sandboxapi.ost.com/v1.1/transactions/?api_key=6078017455d8be7d9f07&limit=5&page_no=1&request_timestamp=1526452463&signature=b6edbce2f37ef5fa50818bbdd2e1eeb3a877d555b928b0b9665a367c9a02fa00`


### JSON Response Object

| Key        | Type   | Definition      |
|------------|--------|------------|
| _success_  | bool   | whether successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

For API calls to `/transactions` the `result_type` is a string "transactions", that is an array containing objects each with the attributes described below, which are the details of the executed transaction.

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
      "meta": {
         "next_page_payload": {}
      },
      "transactions": [
         {
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
         },
         {
            "id": "4d852cec-03fa-44bf-971e-6aba8c3b7672",
            "from_user_id": "3df56927-7357-4844-98ce-601b578004f5",
            "to_user_id": "1d6e0017-d2bd-49e7-8214-5dd9496ccdb6",
            "transaction_hash": "0xcc3460918d2b0e02f3e0b6249e1e86007b382673302ce655b4b6f10c1bcea96e",
            "action_id": 20609,
            "timestamp": 1530256809966,
            "status": "complete",
            "gas_price": "1000000000",
            "gas_used": "92150",
            "transaction_fee": "0.00009215",
            "block_number": 38547,
            "amount": "2",
            "commission_amount": "0",
            "airdropped_amount": "0"
         },
         {
            "id": "010a9587-62a7-4a30-9825-e33fa6d4e5b6",
            "from_user_id": "3df56927-7357-4844-98ce-601b578004f5",
            "to_user_id": "313c62fa-af73-4da1-bd31-c80a2f7f369d",
            "transaction_hash": "0xec034c218b96835fea29b469576c0eeeb99872ade92e186fe7be4cf1cec7eb4f",
            "action_id": 20609,
            "timestamp": 1530256809014,
            "status": "complete",
            "gas_price": "1000000000",
            "gas_used": "92150",
            "transaction_fee": "0.00009215",
            "block_number": 38547,
            "amount": "2",
            "commission_amount": "0",
            "airdropped_amount": "0"
         },
         {
            "id": "2d80753d-08f7-4869-8789-ca3b8e1bd494",
            "from_user_id": "3df56927-7357-4844-98ce-601b578004f5",
            "to_user_id": "af503170-63d5-40b8-a143-fc42681ca420",
            "transaction_hash": "0xde4bac5c3aba5aa7ee4c160deca59e314a724ab59c02b38aaf2ca06bdc87cc91",
            "action_id": 20609,
            "timestamp": 1530256803548,
            "status": "complete",
            "gas_price": "1000000000",
            "gas_used": "92150",
            "transaction_fee": "0.00009215",
            "block_number": 38544,
            "amount": "2",
            "commission_amount": "0",
            "airdropped_amount": "0"
         }
      ]
   }
}
```

### Example Code | Curl
```bash
curl --request GET \
--url 'https://sandboxapi.ost.com/v1.1/transactions/' \
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
