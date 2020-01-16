---
id: the-basics
title: High Level Understanding of OST Platform SDKs
sidebar_label: The Baiscs
---

To integrate with OST Platform you must integrate both our Server Side SDK (SS-SDK) and Mobile Wallet SDK (MW-SDK) into your application. This page describes, at a high-level, the actions that can be performed and how you would go about retrieving your token details, registering your users, and setting-up users with a wallet so that they can hold and interact with your tokens (sign, send, receieve).

## Actions Enabled Through SDKs

### Server Side SDK (SS-SDK)
1. Get token information (/token object)
    * Pass token id
2. Register user: OST Platform will respond with user entity
    * Pass token id and user id
3. When activate user is called (via MW-SDK), then register device if not already registered
    * Once called, your mobile app must send device details to your server
    * Your server then creates device on OST Platform for user
        * OST Platform returns device entity to your server
        * Your server returns device entity to your mobile app
        * Your mobile app calls deviceRegistered callback (with device entity)
        * Wallet SDK syncs user details with OST Platform
        * Wallet SDK calls flowComplete callback 

#### Device Statuses: REGISTERED / AUTHORIZING / AUTHORIZED / REVOKING / REVOKED / RECOVERING / ABORTING
| Status | Definition |
| --- | --- |
| REGISTERED | Status when client company registers device with OST |
| AUTHORIZING Status when device address is being authorized in user's **device manager Contract |
| AUTHORIZED | Status when the authorization is complete |
| REVOKING | Status when device is being revoked from user's **device manager Contract |
| REVOKED | Status when revocation of the device address is complete |
| RECOVERING | Status when device address is being revoked and a replacement address is being authorized in user's **device manager Contract (recovery) |
| ABORTING | Status when recovery is being aborted |

:::note As soon as user is registerd
1. Generate passphrasePrefix for the user. It will be used during the activateUser workflow (MW-SDK).
2. Send user entity to your mobile app
:::

#### Token Object

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

#### User

```
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

##### User Statuses: CREATED / ACTIVATING / ACTIVATED

| Status | Definition | 
| --- | --- |
| CREATED | This will be the default status when a user is created. At this stage there are no smart contracts deployed on blockchain. |
| ACTIVATING | This will be the user's status when smart contracts for the user are being deployed. |
| ACTIVATED | This will be the user's status when all the smart contracts for the user are deployed. User can now perform wallet actions. |

MW-SDK




### Mobile Wallet SDK (MW-SDK)
1. Call setupDevice workflow
    * Calls registerDevice (SS-SDK) if device key is not registerd with OST Platform, else flowComplete
        * Device Statuses: REGISTERED / AUTHORIZING / AUTHORIZED / REVOKING / REVOKED / RECOVERING / ABORTING
2. Call activateUser workflow
    * First, ask user to set wallet PIN and retrieve passphrasePrefix for user from your server
    * Wallet SDK creates session keys and recovery owner key
    * Your app calls activateUser with (PIN, passphrasePrefix, sessionKey details)
    * Wallet SDK sends device key, session key, recovery owner key to OST Platform
    * OST Platform deploys smart contracts for user: tokenHolder, deviceManager (multisig) and activates the user
        * User statuses: CREATED, ACTIVATING, ACTIVATED
3. Create sessionKeys
4. Create recoveryOwnerKey

:::note activateUser can be called on any action
A user only needs to be activated when they opt to participate with their token wallet
:::




