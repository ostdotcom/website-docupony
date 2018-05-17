---
id: version-1.0.0-api_airdrop_list
title: OST KIT⍺ API | List Airdrops
sidebar_label: List Airdrops
original_id: api_airdrop_list
---


Send a GET request to `/airdrops` to receive a list airdrops.

Gets a paginated list of airdrops executed. This API can also be used to understand the status of multiple airdrops in a single request incases when you execute multiple airdrops simultaneouly.

### Input Parameters
| Parameter | Type    | Value                                    |
|-----------|---------|------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](/docs/api_authentication.html) for current request |
|_page_no_            | number    | page number (starts from 1)|
| _order_by_          | string    | order the list by when the airdrop was executed (default). Can only order by execution date. |
| _order_             | string    | orders the list in 'desc' (default). Accepts value 'asc' to order in ascending order. |
| _limit_             | number    | limits the number of airdrop objects to be sent in one request. Possible Values Min 1, Max 100, Default 10.     
| _optional__filters_  | string    | filters can be used to refine your list. The Parameters on which filters are supported are detailed in the table below.|

### Filters on Airdrop List
When you send a GET to `/airdrops` , a paginated response is sent listing the airdrops instance. You can use filters to further refine your list. The more items you provide in your list query the fewer the number of results. 

The filter parameter type is a comma-separated string.

|List Filter | Description                                | Example                             |
|------------|--------------------------------------------|-------------------------------------|
| _id_          | Airdrop ids                                 | 'id="bc6dc9e1-6e62-4032-8862-6f664d8d7541, 94543988-9fa6-4d0a-8a9f-d65d345f6175"'                     |
| _current_status_       | indicates the stage at which the executed airdrop is in.   | 'current_status="complete, pending"'|

The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/airdrops/?api_key=6078017455d8be7d9f07&current_status=complete&limit=12&page_no=1&request_timestamp=1526358884`

so that the full request uri and form reads

> GET - `https://sandboxapi.ost.com/v1/airdrops/?api_key=6078017455d8be7d9f07&current_status=complete&limit=12&page_no=1&request_timestamp=1526358884&signature=f7f2f923bf37b9b698f0bffefc5cc6f1e0c34fcbfbe2b1b36468065e8dca0e85`

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |


On calling `/airdrops` the `data.result_type` is a string "airdrops" and the key `data.airdrops` is an array containing the requested airdrop objects.

### Airdrop Object Attributes
| Attributes           | Type   | Definitions  |
|---------------------|--------|----------------------------------|
| _id_                | number | identifier for the airdrop.    |
| _current_status_ | string    | indicates the stage at which the executed airdrop is in at the specific point in time of the API request. Please refer the **_current status_** table below for possible values and corresponding description.|
| _steps_complete_ | array | explains the steps which have been completed for the airdrop at the specific point in time of the API request. Please refer the **_steps complete_** table below for possible values and corresponding description. |

#### **_current status_**
| Attribute | Type    | Description                                   |
|-----------|---------|------------------------------------------|
| _incomplete_ | String | The string to represent that the airdrop is still to be queued for processing. |
| _pending_   | String | The string to represent that airdrop is still in process.
| _failed_  | String | The string to represent that the airdrop has failed.
| _complete_   | String | The string to represent that the airdrop process is complete.|


#### **_steps complete_**
| Attribute | Type    | Description                                   |
|-----------|---------|------------------------------------------|
| _user_identified_   | String | The string to represent identification of the end-user for airdropping branded tokens.
| _tokens_transferred_  | String | The string to represent that the branded tokens are tranferred to the airdrop budget holder address.
| _contract_approved_   | String | The string to represent that the airdrop budget holder address has approved the airdrop  contract.|
| _allocation_done_   | String | The string to represent that the airdrop process is complete.|


### Example Success Response
```json
{
   "success": true,
   "data": {
      "result_type": "airdrops",
      "airdrops": [
         {
            "id": "bc6dc9e1-6e62-4032-8862-6f664d8d7541",
            "current_status": "complete",
            "steps_complete": [
               "users_identified",
               "tokens_transfered",
               "contract_approved",
               "allocation_done"
            ]
         },
         {
            "id": "6d3ccfb0-55a7-45af-8821-e49647f65c78",
            "current_status": "complete",
            "steps_complete": [
               "users_identified",
               "tokens_transfered",
               "contract_approved",
               "allocation_done"
            ]
         },
         {
            "id": "94543988-9fa6-4d0a-8a9f-d65d345f6175",
            "current_status": "complete",
            "steps_complete": [
               "users_identified",
               "tokens_transfered",
               "contract_approved",
               "allocation_done"
            ]
         },
         {
            "id": "20bb84ea-70da-41d4-bf27-40543bde4f2f",
            "current_status": "complete",
            "steps_complete": [
               "users_identified",
               "tokens_transfered",
               "contract_approved",
               "allocation_done"
            ]
         },
         {
            "id": "6b2fd042-2fcf-4701-8143-00b889f8f0be",
            "current_status": "complete",
            "steps_complete": [
               "users_identified",
               "tokens_transfered",
               "contract_approved",
               "allocation_done"
            ]
         },
         {
            "id": "0d5fbc05-1678-4256-b20c-ecafabba421e",
            "current_status": "complete",
            "steps_complete": [
               "users_identified",
               "tokens_transfered",
               "contract_approved",
               "allocation_done"
            ]
         }
      ],
      "meta": {
         "next_page_payload": {}
      }
   }
}
```

### Example Failure Response
```json
{
   "success": false,
   "err": {
      "code": "invalid_request",
      "msg": "At least one parameter is invalid or missing. See err.error_data for more details.",
      "error_data": [
         {
            "parameter": "current_status",
            "msg": "current status should have comma seperated status filters (eg: incomplete,processing,complete,failed)"
         }
      ],
      "internal_id": "s_cu_l_3"
   }
}
```

### Sample Code | Curl
```bash
curl --request GET \
#** to work on**

```
>_last updated 17th May 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
