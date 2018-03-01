---
id: started
title: Starting Overview 
sidebar_label: Starting Overview 
---
The API documentation for the $OST powered complete blockchain toolkit for businesses. 


OST KIT gives you the power to launch, manage and monitor your branded token economy powered by $OST. Great OST KIT use cases include projects with P2P micro-payments to encourage content creation, enabling transparent incentives and rewards for your platform users, monetizing API calls to third parties, low cost cross-border payments and much [more](https://ostkit.com/linktothingsostkitcando).

OST also provids a [ruby sdk](https://github.com/OpenSTFoundation/ost-sdk-ruby) with three modules at the moment. A [Transaction](http://localhost:3000/ostkit-restful-api/docs/transaction.html) module that allows one to create new transaction [kinds](http://localhost:3000/ostkit-restful-api/docs/transaction.html#kind) and maintain them, an Address module that allows one to fetch $OST, _OST"_(transaction fees), ETH, FRC balances etc and a [User](http://localhost:3000/ostkit-restful-api/docs/user.html) module that allows for the creation and maintaining of end-users on your application utilizing the OST enabled branded token economy. The SDK directly connects to the OpenST platform underneath the hood of the OST KIT alpha. Thus also giving an insight into the OpenST-protocol. Find more documentation on this [here](https://github.com/OpenSTFoundation/ost-sdk-ruby/blob/master/README.md). 

## Create your Branded Tokens 
OST KIT aplha enables you to design, create and manage your branded token (BT) economy. You may want to set just one branded token for your company or a few, depending upon your business model, range of services and product variations you offer. Please use the OST [FAQ](https://ostkit.com/faq) or the developer forum on [gitter](https://gitter.com/ostkit) to ask us development related questions directly and this will help you understand the right approach towards achieveing a fully functional booming branded token economy. 

### Staking and Minting Branded Tokens

Step-by-Step Process to creating and minting your branded tokens using the [OST KIT alpha](https://kit.stagingost.com/sign-up).
1. Go to the homepage of OST KIT [sign up](https://kit.stagingost.com/sign-up) page.
2. Set a 3-4 Letter Token Symbol and select an icon from the list of available icons.
3. Provide your email address and enter a password for your account creation.
4. Soon after an email will be sent to the entered email.
5. Activate your account using the link in the email address. Without activating you will be unable to recieve $OST or create your BT economy.
6. Plan your BT economy in the 3 easy steps by following the provided instructions. FAQs and support articles will be provided on the page.
7. Once you have registered, staked $OST and minted BT, the airdrop process will begin to Air-drop the requested amount of BT into your account, which you can distribute to users once they have been created following the process below.  

You can proceed through the rest of the tutorial ones who have created andminted your branded token using ostKIT alpha. Follow the steps to create users, create transaction kind and execute a trasacation using the APIs provided below. 



### 1. Create Users API
The user in OST KIT alpha, is the individual or the end-user accessing and interacting with your application. OST KIT provides an easy way to process their token transfers as this example will illustrate. For onboarding your end-users to participate in your branded token economy enabled application, you need to create users with this API.

This tutorial assumes you’ve created an API signature using steps given in [authentication]() and are aware of the [errors]() that may arise in the process. 

#### POST - endpoint 
```url
{{saas_api_url}}/addresses/create
```

#### Parameters
| Parameter | Type   | Value  |
|-----------|--------|--------|
| _name_      | String | String representing the name of the user. Example : Puneet |

#### Sample Code | Curl 
```bash
curl --request POST \
--url 'http://{{saas_api_url}}/addresses/create' \
--data name=Puneet%20
```

#### Response 
```javascript
{"result_type"=>"economy_users", "economy_users"=> 
[{"id"=>160, "uuid"=>"4697a3c8-7aa8-47c7-8192-6df7b90f1e7f", 
"name"=>"Puneet", "total_airdropped_tokens"=>0, "token_balance"=>0}], 
"meta"=>{"next_page_payload"=>{}}}
```

#### Returns
A user object if the call is successful. The returned object will have information about the tokens given to him by you as a company via [Airdrop](https://dev.stagingost.com/ostkit-restful-api/docs/user.html#4-initiate-air-drop-api), if this is the case. It also has the information about the [branded token balance](). Along with these, the response will have the attribute **_id_** which you should save in your database. This **_id_** will be used to update or retrieve information about the user. 

Once you create a user, store the _uuid_ value in your own database for later reference, it is advised to store this with the user’s name or email id for making a cross reference.




### 2. Create Transaction API
Creating transactions requires evaluating core user actions on your application and filtering out for the ones that you want to trigger branded token exchanges. Once you have decided the core actions you should start with creating a transaction for each of them. While setting up these transactions you should decide the type of the transaction, associate a value to it and also (if required) set a commission on it. An “Upvote” for example would be setup as a _user-to-user_ transaction, whereas something like “Rewards”  would be setup as a _company-to-user_ transaction. The value for a transaction can be set in two ways. One in the fiat value system: USD - US dollars and second in the tokenized value system: BT - your branded token.

#### POST 
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


#### _kind_ Sub-Attributes
| Parameter       | Type   | Definition                                                                                    |
|-----------------|--------|-----------------------------------------------------------------------------------------------|
| _user_to_user_    | String | Value transfer from one end-user to another. Example: "Upvote" or "like".                                         |
| _user_to_company_ | String | Value transfer from an end-user to you (the application service provider). Example: “API call”. |
| _company_to_user_ | String | Value transfer from the application service provider to an end-user. Example: “Rewards”.    |

#### _value_currency_type_ Sub-Attributes
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





### 3. Execute Transaction API
To execute a transaction between one end-user to another end-user, an action can be utlizied to crete a branded token exchange. This can be done by specifying the from end-user _uuid_ to another end-user _uuid_ and the transaction [kind](https://dev.stagingost.com/ostkit-restful-api/docs/transaction.html#kind). 

#### POST 
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
Congrats! You’ve run a transaction in your branded token ecosystem. You may want to learn how to setup transactions , add users and run specific transactions in more detail in the next steps.
