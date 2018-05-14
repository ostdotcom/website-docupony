---
id: version-1.0.0-api_actions_update
title: OST KIT⍺ API | Update An Action
sidebar_label: Update an Action
original_id: api_actions_update
---

Send a POST request to `/actions/{id}` to update an exisiting `action`. The {id} in the API endpoint is an unique identifier that was returned during the [<u>creation of the action</u>](2_06_API_ACTIONS_CREATE.md) OR is returned as `id` when a GET is sent to [<u>`/actions`</u>](2_08_API_ACTIONS_LIST.md). 

This API updates the specified action by setting the values of the parameters passed. Any parameter not provided will be left unchanged. Individual keys can be unset by posting an empty value to them.  ** TO CONFIRM **

Within OST KIT⍺ you can set up actions to define advanced payments to tokenize your application. An action's amount can be set in branded tokens ($BT) or in fiat ($USD). This amount represents how much the action is worth each time one of your customers execute that action. 

An action is of a certain kind: user_to_user, user_to_company, or company_to_user. For user_to_user kind of actions the company has the provision to set a transaction fee on that action when its executed.

### Input Parameters
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request | 
| _name_              | string    | (mandatory) name of the action, unique |
| _kind_              | string    | an action can be one of three kinds:  "user_to_user", "company_to_user", or "user_to_company" to clearly determine whether value flows within the application or from or to the company. |
| _currency_          | string    | (mandatory) type of currency the action amount is specified in. Possible values are "USD" (fixed) or "BT" (floating).  When an action is set in fiat the equivalent amount of branded tokens are calculated on-chain over a price oracle.  The action creation fails if the price point is outside of the accepted margins set by the company. For OST KIT⍺ price points are calculated by and taken from coinmarketcap.com and published to the contract by OST.com. |
| _arbitrary_amount_  | boolean   | (mandatory) True/False. You can choose to set the amount of the action either at the time of creating the action or set it just before the action is executed each time. A 'True' value considers that the amount is to be set before the action is executed each time. And a 'False' means the action has a static amount that is set at the time of creation.  | 
| _amount_            | string<float>  | amount of the action set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer. |
| _arbitrary_commission_ |boolean | True/False. Like '_arbitrary_amount_' you can also choose to set the commission of the action either at the time of creating a user_to_user action or set it just before the user_to_user action is executed each time. |
| _commission_percent_| string<float>  | If the action kind is user_to_user and a commission percentage is set then the commission is inclusive in the _amount_ and the complement goes to the company. Possible values (min 0%, max 100%) |


where the signature is derived from the API secret key and the string to sign.The string to sign is formed with API parameters alphabetically sorted as below.

`actions/ID/?api_key=API_KEY&arbitrary_amount=FALSE&arbitrary_commission=FALSE&amount=AMOUNT&commission_percent=COMMISSION_PERCENT&currency=CURRENCY_TYPE&kind=KIND&name=NAME&request_timestamp=REQUEST_TIMESTAMP`

The request url of this post request reads as

> POST - `https://playgroundapi.ost.com/actions/ID`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

api_key=API_KEY&arbitrary_amount=FALSE&arbitrary_commission=FALSE&amount=AMOUNT&commission_percent=COMMISSION_PERCENT&currency=CURRENCY_TYPE&kind=KIND&name=NAME&request_timestamp=REQUEST_TIMESTAMP&signature=SIGNATURE

```

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

**To check and change** On calling `/transaction-types/edit` the `data.result_type` is the string "transactions" and the key `data.transactions` is an array containing the edited transaction type object with the parameters changed.

### Action Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _id_                | number | identifier for the created action|
| _name_              | string    | (mandatory) name of the action, unique |
| _kind_              | string    | an action can be one of three kinds:  "user_to_user", "company_to_user", or "user_to_company" to clearly determine whether value flows within the application or from or to the company. |
| _currency_          | string    | (mandatory) type of currency the action amount is specified in. Possible values are "USD" (fixed) or "BT" (floating).  When an action is set in fiat the equivalent amount of branded tokens are calculated on-chain over a price oracle.  The action creation fails if the price point is outside of the accepted margins set by the company. For OST KIT⍺ price points are calculated by and taken from coinmarketcap.com and published to the contract by OST.com. |
| _arbitrary_amount_  | boolean   | (mandatory) True/False. You can choose to set the amount of the action either at the time of creating the action or set it just before the action is executed each time. A 'True' value considers that the amount is to be set before the action is executed each time. And a 'False' means the action has a static amount that is set at the time of creation.  | 
| _amount_            | string<float>  | amount of the action set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer. |
| _arbitrary_commission_ |boolean | True/False. Like '_arbitrary_amount_' you can also choose to set the commission of the action either at the time of creating a user_to_user action or set it just before the user_to_user action is executed each time. |
| _commission_percent_| string<float>  | If the action kind is user_to_user and a commission percentage is set then the commission is inclusive in the _amount_ and the complement goes to the company. Possible values (min 0%, max 100%) |


### Example Success Response
```json
{
  "success": true,
  "data": {
    //** To be worked on
  }
}
```

### Sample Code | Curl
```bash
curl --request 
## to be worked on **
```

>_last updated 14th May 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
