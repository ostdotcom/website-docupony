---
id: api_transaction-types_execute
title: OST KIT API Transaction-Types Execute
sidebar_label: Transaction-types execute
---

To execute a transaction between one end-user to another end-user, an action can be utlizied to crete a branded token exchange. This can be done by specifying the from end-user _uuid_ to another end-user _uuid_ and the transaction [kind](https://dev.stagingost.com/ostkit-restful-api/docs/transaction.html#kind). 

#### API Endpoint - POST 
```url
{{saas_api_url}}/transaction-types/execute
```

#### Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _from_user_uuid_                | String | The origin end-user of the transaction. Example: 1b5039ea-323f-416c-9007-7fe2d068d42d                            |
| _to_user_uuid_                | String | The destination end-user of the transaction. Example: 286d2cb9-421b-495d-8a82-034d8e2c96e2               |
| _transaction_kind_ | String | The [kind](https://dev.stagingost.com/ostkit-restful-api/docs/transaction.html#kind) of transaction defined earlier. Example: Download. |
| _token_symbol_ | String | The symbol of the branded token distributed by you. Example: Download. |

#### Sample Code | Curl 
```bash
curl --request POST \
  --url 'http://{{saas_api_url}}/transaction/execute' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form from_uuid=1b5039ea-323f-416c-9007-7fe2d068d42d \
  --form to_uuid=286d2cb9-421b-495d-8a82-034d8e2c96e2 \
  --form transaction_kind=Download \
  --form token_symbol=aMnN
```


#### Response
```
{:success=>true, :data=>{"transaction_uuid"=>"49cc3411-7ab3-4478-8fac-beeab09e3ed2", "transaction_hash"=>nil, "from_uuid"=>"1b5039ea-323f-416c-9007-7fe2d068d42d", "to_uuid"=>"286d2cb9-421b-495d-8a82-034d8e2c96e2", "transaction_kind"=>"Download"}}
```

### Failure Response
```
{:success=>false, :err=>{:code=>"companyRestFulApi(s_t_et_6:BJlY1jKuG)", :msg=>"Invalid Token Symbol", :display_text=>"", :display_heading=>"", :error_data=>{}}, :data=>{}}
```


#### Returns
Returns a transaction object with information on various parameters such as the value of the transaction, the commission to you, conversion rates, token address, uuids, last updated information and the branded token currency type. 
