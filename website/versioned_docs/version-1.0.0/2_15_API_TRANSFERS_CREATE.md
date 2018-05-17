---
id: version-1.0.0-api_transfers_create
title: OST KIT⍺ API | Create a Transfer
sidebar_label: Create a Transfer
original_id: api_transfers_create
---

To transfer OST⍺ Prime to an account outside of your branded token economy, send a POST request to `/transfers`.

OST⍺ Prime is the base token on the OpenST-Protocol utility chains used by OST KIT⍺. The fees for transactions performed through OST KIT⍺ on a utility chain are paid for with OST⍺ Prime; in the same way, to deploy contracts and interact with them on a utility chain, an account must have a sufficient balance of OST⍺ Prime to cover transaction fees.

### Input Parameters

| Parameter           | Type      | Definition  |
|---------------------|-----------|--------|
| _api_key_           | string    | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](/docs/api_authentication.html) for current request |
| _to_address_        | hexstring | (mandatory) public address to which to transfer OST⍺ Prime |
| _amount_            | number    | (mandatory) amount of OST⍺ Prime to transfer _in Wei_; should be between 0 and 10^20, exclusive |

#### **`to_address`**

In order to deploy a smart contract on a utility chain, you will have to send a transaction to it. This transaction needs to be signed by a private key that you control. To pay for this transaction your account should have a sufficient OST⍺ Prime balance.

In order to fund an account with OST⍺ Prime by sending a POST request to `/transfers`, provide the public address for the private key of that account as the `to_address`. The `to_address` for an OST⍺ Prime transfer should be a public Ethereum address for which you have control over the private key.

*OST⍺ Prime sent to an address for which you do not have control over the private key, <u>including ANY address that is related to a branded token economy</u>, will become inaccessible to you.*

#### **`amount`**

The `amount` for OST⍺ Prime transfers is in Wei, which is a significantly smaller denomination than that of the APIs for branded token `actions` and `transactions`:
- 1 OST⍺ Prime Wei == 0.000000000000000001 OST⍺ Prime
- 1000000000000000000 OST⍺ Prime Wei == 1 OST⍺ Prime

The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/transfers/?amount=1&api_key=ed0787e817d4946c7e77&request_timestamp=1526461383&to_address=0xd2b789293674faEE51bEb2d0338d15401dEbfdE3`

The request url of this post request reads as

> POST - `https://sandboxapi.ost.com/v1/transfers`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

amount=1&api_key=ed0787e817d4946c7e77&request_timestamp=1526461383&to_address=0xd2b789293674faEE51bEb2d0338d15401dEbfdE3&signature=9df6e31ebc82db03e5a06404959c1301da632041d1930e29a9ed25db2571e7d7

```

### JSON Response Object

| Key        | Type   | Definition      |
|------------|--------|------------|
| _success_  | bool   | whether successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

For calls to `/transfers`, `data.result_type` is the string "transfer" and `data.transfer` is an object containing the attributes of the `transfer`.

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
      "id": "265187af-a975-497a-8cdb-c59244a36e61",
      "from_address": "0xd8f38f893868288fb8408b8Cb9e0cC0061B25e93",
      "to_address": "0xd2b789293674faEE51bEb2d0338d15401dEbfdE3",
      "amount": "1",
      "transaction_hash": null,
      "timestamp": 1526461384000,
      "status": "processing",
      "gas_price": "5000000000",
      "gas_used": null,
      "block_number": null,
      "chain_id": "198"
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

The OST⍺ Prime balance for a token economy can be retrieved by making a [<u>GET request to /tokens</u>](/docs/api_token_retrieve.html). More OST⍺ Prime can be obtained through the [<u>OST KIT⍺ dashboard</u>](https://kit.ost.com).

### Sample Code | Curl
```bash
curl --request POST \
--url 'https://sandboxapi.ost.com/v1/transfers/' \
--header 'Accept: application/x-www-form-urlencoded' \
--form request_timestamp=1526550706 \
--form signature=ce1adf523e03ad697475e12f36bd958441c867c1968a8b9a16a7c446bcb711fe \
--form api_key=7cad25e082390a90114e \
--form to_address=0xd2b789293674faEE51bEb2d0338d15401dEbfdE3 \
--form amount=1 \
```

>_last updated 17 May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
