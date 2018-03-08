---
id: api_airdrop_drop
title: OST KIT API Airdrop
sidebar_label: Airdrop
---
For awarding branded tokens to end-users in your application. This API allows end-users to receive or be awarded a selected amount of branded tokens to be able participate in the branded token economy.

#### API Endpoint - POST
```url
{{saas_api_url}}/users/airdrop-tokens
```

#### Parameters
| Parameter | Type    | Value                                    |
|-----------|---------|------------------------------------------|
| _token_symbol_   | String | The symbol of the branded token that should be airdropped to end-users. Example:PK |
| _amount_   | Float | The amount of BT that needs to be air-dropped to the selected end-users.  Example:10 |
| [_list_type_](https://dev.stagingost.com/ostkit-restful-api/docs/user.html#list-type-sub-attributes)   | String | The list type of end-users that need to be airdropped tokens. Example:all|
| _total_airdropped_tokens_ | String | The amount of branded tokens (BT) you want to distribute to the user. If this is empty then no BT will be given to the user.                                       |
| _token_balance_           | String | The current BT balance of the user.                                                  |

### Airdrop Sub-Attributes

#### **_list_type_**
| Attribute | Type    | Description                                   |
|-----------|---------|------------------------------------------|
| _all_   | String | All the end-users that have been previously airdropped tokens. |
| _never_airdropped_   | String | All the end-users that have **never** been previously any airdropped tokens. |


#### Sample Code | Curl
```bash
curl --request POST \
  --url 'http://{{saas_api_url}}/users/airdrop-tokens' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form token_symbol=PK \
  --form amount=1 \
  --form list_type=all
```

#### Success Response
```
{:success=>true, :data=>{"airdrop_uuid"=>"beb4761a-81a6-419b-a48c-4c5646af17dd", "current_status"=>"pending", "steps_complete"=>["tokens_transfered"]}}
```

#### Failure Response
```
{:success=>false, :err=>{:code=>"companyRestFulApi(s_am_sa_4:SkEPYqFdM)", :msg=>"Airdrop requests are in-process", :display_text=>"", :display_heading=>"", :error_data=>{}}, :data=>{}}
```

#### Returns
Returns a true or false response on the success of the air-drop of the branded tokens for your application.
