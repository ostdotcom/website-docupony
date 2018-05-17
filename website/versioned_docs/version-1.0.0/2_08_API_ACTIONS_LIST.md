---
id: version-1.0.0-api_actions_list
title: OST KIT⍺ API | List all Actions
sidebar_label: List Actions
original_id: api_actions_list
---

Send a GET request on `/actions` to receive a list of actions. 

Within OST KIT⍺ you can set up actions to define advanced payments to tokenize your application. An action's amount can be set in branded tokens ($BT) or in fiat ($USD). This amount represents how much the action is worth each time one of your customers execute that action. 

An action is of a certain kind: user_to_user, user_to_company, or company_to_user. For user_to_user kind of actions the company has the option to set a transaction fee on that action when it's executed.


### Input Parameters
| Parameter | Type | Definitions                                         |
|-----------|------|-----------------------------------------------|
| _api_key_           | string    | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](/docs/api_authentication.html) for current request |
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
| _id_          | Action ids                                 | 'id="20346, 20346"'                     |
| _name_        | names of the action                         | 'name="Like, Upvote"'               |
| _kind_        | the kind of the action set during the [<u>creation of the action</u>](2_06_API_ACTIONS_CREATE.md) | 'kind="user_to_user"'|
| _arbitrary_amount_ |  actions where the amount is set during creation or provided at execution  | 'arbitrary_amount= false'|
| _arbitrary_commission_ | user_to_user actions where the commission is set during creation or provided at execution | 'arbitrary_commission=true' | 


The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/actions/?api_key=6078017455d8be7d9f07&kind=user_to_user%2Cuser_to_company&request_timestamp=1526322094`

so that the full request query reads

> GET - `https://sandboxapi.ost.com/v1/actions/?api_key=6078017455d8be7d9f07&kind=user_to_user%2Cuser_to_company&request_timestamp=1526322094&signature=76256ec37e6a8567095be3e222c97edc9ff3ca4464b070c4d11b35aa84b86420`

### JSON Response Object

| Key        | Type   | Definitions      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

On calling `/actions` the `data.result_type` is the string "action" and the key `data.action` is an array containing the requested action objects.


### Action Object Attributes

| Attributes           | Type   | Definitions  |
|---------------------|--------|----------------------------------|
| _id_                | number | identifier for the created action|
| _name_              | string    | unique name of the action |
| _kind_              | string    | Cannot update an action kind.  |
| _currency_          | string    | type of currency the action amount is specified in. Possible values are "USD" (fixed) or "BT" (floating).  |
| _arbitrary_amount_  | boolean   | true/false. Indicates whether amount (described below) is set in the action, or whether it will be provided at the time of execution (i.e., when creating a transaction).  | 
| _amount_            | string<float>  | amount of the action set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).   |
| _arbitrary_commission_ |boolean | true/false. Like '_arbitrary_amount_' this attribute indicates whether commission_percent (described below) is set in the action, or whether it will be provided at the time of execution (i.e., when creating a transaction). |
| _commission_percent_| string<float>  | If the action kind is user_to_user and a commission percentage is set then the commission is inclusive in the _amount_ and the complement goes to the company. Possible values (min 0%, max 100%) |


### Example Success Response Body
```json
{
   "success": true,
   "data": {
      "result_type": "actions",
      "actions": [
         {
            "id": "20350",
            "name": "TWITTER HANDLE",
            "kind": "user_to_company",
            "currency": "BT",
            "amount": "100",
            "arbitrary_amount": false,
            "commission_percent": null,
            "arbitrary_commission": false
         },
         {
            "id": "20349",
            "name": "TWITTER",
            "kind": "user_to_company",
            "currency": "BT",
            "amount": "100",
            "arbitrary_amount": false,
            "commission_percent": null,
            "arbitrary_commission": false
         },
         {
            "id": "20037",
            "name": "Like",
            "kind": "user_to_user",
            "currency": "USD",
            "amount": "0.01000",
            "arbitrary_amount": false,
            "commission_percent": "12.00",
            "arbitrary_commission": false
         },
         {
            "id": "20023",
            "name": "Purchase",
            "kind": "user_to_user",
            "currency": "USD",
            "amount": "1.00000",
            "arbitrary_amount": false,
            "commission_percent": "1.00",
            "arbitrary_commission": false
         },
         {
            "id": "20021",
            "name": "HEY WORLD",
            "kind": "user_to_company",
            "currency": "BT",
            "amount": "1",
            "arbitrary_amount": false,
            "commission_percent": null,
            "arbitrary_commission": false
         }
      ],
      "meta": {
         "next_page_payload": {}
      }
   }
}
```

### Sample Code | Curl
```bash
curl --request GET \
--url 'https://sandboxapi.ost.com/v1/actions/' \
--header 'Accept: application/x-www-form-urlencoded' \
--form request_timestamp=1526550366 \
--form signature=84cbc8562b9c684d046323817a0d2ef4db8949f048eb3f96727cdb57b6dc07be \
--form api_key=7cad25e082390a90114e \
--form page_no=1 \
```

>_last updated 17 May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
