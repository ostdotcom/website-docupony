---
id: apis-in-sdks
title: OST Platform APIs - Endpoint Actions Available in SDKs
sidebar_label: API Actions in SDKs
---

OST Platform provides a full suite of robust RESTful APIs to integrate your Token into your applications with ease. The APIs are packaged into Server Side SDKs and Mobile Wallet SDKs to enable a fast and smooth development experience.

This page provides an overview of where each of the API endpoint actions are available -- in either the Server Side or Mobile Wallet SDKs or both. 

## API Endpoints

:::note Internal Status
Internal implies it is used for Wallet SDK internal use and is not exposed to your app.
:::


<style> .container.mainContainer article a.available-link { color: green; text-decoration: underline;}</style>

### Users
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Users | Create User | <a class="available-link" target="_blank" href="/platform/docs/api/#create-user"> <span style="color:green"> Available </span> </a>| <span style="color:#eb4d4a">N/A</span> |
| | Get User | <a class="available-link" target="_blank" href="/platform/docs/api/#get-a-user"> <span style="color:green"> Available </span> </a>| <span style="color:green"> Available* </span> |
| | List Users |<a class="available-link" target="_blank" href="/platform/docs/api/#list-all-users">  <span style="color:green"> Available </span> </a>| <span style="color:#eb4d4a">N/A</span> |
| | Activate User | <span style="color:#eb4d4a">N/A</span> | <span style="color:green"> Available </span> |
| | Get User's Token Holder | <span style="color:#eb4d4a">N/A</span> | Internal |
| | Get User's Salt | <span style="color:#eb4d4a">N/A</span> | Internal |


### Devices
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Devices | Register Device | <a class="available-link" target="_blank" href="/platform/docs/api/#register-devices"><span style="color:green"> Available </span> </a> | <span style="color:#eb4d4a">N/A</span> |
| | Get Device | <a class="available-link" target="_blank" href="/platform/docs/api/#get-a-device"><span style="color:green"> Available </span> </a> | <span style="color:green"> Available </span> |
| | List Devices in the Economy | <a class="available-link" target="_blank" href="/platform/docs/api/#list-all-devices"><span style="color:green"> Available </span> </a>|  <span style="color:#eb4d4a"> N/A </span> |
| | List Devices of a User | <a class="available-link" target="_blank" href="/platform/docs/api/#list-all-devices"><span style="color:green"> Available </span> </a>|  <span style="color:green"> Available </span>|
| | Authorize Device | <span style="color:#eb4d4a">N/A</span> | <span style="color:green"> Available </span> |
| | Revoke Device | <span style="color:#eb4d4a">N/A</span> | <span style="color:green"> Available </span> |
| | Initiate Device Recovery | <span style="color:#eb4d4a">N/A</span> | <span style="color:green"> Available </span> |
| | Abort Device Recovery | <span style="color:#eb4d4a">N/A</span> | <span style="color:green"> Available </span> |
| | Get Pending Recovery | <span style="color:#eb4d4a">N/A</span> | <span style="color:green"> Available </span> |

### Sessions
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Sessions | Authorize Session | <span style="color:#eb4d4a">N/A</span> | <span style="color:green"> Available </span> |
| | Get Session | <a class="available-link" target="_blank" href="/platform/docs/api/#get-a-user-39-s-session"><span style="color:green"> Available </span> </a>| Internal |
| | List Sessions in the Economy  | <a class="available-link" target="_blank" href="/platform/docs/api/#list-all-sessions"> <span style="color:green"> Available </span> </a> | <span style="color:#eb4d4a">N/A</span> |
| | List Sessions of a User| <a class="available-link" target="_blank" href="/platform/docs/api/#list-all-sessions"> <span style="color:green"> Available </span> </a> | <span style="color:green"> Available </span>|
| | Logout All Sessions | <span style="color:#eb4d4a">N/A</span> | <span style="color:green"> Available </span> |

### Rules
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Rules | List All Rules | <a class="available-link" target="_blank" href="/platform/docs/api/#list-all-rules"><span style="color:green"> Available </span></a> | <span style="color:#eb4d4a">N/A</span> |

### Price Point
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Price Point | Get Price Point | <a class="available-link" target="_blank" href="/platform/docs/api/#get-price-point-information"><span style="color:green"> Available </span></a> | <span style="color:green"> Available </span> |

### Transactions
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Transactions | Execute Company to User Transaction | <a class="available-link" target="_blank" href="/platform/docs/api/#execute-a-transaction"><span style="color:green"> Available </span></a> | <span style="color:#eb4d4a">N/A</span> |
| | Execute User to Company Transaction | <span style="color:#eb4d4a">N/A</span> | <span style="color:green"> Available </span> |
| | Execute User to User Transaction | <span style="color:#eb4d4a">N/A</span> | <span style="color:green"> Available </span> |
| | Get Transaction | <a class="available-link" target="_blank" href="/platform/docs/api/#get-a-transaction-details"><span style="color:green"> Available </span></a> | <span style="color:#eb4d4a">N/A</span> |
| | List Transactions in the economy | <a class="available-link" target="_blank" href="/platform/docs/api/#get-all-user-39-s-transactions"><span style="color:green"> Available </span> </a>| <span style="color:#eb4d4a"> N/A </span> |
| | List Transactions of a user | <a class="available-link" target="_blank" href="/platform/docs/api/#get-all-user-39-s-transactions"><span style="color:green"> Available </span> </a>| <span style="color:green"> Available </span> |

### Balance
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Balance | Get Balance | <a class="available-link" target="_blank" href="/platform/docs/api/#get-users-balance"><span style="color:green"> Available </span> </a>| <span style="color:green"> Available </span> |

### Token
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Token | Get Token | <a class="available-link" target="_blank" href="/platform/docs/api/#get-token"><span style="color:green"> Available </span> </a>| <span style="color:green"> Available* </span> |

### Recovery Owner
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Recovery Owner | Get Recovery Owner |<a class="available-link" target="_blank" href="/platform/docs/api/#get-recovery-owner"> <span style="color:green"> Available </span></a> | <span style="color:green"> Available </span> |

### Chains
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Chains | Get Chain Information | <a class="available-link" target="_blank" href="/platform/docs/api/#get-chain-information"><span style="color:green"> Available </span> </a>| <span style="color:green"> Available </span> |

### Device Manager
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Device Manager | Get Device Manager | <a class="available-link" target="_blank" href="/platform/docs/api/#get-device-manager"><span style="color:green"> Available </span></a> | Internal |

### Base Token
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Base Token | Get Available Base Token |<a class="available-link" target="_blank" href="/platform/docs/api/#get-available-base-tokens"> <span style="color:green"> Available </span> </a>| <span style="color:green"> Available </span> |

### WebHooks
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| WebHooks | Create WebHook | <a class="available-link" target="_blank" href="/platform/docs/api/#create-a-webhook"><span style="color:green"> Available </span> </a>| <span style="color:#eb4d4a">N/A</span> |
| | Get WebHook | <a class="available-link" target="_blank" href="/platform/docs/api/#get-a-webhook"> <span style="color:green"> Available </span> </a>| <span style="color:#eb4d4a">N/A</span> |
| | List WebHooks | <a class="available-link" target="_blank" href="/platform/docs/api/#list-all-webhooks"><span style="color:green"> Available </span> </a>| <span style="color:#eb4d4a">N/A</span> |
| | Update WebHook | <a class="available-link" target="_blank" href="/platform/docs/api/#update-a-webhook"><span style="color:green"> Available </span></a> | <span style="color:#eb4d4a">N/A</span> |
| | Delete WebHook | <a class="available-link" target="_blank" href="/platform/docs/api/#delete-a-webhook"><span style="color:green"> Available </span> </a>| <span style="color:#eb4d4a">N/A</span> |

:::warning `setupDevice` workflow
*Without `setupDevice`, Wallet SDK cannot make API calls. If Get User and Get Token methods are called before `setupDevice` workflow is completed, the methods will return null. Hence, it is always important to perform `setupDevice` workflow before using other methods of SDK (with the exception of `initialize`).
:::