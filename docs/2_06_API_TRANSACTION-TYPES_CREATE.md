---
id: api_transaction-types_create
title: OST KIT API | Create A Transaction Type
sidebar_label: /transaction-types/create
---

Post to `/trasaction-types/create` to create a new `transaction-type` and obtain a unique identifier to allows the users to exchange branded token between each other and the company within your application.  

### Input Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _name_              | string    | name of the transaction |
| _kind_              | string    | type of transaction dependent on the owners involved in the token exchange|
| _currency_type_     | string    | type of currency the transaction is valued in. Possible values are `usd` or `bt`   |
| _currency_value_    | float     | positive value of the currency with respect to _currency_type_|
| _commission_percent_| float     | percentage of transaction value that you set as a service provider on a transaction. Can be set for only _user_to_user_ transaction type. |

where the signature is derived from the API secret key and the string to sign is alphabetically sorted

`/transaction-types/create?api_key=API_KEY&name=NAME&request_timestamp=EPOCH_TIME_SEC`

so that the full request uri and form reads

> POST - https://playgroundapi.ost.com/transaction-types/create?api_key=API_KEY&commission_percent=COMMISSION_PERCENT&currency_type=CURRENCY_TYPE&currency_value=CURRENCY_VALUE&kind=KIND&name=NAME&request_timepstamp=EPOCH_TIME_SEC&signature=SIGNATURE&&

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/transaction-types` the `data.result_type` is the string "transaction-types"
and the key `data.transaction-types` is an array of `transaction-types` objects.
On successful creation of the transaction type, `transaction-types` contains the created user as a single element.

### Transaction-types Object Attributes:

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _client_id_         | string | unique identifier for the created transaction type
| _name_              | string | name of the transaction |
| _kind_              | string | type of transaction dependent on the owners involved in the token exchange|
| _currency_type_     | string | type of currency the transaction is valued in. Possible values are `usd` or `bt`   |
| _currency_value_    | float  | positive value of the currency with respect to _currency_type_|
| _commission_percent_| float  | percentage of transaction value that you set as a service provider on a transaction. Possible only for _user_to_user_ transaction type. |


### Transaction-types Object Sub-Attributes

#### _kind_  
| Parameter       | Type   | Definition  |
|-----------------|--------|----------------------------------|
| _user_to_user_    | string | token exchange from one user to another user |
| _user_to_company_ | string | token exchange from an user to you (the application service provider) |
| _company_to_user_ | string | token exchange from you (the application service provider) to an end-user  |

#### _value_currency_type_ 
| Parameter | Type   | Definition  |
|-----------|--------|--------------------------------------------------------|
| _usd_       | string | Fiat currency that the transaction is valued in.   |
| _bt_        | string | Branded tokens that the transaction is valued in.  |


### Example Success Response

```json
{
  "success": true,
  "data": {
    "result_type": "transactions",
    "transactions": [
      {
        "id": 20373,
        "client_id": 20373,
        "client_transaction_id": 20373,
        "name": "ABC",
        "kind": "user_to_user",
        "currency_type": "USD",
        "currency_value": "1.1",
        "commission_percent": "1.1",
        "status": "active",
        "uts": 1520179969832
      }
    ]
  }
}

```


### Example Failure Response
For a failed authentication the response is returned with status code 401 and the body can look like this,

```json
{
  "success": false,
  "err": {
    "code": "companyRestFulApi(401:HJg2HK0A_f)",
    "msg": "Unauthorized",
    "error_data": {}
  }
}
```
however when a request is invalid the response is returned with status code 200 and the message and error data contain further information.
```json
{
  "success": false,
  "err": {
    "code": "companyRestFulApi(s_a_g_1:rJndQJkYG)",
    "msg": "invalid params",
    "error_data": [
      {
        "name": "Transaction-types name \"ABC\" already present."
      }
    ]
  }
}
```

### Sample Code | Curl
```bash
curl --request POST \
  --url 'https://playgroundapi.ost.com/transaction-types/create' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form name=ABC \
  --form kind=user_to_user \
  --form currency_type=USD \
  --form currency_value=1 \
  --form commission_percent=10
```


### Post-Script 
Creating transactions requires evaluating core user actions on your application and filtering out for the ones that you want to trigger branded token exchanges. Once you have decided the core actions you should start with creating a transaction for each of them. While setting up these transactions you should decide the type of the transaction, associate a value to it and also (if required) set a commission on it. An “Upvote” for example would be setup as a _user-to-user_ transaction, whereas something like “Rewards”  would be setup as a _company-to-user_ transaction. The value for a transaction can be set in two ways. One in the fiat value system: USD - US dollars and second in the tokenized value system: BT - your branded token.

>_last updated 8 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT alpha v1 | OpenST Platform v0.9.2