---
id: version-1.0.0-api_airdrop_retrieve
title: OST KIT⍺ API | Retrieve an Airdrop
sidebar_label: Retrieve an Airdrop
original_id: api_airdrop_retrieve
---


Send a GET request to `/airdrops/{id}` to receive the airdrop status. {id} in this API endpoint is the unique identifier of the airdrop that is returned on [<u>executing an airdrop</u>](2_04_API_AIRDROP_EXECUTE.md).
 
Get the status of the airdrop of branded tokens. This API can be used to understand which stage the processing of airdropping the tokens are going through.  


### Input Parameters
| Parameter | Type    | Value                                    |
|-----------|---------|------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](/docs/api_authentication.html) for current request |

The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/airdrops/bc6dc9e1-6e62-4032-8862-6f664d8d7541?api_key=6078017455d8be7d9f07&request_timestamp=1526356757`

so that the full request uri and form reads

> GET - `https://sandboxapi.ost.com/v1/airdrops/bc6dc9e1-6e62-4032-8862-6f664d8d7541?api_key=6078017455d8be7d9f07&request_timestamp=1526356757&signature=da0ae03280c789e2c07a414013e7c166ba9ddea50b7b03c6fbb40026572590df`

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |


On calling `/airdrops/{id}` the `data.result_type` is a string "airdrop" and the key `data.airdrop` is an object containing the attributes of the airdrop. 

### Airdrop Object Attributes
| Attributes           | Type   | Definitions  |
|---------------------|--------|----------------------------------|
| _id_                | number | identifier for the airdrop.    |
| _current status_ | string    | indicates the stage at which the executed airdrop is in at the specific point in time of the API request. Please refer the **_current status_** table below for possible values and corresponding description.|
| _steps complete_ | array | explains the steps which have been completed for the airdrop at the specific point in time of the API request. Please refer the **_steps complete_** table below for possible values and corresponding description. |

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
      "result_type": "airdrop",
      "airdrop": {
         "id": "bc6dc9e1-6e62-4032-8862-6f664d8d7541",
         "current_status": "complete",
         "steps_complete": [
            "users_identified",
            "tokens_transfered",
            "contract_approved",
            "allocation_done"
         ]
      }
   }
}
```

### Example Failure Response
```json
{
  "code": "401",
  "body": {
    "success": false,
    "err": {
      "code": "UNAUTHORIZED",
      "msg": "We could not authenticate the request. Please review your credentials and authentication method.",
      "error_data": [

      ],
      "internal_id": "a_1"
    }
  }
}
```

### Sample Code | Curl
```bash
curl --request GET \
--url 'https://sandboxapi.ost.com/v1/airdrops/ecd9b0b2-a0f4-422c-95a4-f25f8fc88334' \
--header 'Accept: application/x-www-form-urlencoded' \
--form request_timestamp=1526549305 \
--form signature=801f5c9416ce0a82f74e5a2be0ad8c7c0a421dc1df71085a45461a783f61affc \
--form api_key=7cad25e082390a90114e \
```
>_last updated 17th May 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
