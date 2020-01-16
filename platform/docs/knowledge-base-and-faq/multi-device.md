---
id: multi-device
title: Multi-Device Access
sidebar_label: - Multi-Device Access
---

The OST Wallet SDK natively supports multi-device access. Thus a user can have independent private keys on different devices, all controlling the same TokenHolder contract. This allows for more modular management of keys and revocation of keys that may have been compromised. 

These features are used in the OST smart-contract based recovery wherein a user input (which is minimally a 6 digit PIN), an application or client input (which is minimally a 30 character string) and input from OST are combined in a cryptographically secure manner to prove the user's ownership of the Tokens and authorize a new device.

The user input -assumed to be a 6 digit PIN- is also used to guard access to sensitive operations such as authorizing devices, viewing the mnemonic phrase, etc.  

![ERDUserSetupDiagram](/platform/docs/assets/ERD_user_setup.jpg)