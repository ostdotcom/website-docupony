---
id: api_transaction-types_status
title: OST KIT API Transaction-Types Status 
sidebar_label: Transaction-types status
---

To get the status of the on-going transcation between one end-user to another end-user.

#### API Endpoint - GET
```url
{{saas_api_url}}/transaction-types/status?transaction_uuids[]=5f79063f-e22a-4d28-99d7-dd095f02c72e
```

#### Parameters 
| Parameter           | Type   | Value                                               |
|---------------------|--------|-----------------------------------------------------|
| _transaction_uuid_ | String | The unique identifier for the transaction type that has to be looked up. This is generated when a transcation is executed between two branded token holders. Example:5f79063f-e22a-4d28-99d7-dd095f02c72e                          |

#### Sample Code | Curl 
```bash
curl --request GET \
  --url 'http://{{saas_api_url}}/transaction/status?transaction_uuid=5f79063f-e22a-4d28-99d7-dd095f02c72e&transaction_hash=0xdd87f64cf98e1bce666509995284019ac23ad76bf7498c6fe804fa0fedb9948c'-4a14-a176-29bc4d117867 \
  --form transaction_kind=Upvote
```


#### Success Response
```
{"success":true,"data":{"client_tokens":{"30117":{"id":"30117","client_id":1124,"name":"hkedgrd 3","symbol":"ghpi","symbol_icon":"token_icon_4","conversion_factor":"0.03085","airdrop_contract_addr":"0x3afd9f2273af535c513c2a35f56aF1Fe65E1dBaA","uts":1520182157543}},"transaction_types":{"20334":{"id":"20334","name":"Reward","kind":"company_to_user","currency_type":"BT","currency_value":"5","commission_percent":"0.00","status":"active","uts":1520182157546}},"economy_users":{"ae5b9aa6-a45d-439a-bb22-027df78727a1":{"id":"ae5b9aa6-a45d-439a-bb22-027df78727a1","uuid":"ae5b9aa6-a45d-439a-bb22-027df78727a1","name":"","kind":"reserve","uts":1520182157551},"91af390d-843d-44eb-b554-5ad01f874eba":{"id":"91af390d-843d-44eb-b554-5ad01f874eba","uuid":"91af390d-843d-44eb-b554-5ad01f874eba","name":"User 4","kind":"user","uts":1520182157551}},"result_type":"transactions","transactions":[{"id":"5e292934-67e5-49c4-adf2-886adedb7103","transaction_uuid":"5e292934-67e5-49c4-adf2-886adedb7103","from_user_id":"ae5b9aa6-a45d-439a-bb22-027df78727a1","to_user_id":"91af390d-843d-44eb-b554-5ad01f874eba","transaction_type_id":"20334","client_token_id":30117,"transaction_hash":null,"status":"processing","gas_price":"50000000000","transaction_timestamp":1520165780,"uts":1520182157540}]}}
```

#### Failure Response
```
TBD
```

#### Returns
Returns a transaction object with information on various parameters such as the value of the transaction, the commission to you, conversion rates, token address, uuids, last updated information and the branded token currency type.