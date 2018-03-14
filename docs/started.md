---
id: started
title: Starting Overview 
sidebar_label: Starting Overview 
---
The API documentation for the $OST⍺ powered complete blockchain toolkit for businesses. 


OST KIT⍺ gives you the power to launch, manage and monitor your branded token economy powered by $OST⍺. Great OST KIT⍺ use cases include projects with P2P micro-payments, encouraging content creation, enabling transparent incentives, rewards for your platform users, monetizing API calls to third parties, low cost cross-border payments and much [more](https://simpletoken.org/partners).

OST also provides a [ruby sdk](https://github.com/OpenSTFoundation/ost-sdk-ruby) with three modules at the moment. A Transaction Kind module that allows one to create new transaction [kinds](https://dev.stagingost.com/ostkit-restful-api/docs/transaction.html#kind) and maintain them. An Address module that allows one to fetch balances on $OST⍺, OST'(transaction fees), Ether (ETH), Branded Tokens (BT) and US dollards (USD). A [User](https://dev.stagingost.com/ostkit-restful-api/docs/user.html) module that allows for the creation and maintainance of end-users and their _address_uuid_ in your application, utilizing the OST enabled branded token economy. 

The SDK itself directly bridges the [OpenST-Platform](https://github.com/OpenSTFoundation/openst-platform) under the hood of the OST KIT⍺. Thus also giving an insight into the operations of the [OpenST-Protocol](https://github.com/OpenSTFoundation/openst-protocol). Find more documentation on the ost-ruby-SDK [here](https://github.com/OpenSTFoundation/ost-sdk-ruby/blob/master/README.md).

## Create your Branded Tokens 
OST KIT⍺ enables you to design, create and manage your branded token (BT) economy. You may want to set just one branded token for your company or a few, depending upon your business model, range of services and product variations you offer. We request you to utilize the OST [FAQ](https://kit.stagingost.com/) section and the developer forums on [gitter](https://gitter.im/OpenSTFoundation/SimpleToken) to ask us development related questions. You can also drop us a [mail](pranay@ost.com). This will help you understand the right approach towards achieveing a blooming and fully functional branded token economy and also help us understand on how to serve your tokenized business requirements better. 

### Staking $OST⍺ and Minting Branded Tokens

A simple 7 Step process to staking and minting your branded tokens using the [OST KIT⍺](https://simpletoken.org/product).
1. Go to the OST KIT [sign up](https://kit.stagingost.com/sign-up) page.
2. Set a 3-4 Letter Token Symbol and select an icon from the list of available icons.
3. Provide your email address and enter a password for your account creation.
4. Soon after an activation link will be sent to the entered email.
5. Activate your account using the link in the email address. Without activating you will be unable to recieve $OST⍺ or create your BT economy.
6. Plan your BT economy in the 3 easy steps by following the provided instructions. FAQs and support articles will be provided on the page at each sub-step.
7. Once you have registered, staked $OST⍺ and minted BT, the Air-drop process will begin to allocate the amount of BT into your account, this can be distributed to end-users once they have been created following the process below.  

Please proceed through the rest of the tutorial once you have constructed your BT economy and minted your BTs using OST KIT⍺. Follow the steps here to create [Users](https://dev.stagingost.com/ostkit-restful-api/docs/started.html#1-create-users), [Air-drop](https://dev.stagingost.com/ostkit-restful-api/docs/started.html#2-initiate-airdrop) BTs, Create transaction [kinds](https://dev.stagingost.com/ostkit-restful-api/docs/started.html#3-create-transaction-kind) and execute a [transaction](https://dev.stagingost.com/ostkit-restful-api/docs/started.html#4-execute-transaction) using the APIs provided below. Find more in the detailed [reference](https://dev.stagingost.com/ostkit-restful-api/docs/user.html).





### 1. Create Users 
The user in OST KIT⍺, is the individual or the end-user accessing and interacting with your application. OST KIT provides an easy way to process their token transfers, as this example will illustrate. For onboarding your end-users to participate in your branded token economy enabled application, you need to create users with this API.

This tutorial assumes you’ve created an API signature using steps given in [authentication](https://dev.stagingost.com/ostkit-restful-api/docs/authentication.html) and are aware of the [errors](https://dev.stagingost.com/ostkit-restful-api/docs/error.html) that may arise in the process. 

#### API Endpoint - POST 
```url
{{saas_api_url}}/users/create
```

#### Parameters
| Parameter | Type   | Value  |
|-----------|--------|--------|
| _name_      | String | String representing the name of the user. Example : Puneet |

#### Sample Code | Curl 
```bash
curl --request POST \
  --url 'http://{{saas_api_url}}/users/create' \
  --data name=Puneet%20
```

#### Response 
Success
```javascript
{:success=>true, :data=>{"result_type"=>"economy_users", "economy_users"=>[{"uuid"=>"2da863e6-c8a5-4ecf-b625-aac00080baf9", "name"=>"test test", "total_airdropped_tokens"=>0, "token_balance"=>0}], "meta"=>{"next_page_payload"=>{}}}}
```
Failure
```javascript
{:success=>false, :err=>{:code=>"companyRestFulApi(s_a_g_1:Hy00otFOG)", :msg=>"invalid params", :display_text=>"", :display_heading=>"", :error_data=>[{"name"=>"User name should contain btw 3 - 25 characters."}]}, :data=>{}}
```

#### Returns
A user object if the call is successful. The returned object will have information about the tokens given to him by you as a company via [Air-drop](https://dev.stagingost.com/ostkit-restful-api/docs/user.html#4-initiate-air-drop-api), if this is the case. It also has the information about the branded token balance. Along with these, the response will have the attribute **_id_** which you should save in your database. This **_id_** will be used to update or retrieve information about the user. 

Once you create a user, store the _uuid_ value in your own database for later reference, it is advised to store this with the user’s name or email id to make a cross reference your application.





### 2. Initiate Airdrop 
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
| [_list_type_](https://dev.stagingost.com/ostkit-restful-api/docs/user.html#list-type-sub-attributes)   | String | The list type of end-users that need to be air-dropped tokens. Example:all|


#### Sample Code | Curl 
```bash
curl --request POST \
--url 'http://{{saas_api_url}}/users/airdrop-tokens' \
--header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
--form token_symbol=PK \
--form amount=10 \
--form list_type=all
```

#### Response
```javascript
{success: true, data: { airdrop_uuid: '026d9aba-270b-4ca6-8089-bd2f47a0ecec' }}
```

#### Returns
Returns a true or false response on the success of the air-drop of the branded tokens for your application. 





### 3. Create Transaction Kind
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


### Next Steps
Congrats! You’ve run a transaction in your branded token ecosystem. You may want to learn how to setup more transactions, add multiple end-users and run specific transactions in more detail, in the next steps.
