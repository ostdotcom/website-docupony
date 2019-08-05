---
id: webhooks
title: Introduction to OST Platform WebHooks
sidebar_label: WebHooks
---

Our WebHooks allow you to subscribe to specific events or topics that occur in OST Platform. Whenever a trigger event occurs the WebHook sees the event, collects the data, and sends it to a URL specified by you in the form of an HTTP request. Once you recieve the data, you can then execute any code on your server app.

**Example:** 
1. If you subscribe to `users/activation_success` topic then once a user is activated in OST Platform, you will recieve a notification following which you can execute any logic, for example: you can update the user with updated user entity in your database.
2. If you subscribe to `transactions/initiate`, you can show receivers of a transaction the transaction details as soon as it is initiated. Without subscribing to this webhook, receivers would only see these transactions - in their transactions ledger - once it reaches SUCCESS status, i.e. after it has been mined (6 blocks x 3 secs = 18 secs later).

## WebHook Object

| Attribute  | Description  |
|---|---|
| **id** <br> **String**, [**\<uuid v4\>**](/platform/docs/definitions/#uuid-v4) | Unique identifier for WebHook |
|  **url** <br> **String** | URL where you want to recieve event notifications  |
|  **format** <br> **String** | Response format of WebHook  |
|  **status** <br> **String** <br> **default is active** | Status of a WebHook. It can take one of the two values `active` and `inactive`. The default value is `active`.  |
|  **topics** <br> **Array ['string']** | Array of topics having one or more topics.  <br> Take a look at [list of available topics](/platform/docs/api/#WebHook-topics). |
| **updated_timestamp** <br> **EPOCH \<time in seconds\>**| Last updated timestamp  |

## WebHook Event Data Format

| Attribute  | Description  |
|---|---|
| **id** <br> **String**, [**\<uuid v4\>**](/platform/docs/definitions/#uuid-v4) | Unique identifier for this event. This `id` is different than `webhook_id` |
| **webhook_id** <br> **String**, [**\<uuid v4\>**](/platform/docs/definitions/#uuid-v4) | Unique identifier for webhook |
|  **topic** <br> **String** | The topic for which the event has occured. <br> Take a look at [list of available topics](/platform/docs/api/#webhook-topics). |
|  **version** <br> **String** | Verion string. Current value of version is v2 |
| **created_at** <br> **EPOCH \<time in seconds\>**| Event creation timestamp.  |
| **data** <br> **Hash**| Entity hash that has been changed in this event. Entity will represent its final state after |

:::note Sample code
Sample code is available in our API References documentation: [WebHook Event Data](https://dev.ost.com/platform/docs/api/#webhook-event-data)
:::

## Validating WebHook Event Data Using Signature
WebHook event data is validated by creating a digital signature of webhook event data. Each webhook event data request includes a `header` with name `ost-signature` which is generated using webhook secret. You can find your webhook secret in the OST Platform dashboard inside developers page.

**Steps to validate the WebHook Event Data**
1. Extract these 3 headers values from webhook event data request `ost-timestamp`, `ost-signature`, `ost-version`.
2. Pass these 3 values along with `webhook event data` and `webhook secret`. You can find your webhook secret in the OST Platform dashboard inside Developers page.

:::note Sample code
Sample code is available in our API References documentation: [Validating WebHook Event Data Using Signature](https://dev.ost.com/platform/docs/api/#validating-webhook-event-data-using-signature)
:::


## WebHook Topics

### Transactions
* transactions/initiate
* transactions/success
* transactions/failure

### Users

* users/activation_initiate
* users/activation_success
* users/activation_failure

### Devices

* devices/authorization_initiate
* devices/authorization_success
* devices/authorization_failure
* devices/revocation_initiate
* devices/revocation_success
* devices/revocation_failure
* devices/recovery_initiate
* devices/recovery_failure
* devices/recovery_abort_success
* devices/recovery_abort_failure
* devices/recovery_success

### Sessions

* sessions/authorization_initiate
* sessions/authorization_success
* sessions/authorization_failure
* sessions/revocation_initiate
* sessions/revocation_success
* sessions/revocation_failure
* sessions/logoutall_initiate
* sessions/logoutall_success
* sessions/logoutall_failure

### Price Points

* price_points/usd_update
* price_points/eur_update
* price_points/gbp_update

## Using WebHooks (Creat, Get, List, Update, Delete)
* [Create a WebHook](https://dev.ost.com/platform/docs/api/#create-a-webhook)
* [Get a WebHook](https://dev.ost.com/platform/docs/api/#get-a-webhook)
* [List all WebHooks](https://dev.ost.com/platform/docs/api/#list-all-webhooks)
* [Update a WebHook](https://dev.ost.com/platform/docs/api/#update-a-webhook)
* [Delete a WebHook](https://dev.ost.com/platform/docs/api/#delete-a-webhook)