---
id: security_and_ux_requirements
title: Security and UX Requirements
sidebar_label: Security and UX Requirements
---

This is a security and UX implementation requirements checklist for OST Platform’s clients to confirm the readiness of their application’s integration with our sdk. 

Once you are ready to move to production, you will need to confirm that you have followed and implemented these requirements in your application.

Please write to us at support@ost.com if you face any issues in fulfilling these requirements.


## Application's Server Side Checklist
* User credentials are secure
(The sub-bullets below are exemplary and not exhaustive):
    
    * User passwords are encrypted and stored securely (eg. using Key Management Systems/Services such as [AWS KMS](https://aws.amazon.com/kms/), [Cloud KMS](https://cloud.google.com/kms/) to encrypt data, etc.)
    
    * There exists a password recovery process.
    
    * Multi-factor authorization over password is a good practice.

* A unique secret is generated (recovery passphrase prefix) for each user
    
    * The secret is at least 30 characters long. (e.g. [Bip-39](https://www.npmjs.com/package/bip39))
    
    * The secret is pseudorandom (e.g NOT name + email)
    
    * Secrets are encrypted and stored securely. Which key management system is used? (example of different Key Management Systems/Services to encrypt data: [AWS KMS](https://aws.amazon.com/kms/), [Cloud KMS](https://cloud.google.com/kms/), etc.)
    
    * The secret is not shared anywhere or used for any other functionality/service (example: exception emails, logs, 3rd party services, etc.)
    
    * The random seed must be generated securely (E.g. [crypto.randomBytes](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) )

* The application uses TLS for network communication to its backend.

* Production backend servers, databases, and other resources have restricted access.

## SDK Implementation

* The SDK is implemented in your application such that it never accesses the user’s keys directly. (Wallet SDK should always be used for all interactions with keys) 

    * Private keys: Owner/Multisig keys and Session Keys 

    * API key

    *  Mnemonic phrase 

* User PIN is explicitly wiped from App memory ( specifically needed for Android) and never stored/saved on device or server or any other medium in any form e.g. clear text or encrypted. Check [here](https://github.com/OWASP/owasp-mstg/blob/master/Document/0x05d-Testing-Data-Storage.md#checking-memory-for-sensitive-data) for more information. 

* TThe mnemonic phrase is explicitly wiped from app memory (specifically needed for Android) after its purpose is over (e.g. device authorization or display mnemonics to the user) and never stored/saved on device or server or any other medium in any-form e.g. plain or encrypted. Check [here](https://github.com/OWASP/owasp-mstg/blob/master/Document/0x05d-Testing-Data-Storage.md#checking-memory-for-sensitive-data) for more information. 

* Sensitive information such as the user's PIN, mnemonic phrase, recovery passphrase prefix, private keys are not logged or sent to third-party applications in any form (e.g. text, image, screen-grab, crash-report, analytics, etc).

* Recovery flows are supported in the app 

    * The recovery UX indicates to the user that the recovery process will take ~12 hours

    * The recovery UX informs the user that their previously authorized device will be revoked 

    * Recovery via PIN is implemented. Other methods of adding devices (i.e mnemonics, QR code) are optional

    * The Recovery PIN is not be saved/stored by the client

* The SDK is implemented without any modifications as described here:
    * [Android Wallet SDK](https://dev.stagingost.com/platform/sdkwallet_sdk_setup/android/)
    * [iOS Wallet SDK](https://dev.stagingost.com/platform/sdkwallet_sdk_setup/iOS/)



## User Experience Checklist

* Your application does not initiate a transaction signed by the user’s keys without explicit action from the user within the application.

* App analytics systems do not capture screenshots of screens with sensitive information such as mnemonics. Generally, application tracking and analytics systems should be configured to avoid capturing sensitive user information.


## Security Audit Recommendation

We strongly recommend that the application is reviewed by security assessors/auditors to evaluate the general security of the application and also an analysis of the security vulnerabilities caused by the usage of 3rd party libraries and other dependencies
