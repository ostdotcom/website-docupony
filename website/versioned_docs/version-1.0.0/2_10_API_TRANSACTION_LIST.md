---
id: version-1.0.0-api_transaction_list
title: OST KIT⍺ API | List Transactions
sidebar_label: List Transactions
original_id: api_transaction_list
---

Send a GET request to `/transactions` to get a list of executed transactions. 

Within OST KIT⍺ you can set up actions to define advanced payments to tokenize your application. And when your end-users perform these actions in your application tokens are transfered between two entities. These  token transfers are listed via `/transactions` API and can happen between users or company_to_user or user_to_company.

### Input Parameters
| Parameter           | Type   | Definitions                                               |
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

> GET - `https://sandboxapi.ost.com/v1//transactions/?api_key=6078017455d8be7d9f07&limit=5&page_no=1&request_timestamp=1526452463&signature=b6edbce2f37ef5fa50818bbdd2e1eeb3a877d555b928b0b9665a367c9a02fa00`


### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For API calls to `/transactions` the `result_type` is a string "transactions", that is an array containing objects each with the attributes described below, which are the details of the executed transaction.

### Response Transaction Object Attributes

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
| _amount_ | string | (optional) the amount of branded tokens transferred to the destination user |
| _commission_amount_ | string | (optional) the amount of branded tokens transferred to the company |


### Sample Success Response
```json
{
   "success": true,
   "data": {
      "result_type": "transactions",
      "transactions": [
         {
            "id": "fbd23dc3-edc1-41a0-ab80-90d4462274c1",
            "from_user_id": "72dc76cb-7986-4d27-ab04-1ac8e0eacac1",
            "to_user_id": "e2f14afd-dac1-4657-9cff-32be1f330263",
            "transaction_hash": "0xe7d7d4e5ea00b32e98e694a43ca918076eee19410d4db1288dd4378ffeb4ba5d",
            "action_id": "20346",
            "timestamp": 1524832672000,
            "status": "complete",
            "gas_price": "5000000000",
            "gas_used": 119621,
            "transaction_fee": "0.000598105",
            "block_number": "1511466",
            "amount": "0.463732635165484394",
            "commission_amount": "0"
         },
         {
            "id": "41138190-80ea-43a9-8ddb-5cb3132a8ba2",
            "from_user_id": "e58ab3d9-16d9-453c-be7f-1e010b5c1b4c",
            "to_user_id": "66e4d7a0-9fd0-4032-8e00-99c128ceffeb",
            "transaction_hash": "0x56019408cbd2b9f21d543edeb79935062bc108413ab0d283fdc3fcef52ad9db9",
            "action_id": "20023",
            "timestamp": 1524827126000,
            "status": "complete",
            "gas_price": "5000000000",
            "gas_used": 105208,
            "transaction_fee": "0.00052604",
            "block_number": "1508693",
            "amount": "4.635750605767636029",
            "commission_amount": "0.04635750605767636"
         },
         {
            "id": "1df0a565-b896-431d-940d-676165166d4b",
            "from_user_id": "fe486913-6476-467a-9b45-c0529b5e8221",
            "to_user_id": "aefc0347-876d-4e52-a4d2-d86f7f09d706",
            "transaction_hash": "0x78aaf1bb420578bd59b0c1785709d9c93f30ea0f0dfea1ce530b913c341e3685",
            "action_id": "20022",
            "timestamp": 1524826835000,
            "status": "complete",
            "gas_price": "5000000000",
            "gas_used": 77309,
            "transaction_fee": "0.000386545",
            "block_number": "1508547",
            "amount": "0.1",
            "commission_amount": "0"
         },
         {
            "id": "724f7067-1a6a-4d73-a0d5-7c28195ad49c",
            "from_user_id": "5640b64b-6fc7-4308-baa3-f1424b4ee5b2",
            "to_user_id": "94a70176-bd41-4972-bcac-b397748a9216",
            "transaction_hash": "0x95b2ff10d681b3c16b1d23478b7d847be101f4d8c0526a42a7e2e4e136aa5ea6",
            "action_id": "20037",
            "timestamp": 1524826835000,
            "status": "complete",
            "gas_price": "5000000000",
            "gas_used": 105016,
            "transaction_fee": "0.00052508",
            "block_number": "1508547",
            "amount": "0.046396168436565034",
            "commission_amount": "0.005567540212387804"
         },
         {
            "id": "bf73f7a2-d877-4368-a514-b30c67d02e48",
            "from_user_id": "e58ab3d9-16d9-453c-be7f-1e010b5c1b4c",
            "to_user_id": "94a70176-bd41-4972-bcac-b397748a9216",
            "transaction_hash": "0xa92217e2ddb479635cbbebe51e0fb7d1029f20dddc421bbc896c10b412eaf433",
            "action_id": "20023",
            "timestamp": 1524826823000,
            "status": "complete",
            "gas_price": "5000000000",
            "gas_used": 105208,
            "transaction_fee": "0.00052604",
            "block_number": "1508541",
            "amount": "4.639616843656503414",
            "commission_amount": "0.046396168436565034"
         }
      ],
      "meta": {
         "next_page_payload": {
            "order_by": "id",
            "order": "desc",
            "limit": 5,
            "page_no": 2
         }
      }
   }
}
```

### Sample Code | Curl
```bash
curl --request POST \
# ** to work on **
```

>_last updated 17 May 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
