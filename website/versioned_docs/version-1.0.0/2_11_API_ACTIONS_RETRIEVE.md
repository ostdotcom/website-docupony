---
id: version-1.0.0-api_actions_retrieve
title: OST KIT⍺ API | Retrieve An Action
sidebar_label: Retrieve an Action
original_id: api_actions_retrieve
---

Send a GET request on `/actions/{id}` to receive a specific action. The {id} in the API endpoint is a unique identifier that is returned during the [<u>creation of the action</u>](2_06_API_ACTIONS_CREATE.md) OR is returned as `id` when a GET is sent to [<u>`/actions`</u>](2_08_API_ACTIONS_LIST.md). 

Within OST KIT⍺ you can set up actions to define advanced payments to tokenize your application. An action's amount can be set in branded tokens ($BT) or in fiat ($USD). This amount represents how much the action is worth each time one of your customers execute that action. 

An action is of a certain kind: user_to_user, user_to_company, or company_to_user. For user_to_user kind of actions the company has the option to set a commission on that action when it's executed.


### Input Parameters
The retrieve API doesn't takes any additional input parameter except for the mandatory ones which are common across all APIs

| Parameter           | Type   | Definitions                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request | 


The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/actions/20346?api_key=6078017455d8be7d9f07&request_timestamp=1526321377`

so that the full request query reads 

> GET - `https://sandboxapi.ost.com/v1/actions/20346?api_key=6078017455d8be7d9f07&request_timestamp=1526321377&signature=000455718b1fb20fa248719898daea5c25faec9cf919c7922609caef3def784f`

### JSON Response Object

| Key        | Type   | Definitions      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

On calling `/actions` the `data.result_type` is the string "action" and the key `data.action` is an object containing the attributes of the action.

### Action Object Attributes
| Attributes           | Type   | Definitions  |
|---------------------|--------|----------------------------------|
| _id_                | number | identifier for the created action|
| _name_              | string    | unique name of the action |
| _kind_              | string    | Cannot update an action kind.  |
| _currency_          | string    | type of currency the action amount is specified in. Possible values are "USD" (fixed) or "BT" (floating).  |
| _arbitrary_amount_  | boolean   | true/false. Indicates whether amount (described below) is set in the action, or whether it will be provided at the time of execution (i.e., when creating a transaction). | 
| _amount_            | string<float>  | amount of the action set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  |
| _arbitrary_commission_ |boolean | true/false. Like '_arbitrary_amount_'  indicates whether commission_percent (described below) is set in the action, or whether it will be provided at the time of execution (i.e., when creating a transaction). |
| _commission_percent_| string<float>  | If the action kind is user_to_user and a commission percentage is set then the commission is inclusive in the _amount_ and the complement goes to the company. Possible values (min 0%, max 100%) |



### Example Success Response
```json
{
   "success": true,
   "data": {
      "result_type": "action",
      "action": {
         "id": "20346",
         "name": "MissionComplete",
         "kind": "user_to_user",
         "currency": "BT",
         "amount": null,
         "arbitrary_amount": true,
         "commission_percent": null,
         "arbitrary_commission": false
      }
   }
}
```

### Sample Code | Curl
```bash
curl --request GET \
#** TO TEST FIRST AND THEN PUT IN **
```

>_last updated 17th May 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
