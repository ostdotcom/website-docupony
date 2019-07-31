---
id: apis-in-sdks
title: OST Platform APIs - Endpoint Actions Available in SDKs
sidebar_label: API Endpoint Actions in SDKs
---

OST Platform provides a full suite of robust RESTful APIs to integrate your Brand Token into your applications with ease. The APIs are packaged into Server Side SDKs and Mobile Wallet SDKs to enable a fast and smooth development experience.

This page provides an overview of where each of the API endpoint actions are available -- in either the Server Side or Mobile Wallet SDKs or both. 

## API Endpoints

### Users
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Users | Create User | <span style="color:green"> Available </span> | <span style="color:#eb4d4a">NA</span> |
| | Get User | <span style="color:green"> Available </span> | <span style="color:green"> Available* </span> |
| | List Users | <span style="color:green"> Available </span> | <span style="color:#eb4d4a">NA</span> |
| | Activate User | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |
| | Get User's Token Holder | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |
| | Get User's Salt | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |

*Set-up Device must have been completed before this API call can be made, otherwise it will return `null`.

### Devices
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Devices | Register Device | <span style="color:green"> Available </span> | <span style="color:#eb4d4a">NA</span> |
| | Get Device | <span style="color:green"> Available </span> | <span style="color:green"> Available </span> |
| | List Device | <span style="color:green"> Available </span> | <span style="color:#eb4d4a">NA</span> |
| | Authorize Device | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |
| | Revoke Device | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |
| | Initiate Device Recovery | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |
| | Abort Device Recovery | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |
| | Get Pending Recovery | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |

### Sessions
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Sessions | Authorize Session | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |
| | Get Session | <span style="color:green"> Available </span> | <span style="color:green"> Available </span> |
| | List Session | <span style="color:green"> Available </span> | <span style="color:#eb4d4a">NA</span> |
| | Logout All Sessions | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |

### Rules
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Rules | List All Rules | <span style="color:green"> Available </span> | <span style="color:green"> Available </span> |

### Price Point
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Price Point | Get Price Point | <span style="color:green"> Available </span> | <span style="color:green"> Available </span> |

### Transactions
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Transactions | Execute Company to User Transaction | <span style="color:green"> Available </span> | <span style="color:#eb4d4a">NA</span> |
| | Execute User to Company Transaction | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |
| | Execute User to User Transaction | <span style="color:#eb4d4a">NA</span> | <span style="color:green"> Available </span> |
| | Get Transaction | <span style="color:green"> Available </span> | <span style="color:green"> Available </span> |
| | List Transactions | <span style="color:green"> Available </span> | <span style="color:green"> Available </span> |

### Balance
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Balance | Get Balance | <span style="color:green"> Available </span> | <span style="color:green"> Available </span> |

### Token
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Token | Get Token | <span style="color:green"> Available </span> | <span style="color:green"> Available* </span> |

*Set-up Device must have been completed before this API call can be made, otherwise it will return `null`.

### Recovery Owner
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Recovery Owner | Get Recovery Owner | <span style="color:green"> Available </span> | <span style="color:green"> Available </span> |

### Chains
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Chains | Get Chain Information | <span style="color:green"> Available </span> | <span style="color:green"> Available </span> |

### Device Manager
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Device Manager | Get Device Manager | <span style="color:green"> Available </span> | <span style="color:green"> Available </span> |

### Base Token
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| Base Token | Get Available Base Token | <span style="color:green"> Available </span> | <span style="color:green"> Available </span> |

### WebHooks
| API Endpoint <span style="color:white">~~~~~</span> | Actions <span style="color:white">~~~~~~~~~~~~~~~~~~~~~~</span> | Server SDK | Wallet SDK |
|---|---|---|---|
| WebHooks | Create WebHook | <span style="color:green"> Available </span> | <span style="color:#eb4d4a">NA</span> |
| | Get WebHook | <span style="color:green"> Available </span> | <span style="color:#eb4d4a">NA</span> |
| | List WebHooks | <span style="color:green"> Available </span> | <span style="color:#eb4d4a">NA</span> |
| | Update WebHook | <span style="color:green"> Available </span> | <span style="color:#eb4d4a">NA</span> |
| | Delete WebHook | <span style="color:green"> Available </span> | <span style="color:#eb4d4a">NA</span> |