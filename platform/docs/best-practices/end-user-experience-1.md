---
id: end-user-experience-1
title: User Interface/Experience Recommendations
sidebar_label: UI Recommendations
---

Many of the Wallet SDK workflows require contracs to be written or updated on-chain and/or for transactions to take place on-chain. On-chain here refers to the Ost side-chains which has a 3 sec block time. Note: Ost waits for 6 blocks to consider a transaction complete / confirmed. So a single transaction on-chain takes 6 x 3 secs = 18 secs.

In this article, we recommend various user interface tips and tricks to prevent holding-up the user experience whilst waiting for on-chain activies to complete.

## Workflow dependencies on Device Status
Before delving into recommendations for each workflow, please note the following dependencies on device status. Users should be prevented from taking certain actions depending on whether a device is in **REGISTERED**, **AUTHORIZED**, or **REVOKING** status. 

::: note Device Statuses
REGISTERED / AUTHORIZING / AUTHORIZED / REVOKING / REVOKED / RECOVERING / ABORTING
:::

| Allowable / Possible Workflows | Device Status | Notes |  
| --- | --- | --- | 
| Set-up Device <br> `setupDevice` | **N/A** | To be done on every app launch after app has determined the current user's ost-user-id |
| Activate User <br> `activateUser` | **N/A** | To be done when user's status is `Created` | 
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
| Execute Transaction <br> `executeTransaction`	| **AUTHORIZED**	| Use 'Get Active Sessions' to check for sessions [2] |

#### Notes
1. [Get Pending Recovery API](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/OstJsonApi.md#get-pending-recovery)
2. [Get Active Sessions](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/OstWalletSdkGetMethods.md#get-active-sessions)


## Recommendation For Each SDK Workflow

### Set-up Device
* **Approximate duration:** Max 5 secs
* **Number of transactions on side-chains:** 0
* **UI recommendations:** 
  * “Syncing…” must be completed before user can proceed to wallet or wallet settings
* **Description of what happens under the hood:** 
  * First-time: BIP-32 key is generated on device. Private key and 12 words (mnemonic phrase) are stored on device.
  * `Set-up Device` is performed every time a user launches the app or logs-in/signs-up. This ensures that the current device is registered before communicating with Ost Platform server.


### Activate User
* **Approximate duration:** ~50-60 secs
* **Number of transactions on side-chains:** 2 x 6 block confirmation
* **UI recommendations:** 
  * Show user that “Wallet is activating” 
  * Thereafter, no need to stall the UX. User can continue to explore other areas of the app.
  * Once the user is ACTIVATED, send push notification to inform user that wallet setup is complete. (This is optional. Note that this wasn't required in the Pepo app given the placement of the user's wallet balance and "Wallet is activating" message.)
* **Description of what happens under the hood:** 
  * PIN key is created on device - this takes about 15 secs and is an input to recovery module contract 
  * Session keys are created on device (can have multiple with same spend limit and duration) - this takes <1 sec 
  * Transaction #1: This deploys the token holder contract, multisig contract, and recovery module contract. These contract addresses are obtained in the events which are emitted in the transaction. _Ost waits for 6 blocks and then fetches the event details and saves the respective addresses._
  * Transaction #2: This marks the users token holder address as an internal address, i.e. whitelisting. This enables the token holder address to hold a token balance. _Ost waits for 6 blocks after this transaction. After this, the user is set to ACTIVATED status._


### Create Session
* **Approximate duration:** ~18 secs 
* **Number of transactions on side-chains:** 1 x 6 block confirmation 
* **UI recommendations:** 
  * On action press (i.e. initiate user transaction), check available sessions. If none available, the call create session workflow. _This assumes that the create session workflow is incorporated into user actions..._
  * Here, it is recommended to stall the UI until the session is created. E.g. "Creating new session..." with a loader. Then show success of failure message. 
  * Once the session is created, perform the transaction.
* **Description of what happens under the hood:** 
  * Session keys are generated on device
  * Multisig transaction: Session key public address is added to the users token holder contract


### Reset PIN
* **Approximate duration:** 50 secs
* **Number of transactions on side-chains:** 1 x 6 confirmation
* **UI recommendations:** 
  * Reset PIN takes a long time! Our recommendation here is to to block or disable wallet actions until the reset is complete (wait for flowcomplete callback from Ost). This could be achieved by showing a loader then success message
  * If 50 secs is too long to show a loader, then we recommend disabling wallet actions and sending the user an alert/notification once the reset is complete.
  * If you don’t block or disable, there is a risk the user will get confused and try to use new PIN before the transaction is completed. _Wait for flowcomplete callback from Ost to ensure transaction is complete before enabling user transactions._
* **Description of what happens under the hood:** 
  * Two PIN keys are created on device (old and new) - this takes about 30 secs, 15 secs for each PIN
  * Transaction to update PIN in recovery module
  * Once the above on-chain transaction is complete, Ost updates the recovery key address in the user object (i.e. flowcomplete). Once this is done, the user can use the new PIN.


### Recover Wallet via PIN
* **Approximate duration:** ~12 hours (delayed recovery module)
* **Number of transactions on side-chains:** 2 x 6 block confirmations
* **UI recommendations:** 
  * Inform the user, before and after the transaction is initiated, that the process will take approx 12 hrs to complete
  * Send a push notification to the user when complete
  * Disable or hide actions that depend on the device being AUTHORISED (see table above)
* **Description of what happens under the hood:** 
  * Transaction to initiate recovery
  * Ost Platform transaction to allow recovery to complete


### Authorise New Device
* **Approximate duration:** ~18 sec 
* **Number of transactions on side-chains:** 1 x 6 block confirmation
* **UI recommendations:** 
  * On the device being authorised, block the UI
* **Description of what happens under the hood:** 
  * Multisig transaction to add new device to users token holder contract


### Send Tokens
* **Approximate duration:** 0 sec from senders perspective (pessimistic debit), 18 secs from receivers perspective
* **Number of transactions on side-chains:** 1 x 6 block confirmation
* **UI recommendations:** 
  * From the receiver's perspective, use transaction webhooks to keep the user informed
    * transactions/initiate
    * transactions/success
    * transactions/failure
    * transactions/mine
* **Description of what happens under the hood:** 
  * Ost Platform updates senders balance and ledger as soon as it receives a transaction request. If transaction fails, actions are reversed.


### Revoke Device, Logout All Active Sessions (irrespective of device)
* **Approximate duration:** ~18 secs
* **Number of transactions on side-chains:** 1 x 6 block confirmation
* **UI recommendations:** 
  * Stall UI
* **Description of what happens under the hood:** 
  * Multisig transaction to remove all active sessions from users token holder contract