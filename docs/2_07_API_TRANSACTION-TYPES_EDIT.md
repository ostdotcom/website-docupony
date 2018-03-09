---
id: api_transaction-types_edit
title: OST KIT API | Edit A Transaction Type
sidebar_label: /transaction-types/edit
---

Post to `/trasaction-types/edit` to edit an exisiting `transaction-type` for a given unique identifier that was returned during the creation of a new [transaction type](api_transaction-types_create.html). This updates the specified transaction type by setting the values of the parameters passed. Any parameter not provided will be left unchanged. Individual keys can be unset by posting an empty value to them. 


### Input Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _client_id_         | string | unique identifier for the exisiting transaction type|
| _name_              | string    | name of the transaction |
| _kind_              | string    | type of transaction dependent on the owners involved in the token exchange|
| _currency_type_     | string    | type of currency the transaction is valued in. Possible values are `USD` or `BT`   |
| _currency_value_    | float     | positive value of the currency with respect to _currency_type_|
| _commission_percent_| float     | percentage of transaction value that you set as a service provider on a transaction. Can be set for only _user_to_user_ transaction type. |

where the signature is derived from the API secret key and the string to sign is alphabetically sorted

`/transaction-types/edit?api_key=API_KEY&name=NAME&request_timestamp=EPOCH_TIME_SEC`

so that the full request uri and form reads

> POST - https://playgroundapi.ost.com/transaction-types/edit?api_key=API_KEY&client_id=CLIENT_ID&commission_percent=COMMISSION_PERCENT&currency_type=CURRENCY_TYPE&currency_value=CURRENCY_VALUE&kind=KIND&name=NAME&request_timepstamp=EPOCH_TIME_SEC&signature=SIGNATURE&&

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/transaction-types` the `data.result_type` is the string "transaction-types"
and the key `data.transaction-types` is an array of `transaction-types` objects.
On successful editing of the transaction type, `transaction-types` contains the created user as a single element.

### Transaction-types Object Attributes:

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _client_id_         | string | unique identifier for the created transaction type
| _name_              | string | name of the transaction |
| _kind_              | string | type of transaction dependent on the owners involved in the token exchange|
| _currency_type_     | string | type of currency the transaction is valued in. Possible values are `USD` or `BT`   |
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
| _USD_       | string | Fiat currency that the transaction is valued in.   |
| _BT_        | string | Branded tokens that the transaction is valued in.  |


### Example Success Response
```json
{
  "success": true,
  "data": {
    "result_type": "transaction-types",
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
        "name"=>"Tx Kind name should contain btw 3 - 15 aplhabets."
      }
    ]
  }
}
```



#### Sample Code | Curl 
```bash
curl --request POST \
  --url 'https://playgroundapi.ost.com/transaction-types/create' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form client_id=20373 \
  --form kind=user_to_user \
  --form currency_value=1 \
  --form commission_percent=10 \
  --form currency_type=USD
```


>_last updated 8 March 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT alpha v1 | OpenST Platform v0.9.2