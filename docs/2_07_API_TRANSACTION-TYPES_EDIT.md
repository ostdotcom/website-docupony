---
id: api_transaction-types_edit
title: OST KIT API | Edit A Transaction Type
sidebar_label: /transaction-types/edit
---

Send a POST request to `/transaction-types/edit` to edit an exisiting `transaction-type` for a given unique identifier that was returned during the creation of a new [transaction type](api_transaction-types_create.html). This updates the specified transaction type by setting the values of the parameters passed. Any parameter not provided will be left unchanged. Individual keys can be unset by posting an empty value to them. 


### Input Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [signature generated]() for current request |
| _name_              | string    | name of the transaction |
| _kind_              | string    | type of transaction dependent on the owners involved in the token exchange. Possible values are "user_to_user" - token exchange from one user to another user  , "user_to_company" - from a user to you (the application service provider), "company_to_user" - exchange from you (the application service provider) to an end-user |
| _currency_type_     | string    | type of currency the transaction is valued in. Possible values are "USD" - Fiat currency that the transaction is valued in or "BT" - Branded tokens that the transaction is valued in.   |
| _currency_value_    | float  | positive value of the currency with respect to _currency_type_ "USD" (min - 0.01$ , max - 100$ ) and "BT" (min - 0.00001, max - 100)|
| _commission_percent_| float  | percentage of transaction value that you set as a service provider on a transaction. Possible only for _user_to_user_ transaction type. (min - 0, max - 100) |

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

For api calls to `/transaction-types` the `data.result_type` is the string "transactions" and the key `data.transactions` is an array of `transactions` objects.
On successful editing of the transaction type, `transactions` contains the edited transaction type as a single element.

### Transaction-types Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _id_                | number | unique identifier for the created transaction type|
| _client_id_         | number | unique identifier of the client|
| _name_              | string | name of the transaction type |
| _kind_              | string | type of transaction dependent on the owners involved in the token exchange. Possible values are "user_to_user" - token exchange from one user to another user  , "user_to_company" - from a user to you (the application service provider), "company_to_user" - exchange from you (the application service provider) to an end-user |
| _currency_type_     | string | type of currency the transaction is valued in. Possible values are "USD" or "BT"   |
| _currency_value_    | float  | positive value of the currency with respect to _currency_type_ "USD" (min - 0.01$ , max - 100$ ) and "BT" (min - 0.00001, max - 100)|
| _commission_percent_| float  | percentage of transaction value that you set as a service provider on a transaction. Possible only for _user_to_user_ transaction type. (min - 0, max - 100) |
| _status_            | string| the status of the creation of the user|
| _device_id_         |number | an id used to identify if the created transaction types was by the OST KIT standard examples or by you|
| _uts_               |number | universal time stamp value in  milliseconds|



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
        "name": "ABC",
        "kind": "user_to_user",
        "currency_type": "USD",
        "currency_value": "1.1",
        "device_id": 53,
        "commission_percent": "1.1",
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



### Sample Code | Curl 
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