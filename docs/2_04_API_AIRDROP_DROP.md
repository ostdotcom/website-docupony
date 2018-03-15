---
id: api_airdrop_drop
title: OST KIT⍺ API Airdrop
sidebar_label: /users/airdrop/drop
---
For awarding branded tokens to end-users in your application. This API allows end-users to receive or be awarded a selected amount of branded tokens to be able participate in the branded token economy.

#### API Endpoint - POST
```url
{{saas_api_url}}/users/airdrop/drop
```

#### Parameters
| Parameter | Type    | Value                                    |
|-----------|---------|------------------------------------------|
| _amount_   | Float | The amount of BT that needs to be air-dropped to the selected end-users.  Example:10 |
| [_list_type_](https://dev.ost.com/ostkit-restful-api/docs/user.html#list-type-sub-attributes)   | String | The list type of end-users that need to be airdropped tokens. Example:all|

### Airdrop Sub-Attributes

#### **_list_type_**
| Attribute | Type    | Description                                   |
|-----------|---------|------------------------------------------|
| _all_   | String | All the end-users that have been previously airdropped tokens. |
| _never_airdropped_   | String | All the end-users that have **never** been previously airdropped tokens. |


#### Sample Code | Curl
```bash
curl -i \ 
-H "Accept: application/json" \ 
-d 'request_timestamp=EPOCH_TIME_SEC' \ 
-d 'signature=SIGNATURE' \ 
-d 'api_key=API_KEY' \ 
-d 'amount=10' \ 
-d 'list_type=all' \ 
-X POST https://playgroundapi.ost.com/users/airdrop/drop
```

#### Success Response
```
{:success=>true, :data=>{"airdrop_uuid"=>"5412c48e-2bec-4224-9305-56be99174f54"}}
```

#### Failure Response
```
{:success=>false, :err=>{:code=>"companyRestFulApi(s_am_sa_7:r1OeAavKz)", :msg=>"Insufficient funds to airdrop users", :display_text=>"", :display_heading=>"", :error_data=>[{"amount"=>"Available token amount is insufficient. Please mint more tokens or reduce the amount to complete the process."}]}, :data=>{}}
```

#### Returns
Returns a true or false response on the success when the request is accepted and the processing in the background has started. Now it will be possible to check the airdrop status using the AIRDROP STATUS API endpoint.
