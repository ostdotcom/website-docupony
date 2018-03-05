---
id: transaction
title:Transaction APIs
sidebar_label:Transaction
---

Transactions are executed when tokens are moved between accounts. These can be between _user_ to another _user_ or _company_ to _user_ and vice versa. In ostKIT a transaction represents a core action or event in your application, as examples, a "like", "share", "purchase", "monthly winner" or a "birthday event". You can associate a value with each transaction. Once you create such transactions for your application and assign value to each of them, they become opportunities for your end-users to "Earn" and "Spend" Branded Tokens (BT) in your application. This exchange of tokens represents a branded token economy.

So an important aspect of setting up a branded token economy is to setup transactions. Below we detail out APIs for creating transactions, running them and viewing the list of all transactions created. 


### Transaction Object  
| Parameter           | Type   | Description                                                                                                                                       |
|---------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| _name_                | String | The name of the transaction. Example: an "Upvote","buy a coffee".|
| [_kind_](https://dev.stagingost.com/ostkit-restful-api/docs/transaction.html#kind-sub-attributes)               | String | The type of transaction, differentiated based on the owners involved in the token exchange. The three types of transactions are _user_to_user_, _company_to_user_ and _user_to_company_ .|
| [_value_currency_type_](https://dev.stagingost.com/ostkit-restful-api/docs/transaction.html#value-currency-type-sub-attributes)| String | The currency type in which the value of the transaction has been set. The transaction value can either be set in USD or in branded tokens (BT). Example: you can set value of an "Upvote" transaction to be 20 cents or 10 of your branded tokens. If the value is set in USD, the string used should be _usd_ and if the value is set in branded tokens the string used should be _bt_ .|
| _value_in_bt_         | Float  | The amount in branded tokens (BT) to be set as transaction value.|
| _commission_percent_  | Float  | As the company, you can set a fee on _user_to_user_ transactions. Example: If a user buys a service on your platform from another user, you can set a fee on these 'buy' transactions.  This fee is set in percentage of the total value of the transaction and is not additional to the transaction value. |
| _token_erc20_address_        | String  | The [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md) token address on the OST utility chain. |
| _token_uuid_        | String  | The unique identifier for the branded token.|
| _conversion_rate_        | Float  | The conversion rate set between the branded token and us dollars.|
| _created_at_        | String  | The creation time of the transaction object|
| _updated_at_        | String  | The last updated time of the transaction object.|
### Transaction Object Sub-Attributes

#### _kind_  
| Parameter       | Type   | Definition                                                                                    |
|-----------------|--------|-----------------------------------------------------------------------------------------------|
| _user_to_user_    | String | Value transfer from one end-user to another. Example: "Upvote" or "like".                                         |
| _user_to_company_ | String | Value transfer from an end-user to you (the application service provider). Example: “API call”. |
| _company_to_user_ | String | Value transfer from the application service provider to an end-user. Example: “Rewards”.    |

#### _value_currency_type_ 
| Parameter | Type   | Definition                                                                                                        |
|-----------|--------|-------------------------------------------------------------------------------------------------------------------|
| _usd_       | String | Fiat currency that the transaction is valued in.                                                                |
| _bt_        | String | Branded tokens that the transaction is valued in.  |


### 1. Create Transaction Kind
Creating transactions requires evaluating core user actions on your application and filtering out for the ones that you want to trigger branded token exchanges. Once you have decided the core actions you should start with creating a transaction for each of them. While setting up these transactions you should decide the type of the transaction, associate a value to it and also (if required) set a commission on it. An “Upvote” for example would be setup as a _user-to-user_ transaction, whereas something like “Rewards”  would be setup as a _company-to-user_ transaction. The value for a transaction can be set in two ways. One in the fiat value system: USD - US dollars and second in the tokenized value system: BT - your branded token.

#### API Endpoing - POST 
```url
{{saas_api_url}}/transaction/kind/create
```

#### Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _name_                | String | The name of the transaction. Example: "Upvote","buy a coffee".                               |
| _kind_                | String | The type of transaction based on the owners involved in the token exchange. Example: _user_to_user_.                  |
| _value_currency_type_ | String | String representing the currency the transaction is valued in. Two possible values are **_usd_** or **_bt_** .                                 |
| _value_in_bt_         | Float  | Positive number that represents amount of branded token to be set as transaction value.                 |
| _commission_percent_  | Float  | Percentage of transaction value that you set as a service provider on a transaction. Can be set for only _user_to_user_ transaction type. |
| _value_in_usd_        | Float  | Positive number that represents amount in dollars (USD) to be set as transaction value.               |


#### Sample Code | Curl 
```bash
curl --request POST \
  --url 'http://{{saas_api_url}}/transaction/kind/create' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form name=ABC \
  --form kind=user_to_user \
  --form value_currency_type=usd \
  --form value_in_bt=1 \
  --form commission_percent=10 \
  --form value_in_usd=1
```


#### Response
```javascript
{"client_id"=>28, "result_type"=>"transaction_types", 
"transaction_types"=> [ {"id"=>"5","name"=>"Transaction 4", 
"kind"=>"company_to_user", "currency_type"=>"bt", 
"currency_value"=>"0.5", "commission_percent"=>"0.000", 
"status"=>"active"}], "meta"=>{"next_page_payload"=>{}},
"price_points"=>{"ost"=>{"usd"=>"1"}}, "client_tokens"=> 
[{"id"=>"16", "client_id"=>28, "reserve_managed_address_id"=>90, 
"name"=>"sd1", "symbol"=>"sd1", "symbol_icon"=>nil,
"token_erc20_address"=>"0xdc1A2F9A712a38F673fe7758C35Bec4F9051Da63", 
"token_uuid"=> "0xf4842e7905d55ebd6699832662570539c2995d35e345360a4cf05e9b486e0a95",
"conversion_rate"=>"1.000000", "created_at"=>"2018-02-20 08:16:27",
"updated_at"=>"2018-02-20 08:31:44"}]}

```
#### Returns
Returns a transaction object if there were no initial errors with the transaction creation. Example - transactions being created with duplicate names, or value of the transaction set breaches the max value set. This call will return an error if create parameters are invalid. Errors are sent as per specification [here.](https://dev.stagingost.com/ostkit-restful-api/docs/error.html)







### 2. Update Transaction Kind
Updates the specified transaction by setting the values of the parameters passed. Any parameter not provided will be left unchanged. Individual keys can be unset by posting an empty value to them. 

#### API Endpoint - POST 
```url
{{saas_api_url}}/transaction/kind/edit
```

#### Parameters 
| Parameter             | Type   | Value                                                                                              |
|-----------------------|--------|----------------------------------------------------------------------------------------------------|
| _client_transaction_id_ | String | The ID of the transaction that was returned when the transaction was created with the [create transaction API](https://dev.stagingost.com/ostkit-restful-api/docs/transaction.html#1-create-a-new-transaction-api) |
| _kind_                  | String | The type of transaction based on the owners involved in the token exchange. Example **_user_to_user_**                                                                    |
| _value_currency_type_   | String | The currency the transaction is valued in. Two possible values are **_usd_** or **_bt _.**                                                                               |
| _value_in_bt_           | Float  | Positive number that represents amount of Branded Token to be set as transaction value.                                                                   |
| _commission_percent_    | Float  | Percentage of the total transaction value that you set as a service provider on a transaction. Can be set for only user_to_user transaction type.                                                |
| _value_in_usd_          | Float  | Positive number that represents amount in dollars (USD) to be set as transaction value.                                                                  |

#### Sample Code | Curl 
```bash
curl --request POST \
  --url 'http://{{saas_api_url}}/transaction/kind/edit' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form client_transaction_id=13 \
  --form kind=user_to_user \
  --form value_currency_type=usd \
  --form value_in_bt=1 \
  --form commission_percent=10 \
  --form value_in_usd=1
```

#### Response
```javascript
{"client_id"=>28, "result_type"=>"transaction_types", 
"transaction_types"=> [ {"id"=>"5", "name"=>"Transaction 4", 
"kind"=>"company_to_user", "currency_type"=>"bt", 
"currency_value"=>"0.5", "commission_percent"=>"0.000", 
"status"=>"active"}], "meta"=>{"next_page_payload"=>{}}, 
"price_points"=>{"ost"=>{"usd"=>"1"}}, "client_tokens"=> 
[{"id"=>"16", "client_id"=>28, "reserve_managed_address_id"=>90, 
"name"=>"sd1", "symbol"=>"sd1", "symbol_icon"=>nil, 
"token_erc20_address"=>"0xdc1A2F9A712a38F673fe7758C35Bec4F9051Da63", 
"token_uuid"=> "0xf4842e7905d55ebd6699832662570539c2995d35e345360a4cf05e9b486e0a95", 
"conversion_rate"=>"1.000000", "created_at"=>"2018-02-20 08:16:27", 
"updated_at"=>"2018-02-20 08:31:44"}]}
```

#### Returns
Returns a transaction object if the update is successful. This call will return an error if update parameters are invalid. Errors are sent as per specification [here](https://dev.stagingost.com/ostkit-restful-api/docs/error.html).



### 3. List Transaction Kind 
Returns a list of all existing transactions created. The transactions are returned in creation order, with the transcations created first, appearing at the top. 

#### API Endpoing - GET 
```url
{{saas_api_url}}/transaction/kind/get-all?page_no=1
```
  
#### Parameters 
| Parameter | Type | Value                                         |
|-----------|------|-----------------------------------------------|
| _page_no_   | Int  | 1 (page number for all the transaction types) |

#### Sample Code | Curl 
```bash
curl --request POST \
  --url 'http://{{saas_api_url}}/transaction/kind/create' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form name=ABC \
  --form kind=user_to_user \
  --form value_currency_type=usd \
  --form value_in_bt=1 \
  --form commission_percent=10 \
  --form value_in_usd=1
```

#### Response
```javascript
{"client_id"=>28, "result_type"=>"transaction_types", 
"transaction_types"=> [{"id"=>"4", "name"=>"Transaction 1", 
"kind"=>"user_to_user", "currency_type"=>"bt", "currency_value"=>"10"
, "commission_percent"=>"0.000", "status"=>"active"}, 
{"id"=>"2", "name"=>"Transaction 2", "kind"=>"company_to_user", 
"currency_type"=>"usd", "currency_value"=>"1.000000", 
"commission_percent"=>"10.000", "status"=>"active"}, 
{"id"=>"3", "name"=>"Transaction 3", "kind"=>"user_to_company", 
"currency_type"=>"usd", "currency_value"=>"0.500000", 
"commission_percent"=>"10.000", "status"=>"active"}, 
{"id"=>"5", "name"=>"Transaction 4", "kind"=>"company_to_user", 
"currency_type"=>"bt", "currency_value"=>"0.5", 
"commission_percent"=>"0.000", "status"=>"active"}], 
"meta"=>{"next_page_payload"=>{}}, 
"price_points"=>{"ost"=>{"usd"=>"1"}}, "client_tokens"=> 
[{"id"=>"16", "client_id"=>28, "reserve_managed_address_id"=>90, 
"name"=>"sd1", "symbol"=>"sd1", "symbol_icon"=>nil, 
"token_erc20_address"=>"0xdc1A2F9A712a38F673fe7758C35Bec4F9051Da63", 
"token_uuid"=> "0xf4842e7905d55ebd6699832662570539c2995d35e345360a4cf05e9b486e0a95", 
"conversion_rate"=>"1.000000", "created_at"=>"2018-02-20 08:16:27", 
"updated_at"=>"2018-02-20 08:31:44"}]}
```

#### Returns
Returns a hash with a key _result-type_. The value of _result-type_ is in-turn a key _transaction_type_. This key _transaction_type_ is an array of upto 25 transactions. Each entry in the array is a separate transaction object. If there are subsequent transactions the resulting hash in the response will come with the a meta parameter _next_page_payload_ as shown below. 

```javascript
"meta"=>{"next_page_payload"=>{"page_no"=>2}}
```

If no more transactions are available, the resulting hash will have the meta parameter with an empty value of next_page_payload.





### 4. Execute Transaction 
To execute a transaction between one end-user to another end-user, an action can be utlizied to crete a branded token exchange. This can be done by specifying the from end-user _uuid_ to another end-user _uuid_ and the transaction [kind](https://dev.stagingost.com/ostkit-restful-api/docs/transaction.html#kind). 

#### API Endpoint - POST 
```url
{{saas_api_url}}/transaction/execute
```

#### Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _from_user_uuid_                | String | The origin end-user of the transaction. Example: 5f79063f-e22a-4d28-99d7-dd095f02c72e                              |
| _to_user_uuid_                | String | The destination end-user of the transaction. Example: 7a1e31e5-cc39-4a14-a176-29bc4d117867                  |
| _transaction_kind_ | String | The [kind](https://dev.stagingost.com/ostkit-restful-api/docs/transaction.html#kind) of transaction defined earlier. Example: Upvote.                                |

#### Sample Code | Curl 
```bash
curl --request POST \
  --url 'http://{{saas_api_url}}/transaction/execute' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form from_user_uuid=5f79063f-e22a-4d28-99d7-dd095f02c72e \
  --form to_user_uuid=7a1e31e5-cc39-4a14-a176-29bc4d117867 \
  --form transaction_kind=Upvote
```


#### Response
```javascript
{"client_id"=>28, "result_type"=>"transaction_types", 
"transaction_types"=> [ {"id"=>"5", "name"=>"Transaction 4", 
"kind"=>"company_to_user", "currency_type"=>"bt", 
"currency_value"=>"0.5", "commission_percent"=>"0.000", 
"status"=>"active"}], "meta"=>{"next_page_payload"=>{}}, 
"price_points"=>{"ost"=>{"usd"=>"1"}}, "client_tokens"=> 
[{"id"=>"16", "client_id"=>28, "reserve_managed_address_id"=>90, 
"name"=>"sd1", "symbol"=>"sd1", "symbol_icon"=>nil, "token_erc20_address"=>"0xdc1A2F9A712a38F673fe7758C35Bec4F9051Da63", 
"token_uuid"=> "0xf4842e7905d55ebd6699832662570539c2995d35e345360a4cf05e9b486e0a95", "conversion_rate"=>"1.000000", "created_at"=>"2018-02-20 08:16:27", 
"updated_at"=>"2018-02-20 08:31:44"}]}
```
#### Returns
Returns a transaction object with information on various parameters such as the value of the transaction, the commission to you, conversion rates, token address, uuids, last updated information and the branded token currency type. 





### 5. List Transactions 
To get a list of all trasacations that have been initiated and exectued between one end-user and another end-user using your tokenized application.    

#### API Endpoint - POST 
```url
{{saas_api_url}}/transaction/list?page_no=1
```

#### Parameters 
| Parameter | Type | Value                                         |
|-----------|------|-----------------------------------------------|
| _page_no_   | Int  | 1 (page number for all the transaction types) |

#### Sample Code | Curl 
```bash
curl --request GET \
  --url 'http://{{saas_api_url}}/transaction/list?page_no=1'
```


#### Response
```javascript
{:economy_users=> {1=> {:id=>1, :name=>"company User", :uuid=>"a1", :total_airdropped_tokens=>"active",
:token_balance=>1000}, 2=> {:id=>2, :name=>"Aman User1", :uuid=>"a2", :total_airdropped_tokens=>"active",
:token_balance=>100}, 3=> {:id=>3, :name=>"Rachin User3", :uuid=>"a3", :total_airdropped_tokens=>"active",
:token_balance=>10}}, :client_token=> {:id=>1, :client_id=>1, :name=>"TakTakTak", :symbol=>"T3K", 
:symbol_icon=>"", :status=>"active", :conversion_factor=>3.003, :setup_steps=> ["token_worth_in_usd",
"configure_transactions", "propose_initiated", "propose_done", "registered_on_uc", "registered_on_vc",
"received_test_ost"]}, :transaction_types=> {1=> {:id=>1, :name=>"Upvote", :kind=>"user_to_user",
:currency_type=>"bt", :currency_value=>"10", :commission_percent=>"0.000", :status=>"active"}, 
2=> {:id=>2, :name=>"Service Charge", :kind=>"user_to_company", :currency_type=>"bt", :currency_value=>"30",
:commission_percent=>"0.000", :status=>"active"}, 3=> {:id=>3, :name=>"Like", :kind=>"user_to_user",
:currency_type=>"usd", :currency_value=>"20", :commission_percent=>"10.000", :status=>"active"}},
:result_type=>"transactions", :transactions=> [{:id=>"a2-a3", :transaction_uuid=>"a2-a3", :status=>"active",
:transaction_hash=>"uussyyuuwww-1519655294", :uts=>"1519655294", :from_user_id=>2, :to_user_id=>3,
:transaction_type_id=>1, :client_token_id=>1, :currency_value=>10, :gas_value=>0.011, :block_number=>1,
:block_timestamp=>"1519655294", :transfers=> [{:from_user_id=>2, :to_user_id=>3, :type=>"transfer",
:currency_value=>10}]}, {:id=>"a2-a1", :transaction_uuid=>"a2-a1", :status=>"active",
:transaction_hash=>"uussyyuuwww-1519655294", :uts=>"1519655294", :from_user_id=>2, :to_user_id=>1,
:transaction_type_id=>2, :client_token_id=>1, :currency_value=>30, :gas_value=>0.021, :block_number=>2,
:block_timestamp=>"1519655294", :transfers=> [{:from_user_id=>2, :to_user_id=>1, :type=>"transfer",
:currency_value=>30}]}, {:id=>"a3-a2", :transaction_uuid=>"a3-a2", :status=>"pending", :transaction_hash=>nil,
:uts=>"1519655294", :from_user_id=>3, :to_user_id=>2, :transaction_type_id=>3, :currency_value=>nil, 
:gas_value=>nil, :block_number=>nil, :block_timestamp=>nil, :transfers=>[]}], :oracle_price_points=>
{:ost=>{:usd=>0.3}}, :meta=>{:next_page_payload=>{}}}
```

#### Returns
Returns the list of all transactions ([kinds](https://dev.stagingost.com/ostkit-restful-api/docs/transaction.html#kind)) with information on various parameters such as the value of the transaction, the commission to you, conversion rates, token addresses, gas values, uuids, status of the transactions, last updated information and the branded token currency type. 




### 6. Status of Transaction 
To get the status of the on-going transcation between one end-user to another end-user.

#### API Endpoint - GET
```url
{{saas_api_url}}/transaction/status?transaction_uuid=5f79063f-e22a-4d28-99d7-dd095f02c72e&transaction_hash=0xdd87f64cf98e1bce666509995284019ac23ad76bf7498c6fe804fa0fedb9948c
```

#### Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _transaction_uuid_ | String | The unique identifier for the transaction type that has to be looked up. This is generated when a transcation is executed between two branded token holders. Example:5f79063f-e22a-4d28-99d7-dd095f02c72e                             |

#### Sample Code | Curl 
```bash
curl --request GET \
  --url 'http://{{saas_api_url}}/transaction/status?transaction_uuid=5f79063f-e22a-4d28-99d7-dd095f02c72e&transaction_hash=0xdd87f64cf98e1bce666509995284019ac23ad76bf7498c6fe804fa0fedb9948c'-4a14-a176-29bc4d117867 \
  --form transaction_kind=Upvote
```


#### Response
```javascript
Respone TBD
```

#### Returns
Returns a transaction object with information on various parameters such as the value of the transaction, the commission to you, conversion rates, token address, uuids, last updated information and the branded token currency type.




