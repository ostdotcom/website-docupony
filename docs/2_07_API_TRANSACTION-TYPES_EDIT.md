---
id: api_transaction-types_edit
title: OST KIT API Transaction-Types Edit 
sidebar_label: Transaction-types edit
---

Updates the specified transaction by setting the values of the parameters passed. Any parameter not provided will be left unchanged. Individual keys can be unset by posting an empty value to them. 

#### API Endpoint - POST 
```url
{{saas_api_url}}/transaction-types/edit
```

#### Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _client_transaction_id_ | String | The ID of the transaction that was returned when the transaction was created with the [create transaction API](https://dev.stagingost.com/ostkit-restful-api/docs/transaction.html#1-create-a-new-transaction-api) |
| _kind_                  | String | The type of transaction based on the owners involved in the token exchange. Example **_user_to_user_**                                                                    |
| _currency_type_ | String | String representing the currency the transaction is valued in. Two possible values are **_usd_** or **_bt_** .                                 |
| _currency_value_ | Float  | Positive number that represents amount of branded token or USD to be set as transaction value.                 |
| _commission_percent_  | Float  | Percentage of transaction value that you set as a service provider on a transaction. Can be set for only _user_to_user_ transaction type. |

### Transaction-types edit Sub-Attributes

#### _kind_  
| Parameter       | Type   | Definition  |
|-----------------|--------|----------------------------------|
| _user_to_user_    | String | Value transfer from one end-user to another. Example: "Upvote" or "like".  |
| _user_to_company_ | String | Value transfer from an end-user to you (the application service provider). Example: “API call”. |
| _company_to_user_ | String | Value transfer from the application service provider to an end-user. Example: “Rewards”.    |

#### _value_currency_type_ 
| Parameter | Type   | Definition  |
|-----------|--------|--------------------------------------------------------|
| _usd_       | String | Fiat currency that the transaction is valued in.   |
| _bt_        | String | Branded tokens that the transaction is valued in.  |

#### Sample Code | Curl 
```bash
curl --request POST \
  --url 'http://{{saas_api_url}}/transaction/kind/edit' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form client_transaction_id=20373 \
  --form kind=user_to_user \
  --form currency_value=1 \
  --form commission_percent=10 \
  --form currency_type=USD
```

#### Success Response
```
{:success=>true, :data=>{"result_type"=>"transactions", "transactions"=>[{"id"=>"20373", "client_id"=>1124, "client_transaction_id" => 20373, "name"=>"test", "uts"=>1520180383910}]}}
```

#### Failure Response 
```
{:success=>false, :err=>{:code=>"companyRestFulApi(tk_e_2:SystnqFuf)", :msg=>"invalid params", :display_text=>"", :display_heading=>"", :error_data=>[{"name"=>"Tx Kind name should contain btw 3 - 15 aplhabets."}]}, :data=>{}}
```


#### Returns
Returns a transaction object if the update is successful. This call will return an error if update parameters are invalid. Errors are sent as per specification [here](https://dev.stagingost.com/ostkit-restful-api/docs/error.html).