---
id: version-1.1.0-sdk_java
title: Java SDK Quick Start Guide
sidebar_label: Java SDK Quick Start Guide
original_id: sdk_java
---

 This Quick Start Guide will show you how to use the OST Java SDK to create users, airdrop tokens to those users, create actions, and execute one of those action types between two users.

### Prerequisites

Successfully integrating the SDK requires having a suitable Java Development Environment installed on your system. Java version 8 or above is recommended for use.

To use the SDK, developers will need to:

1. Sign-up on [<u>https://kit.ost.com</u>](https://kit.ost.com).

2. Launch a branded token economy with OST KIT⍺. You can see a step by step guide [<u>here</u>](/docs/kit_overview.html).

3. Obtain an API Key and API Secret from the OST KIT⍺ [<u>Developer API Console</u>](https://kit.ost.com/developer-api-console):

![API Credentials](assets/Developer_section.jpg)

### Including the SDK in your project
If you use Apache Maven, you'll need to declare OST SDK as a dependency in your project's pom.xml file.
The dependency typically looks like this for Maven:
```xml
  <dependencies>
       <dependency>
           <groupId>com.ost</groupId>
           <artifactId>ost-sdk-java</artifactId>
           <version>1.1.0</version>
       </dependency>
   </dependencies>
```

Once you have your project set up and the API Key and Secret are obtained, create a file (for eg: QuickStartMain.java) in your workspace.

In your Java file intialize the SDK object and set the following variables for convenience:

```java
import com.google.gson.JsonObject;
import com.ost.OSTSDK;
import com.ost.services.OSTAPIService;
import java.io.IOException;
import java.util.HashMap;

public class QuickStartMain {
    private static com.ost.services.v1.Manifest services;

    public static void main(String[] args) throws IOException, OSTAPIService.MissingParameter {
        HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
        sdkConfig.put("apiEndpoint", "https://sandboxapi.ost.com/v1.1"); 
        sdkConfig.put("apiKey", "6078017455d8be7d9f07"); // replace with the API Key you obtained earlier
        sdkConfig.put("apiSecret", "f32a333d82ba73a9db406afb4dbcfdc51cd36ccb742770276d6c4155783ca8d0"); // replace with the API Secret you obtained earlier

        // Initialize SDK object
        OSTSDK ostObj = new OSTSDK(sdkConfig);
        services = (com.ost.services.v1.Manifest) ostObj.services;
    }
}    
```

### Create Alice and Bob

Initialize a Users object to perform user specific actions, like creating users:

```java
       com.ost.services.v1.Users userService = services.users;
```

Create users:

```java
        // returns object containing Alice's ID, among other information, which you will need later
        HashMap <String,Object> params = new HashMap<String,Object>();
        params.put("name", "Alice");
        JsonObject response = userService.create( params );
        System.out.println("response: " + response.toString() );
 
        // returns object containing Bob's ID, among other information, which you will need later
        HashMap <String,Object> params = new HashMap<String,Object>();
        params.put("name", "Bob");
        JsonObject response = userService.create( params );
        System.out.println("response: " + response.toString() );
```

### Airdrop Tokens to Alice and Bob

Newly created users do not have any tokens; but you can airdrop tokens to them so that they can participate in your branded token economy.

Initialize an airdrop object and execute an airdrop to transfer tokens to both the users, by using their IDs that were returned when creating them:

```java
        // Initialize airdrop object
        com.ost.services.v1.AirDrops airdropService = services.airdrops;
        // returns object containing the airdrop ID of the airdrop transaction, among other information, which you will need later
        HashMap <String,Object> params = new HashMap<String,Object>();
        params.put("amount", "10"); // airdrops 10 branded tokens to two users whoes IDs have been specified.
        params.put("user_ids", "ffb7b9a4-2231-4389-bf03-f9d6dd3c58a2, c68ca072-985e-45b1-81d6-edd924aed27c");
        JsonObject response = airdropService.execute( params );
        System.out.println("response: " + response.toString() );  
```

Airdropping involves several asynchronous steps and you can use the ID of the airdrop transaction to check its status:

```java
        // returns object with "steps_complete"=>["users_identified", "tokens_transfered", "contract_approved", "allocation_done"]
        HashMap <String,Object> params = new HashMap<String,Object>();  
        params.put("id", "c8d5afbe-c0d8-46b9-86de-8263c7f0ed74");
        JsonObject response = airdropService.get( params );
        System.out.println("response: " + response.toString() );

       // try a few times till  steps_complete shows all steps mentioned above.
```

### Create a Like Action

You can create named actions with defined values that are between users or between a user and your company.

For instance, to make a "Like" action for your branded token that is priced in your token:

```java
        com.ost.services.v1.Actions actionService = services.actions;  // initializes action object

        HashMap <String,Object> params = new HashMap<String,Object>();
        params.put("name", "Like");
        params.put("kind", "user_to_user");
        params.put("currency", "BT");
        params.put("arbitrary_amount", false);
        params.put("amount", 1.01);
        params.put("arbitrary_commission", false);
        params.put("commission_percent", 1);
        JsonObject response = actionService.create( params );
        System.out.println("response: " + response.toString() );
```

### Alice Likes Bob
Now that you've created a Like action and funded Alice and Bob with airdropped tokens, you can execute a Like action from Alice to Bob.

To execute the Like action, you will need Alice and Bob's IDs. They were returned when you created Alice and Bob. You can alternatively get them by retrieving and filtering the list of users. You would also need the action ID that was returned when you created the action. 

```java
        //initializes transaction module.
        com.ost.services.v1.Transactions transactionService = services.transactions;

        // returns object with ID of executed transaction
        HashMap <String,Object> params = new HashMap<String,Object>();
        params.put("from_user_id", "ffb7b9a4-2231-4389-bf03-f9d6dd3c58a2");
        params.put("to_user_id", "c68ca072-985e-45b1-81d6-edd924aed27c");
        params.put("action_id", "37665");
        JsonObject response = transactionService.execute( params );
        System.out.println("response: " + response.toString() );
```
 
You can query for the status of the Like transaction in a couple of ways.
You can get the status of the specific transaction with its ID:

```java
        HashMap <String,Object> params = new HashMap<String,Object>();
        params.put("id", "7472d663-de3f-4fc3-9c2e-f5314f8df653"); // the ID of your executed transaction will differ
        JsonObject response = transactionService.get( params );
        System.out.println("response: " + response.toString() );
```

Or you can get the list of all transactions. For all APIs that list resources you can use filters on specific fields in the object to further refine your lists. As an example below we set 'limit' as '15' to get 15 instances of transaction objects in one list transactions request:

```java
        HashMap <String,Object> params = new HashMap<String,Object>();
        params.put("limit", 15);
        JsonObject response = transactionService.list( params );
        System.out.println("response: " + response.toString() );
```

There is much more that you can do with OST KIT APIs. Read through the detailed API Reference [<u>here</u>](/docs/api.html).

>_last updated 2nd June 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1.1 | OpenST Platform v0.9.2
