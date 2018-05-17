---
id: version-1.0.0-api_transaction_execute
title: OST KIT⍺ API | Execute An Action
sidebar_label: Execute an Action
original_id: api_transaction_execute
---

Send a POST request on `/transaction-types/execute` to get a list of executed transactions.

Within OST KIT⍺ you can set up actions to define advanced payments to tokenize your application. A transaction type is of a certain kind: user_to_user, user_to_company, or company_to_user. A transaction type's value is set in branded tokens ($BT) or in fiat ($USD). Note that OST KIT⍺ runs on a testnet and tokens have no market value. For fiat payments a price oracle is consulted on-chain to calculate the equivalent amount of branded tokens to transfer. Lastly for user to user payments the company can set a transaction fee to earn on a user-to-user payment.

### Input Parameters
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | mandatory API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | mandatory epoch time in seconds of current time |
| _signature_         | hexstring | mandatory [<u>signature generated</u>](/docs/api_authentication.html) for current request |
| _from_uuid_    | string | user or company from whom to send the funds |
| _to_uuid_      | string | user or company to whom to send the funds |
| _transaction_kind_  | string | name of the transaction type to be executed, e.g. "Upvote" (note that the parameter is a misnomer currently) |

where the signature is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted as below.

`/transaction-types/execute?api_key=API_KEY&from_uuid=FROM_UUID&request_timestamp=EPOCH_TIME_SEC&to_uuid=TO_UUID&transaction_kind=NAME`

The request url of this post request reads as

> POST - `https://playgroundapi.ost.com/transaction-types/execute`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

api_key=API_KEY&from_uuid=FROM_UUID&request_timestamp=EPOCH_TIME_SEC&to_uuid=TO_UUID&transaction_kind=NAME&signature=SIGNATURE

```

### JSON Response Object

| Key        | Type   | Value      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/transaction-types/execute` the `data` is an object containing the attributes described below.  A success response acknowledges that the request is successfully queued and a transaction uuid is returned.

For the alpha release we have disabled pessimistic concurrency control to ensure that no false positives are returned. As a result you must query `transaction-types/status` for successful completion of the transaction.  

### Data Object Attributes

| Parameter           | Type   | Definition  |
|---------------------|--------|----------------------------------|
| _from_uuid_    | string | user or company from whom to send the funds |
| _to_uuid_      | string | user or company to whom to send the funds |
| _transaction_uuid_ | string | uuid of the transaction type that has been executed|
| _transaction_hash_ | hexstring | initially returned as null before the transaction is formed |
| _transaction_kind_  | string | name of the transaction type to be executed, e.g. "Upvote" (note that the parameter is a misnomer currently) |


### Sample Success Response
On a successful acknowledgement the transaction uuid must be queried on `/transaction-types/status` for completion of the transaction.
```json
{
  "success": true,
  "data": {
    "transaction_uuid": "49cc3411-7ab3-4478-8fac-beeab09e3ed2",
    "transaction_hash": null,
    "from_uuid": "1b5039ea-323f-416c-9007-7fe2d068d42d",
    "to_uuid": "286d2cb9-421b-495d-8a82-034d8e2c96e2",
    "transaction_kind": "Download"
  }
}
```

### Sample Failure Response
```json
{
  "success": false,
  "err": {
    "code": "companyRestFulApi(s_t_et_7:ByqHgCPKM)",
    "msg": "Invalid From user",
    "error_data": {}
  }
}
```

### Sample Code | Curl
```bash
curl --request POST \
--url 'https://playgroundapi.ost.com/transaction-types/execute'
--header "Accept: application/json"
--form api_key=API_KEY \
--form request_timestamp=EPOCH_TIME_SEC \
--form signature=SIGNATURE \
--form from_uuid=FROM_UUID \
--form to_uuid=TO_UUID \
--form transaction_kind=NAME \
```

>_last updated 30th April 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
