---
id: go-live-checklist
title: Go-Live Checklist
sidebar_label: Go-Live Checklist
---

This is a requirements checklist for OST Platform clients to check the readiness of their application’s integration with OST Platform SDKs. You will need to confirm that you have followed and implemented these requirements before being permitted to move to Production (mainnet).

## Server Side Checklist
| Check | Item |
| --- | --- |
| | User credentials are secure (The sub-bullets below are exemplary and not exhaustive): <ul><li>User passwords are encrypted and stored securely (e.g. using Key Management Systems/Services such as [AWS KMS](https://aws.amazon.com/kms/), [Cloud KMS](https://cloud.google.com/kms/) to encrypt data, etc.)</li><li>There exists a password recovery process</li><li>Multi-factor authorization over password is a good practice</li></ul>
| | A unique secret is generated (recovery passphrase prefix) for each user:<ul><li>The secret is at least 30 characters long (e.g. [Bip-39](https://www.npmjs.com/package/bip39))</li><li>The secret is pseudorandom (e.g. NOT name + email)</li><li>Secrets are encrypted and stored securely</li><li>The secret is not shared anywhere or used for any other functionality/service (example: exception emails, logs, 3rd party services, etc.)</li><li>The random seed must be generated securely (e.g. [crypto.randomBytes](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) )</li></ul>
| | The application uses TLS for network communication to its backend |
| | Production backend servers, databases, and other resources have restricted access |

## SDK Implementation

| Check | Item |
| --- | --- |
| | The SDK is implemented in your application such that it never accesses the user’s keys directly. (Wallet SDK should always be used for all interactions with keys.) <ul><li>Private keys: Owner/**MultiSig** keys and Session Keys</li><li>API key</li><li>Mnemonic phrase</li></ul> |
| | User PIN and Mnemonic phraser are explicitly wiped from App memory (specifically needed for Android) after its purpose and never stored/saved on device or server or any other medium in any form e.g. clear text or encrypted. Check [here](https://github.com/OWASP/owasp-mstg/blob/master/Document/0x05d-Testing-Data-Storage.md#checking-memory-for-sensitive-data) for more information. |
| | Sensitive information such as the user's PIN, Mnemonic phrase, recovery passphrase prefix, private keys are not logged or sent to third-party applications in any form (e.g. text, image, screen-grab, crash-report, analytics, etc). |
| | Recovery flows are supported in the app <ul><li>The recovery UX indicates to the user that the recovery process will take ~12 hours</li><li>The recovery UX informs the user that their previously authorized device will be revoked</li><li>Recovery via PIN is implemented. Other methods of adding devices (i.e. Mnemonics, QR code) are optional</li><li>The Recovery PIN is not be saved/stored by the client</li></ul> |
| | The SDK is implemented without any modifications as described here: <ul><li>[Android Wallet SDK](/platform/docs/sdk/mobile-wallet-sdks/android/)</li><li>[iOS Wallet SDK](/platform/docs/sdk/mobile-wallet-sdks/iOS)</li><li>[React Native](/platform/docs/sdk/mobile-wallet-sdks/react-native/)</li></ul> |


## User Experience Checklist

| Check | Item |
| --- | --- |
| | Your application does not initiate a transaction signed by the user’s keys without explicit action from the user within the application. |
| | App analytics systems do not capture screenshots of screens with sensitive information such as Mnemonics. Generally, application tracking and analytics systems should be configured to avoid capturing sensitive user information. |

## Security Audit Recommendation
:::warning Security Audit
We strongly recommend that your application is reviewed by security assessors/auditors to evaluate the general security of the application and also an analysis of the security vulnerabilities caused by the usage of 3rd party libraries and other dependencies.
:::

:::note Contact us
Please write to us at support@ost.com if you face any issues fulfilling these requirements.
:::


