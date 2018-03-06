---
id: api_transaction-types_create
title: OST KIT API Transaction-Types Create
sidebar_label: Transaction-types create
---

Creating transactions requires evaluating core user actions on your application and filtering out for the ones that you want to trigger branded token exchanges. Once you have decided the core actions you should start with creating a transaction for each of them. While setting up these transactions you should decide the type of the transaction, associate a value to it and also (if required) set a commission on it. An “Upvote” for example would be setup as a _user-to-user_ transaction, whereas something like “Rewards”  would be setup as a _company-to-user_ transaction. The value for a transaction can be set in two ways. One in the fiat value system: USD - US dollars and second in the tokenized value system: BT - your branded token.

#### API Endpoing - POST 
```url
{{saas_api_url}}/transaction-types/create
```

#### Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _name_                | String | The name of the transaction. Example: "Upvote","buy a coffee".                               |
| _kind_                | String | The type of transaction based on the owners involved in the token exchange. Example: _user_to_user_.                  |
| _currency_type_ | String | String representing the currency the transaction is valued in. Two possible values are **_usd_** or **_bt_** .                                 |
| _currency_value_ | Float  | Positive number that represents amount of branded token or USD to be set as transaction value.                 |
| _commission_percent_  | Float  | Percentage of transaction value that you set as a service provider on a transaction. Can be set for only _user_to_user_ transaction type. |

### Transaction-types create Sub-Attributes

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
  --url 'http://{{saas_api_url}}/transaction/kind/create' \
  --header 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  --form name=ABC \
  --form kind=user_to_user \
  --form currency_type=USD \
  --form currency_value=1 \
  --form commission_percent=10
```


#### Success Response
```
{:success=>true, :data=>{"result_type"=>"transactions", "transactions"=>[{"id"=>20373, "client_id"=>20373,"client_transaction_id" => 20373 "name"=>"ABC", "kind"=>"user_to_user", "currency_type"=>"USD", "currency_value"=>"1.1", "commission_percent"=>"1.1", "status"=>"active", "uts"=>1520179969832}]}}
```

#### Failure Response
```
{:success=>true, :data=>{"result_type"=>"transactions", "transactions"=>[{"id"=>20373, "client_id"=>20373,"client_transaction_id" => 20373 "name"=>"ABC", "kind"=>"user_to_user", "currency_type"=>"USD", "currency_value"=>"1.1", "commission_percent"=>"1.1", "status"=>"active", "uts"=>1520179969832}]}}
```


#### Returns
Returns a transaction object if there were no initial errors with the transaction creation. Example - transactions being created with duplicate names, or value of the transaction set breaches the max value set. This call will return an error if create parameters are invalid. Errors are sent as per specification [here.](https://dev.stagingost.com/ostkit-restful-api/docs/error.html)