---
id: version-1.0.0-api_actions_create
title: OST KIT⍺ API | Create an Action
sidebar_label: Create an Action
original_id: api_actions_create
---

Send a POST request to `/actions` to create a new `action`.  Actions are interactions in your application that allow users to exchange branded tokens between each other within the application or with the company.  

Within OST KIT⍺ you can set up actions to define advanced payments to tokenize your application. An action's amount can be set in branded tokens ($BT) or in fiat ($USD). This amount represents how much the action is worth each time one of your customers execute that action.   

Note that OST KIT⍺ runs on a testnet and tokens have no market value. For fiat payments a price oracle is consulted on-chain to calculate the equivalent amount of branded tokens to transfer.


### Input Parameters
| Parameter           | Type   | Definition                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](/docs/api_authentication.html) for current request |
| _name_              | string    | (mandatory) unique name of the action |
| _kind_              | string    | an action can be one of three kinds:  "user_to_user", "company_to_user", or "user_to_company" to clearly determine whether value flows within the application or from or to the company. |
| _currency_          | string    | (mandatory) type of currency the action amount is specified in. Possible values are "USD" (fixed) or "BT" (floating).  When an action is set in fiat the equivalent amount of branded tokens are calculated on-chain over a price oracle. For OST KIT⍺ price points are calculated by and taken from coinmarketcap.com and published to the contract by OST.com. |
| _arbitrary_amount_  | boolean   | (mandatory) true/false. Indicates whether amount (described below) is set in the action, or whether it will be provided at the time of execution (i.e., when creating a transaction).  | 
| _amount_            | string\<float\>  | amount of the action set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer. |
| _arbitrary_commission_ |boolean | true/false. Like '_arbitrary_amount_' this attribute indicates whether commission_percent (described below) is set in the action, or whether it will be provided at the time of execution (i.e., when creating a transaction). |
| _commission_percent_| string\<float\>  | for user_to_user action you have an option to set commission percentage. The commission is inclusive in the _amount_ and the percentage of the amount goes to the OST partner company. Possible values (min 0%, max 100%). |

### Interdependency of Parameters
Truth Table showing the 'amount'  and 'arbitrary_amount' interdependency and expected behaviors

| Value in arbitrary_amount | Value in amount  |  Expected Behaviors               |
|---------------------|--------|-----------------------------------------------------|
|  true    |  specified     |   Throws Validation Error  (Error Handling Doc)  |
|  true    |  not specified |  Successfully creates action, amount will be expected during execution |
|  false   |  not specified | Throws Validation Error   (Error Handling Doc)   |
|  false   |  specified     |  Successfully creates action, amount will be static set at the time creation or updation. |

Truth Table showing the 'kind' , 'commission_percent'  and 'arbitrary_commission' interdependency and expected behaviors

| Value in kind | Value in arbitrary_commission | Value in commission_percent  |  Expected Behaviors               |
|---------------------|--------|--------------------------|---------------------------|
|   user_to_user  | true    |  specified     |   Throws Validation Error  (Error Handling Doc)  |
|  user_to_user | true    |  not specified |  Successfully creates action, comission will be expected during execution. |
|  user_to_user | false   |  not specified |  Successfully creates action. And since setting commission for an action is optional. These settings say the respective action has no commission set on it. |
|  user_to_user | false   |  specified     |  Successfully creates action, commission will be static set at the time creation or updation. |

Including _arbitrary_commission_ or _commission_percent_ for either _user_to_company_ or _company_to_user_ action types will result in an error. 

The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/actions/?api_key=6078017455d8be7d9f07&arbitrary_amount=true&currency=BT&kind=company_to_user&name=Collect&request_timestamp=1526309259`


The request url of this post request reads as

> POST - `https://sandboxapi.ost.com/v1/actions`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

api_key=6078017455d8be7d9f07&arbitrary_amount=true&currency=BT&kind=company_to_user&name=Collect&request_timestamp=1526309259&signature=db94792fa24de9f87cf7669e3766ad5eae4cf622f6d08df85ce522fed2c83feb       

```
### JSON Response Object

| Key        | Type   | Definition      |
|------------|--------|------------|
| _success_  | bool   | whether successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

On calling `/actions` the `data.result_type` is the string "action" and the key `data.action` is an object containing the attributes of the action.

### Action Object Attributes

| Attributes           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _id_                | number | identifier for the created action|
| _name_              | string    | (mandatory) unique name of the action |
| _kind_              | string    | an action can be one of three kinds:  "user_to_user", "company_to_user", or "user_to_company"  |
| _currency_          | string    | (mandatory) type of currency the action amount is specified in. Possible values are "USD" (fixed) or "BT" (floating).  When an action is set in fiat the equivalent amount of branded tokens are calculated on-chain over a price oracle. For OST KIT⍺ price points are calculated by and taken from coinmarketcap.com and published to the contract by OST.com. |
| _arbitrary_amount_  | boolean   | (mandatory) true/false. Indicates whether amount (described below) is set in the action, or whether it will be provided at the time of execution (i.e., when creating a transaction). | 
| _amount_            | string\<float\>  | amount of the action set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer. |
| _arbitrary_commission_ |boolean | true/false. Like '_arbitrary_amount_' this attribute indicates whether commission_percent (described below) is set in the action, or whether it will be provided at the time of execution (i.e., when creating a transaction).  |
| _commission_percent_| string\<float\>  | for user_to_user action you have an option to set commission percentage. The commission is inclusive in the _amount_ and the complement goes to the OST partner company. Possible values (min 0%, max 100%) |


### Example Success Response Body
```json
{
   "success": true,
   "data": {
      "result_type": "action",
      "action": {
         "id": 20831,
         "name": "Collect",
         "kind": "company_to_user",
         "currency": "BT",
         "arbitrary_amount": "true",
      }
   }
}
```
### Parameter Dependent Validations

### Example Failure Response Body
```json
{
  "success": false,
  "err": {
    "code": "Unauthorized",
    "msg": "Authentication Failure",
    "internal_id" : "companyRestFulApi(401:HJg2HK0A_f)",
    "error_data": {}
  }
}
```
however when a request is invalid the response is returned with status code 200 and the message and error data contain further information.
```json
{
   "success": false,
   "err": {
      "code": "invalid_request",
      "msg": "At least one parameter is invalid or missing. See err.error_data for more details.",
      "internal_id" : "companyRestFulApi(401:HJg2HK0A_f)",
      "error_data": [
         {
            "parameter": "name",
            "msg": "An action with that name already exists."
         }
      ]
   }
}
```

### Example Code | Curl
```bash
curl --request POST \
--url 'https://sandboxapi.ost.com/v1/actions/' \
--header 'Accept: application/json' \
--form request_timestamp=1526550240 \
--form signature=ecb9367903f87b9d26fb97d5c31a71c6586022ff521e9c89dfc9f1e0d2d0fd11 \
--form api_key=7cad25e082390a90114e \
--form name=Test \
--form kind=user_to_user \
--form currency=USD \
--form arbitrary_amount=false \
--form amount=1.01 \
--form arbitrary_commission=true \
```

>_last updated 22 May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
