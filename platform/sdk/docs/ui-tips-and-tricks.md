---
id: ux-recommendations
title: User Interface/Experience Recommendations
sidebar_label: UX Recommendations
---

Many of the Wallet SDK workflows require contracs to be written or updated on-chain and/or for transactions to take place on-chain. On-chain here refers to the Ost side-chains which have a 3 sec block time. Ost waits for 6 blocks before considering a transaction complete / confirmed. 

In this article, we highlight recommended tips and tricks to avail of to prevent holding-up the user experience whilst waiting for on-chain activies to complete.

## Workflow dependencies on Device Status
Before delving into recommendations for each workflow, please note the following dependencies on device status. Users should be prevented from taking certain actions depending on whether a device is in **REGISTERED**, **AUTHORIZED**, or **REVOKING** status. 

::: note Device Statuses
REGISTERED / AUTHORIZING / AUTHORIZED / REVOKING / REVOKED / RECOVERING / ABORTING
:::

| Workflow | Device Status | Notes |  
| --- | --- | --- | 
| Set-up Device <br> `setupDevice` | **<blank>** | To be done on every app launch after app has determined the current user's ost-user-id |
| Activate User <br> `activateUser` | **<blank>** | To be done when user's status is `Created` | 
| Authorize Current Device with Mnemonics <br> `authorizeCurrentDeviceWithMnemonics`	| **REGISTERED** | | 
| Initiate Recovery <br> `initiateDeviceRecovery` | 	**REGISTERED** | Only if NO pending recovery exists. Use Get Pending Recovery API [1] | 
| Abort Device Recovery <br> `abortDeviceRecovery`	| At least **REGISTERED**; could also be **AUTHORIZED** or **REVOKING** | Only if at-least 1 pending recovery exists. Use Get Pending Recovery API [1] | 
| Add or Create Session <br> `addSession`	| **AUTHORIZED**	| |
| Update Biometric Preference <br> `updateBiometricPreference`	| **AUTHORIZED**	| |
| Revoke Device <br> `revokeDevice`	| **AUTHORIZED** | | 
| Perform QR Action <br> `performQRAction`	| **AUTHORIZED**	| | 
| Get Device Mnemonics <br> `getDeviceMnemonics`	| **AUTHORIZED**	| | 
| Reset PIN <br> `resetPin`	| **AUTHORIZED**	| |
| Logout All Session <br> `logoutAllSessions`	| **AUTHORIZED** | |
| Execute Transaction <br> `executeTransaction`	| **AUTHORIZED**	| Use 'Get Active Sessions' to check for sessions [2] | |

### References 

1. [Get Pending Recovery API](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/OstJsonApi.md#get-pending-recovery)
2. [Get Active Sessions](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/OstWalletSdkGetMethods.md#get-active-sessions)


## Recommendation For Each SDK Workflow

### Setup Device
* **Approximate duration:** Max 5 secs
* **Number of transactions on side-chains:** 0
* **UI recommendations:** 
  * “Syncing…” must be completed before user can proceed to wallet or wallet settings
* **Description of what happens under the hood:** 
  * BIP-32 key is generated on device 
  * Private key and 12 words (mnemonic phrase) are stored on device
  * `Set-up Device` is performed every time a user launches the app or logs-in/signs-up. This ensures that the current device is registered before communicating with OST Platform server.


### Activate User
* **Approximate duration:** ~50-60 secs
* **Number of transactions on side-chains:** 0
* **UI recommendations:** 
  * Show user that “Wallet is activating” 
  * No need to stall the UX
  * Send notification to user when set-up is complete (user = ACTIVATED) (optional, not required in Pepo given placement of wallet on homescreen).
* **Description of what happens under the hood:** 
  * PIN key is created, takes about 15 secs and is an input to recovery module contract 
  * Session keys are created (can have multiple with same spend limit and duration), takes <1 sec 
  * Transaction to add user in user wallet factory. This deploys the token holder contract, multisig contract, and recovery module contract. 
  * These contract addresses are obtained in the events which are emitted in the transaction. _Ost waits for 6 blocks and then fetch the event details and save the respective addresses in dynamo db._ 
  * Transaction to mark the token holder address as an internal address, i.e. whitelisting. This enables the token holder address to hold a token balance. _Ost waits for 6 blocks after this transaction. After this we activate the user in database by changing its status._


### Create Session
* **Approximate duration:** 18 secs 
* **Number of transactions on side-chains:** 1 x 6 block confirmation 
* **UI recommendations:** 
  * On transaction click, check available sessions. If none available, call create session workflow 
  * No need to include add / create session as a user action 
  * Need to stall the UI until session is created
  * App recommendations, on initiate transaction: 
    * First check if session key exists
    * If none available, create (need to stall the UI)
    * Once created, then perform transaction
* **Description of what happens under the hood:** 
  * Single transaction, session keys generated on device
  * Multisig transaction: add session key public address to token holder


### Reset PIN
* **Approximate duration:** 50 secs
* **Number of transactions on side-chains:** 1 x 6 confirmation
* **UI recommendations:** 
  * Block user flow and notify user when PIN is reset
  * If you don’t block, there is a risk the user will get confused and try to use new PIN before it’s created
  * Wait for flowcomplete callback from Ost to ensure transaction is complete before enabling user transactions
* **Description of what happens under the hood:** 
  * Two PIN keys created on device (old, new) (takes 15 secs each) 
  * One transaction to update PIN in recovery module
  * Once transaction is completed, Ost platform updates recovery key address in local db in user object.


### Recover Wallet via PIN
* **Approximate duration:** ~12 hours (delayed recovery module)
* **Number of transactions on side-chains:** 2 x 6 block confirmations
* **UI recommendations:** 
  * Allow user to Abort. Don’t show actions that depend on device being AUTHORISED.
* **Description of what happens under the hood:** 
  * Initiate recovery transaction


### Authorise New Device
* **Approximate duration:** ~18 sec 
* **Number of transactions on side-chains:** 1 x 6 block confirmation
* **UI recommendations:** 
  * On device being authorised, block UI
* **Description of what happens under the hood:** 
  * One multisig trxn 


### Send Tokens
* **Approximate duration:** 0 sec from senders perspective (via pessimistic debit), 18 secs from receives perspective
* **Number of transactions on side-chains:** 1 x 6 block confirmation
* **UI recommendations:** 
  * From the receiver's perspective, use transaction webhooks
* **Description of what happens under the hood:** 
  * Platform updates senders balance and ledger as soon as it receives transaction request
  * If transaction fails, actions are reversed


### Revoke Device, Logout All Active Sessions (irrespective of device)
* **Approximate duration:** ±18 secs
* **Number of transactions on side-chains:** 1 x 6 block confirmation
* **UI recommendations:** 
  * Stall UI
* **Description of what happens under the hood:** 
  * One multisig transaction