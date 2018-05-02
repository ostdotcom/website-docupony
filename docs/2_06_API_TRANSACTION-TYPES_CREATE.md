---
id: api_transaction-types_create
title: OST KIT⍺ API | Create A Transaction Type
sidebar_label: /transaction-types/create
---

Send a POST request to `/transaction-types/create` to create a new `transaction-type`.  Transaction types allow users to exchange branded tokens between each other for actions within the application or with the company.  

Within OST KIT⍺ you can set up transaction-types to define advanced payments to tokenize your application. A transaction type is of a certain kind: user_to_user, user_to_company, or company_to_user. A transaction type's value is set in branded tokens ($BT) or in fiat ($USD). Note that OST KIT⍺ runs on a testnet and tokens have no market value. For fiat payments a price oracle is consulted on-chain to calculate the equivalent amount of branded tokens to transfer. Lastly for user to user payments the company can set a transaction fee to earn on a user-to-user payment.

### Input Parameters
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |
| _name_              | string    | name of the transaction type |
| _kind_              | string    | transaction types can be one of three kinds:  "user_to_user", "company_to_user", or "user_to_company" to clearly determine whether value flows within the application or from or to the company.  On user to user transfers the company can ask a transaction fee.  |
| _currency_type_     | string    | type of currency the transaction is valued in. Possible values are "USD" (fixed) or "BT" (floating).  When a transaction type is set in fiat value the equivalent amount of branded tokens are calculated on-chain over a price oracle.  A transaction fails if the price point is outside of the accepted margins set by the company (API not yet exposed). For OST KIT⍺ price points are calculated by and taken from coinmarketcap.com and published to the contract by OST.com. |
| _currency_value_    | float  | value of the transaction set in "USD" (min USD 0.01 , max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and for fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer.  If the transaction type is between users and a commission percentage is set then the commission is inclusive in this value and the complement goes to the beneficiary user. |
| _commission_percent_| float  | inclusive percentage of the value that is sent to company. Possible only for "user_to_user" transaction kind. (min 0%, max 100%) |

where the signature is derived from the API secret key and the string to sign.The string to sign is formed with API parameters alphabetically sorted as below.

`/transaction-types/create?api_key=API_KEY&commission_percent=COMMISSION_PERCENT&currency_type=CURRENCY_TYPE&currency_value=CURRENCY_VALUE&kind=KIND&name=NAME&request_timestamp=REQUEST_TIMESTAMP`

The request url of this post request reads as

> POST - `https://playgroundapi.ost.com/transaction-types/create`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

api_key=API_KEY&commission_percent=COMMISSION_PERCENT&currency_type=CURRENCY_TYPE&currency_value=CURRENCY_VALUE&kind=KIND&name=NAME&request_timestamp=REQUEST_TIMESTAMP&signature=SIGNATURE        

```
### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

On calling `/transaction-types/create` the `data.result_type` is the string "transactions" and the key `data.transactions` is an array containing the created transaction type object.

### Transaction-types Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _id_                | number | identifier for the created transaction type|
| _client_id_         | number | identifier of the authorised client |
| _name_              | string | name of the transaction type |
| _kind_              | string | transaction types can be one of three kinds:  "user_to_user", "company_to_user", or "user_to_company" to clearly determine whether value flows within the application or from or to the company.  On user to user transfers the company can ask a transaction fee. |
| _currency_type_     | string    | type of currency the transaction is valued in. Possible values are "USD" (fixed) or "BT" (floating).  When a transaction type is set in fiat value the equivalent amount of branded tokens are calculated on-chain over a price oracle.  A transaction fails if the price point is outside of the accepted margins set by the company (API not yet exposed). For OST KIT⍺ price points are calculated by and taken from coinmarketcap.com and published to the contract by OST.com. |
| _currency_value_    | float  | value of the transaction set in "USD" (min USD 0.01, max USD 100) or branded token "BT" (min BT 0.00001, max BT 100).  The transfer on-chain always occurs in branded token and for fiat value is calculated to the equivalent amount of branded tokens at the moment of transfer.  If the transaction type is between users and a commission percentage is set then the commission is inclusive in this value and the complement goes to the beneficiary user. |
| _commission_percent_| float  | inclusive percentage of the value that is paid to the company. Possible only for "user_to_user" transaction kind. (min 0%, max 100%) |
| _status_            | string | status of the create transaction-type (default: "active") |
| _uts_               | number | unix timestamp in  milliseconds|



### Example Success Response
```json
{
  "success": true,
  "data": {
    "result_type": "transactions",
    "transactions": [
      {
        "id": 10170,
        "client_id": 20373,
        "name": "Upvote",
        "kind": "user_to_user",
        "currency_type": "USD",
        "currency_value": "0.2",
        "commission_percent": "0.1",
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
        "name": "Transaction-types name \"Upvote\" already present."
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
--form name=Upvote \
--form kind=user_to_user \
--form currency_type=USD \
--form currency_value=0.2 \
--form commission_percent=0.1
```

>_last updated 30th April 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
