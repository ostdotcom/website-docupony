---
id: version-1.0.0-api_actions_create
title: OST KIT⍺ API | Create An Action
sidebar_label: Create An Action
original_id: api_actions_create
---

Send a POST request to `/actions` to create a new `action`.  Actions are interactions in your application that allow users to exchange branded tokens between each other within the application or with the company.  

Within OST KIT⍺ you can set up actions to define advanced payments to tokenize your application. An action's amount can be set in branded tokens ($BT) or in fiat ($USD). This amount represents how much the action is worth each time one of your customers execute that action.   

Note that OST KIT⍺ runs on a testnet and tokens have no market value. For fiat payments a price oracle is consulted on-chain to calculate the equivalent amount of branded tokens to transfer.

An action is of a certain kind: user_to_user, user_to_company, or company_to_user. For user_to_user kind of actions the company has the provision to set a transaction fee on that action when its executed.

### Input Parameters
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |
| _name_              | string    | (mandatory) name of the action, unique |
| _kind_              | string    | an action can be one of three kinds:  "user_to_user", "company_to_user", or "user_to_company" to clearly determine whether value flows within the application or from or to the company. |
| _currency_          | string    | (mandatory) type of currency the action amount is specified in. Possible values are "USD" (fixed) or "BT" (floating).  When an action is set in fiat the equivalent amount of branded tokens are calculated on-chain over a price oracle.  The action creation fails if the price point is outside of the accepted margins set by the company. For OST KIT⍺ price points are calculated by and taken from coinmarketcap.com and published to the contract by OST.com. |
| _arbitrary_amount_  | boolean   | (mandatory) True/False. You can choose to set the amount of the action either at the time of creating the action or set it just before the action is executed each time. A 'True' value considers that the amount is to be set before the action is executed each time. And a 'False' means the action has a static amount that is set at the time of creation.  | 
| _amount_            | string<float>  | amount of the action set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer. |
| _arbitrary_commission_ |boolean | True/False. Like '_arbitrary_amount_' you can also choose to set the commission of the action either at the time of creating a user_to_user action or set it just before the user_to_user action is executed each time. |
| _commission_percent_| string<float>  | If the action kind is user_to_user and a commission percentage is set then the commission is inclusive in the _amount_ and the complement goes to the company. Possible values (min 0%, max 100%) |

where the signature is derived from the API secret key and the string to sign.The string to sign is formed with API parameters alphabetically sorted as below.

`/actions/?api_key=API_KEY&arbitrary_amount=FALSE&arbitrary_commission=FALSE&amount=AMOUNT&commission_percent=COMMISSION_PERCENT&currency=CURRENCY_TYPE&kind=KIND&name=NAME&request_timestamp=REQUEST_TIMESTAMP`

The request url of this post request reads as

> POST - `https://playgroundapi.ost.com/actions`

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

**To check and change** On calling `/actions` the `data.result_type` is the string "transactions" and the key `data.transactions` is an array containing the created transaction type object.

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
    "result_type": "transactions",
    "transactions": [
      {
        "id": 10170,
       
      }
    ]
  }
}

```


### Example Failure Response

**  Conflict or validation errors in case of dependent parameters and their values. To include in tabular format!? ** 
For a failed authentication the response is returned with status code 401 and the body can look like this,
```json
{
  "success": false,
  "err": {
    // ** to work on **
  }
}
```
however when a request is invalid the response is returned with status code 200 and the message and error data contain further information.
```json
{
  "success": false,
  "err": {
    // ** to work on **
  }
}
```

### Sample Code | Curl
```bash
curl --request 
# ** to work on **
```

>_last updated 13th May 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v2 | OpenST Platform v0.9.2
