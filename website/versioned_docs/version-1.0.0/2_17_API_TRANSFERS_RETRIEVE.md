---
id: version-1.0.0-api_transfers_retrieve
title: OST KIT⍺ API | Retrieve a Transfer
sidebar_label: Retrieve a Transfer
original_id: api_transfers_retrieve
---

To retrieve a specific OST⍺ Prime transfer, send a GET request to `/transfers/{id}`. The `{id}` in the API endpoint is a unique identifier that is returned during the [<u>creation of the transfer</u>](/docs/api_transfers_create.html).

OST⍺ Prime is the base token on the OpenST-Protocol utility chains used by OST KIT⍺. The fees for transactions performed through OST KIT⍺ on a utility chain are paid for with OST⍺ Prime; in the same way, to deploy contracts and interact with them on a utility chain, an account must have a sufficient balance of OST⍺ Prime to cover transaction fees.

### Input Parameters
The retrieve API only takes the mandatory authentication parameters as inputs.

| Parameter           | Type   | Definition                                               |
|---------------------|--------|-----------------------------------------------------|
| _api_key_           | string    | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](/docs/api_authentication.html) for current request |

The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/transfers/2c66960e-0380-4f7b-8f41-c344d44ab3d4?api_key=6078017455d8be7d9f07&request_timestamp=1526467650`

so that the full request query reads 

> GET - `https://sandboxapi.ost.com/v1/transfers/2c66960e-0380-4f7b-8f41-c344d44ab3d4?api_key=6078017455d8be7d9f07&request_timestamp=1526467650&signature=9df6e31ebc82db03e5a06404959c1301da632041d1930e29a9ed25db2571e7d7`

### JSON Response Object

| Key        | Type   | Definition      |
|------------|--------|------------|
| _success_  | bool   | whether successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

For calls to `/transfers/{id}`, `data.result_type` is the string "transfer" and `data.transfer` is an object containing the attributes of the specified `transfer`.

### Transfer Object Attributes

| Parameter | Type   | Definition  |
|-----------|--------|--------|
| _id_                | string | identifier for the transfer object |
| _from_address_      | string | token economy reserve address that is controlled by OST KIT⍺ from which OST⍺ Prime is transferred |
| _to_address_        | string | address to which to transfer OST⍺ Prime |
| _amount_            | string\<number\> | amount of OST⍺ Prime to transfer *in Wei* |
| _transaction_hash_  | string | the generated transaction hash (`null`, initially) |
| _timestamp_         | number | epoch time in milliseconds of current time |
| _status_            | string | the execution status of the transfer: "processing", "failed" or "complete" |
| _gas_price_         | string\<number\> | value of the gas utilized for the transfer |
| _gas_used_          | string | (optional) hexadecimal value of the gas used to execute the transfer (`null`, initially) |
| _block_number_      | string\<number\> | (optional) the block on the chain in which the transfer was included (`null`, initially) |
| _chain_id_          | string\<number\> | the identifier of the chain to which the transfer transaction was sent |


### Example Success Response Body

```json
{
  "success": true,
  "data": {
    "result_type": "transfer",
    "transfer": {
        "id": "2c66960e-0380-4f7b-8f41-c344d44ab3d4",
        "from_address": "0xd8f38f893868288fb8408b8Cb9e0cC0061B25e93",
        "to_address": "0xd2b789293674faEE51bEb2d0338d15401dEbfdE3",
        "amount": "1",
        "transaction_hash": "0x068bd88d9ac7818552232fff7d9be5069c9078f8402cc50d352cbb69bde02ed1",
        "timestamp": 1526463885000,
        "status": "complete",
        "gas_price": "5000000000",
        "gas_used": null,
        "block_number": "2327073",
        "chain_id": "1409"
    }
  }
}

```

### Example Failure Response Body

On a failed authentication, the response will have a `code` 401. The body will look like this,

```json
{
  "success": false,
  "err": {
    "code": "UNAUTHORIZED",
    "msg": "We could not authenticate the request. Please review your credentials and authentication method.",
    "error_data": [

    ],
    "internal_id": "a_1"
  }
}
```

### Example Code | Curl
```bash
curl --request GET \
--url 'https://sandboxapi.ost.com/v1/transfers/d0589dc5-d0a0-4996-b9f8-847295fd2c3b' \
--header 'Accept: application/x-www-form-urlencoded' \
--form request_timestamp=1526550753 \
--form signature=c709eaf7489e54d2e6baa61d18441bcfbe343e2b2c6217e9c29a125cdf4fb674 \
--form api_key=7cad25e082390a90114e \
```

>_last updated 17 May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
