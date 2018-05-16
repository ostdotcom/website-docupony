---
id: api_token
title: OST KIT⍺ API | Token Details
sidebar_label: Token Details
---

Send a GET-request to `/token` to receive information about the `Branded Token` you created for your token economy.

The `Branded Token` you minted within your token economy setup process serves as your token economy's currency. As a part of that process you define a conversion rate of OST to your `Branded Token`, which will be fixed once you've set it up.

This `Branded Token` will be used by your token economy's users and your company to perform the transactions that have been defined, e.g. tokens can be airdropped to all or specific users or users can spend tokens to use certain services within an application.

The information you receive by performing this request also includes your `Simple Stake Contract Address`. A situation, in which this information could be relevant, would be if you want to find out your current OST⍺ balance available for transfers to non-OST KIT accounts on the utility chain. This could be the case if you have the intention to deploy your own smart contracts.


### Input Parameters [WIP]

| Parameter           | Type      | Mandatory| Description  |
|---------------------|-----------|--------|
| _api_key_           | string    | yes | API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number    | yes| epoch time in seconds of current time |
| _signature_         | hexstring | yes | [<u>signature generated</u>](2_98_API_AUTHENTICATION.md) for current request |

where the signature is derived from the API secret key and the string to sign.The string to sign is formed with API parameters alphabetically sorted as below.


`/token/?api_key=ed0787e817d4946c7e76&request_timestamp=1526462863`

The request url of this post request reads as

> GET - `https://playgroundapi.ost.com/token`

and the parameters are sent in the request body with default `application/x-www-form-urlencoded` content-type so the request body uses the same format as the query string:

```
Content-Type: application/x-www-form-urlencoded

api_key=API_KEY&request_timestamp=EPOCH_TIME_SEC&name=NAME&signature=SIGNATURE&uuid=UUID

```
### JSON Response Object

| Key        | Type   | Description      |
|------------|--------|------------|
| _success_  | bool   | post successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |

For api calls to `/token` the `data.result_type` is the string "token".


### Token Object Attributes

| Parameter | Type   | Description  |
|-----------|--------|--------|
| _company_uuid_      | string | unique identifier of the company |
| _name_    | string | name of the token  |
| _symbol_    | string | name of the symbol |
| _symbol_icon_ | string | icon reference |
| _conversion_factor_           | string [float] | conversion factor of the branded token to OST  |
| _token_erc20_address_    | address | prefixed hexstring address of the branded token erc20 contract on the utility chain  |
| _airdrop_contract_address_    | address | prefixed hexstring address of the airdrop / pricer contract that regulates payments of branded tokens with actions  |
| _simple_stake_contract_address_    | address | prefixed hexstring address of the simple stake contract which holds the OST⍺ on Ethereum Ropsten testnet which has been staked to mint branded tokens  |
| _total_supply_    | string [number] | Total supply of BTs|
| _ost_value_balance_    | string [number] | OST⍺ amount ropsten  |
| _ost_utility_balance_    | array | OST⍺ on utility chains with chain IDs and amounts as an array of tuples (3, amount)  |
| _price_points_    | object | Contains the OST price point in USD and the BT price point in USD  |


### Example Success Response

```json
{
  "success": true,
  "data": {
    "result_type": "token",
    "token": {
      "company_uuid": 1028,
      "name": "Sample Token",
      "symbol": "SCO",
      "symbol_icon": "token_icon_1",
      "conversion_factor": "14.86660",
      "token_erc20_address": "0x546d41730B98a24F2dCfcdbE15637aD1939Bf38b",
      "simple_stake_contract_address": "0x54eF67a54d8b77C091B6599F1A462Ec7b4dFc648",
      "total_supply": "92701.9999941",
      "ost_utility_balance": [
        [
          "198",
          "87.982677084999999996"
        ]
      ]
    },
    "price_points": {
      "OST": {
        "USD": "0.177892"
      }
    }
  }
}
```

### Example Failure Response

```json
{
  "success": false,
  "err": {
    "code": "UNAUTHORIZED",
    "msg": "We could not authenticate the request. Please review your credentials and authentication method.",
    "error_data": [ ],
    "internal_id": "a_1"
  }
}
```

### Sample Code | Curl [MISSING]

```bash
curl --request GET \
--url 'https://playgroundapi.ost.com/users/{id}' \
--header 'Accept: application/json' \
--form request_timestamp=EPOCH_TIME_SEC \
--form signature=SIGNATURE \
--form api_key=API_KEY \
--form name=NAME \
--form uuid=UUID \
```

>_last updated 30th April 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ v1 | OpenST Platform v0.9.2
