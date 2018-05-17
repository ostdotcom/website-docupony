---
id: version-1.0.0-sdk_ruby
title: Ruby SDK Quick Start Guide
sidebar_label: Ruby SDK Quick Start Guide
original_id: sdk_ruby
---

The OST Ruby SDK is a Ruby gem that wraps the OST Developers API v1. This Quick Start Guide will show you how to use the OST Ruby SDK to create users, airdrop tokens to those users, create types of transactions, and execute one of those transaction types between two users.

### Prerequisites

Successfully integrating the SDK requires having Ruby installed on your system: [<u>https://www.ruby-lang.org/en/documentation/installation/</u>](https://www.ruby-lang.org/en/documentation/installation/)

To use the SDK, developers will need to:

1. Sign-up on [<u>https://kit.ost.com</u>](https://kit.ost.com).
2. Launch a branded token economy with OST KIT⍺. You can see a step by step guide [<u>here</u>](/docs/kit/html).
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
api_base_url = 'https://sandboxapi.ost.com/v1'  
api_key = '6078017455d8be7d9f07' # replace with the API Key you obtained earlier
api_secret = 'f32a333d82ba73a9db406afb4dbcfdc51cd36ccb742770276d6c4155783ca8d0' # replace with the API Secret you obtained earlier

# Initialize SDK object
ost_sdk = OSTSdk::Saas::Services.new({api_key: api_key, api_secret: api_secret, api_base_url: api_base_url})
```

### Create Alice and Bob

Initialize a Users object to perform user specific actions, like creating users:

```ruby
ost_users_object = ost_sdk.manifest.users
```

Create users:

```ruby
ost_users_object.create(name: 'Alice')
 # returns object containing Alice's Id, among other information, which you will need later

ost_users_object.create(name: 'Bob')
 # returns object containing Bob's Id, among other information, which you will need later
```

### Airdrop Tokens to Alice and Bob

Newly created users do not have any tokens; but you can airdrop tokens to them so that they can participate in your branded token economy.

Initialize aa Airdrop object to execute airdrop

```ruby
ost_airdrop_object = ost_sdk.manifest.airdrops
```

```ruby
ost_airdrop_object.execute({amount: 10, user_ids: 'd66a40d0-b2fa-4915-b6d2-46bbe644278a, df7153f1-c1cf-4ae2-b980-f04df1e68bb3'})  # airdrops 10 branded tokens to two users whoes Ids have been specified.
# returns object containing the airdrop Id of the airdrop transaction, among other information, which you will need later
```

Airdropping involves several asynchronous steps and you can use the Id of the airdrop transaction to check its status:

```ruby
ost_airdrop_object.get({id: 'ef98395d-e999-463b-a875-84bdd0740b31'}) # actual airdrop Id will differ

# # returns object with "steps_complete"=>["users_identified", "tokens_transfered", "contract_approved", "allocation_done"]
# try a few times till  steps_complete shows all steps mentioned above.
```

### Create a Like Action

You can create named an action with defined values that are between users or between a user and your company.

For instance, to make a "Like" action for your branded token that is priced in USD:

```ruby
ost_action_object = ost_sdk.manifest.actions # initializes action object

ost_action_object.create({name: 'Like', kind: 'user_to_user', currency: 'USD', arbitrary_amount: false, amount: 1.01, arbitrary_commission: false, commission_percent: 10})
```

### Alice Likes Bob

Now that you've created a Like action and funded Alice and Bob with airdropped tokens, you can execute a Like action from Alice to Bob.

To execute the Like action, you will need Alice and Bob's Ids. They were returned when you created Alice and Bob. You can alternatively get them by retrieving and filtering the list of users.  And you would need the action id that was returned when you created the action. 

```ruby
ost_transaction_object = ost_sdk.manifest.transactions  #initializes transaction module.

ost_transaction_object.execute({from_user_id:'d66a40d0-b2fa-4915-b6d2-46bbe644278a', to_user_id:'df7153f1-c1cf-4ae2-b980-f04df1e68bb3', action_id:'22613'})
 # returns object with id of executed transaction
```

The Id of the executed transaction signals that worst-case scenario checks that the transaction will be completed have been performed and you can assume the transaction will be successfully mined. However, you can additionally confirm the status of the executed transaction in a couple of ways.

You can retrieve the specific transaction:

```ruby
ost_transaction_object.get({id: 'dfd74991-cc10-4547-be84-aece2e4d9a06'}) # the Id of your executed transaction will differ
```


>_last updated 17th May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2