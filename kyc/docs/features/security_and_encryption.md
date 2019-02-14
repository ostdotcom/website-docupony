---
id: security_and_encryption
title: Security and Encryption
sidebar_label: Security & Encryption
---

In order to secure all the information available in OST KYC we are using several security and encryption measurements. 

## AWS Key Management Service (KMS)
For each admin and user, we use KMS to create a salt to encrypt their data before we save this in our database. 
AWS also encrypts the databases before storing it on the disks.

## Algorithms
We use two kinds of algorithms:

*  1-way encryption
*  2-way encryption

## Passwords
All passwords in the OST KYC are encrypted first with KMS salt, then we use a second layer of 1-way encryption algorithm to encrypt the passwords. That means there is no way for OST nor anyone else to decrypt this. Therefore, if a user/admin lose his password he must set a new one. 

## Image Files Security
All the images that are uploaded to OST KYC are saved to AWS S3 server and are encrypted by AWS. 

## Other Elements Encrypted in the System
* Users personal information - encrypted with second layer of 2-way encryption algorithm.
* MFA for admins' login.
* Webhooks keys
* Eth address (for Witelisting service).

## Additional Security Measures in the System
* Google Recaptcha on front end pages in order to prevent Spamming.
* Multi-Factor Authentication (MFA) for Admin login to the system.

## Security Audits
OST KYC has regular security audits by [cure53](https://cure53.de/).
