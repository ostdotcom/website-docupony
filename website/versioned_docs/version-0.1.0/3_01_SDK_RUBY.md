---
id: version-0.1.0-sdk_ruby
title: Ruby SDK Quick Start Guide
sidebar_label: Ruby SDK Quick Start Guide
original_id: sdk_ruby
---

The OST Ruby SDK is a Ruby gem that wraps the OST Developers API. This Quick Start Guide will show you how to use the OST Ruby SDK to create users, airdrop tokens to those users, create types of transactions, and execute one of those transaction types between two users.
### Prerequisites

Successfully integrating the SDK requires having Ruby installed on your system: [<u>https://www.ruby-lang.org/en/documentation/installation/</u>](https://www.ruby-lang.org/en/documentation/installation/)

To use the SDK, developers will need to:

1. Sign-up on [<u>https://kit.ost.com</u>](https://kit.ost.com).
2. Launch a branded token economy with OST KIT⍺. You can see a step by step guide [<u>here</u>](1_00_KIT_OVERVIEW.md).
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
environment = 'sandbox'  # possible values sandbox / main
api_key = 'abcdef0123456789abcd' # replace with the API Key you obtained earlier
api_secret = 'aaa123bbb456ccc789def000aaa123bbb456ccc789def000aaa123bbb456ccc7' # replace with the API Secret you obtained earlier
credentials = OSTSdk::Util::APICredentials.new(api_key, api_secret)
```

### Create Alice and Bob

Initialize a Users object to perform user specific actions, like creating users:

```ruby
ostUsersObject = OSTSdk::Saas::Users.new(environment, credentials)
```

Create users:

```ruby
ostUsersObject.create(name: 'Alice')
=> # returns object containing Alice's UUID, among other information, which you will need later

ostUsersObject.create(name: 'Bob')
=> # returns object containing Bob's UUID, among other information, which you will need later
```

### Airdrop Tokens to Alice and Bob

Newly created users do not have any tokens; but you can airdrop tokens to them so that they can participate in your branded token economy.

```ruby
ostUsersObject.airdrop_tokens(amount: 100, list_type: 'all') # airdrops 100 branded tokens to all of your economy's users
=> # returns object containing the UUID of the airdrop transaction, among other information, which you will need later
```

Airdropping involves several asynchronous steps and you can use the UUID of the airdrop transaction to check its status:

```ruby
ostUsersObject.get_airdrop_status(airdrop_uuid: 'abc1928-1234-1081dsds-djhksjd') # actual airdrop UUID will differ
=> # returns object with "steps_complete"=>["users_identified"]

ostUsersObject.get_airdrop_status(airdrop_uuid: 'abc1928-1234-1081dsds-djhksjd') # actual airdrop UUID will differ
=> # returns object with "steps_complete"=>["users_identified", "tokens_transfered", "contract_approved", "allocation_done"]

ostUsersObject.get_airdrop_status(airdrop_uuid: 'abc1928-1234-1081dsds-djhksjd') # actual airdrop UUID will differ
=> # returns object with "steps_complete"=>["users_identified", "tokens_transfered", "contract_approved", "allocation_done"]
```

### Create a Like Transaction

You can create named transaction types with defined values that are between users or between a user and your company.

For instance, to make a "Like" transaction for your branded token that is priced in USD:

```ruby
ostTransactionKindObject = OSTSdk::Saas::TransactionKind.new(environment, credentials) # initializes a TransactionKind object
ostTransactionKindObject.create(name: 'Like', kind: 'user_to_user', currency_type: 'usd', currency_value: '1.25', commission_percent: '12')
```

### Alice Likes Bob

Now that you've created a Like transaction type and funded Alice and Bob with airdropped tokens, you can execute a Like transaction from Alice to Bob.

To execute the Like transaction, you will need Alice and Bob's UUIDs. They were returned when you created Alice and Bob. However, you can get them again by retrieving and filtering the list of users:

```ruby
users_names = ["Alice", "Bob"] # make an array for filtering convenience
users_list_object = ostUsersObject.list() # returns an object that includes the list of users
users_list = users_list_object.data["economy_users"] # sets users_list to the array of users from the returned object
users_list.select { |u| users_names.include? u["name"] }.map { |r| {name: r["name"], uuid: r["uuid"] }} # filters for Alice and Bob
=> [{:name=>"Alice", :uuid=>"1234-1928-1081dsds-djhksjd"}, {:name=>"Bob", :uuid=>"1081xyz-1928-1234-1223232"}] # your UUIDs for Alice and Bob will differ
```
_Note: OST KIT⍺ does not place a uniqueness constraint on user names._

And now, use those UUIDs to execute a Like transaction between Alice and Bob:

```ruby
ostTransactionKindObject.execute(from_uuid: '1234-1928-1081dsds-djhksjd', to_uuid: '1081xyz-1928-1234-1223232', transaction_kind: 'Like')
=> # returns object with uuid of executed transaction
```
_Note: `transaction_kind` is the `name` of the transaction type._

The UUID of the executed transaction signals that worst-case scenario checks that the transaction will be completed have been performed and you can assume the transaction will be successfully mined. However, you can additionally confirm the status of the executed transaction in a couple of ways.

You can get the status of the specific transaction:

```ruby
ostTransactionKindObject.status(transaction_uuids: ['5f79063f-e-dd095f02c72e']) # the UUID of your executed transaction will differ
```

Or you can get the list of users again and see that Alice's branded token balance went down and Bob's branded token balance went up (which Bob is probably happy about):

```ruby
ostUsersObject.list()
```

And with just a little time and a lot of ease, your branded token economy is up and running!