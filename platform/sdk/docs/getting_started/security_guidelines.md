---
id: security_guidelines
title: Security Guidelines
sidebar_label: Security Guidelines
---


## Server Side SDK

1. The App must securely create and store user passphrase prefix. The user passphrase prefix must not be deleted until the user is active.

2. Minimum length of `passPhrasePrefix` should be 30.

3. The user passphrase must never be kept in ‘unencrypted’ form. The server must use encryption services such as [AWS KMS](https://aws.amazon.com/kms/) or [Goolge KMS](https://cloud.google.com/kms/).
4. Please use special care while generating passphrasePrefix. It should not be deterministic (w.r.t. user information or time). We recommend using BIP-39 libraries.

## Android Wallet SDK
1. App should use [ZXing](https://github.com/zxing/zxing) for scanning QR code, version 1.9.8 is included with the Android wallet SDK.
<br> [Sample Implementation](https://github.com/dm77/barcodescanner)

2. **Managing Passphrase Prefix**:

    * The App must get user passphrase prefix from their servers <u>**only when needed**</u>.
    * The App should not cache or store the user passphrase prefix on the device. 

3. **Managing User Pin**:

    * The App must never store/cache user pin in any form (not even in encrypted form).


## iOS Wallet SDK

1. Applications should enable general data protection on the app's provisioning profile, and then setting the `Sharing and Permissions to Complete Protection`, which will enable app-wide file system protection.