---
id: version-1.0.0-api_transfers_list
title: OST KIT⍺ API | List Transfers
sidebar_label: List Transfers
original_id: api_transfers_list
---

To retrieve a list of OST⍺ Prime transfers, send a GET request to `/transfers`.

OST⍺ Prime is the base token on the OpenST-Protocol utility chains used by OST KIT⍺. The fees for transactions performed through OST KIT⍺ on a utility chain are paid for with OST⍺ Prime; in the same way, to deploy and interact with contracts separate from OST KIT⍺ on a utility chain, an account must have a sufficient balance of OST⍺ Prime to cover the attendant transaction fees.

OST KIT⍺ only knows about transfers of OST⍺ Prime made via the OST KIT⍺ Transfer API. If transfers are effected through other means, that information cannot be retrieved by sending a GET request to `/transfers`.

### Input Parameters

| Parameter | Type | Definition                                         |
|-----------|------|-----------------------------------------------|
| _api_key_           | string    | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |
|_page_no_            | number    | page number (starts from 1)|
| _order_by_          | string    | order the list by when the transfer was created (default) |
| _order_             | string    | orders the list in 'desc' (default). Accepts value 'asc' to order in ascending order. |
| _limit_             | number    | limits the number of transfer objects to be sent in one request. Possible Values Min 1, Max 100, Default 10.     
| _optional__filters_  | string    | filters can be used to refine your list. The Parameters on which filters are supported are detailed in the table below.|


### Filters on Transfers List
When you send a GET to `/Transfers`, a paginated response listing the transfers is sent. You can use filters to further refine your list.

Each filter parameter type is a comma-separated string.

| List Filter | Description                                | Example                             |
|------------|--------------------------------------------|-------------------------------------|
| _id_          | Transfer ids                                 | 'id="2c66960e-0380-4f7b-8f41-c344d44ab3d4, cee672d6-bd9f-4f41-a18c-81b651ea9393"'                     |

The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/transfers/?api_key=ed0787e817d4946c7e77&limit=2&request_timestamp=1526452463`

The request url of this GET request reads as

> GET - `https://sandboxapi.ost.com/v1/transactions/?api_key=6078017455d8be7d9f07&limit=2&request_timestamp=1526452463&signature=b6edbce2f37ef5fa50818bbdd2e1eeb3a877d555b928b0b9665a367c9a02fa00`

### JSON Response Object

| Key        | Type   | Definition      |
|------------|--------|------------|
| _success_  | bool   | post successfulness |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

On calling `/transfers`, `data.result_type` is the string "transfers" and `data.transfers` is an object containing an array of `transfer` objects.

### Transfer Object Attributes

| Parameter | Type   | Value  |
|-----------|--------|--------|
| _id_                | string | identifier for the transfer object |
| _from_address_      | string | token economy reserve address from which OST⍺ Prime is transferred |
| _to_address_        | string | address to which to transfer OST⍺ Prime |
| _amount_            | string\<number\> | amount of OST⍺ Prime to transfer *in Wei* |
| _transaction_hash_  | string | the generated transaction hash (`null`, initially) |
| _timestamp_         | number | epoch time in milliseconds of current time |
| _status_            | string | the execution status of the transaction type: "processing", "failed" or "complete" |
| _gas_price_         | string\<number\> | value of the gas utilized for the transaction |
| _gas_used_          | string | (optional) hexadecimal value of the gas used to execute the transaction (`null`, initially) |
| _block_number_      | string\<number\> | (optional) the block on the chain in which the  was included (`null`, initially) |
| _chain_id_          | string\<number\> | the identifier of the chain to which the transaction was sent |

### Example Success Response

```json
{
  "success": true,
  "data": {
    "result_type": "transfers",
    "transfers": [
      {
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
        "chain_id": "198"
      },
      {
        "id": "cee672d6-bd9f-4f41-a18c-81b651ea9393",
        "from_address": "0xd8f38f893868288fb8408b8Cb9e0cC0061B25e93",
        "to_address": "0x3266b53987a77e7f1adf84230e817e04e59c9726",
        "amount": "12",
        "transaction_hash": "0xbc3f502c4e8d074ce2884242de235cc5e6fd378646ee1f62ba16a48902f458a8",
        "timestamp": 1526462120000,
        "status": "complete",
        "gas_price": "5000000000",
        "gas_used": null,
        "block_number": "2326190",
        "chain_id": "198"
      }
    ],
    "meta": {
      "next_page_payload": {
        "order_by": "id",
        "order": "desc",
        "limit": 2,
        "page_no": 2
      }
    }
  }
}

```

### Example Failure Responses

On a failed authentication, the response will have a `code` 401 and there will be an `err` object that contains further information. The body will look like this,

```json
{
  "success": false,
  "err": {
    "internal_id": "companyRestFulApi(401:HJg2HK0A_f)",
    "code": "UNAUTHORIZED",
    "msg": "We could not authenticate the request. Please review your credentials and authentication method.",
    "error_data": {}
  },
}
```

### Sample Code | Curl
```bash
curl --request GET \
--url 'https://sandboxapi.ost.com/v1.0/transfers' \
--header 'Accept: application/json' \
--form request_timestamp=1526452463 \
--form signature=b6edbce2f37ef5fa50818bbdd2e1eeb3a877d555b928b0b9665a367c9a02fa00 \
--form api_key=ed0787e817d4946c7e77 \
--form limit=2 \
```

>_last updated 17th May 2018_; for support see [<u>help.ost.com</u>](help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
