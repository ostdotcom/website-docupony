---
id: java
title: Java SDK Quickstart Guide
sidebar_label: Java
---

The Java SDK is a Java wrapper for the [OST Platform API](/platform/docs/api). This Quick Start Guide will show you how to use the Java SDK.

You can also view the source code on [GitHub](https://github.com/ostdotcom/ost-sdk-java/tree/v2.0.0)

## 1. Create Token On OST Platform
Follow the [Create Token guide](/platform/docs/1-create/) to complete token setup.

## 2. Get Credentials
Once token setup is complete, go to the [Developers page](https://platform.ost.com/testnet/developer) inside OST Platform dashboard to get access to your API key and API secret.

Every account is provided with two pairs of keys: one for Sandbox and one for Production. Use your Sandbox API keys for development and testing.

## 3. Install SDK

### a) Installation using [Apache Maven](https://maven.apache.org/index.html)

To install the SDK follow these steps <br>

1. **Adding dependency in POM file of your project**

```xml
<dependency>
  <groupId>com.ost</groupId>
  <artifactId>ost-sdk-java</artifactId>
  <version>2.0.0</version>
</dependency>
```

2. **Installing SDK using maven command**

> mvn install

### b) Building jar from source

To build the Jar file of SDK from source follow these steps:

1. **Clone the repository**

> git clone https://github.com/ostdotcom/ost-sdk-java.git

> cd ost-sdk-java

2. **Package using MVN**

   Packaging without dependencies

    > mvn clean pacakge -DskipTests

   Packaging with dependencies

    > mvn clean compile assembly:single -DskipTests


3. The jar can be found in `target` folder

**Source code:** [Java SDK GitHub Repo](https://github.com/ostdotcom/ost-sdk-java/tree/v2.0.0)

## 4. Get Token Information
To get the information about your Token, you will have to use `tokens` service provided by Java SDK.

### Instantiating the SDK object
Before using any service of SDK, you will have to provide API key and API secret to instantiate new SDK object.

**Instantiating The SDK Sample Code**

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.ost.OSTSDK;

public class Test {
    public static void main(String args[]) {

        HashMap<String,Object> sdkConfig = new HashMap<String,Object>();
        sdkConfig.put("apiEndpoint","[YOUR_API_ENDPOINT]");
        sdkConfig.put("apiKey","[YOUR_API_KEY]");
        sdkConfig.put("apiSecret","[YOUR_API_SECRET]");

        HashMap <String,Object> nestedparam = new HashMap<String,Object>();
        nestedparam.put("timeout", (long) 60);
        sdkConfig.put("config", nestedparam);

        OSTSDK ostObj = new OSTSDK(sdkConfig);
        com.ost.services.Manifest services = (com.ost.services.Manifest) ostObj.services;
    }
}
```

### Call `tokens` service
Now you can call any of the SDK. You will call `tokens` service to get the tokens details.

**Get Tokens Details Sample Code**

```java

com.ost.services.Tokens tokensService = services.tokens;

HashMap <String,Object> params = new HashMap<String,Object>();
JsonObject response = tokensService.get( params );
System.out.println("response: " + response.toString() );

```

### Token Information 
Token entity has important information about your token which we recommend you to save on your server for further use. 

```json
{
  "success":true,
  "data":{
    "result_type":"token",
    "token":{
      "id":1085,
      "name":"OSTD",
      "symbol":"OSTD",
      "conversion_factor":1,
      "total_supply":"20000000000000000000000",
      "decimals":18,
      "origin_chain":{
        "chain_id":3,
        "branded_token":"0xd31756555d3a28c990c39fb85087e41afc09ff7a",
        "organization":{
          "contract":"0x0a886e74747f5fed2db45c53df5e0c7b2bacc3d7",
          "owner":"0xaa541c16d8bd7f61c2c0ec31f30b481d435bd5c1"
        },
        "stakers":[
          "0xaa541c16d8bd7f61c2c0ec31f30b481d435bd5c1"
        ]
      },
      "auxiliary_chains":[
        {
          "chain_id":199,
          "utility_branded_token":"0xdd7df6a4ec6a0c2edd051da875ab9a32e9567869",
          "company_token_holders":[
            "0xa9632350057c2226c5a10418b1c3bc9acdf7e2ee"
          ],
          "organization":{
            "contract":"0x5e0c62d0f3f286461ef70e1a01e26bc766107912",
            "owner":"0xaa541c16d8bd7f61c2c0ec31f30b481d435bd5c1"
          }
        }
      ],
      "updated_timestamp":1551870482
    }
  }
}
```

:::note **Congratulations** 
You have completed your first API call from Server Side SDK
:::

## 5. Register User
Next, you can set-up your users in OST Platform. User objects in OST Platform do not have any personal information about your application users. OST Platform deploys smart contracts for every user and the user object holds the addresses of smart contracts and can be identified by a unique identifier (uuid v4).

:::note
Create users from your servers. You will be responsible for maintaining the mapping between your application users and OST Platform users.
:::

### Create User
To create the user object you will use the user service. No input parameters are needed to create user.

```java

com.ost.services.Users usersService = services.users;

HashMap <String,Object> params = new HashMap<String,Object>();
JsonObject response = usersService.create( params );
System.out.println("response: " + response.toString() );

```

### Response (User Object)
```json
{
    "success": true,
    "data": {
        "result_type": "user",
        "user": {
            "id": "7303bd10-5114-423e-9206-04cafafb1708",
            "token_id": 1085,
            "token_holder_address": null,
            "device_manager_address": null,
            "recovery_address": null,
            "recovery_owner_address": null,
            "type": "user",
            "status": "CREATED",
            "updated_timestamp": 1552365651
        }
    }
}
```

Ideally after user creation you should map the user's id with unique identifier of your application user. E.g.: `jack.ryan@example.com` can be a unique identifier of your application user, this email can be mapped with newly created user's `id`.

A detailed explanation about each attribute of user is available on user object section in [API References](/platform/docs/api/#user-object).


## Next Steps
1. [Android Wallet SDK Setup](/platform/docs/sdk/mobile-wallet-sdks/android/)
2. [iOS Wallet SDK Setup](/platform/docs/sdk/mobile-wallet-sdks/iOS)
3. [API Reference](/platform/docs/api/)
