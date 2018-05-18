---
id: version-1.0.0-api_token
title: OST KIT⍺ API | Token Details
sidebar_label: Token Details
original_id: api_token
---

Send a GET-request to `/token` to receive information about the Branded Token you created for your token economy.

The Branded Token you minted within your token economy setup process serves as your token economy's currency. As a part of that process you define a conversion rate of OST to your Branded Token, which will be fixed once you've set it up.

This Branded Token will be used by your token economy's users and your company to perform the actions that have been defined, e.g. users can spend tokens to use certain services within an application such as likes or upvotes.

The information you receive by performing this request also includes your Simple Stake Contract Address. A situation, in which this information could be relevant, would be if you want to find out your current OST⍺ Prime balance available for transfers to non-OST KIT accounts on the utility chain. This could be the case if you have the intention to deploy your own smart contracts.


### Input Parameters

| Parameter           | Type      | Definition  |
|---------------------|-----------|--------|
| _api_key_           | string     | (mandatory) API key obtained from [kit.ost.com](https://kit.ost.com) |
| _request_timestamp_ | number   | (mandatory) epoch time in seconds of current time |
| _signature_         | hexstring | (mandatory) [<u>signature generated</u>](/docs/api_authentication.html) for current request |

The signature for this API is derived from the API secret key and the string to sign. The string to sign is formed with API parameters alphabetically sorted.

As an example

`/token/?api_key=ed0787e817d4946c7e76&request_timestamp=1526462863`

so the full query reads as

> GET - `https://sandboxapi.ost.com/v1/token?api_key=ed0787e817d4946c7e76&request_timestamp=1526395328&signature=1370bc4398eb5f6811f4713d6fd79ddf8230a64258b7cd4b4a29482ff8ccf7a2`


### JSON Response Object

| Key        | Type   | Description      |
|------------|--------|------------|
| _success_  | bool   | whether successful |
| _data_     | object | (optional) data object describing result if successful   |
| _err_      | object | (optional) describing error if not successful |
| _code_     | number | HTTP status code |

For api calls to `/token` the `data.result_type` is the string "token" and `data.token` is an object containing the attributes of your token economy.


### Token Object Attributes

| Parameter | Type   | Description  |
|-----------|--------|--------|
| _company_uuid_      | string | unique identifier of the company |
| _name_    | string | name of the token  |
| _symbol_    | string | name of the symbol |
| _symbol_icon_ | string | icon reference |
| _conversion_factor_           | string\<float\> | conversion factor of the branded token to OST  |
| _token_erc20_address_    | address | prefixed hexstring address of the branded token erc20 contract on the utility chain  |
| _simple_stake_contract_address_    | address | prefixed hexstring address of the simple stake contract which holds the OST⍺ on Ethereum Ropsten testnet which has been staked to mint branded tokens  |
| _total_supply_    | string\<number\> | Total supply of Branded Tokens|
| _ost_utility_balance_    | array | OST⍺ on utility chains with chain IDs and amounts as an array of tuples (3, amount)  |
| _price_points_    | object | Contains the OST price point in USD and the Branded Tokens price point in USD  |


### Example Success Response Body

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
          "1409",
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

### Example Failure Response Body

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

### Example Code | Curl

```bash
curl --request GET \
--url 'https://sandboxapi.ost.com/v1/token/' \
--header 'Accept: application/x-www-form-urlencoded' \
--form request_timestamp=1526549977 \
--form signature=1dac77ed77c1f4b19a23d9af13ded49c7775e44c006b4e8f9515a7314b4de76f \
--form api_key=7cad25e082390a90114e \
```

>_last updated 17 May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
