---
id: version-1.1.0-guide_wallet_setup
title: Basic Wallet Setup Guide
sidebar_label: Basic Wallet Setup Guide
original_id: guide_wallet_setup
---

 As an important tool of communication, the wallet interface can provide end-users the possibility to understand and interact with your application’s branded token economy. 

With the Ledger and Balance APIs, you can build wallet-like interfaces where users can view their current balance and transactions history. This typically works best if you already have an economy with end-users logging in and executing the respective actions you defined in your economy. 

Please note the APIs do not support key-management, signing of transactions or buy-in and cash-out at this point in time. 

### Prerequisites 
This guide uses Ruby SDK to walk through the steps of creating a basic wallet interface. Successfully using the Ruby SDK requires having Ruby installed on your system: [<u>https://www.ruby-lang.org/en/documentation/installation/</u>](https://www.ruby-lang.org/en/documentation/installation/)

If you wish to use other SDKs please visit one of the Quick Start Guides or SDKs' overview section to [<u>learn more</u>.](/docs/sdks_overview.html)

To use any SDK, developers will need to:

1. Sign-up on [<u>https://kit.ost.com</u>](https://kit.ost.com).

2. Launch a branded token economy with OST KIT⍺. You can see a step by step guide [<u>here</u>](/docs/kit_overview.html).

3. Obtain an API Key and API Secret from the OST KIT⍺ [<u>Developer API Console</u>](https://kit.ost.com/developer-api-console):

![API Credentials](assets/Developer_section.jpg)

### Install ost-sdk-ruby

Once Ruby is installed and the API Key and Secret are obtained, install the gem.

From your terminal window, enter:

```bash
> gem install ost-sdk-ruby # installs the gem
```

If you would like to work with the gem directly, use irb, the interactive environment provided with Ruby:

```bash
> irb
```

Require the gem to use it in your application or in irb:

```ruby
> require('ost-sdk-ruby')
```

### Set Variables

Set the following variables for convenience:

```ruby

api_base_url = 'https://sandboxapi.ost.com/v1.1'  
api_key = '6078017455d8be7d9f07' # replace with the API Key you obtained earlier
api_secret = 'f32a333d82ba73a9db406afb4dbcfdc51cd36ccb742770276d6c4155783ca8d0' # replace with the API Secret you obtained earlier

# Initialize SDK object
ost_sdk = OSTSdk::Saas::Services.new({api_key: api_key, api_secret: api_secret, api_base_url: api_base_url})

```

### Create Alice and Jason

Initialize a Users object to perform user specific actions, like creating users:

```ruby

ost_users_object = ost_sdk.services.users

```

Create users:

```ruby
ost_users_object.create(name: 'Alice')
 # returns object containing Alice's ID, among other information, which you will need later

ost_users_object.create(name: 'Jason')
 # returns object containing Jason's ID, among other information, which you will need later
```

### Airdrop Tokens to Alice and Jason

Newly created users do not have any tokens; but you can airdrop tokens to them so that they can participate in your branded token economy.


Initialize an Airdrop object to execute airdrop

```ruby
ost_airdrop_object = ost_sdk.services.airdrops
```

```ruby
ost_airdrop_object.execute({amount: 10, user_ids: 'd66a40d0-b2fa-4915-b6d2-46bbe644278a, df7153f1-c1cf-4ae2-b980-f04df1e68bb3'})  # airdrops 10 branded tokens to two users whoes IDs have been specified.
# returns object containing the airdrop ID of the airdrop transaction, among other information, which you will need later
```

Airdropping involves several asynchronous steps and you can use the Id of the airdrop transaction to check its status:

```ruby
ost_airdrop_object.get({id: 'ef98395d-e999-463b-a875-84bdd0740b31'}) # actual airdrop ID will differ

# # returns object with "steps_complete"=>["users_identified", "tokens_transfered", "contract_approved", "allocation_done"]
# try a few times till  steps_complete shows all steps mentioned above.
```

### Getting User Balances
To get a user's balance, you can use the `/balance/{user_id}` API.

```ruby
ost_balance_object = ost_sdk.services.balances # initializes the balance object

ost_balance_object.get({id: 'd66a40d0-b2fa-4915-b6d2-46bbe644278a'}).to_json   # Fetch the user's balance
``` 

This API returns a balance object. The balance details in the object are in (BT) your Branded Tokens. 

#### Example Balance Response Body

```json
{
  "success": true,
  "data": {  
      "result_type": "balance",
      "balance":  {  
         "available_balance": "800.243366506781137",
         "airdropped_balance": "140.231683253390568746",
         "token_balance": "660.011683253390568746"
      }
   }
}
```

#### Fiat and OST Equivalents
In order to display OST and USD equivalent of these Branded Tokens, you can use the Token Details API. 

```ruby
ost_token_object = ost_sdk.services.token  #initializes the token object
ost_token_object.get({}).to_json    # fetches the token economy details
```

The conversion_factor in response to a GET to `/token` refers to the factor you chose at the time of the Token Economy set up in OST KIT. Multiplying this number with the available_balance in balance object will give you the OST equivalents values of the Token balances. 

Multiplying the result with price_points that we get in `/token` response will give you the USD equivalent value.

#### Example Token Response Body
```json
{
  "success": true,
  "data": {
    "result_type": "token",
    "token": {
      "company_uuid": 1028,
      "name": "Happy Token",
      "symbol": "HAP",
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

#### Alice Likes Jason
To execute the Like action, you will need Alice and Jason's IDs. They were returned when you created Alice and Jason.  And you would need the action ID that was returned when you created the action. 

```ruby
ost_transaction_object = ost_sdk.services.transactions  #initializes transaction module.

ost_transaction_object.execute({from_user_id:'d66a40d0-b2fa-4915-b6d2-46bbe644278a', to_user_id:'df7153f1-c1cf-4ae2-b980-f04df1e68bb3', action_id:'22613'})
 # returns object with ID of executed transaction
```

What can you tell your users about this action now? Here is the simplest way you could think of a user-flow. 

![walletuserflow](assets/WalletFlow.jpg)


Now if Alice wants to view her updated balance you can call the balance object again just like you did earlier- using her user_id.  

### Getting The Transaction Ledger
If Alice wants to see all her transactions, you can use the Ledger API.

```ruby
ost_ledger_object = ost_sdk.services.ledger  #initialize the ledger object 
ost_ledger_object.get({id: 'd66a40d0-b2fa-4915-b6d2-46bbe644278a'}).to_json  # Get all the transactions a particular user did in the economy.
```

This Ledger API filters transactions in which the selected user is either the sender or the recipient of an action. As such the response returns the action-id but not the action name. In order to display action names there are two options:
*  A simple way is to store a mapping of action-id to action name on your side and refresh it when you add action     types.
*  Send a GET request on `/actions/{id}` 

```ruby
ost_action_object = ost_sdk.services.actions #initializes action object
ost_action_object.get(id: 22613).to_json   # fetches an action
```

A Basic user-interface for Alice could look like this: 

![walletinterface](assets/WalletInterface.jpg)



>_last updated 2nd July 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1.1 | OpenST Platform v0.9.2
