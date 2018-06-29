---
id: version-1.1.0-changelog
title: Changelog
sidebar_label: Changelog
original_id: changelog
---

### OST KIT⍺ - 2nd July 2018
#### API v1.1
Our new set of APIs allow you to create interfaces for your users to view the results of their interactions with your application. You now have the option to create an interface for your users to view their balances and transactions and analyze their interactions and the rewards. The APIs do not support key-management, signing of transactions or buy-in and cash-out at this point in time.

- Added Balance API
	- GET to `/balance/{user_id},` fetches the user's balance
- Added Ledger API
	- GET to `/ledger/{user_id}` gets all the inbound and outbound transactions of a user.
- Added a new parameter in Transaction Object
	- '_airdropped_amount_' gives the amount of branded tokens that were deducted from user's airdrop balance while executing a transaction.

- Released a [<u>User Guide</u>](/docs/guide_wallet_setup.html) that walks you through a basic wallet setup.

- Released the following SDKs that talk to our latest version of the APIs v1.1
    - [<u>Ruby SDK</u>](https://github.com/OpenSTFoundation/ost-sdk-ruby/tree/release-1.1)
	- [<u>JavaScript SDK</u>](https://github.com/OpenSTFoundation/ost-sdk-js/tree/release-1.1)
	- [<u>JAVA SDK</u>](https://github.com/OpenSTFoundation/ost-sdk-java/tree/v1.1.0)
	- [<u>PHP SDK</u>](https://github.com/OpenSTFoundation/ost-sdk-php/tree/V1.1.0))

We would love to know how these additions impact your experience of OST APIs, [<u>so be in touch</u>](https://help.ost.com/support/discussions)!


### OST KIT⍺ - 17 May 2018

One of our overall goals is to make blockchain technology and access simpler for everyone. As we took a look at our current API code base as well as feedback from our community, we decided that in order to grow while keeping the platform accessible, we needed to make the code structure simpler and easier to use. As such, we revised most of our structure to be more intuitive and will hopefully be easier to add to as we scale. The following enhancements are introduced based on the feedback from the community, broadly: 

 * Allow users to execute transactions with arbitrary value
 * Allow arbitrary transfers of OSTa on the utility chain in order to deploy and interact with other contracts on the utility chain
 * Improve existing APIs logic based on feedback

Specifically:

- Revised API code
	- Improved existing logic and structure across all APIs
	- Standardized error responses

- Released a JavaScript [SDK](https://www.npmjs.com/package/@ostdotcom/ost-sdk) and added a JavaScript SDK Quick Start [Guide](3_02_SDK_JAVASCRIPT.md)

- Updated Users API
	- POST to `/users/create` updated to `/users`, creates a user
	- POST to `/users/edit` updated to `/users/{id}`, updates the identified user 
	- GET to `/users/list` updated to `/users`, gets a list of users 
	- GET to `/users/{id}` added, gets the identified user

- Replaced Transaction Types with Actions API 
	- POST to `/transaction-types/create` updated to `/actions`, creates an action
	- POST to `/transaction-types/edit` updated to `/actions/{id}`, updates the identified action
	- GET to `/transaction-types/list` updated to`/actions/{id}`, gets the identified action
	- GET to `/actions` added, gets a list of actions

- Added Transactions API
	- POST to `/transaction-types/execute` updated to `/transactions`, creates new transaction
	- POST to `/transaction-types/status` updated to, GET to `/transactions/{id}`, gets the identified transaction
	- GET to `/transactions` added, gets a list of transactions

- Updated Airdrops API
	- POST to `/users/airdrop/drop` updated to `/airdrops`, initiates an airdrop
	- GET to `/users/airdrop/status` updated to `/airdrops/{id}`, gets the identified airdrop
	- GET to `/airdrops` added, get a list of airdrops

- Added Transfers API
	- POST to `/transfers`, transfers OST⍺ Prime to an arbitrary address on the utility chain
	- GET to `/transfers/{id},` gets the identified transfer
	- GET to `/transfers`, gets a list of transfers

- New Token API
	- GET to `/token`, gets the branded token economy information


### OST KIT⍺ - 30 April 2018
- Revised authentication documentation 
	- Clarified authentication signature generation steps. 
	- Added Node.js authentication code snippets for POST and GET requests.


### OST KIT⍺ - 19 March 2018

After reviewing the usage data from the initial public release of OST KIT⍺, we have implemented the following performance improvements:

- increased the number of database servers, augmenting IOPS;
- refactored certain database actions and optimized certain database queries;
- added additional application servers;
- enabled rate-limiting by public IP address to 100 transactions per second; and
- established a two-track system for API calls by API Key:
  	- a fast queue for rates at up to 2,000 transactions per two minutes; and
	- a slower queue to process transactions at higher rates, subject to the overall rate-limit of 100 transactions per second.

Additionally, [<u>OST VIEW</u>](https://view.ost.com/) was enhanced to reduce latency. OST VIEW, our custom-built block explorer for analyzing transactions on the OpenST network of side blockchains, is not a part of OST KIT⍺. However, OST VIEW is a powerful tool that will help you to leverage the strength of OST KIT⍺; even more so thanks to its recent user experience improvements.

**Thank you!**

Thanks to the OST community, the initial public release of OST KIT⍺ was super successful, with over 1,000 Branded Tokens deployed and over 2,000,000 token transfers executed. We learned a great deal in the initial public release, including from direct feedback. We hope these improvements underscore our commitment to enabling mainstream adoption of blockchain technology and to earning your confidence as the blockchain platform of choice for forward-thinking businesses.

We would love to know how these improvements impact your experience of OST KIT⍺, [<u>so be in touch</u>](https://help.ost.com/support/discussions)!

### OST KIT⍺ - 15 March 2018

Our initial public release of OST KIT⍺.
