---
id: api_users_edit
title: OST KIT API Edit Users
sidebar_label: Users - edit
---

For updating the specified end-user by setting new values to user object parameters. Use the _uuid_ that is returned while executing the [Create User](https://dev.stagingost.com/ostkit-restful-api/docs/user.html#1-create-user-api) API to make changes to the selected end-user. Any parameter not provided, will not be affected.

#### API endpoint - POST
```url
{{saas_api_url}}/users/update
```

#### Parameters 
| Parameter    | Type   | Value                                           |
|--------------|--------|-------------------------------------------------|
| _name_         | String | String representing the name of the user. Example: Pranay.                                |
| _uuid_ | String | The unique identifier of your application’s end-user returned in the response when the user was created. Example: 007fe541-8766-4308-97d6-5d133ef4a282. |


#### Sample Code | Curl 
```bash
curl --request POST \
  --url 'http://{{saas_api_url}}/users/update' \
  --data 'name=Pranay%20&uuid=007fe541-8766-4308-97d6-5d133ef4a282'
```

#### Success Response 
```javascript
{:success=>true, :data=>{"result_type"=>"economy_users",
"economy_users"=>[{"uuid"=>"007fe541-8766-4308-97d6-5d133ef4a282",
"name"=>"test 123", "total_airdropped_tokens"=>"0", "token_balance"=>"0"}],
"meta"=>{"next_page_payload"=>{}}}} 
```

#### Failure Response 
```javascript
{:success=>false, :err=>{:code=>"companyRestFulApi(s_cu_eu_2:H1Hobct_f)",
:msg=>"invalid params", :display_text=>"", :display_heading=>"",
:error_data=>[{"name"=>"User name should contain btw 3 - 25 characters."}]}, 
:data=>{}}
```

#### Returns
Returns the updated customer object, if the update succeeds. Returns an [error](https://dev.stagingost.com/ostkit-restful-api/docs/error.html) if update parameters are invalid.

