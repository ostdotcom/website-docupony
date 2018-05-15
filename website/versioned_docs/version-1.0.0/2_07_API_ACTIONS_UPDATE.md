---
id: version-1.0.0-api_actions_update
title: OST KIT⍺ API | Update An Action
sidebar_label: Update an Action
original_id: api_actions_update
---

Send a POST request to `/actions/{id}` to update an exisiting `action`. The {id} in the API endpoint is an unique identifier that was returned during the [<u>creation of the action</u>](2_06_API_ACTIONS_CREATE.md) OR is returned as `id` when a GET is sent to [<u>`/actions`</u>](2_08_API_ACTIONS_LIST.md). 

This API updates the specified action by setting the values of the parameters passed. Any parameter not provided will be left unchanged. Individual keys can be unset by posting an empty value to them.  ** TO CONFIRM **

Within OST KIT⍺ you can set up actions to define advanced payments to tokenize your application. An action's amount can be set in branded tokens ($BT) or in fiat ($USD). This amount represents how much the action is worth each time one of your customers execute that action. 

An action is of a certain kind: user_to_user, user_to_company, or company_to_user. For user_to_user kind of actions the company has the option to set a comission on that action when its executed.

### Input Parameters
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request | 
| _name_              | string    | name of the action, unique |
| _kind_              | string    | Cannot update an action kind.  |
| _currency_          | string    | type of currency the action amount is specified in. Possible values are "USD" (fixed) or "BT" (floating).  When an action is set in fiat the equivalent amount of branded tokens are calculated on-chain over a price oracle.  The action creation fails if the price point is outside of the accepted margins set by the company. For OST KIT⍺ price points are calculated by and taken from coinmarketcap.com and published to the contract by OST.com. |
| _arbitrary_amount_  | boolean   | true/false. You have an option to set a static amount for the action either at the time of creating or updating the action or you can be provide the amount dynamically during execution. A 'true' value considers that the amount is to be provided during execution dynamically. And a 'false' means the action has a static amount that is to be updated with update request.  | 
| _amount_            | string<float>  | amount of the action set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer. |
| _arbitrary_commission_ |boolean | true/false. Like '_arbitrary_amount_' you also have an option to set the commission on the action either static at the time of creating or updating a user_to_user action or provide it dynamically during execution. |
| _commission_percent_| string<float>  | If the action kind is user_to_user and a commission percentage is set then the commission is inclusive in the _amount_ and the percentage of the amount goes to the OST partner company. Possible values (min 0%, max 100%) |

### Interdependency of Parameters
Truth Table showing the 'amount'  and 'arbitrary_amount' interdependency and expected behaviors

| Value in arbitrary_amount | Value in amount  |  Expected Behaviors               |
|---------------------|--------|-----------------------------------------------------|
|  true    |  specified     |   Throws Validation Error  (Error Handling Doc)  |
|  true    |  not specified |  Successfully creates action, amount will be expected during execution.|
|  false   |  not specified | Throws Validation Error   (Error Handling Doc)   |
|  false   |  specified     |  Successfully creates action, amount will be static set at the time creation or updation of the action. |

Truth Table showing the 'kind' , 'commission_percent'  and 'arbitrary_commission' interdependency and expected behaviors

| Value in kind | Value in arbitrary_commission | Value in commission_percent  |  Expected Behaviors               |
|---------------------|--------|--------------------------|---------------------------|
|   user_to_user  | true    |  specified     |   Throws Validation Error  (Error Handling Doc)  |
|  user_to_user | true    |  not specified |  Successfully creates action, comission will be expected during execution. |
|  user_to_user | false   |  not specified |  Successfully creates action. And since setting commission for an action is optional. These settings say the respective action has no commission set on it. |
|  user_to_user | false   |  specified     |  Successfully creates action, commission will be static set at the time creation or updation. |



The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/actions/20346?api_key=6078017455d8be7d9f07&currency=BT&name=MissionComplete&request_timestamp=1526316745`

The request url of this post request reads as

> POST - `https://playgroundapi.ost.com/v1/actions/20346`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

api_key=6078017455d8be7d9f07&currency=BT&name=MissionComplete&request_timestamp=152631674&signature=a50ab06646ef64f9b9dd1b02ebdf709e11c9c406d1002eed84f525a5d6086e6b

```

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

On calling `/actions` the `data.result_type` is the string "action" and the key `data.action` is an array containing the updated action object.

### Action Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _id_                | number | identifier for the created action|
| _name_              | string    | name of the action, unique |
| _kind_              | string    | Cannot update an action kind.  |
| _currency_          | string    | type of currency the action amount is specified in. Possible values are "USD" (fixed) or "BT" (floating).  When an action is set in fiat the equivalent amount of branded tokens are calculated on-chain over a price oracle.  The action creation fails if the price point is outside of the accepted margins set by the company. For OST KIT⍺ price points are calculated by and taken from coinmarketcap.com and published to the contract by OST.com. |
| _arbitrary_amount_  | boolean   | true/false. You have an option to set a static amount for the action either at the time of creating or updating the action or you can be provide the amount dynamically during execution. A 'true' value considers that the amount is to be provided during execution dynamically. And a 'false' means the action has a static amount that is to be updated with update request.  | 
| _amount_            | string<float>  | amount of the action set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer. |
| _arbitrary_commission_ |boolean | true/false. Like '_arbitrary_amount_' you also have an option to set the commission on the action either static at the time of creating or updating a user_to_user action or provide it dynamically during execution. |
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
         "commission_percent": "0.00"
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
            "parameter": "currency",
            "msg": "Must be either 'USD' (fixed) or 'BT' (floating)."
         }
      ],
      "internal_id": "tk_e_2"
   }
}
```

### Sample Code | Curl
```bash
curl --request 
## to be worked on **
```

>_last updated 15th May 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
