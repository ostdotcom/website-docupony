---
id: api_transaction-types_list
title: OST KIT API Transaction-Types List 
sidebar_label: Transaction-types list
---


Returns a list of all existing transactions created. The transactions are returned in creation order, with the transcations created first, appearing at the top. 

#### API Endpoing - GET 
```url
{{saas_api_url}}/transaction-types/get-all?page_no=1
```
  
#### Parameters 
| Parameter | Type | Value                                         |
|-----------|------|-----------------------------------------------|
| _page_no_   | Int  | 1 (page number for all the transaction types) |

#### Sample Code | Curl 
```bash
curl --request GET \
  --url 'http://{{saas_api_url}}/transaction/kind/get-all?page_no=1'
```

#### Success Response
```
{:success=>true, :data=>{"client_id"=>1124, "result_type"=>"transaction_types", "transaction_types"=>[{"id"=>"20332", "client_transaction_id"=>"20332", "name"=>"Download", "kind"=>"user_to_company", "currency_type"=>"BT", "currency_value"=>"0.1", "commission_percent"=>"64.95", "status"=>"active"}, {"id"=>"20333", "client_transaction_id"=>"20333", "name"=>"Purchase", "kind"=>"user_to_user", "currency_type"=>"USD", "currency_value"=>"1.00000", "commission_percent"=>"1.00", "status"=>"active"}, {"id"=>"20334", "client_transaction_id"=>"20334", "name"=>"Reward", "kind"=>"company_to_user", "currency_type"=>"BT", "currency_value"=>"5", "commission_percent"=>"0.00", "status"=>"active"}, {"id"=>"20373", "client_transaction_id"=>"20373", "name"=>"test", "kind"=>"user_to_user", "currency_type"=>"USD", "currency_value"=>"1.10000", "commission_percent"=>"1.10", "status"=>"active"}, {"id"=>"20335", "client_transaction_id"=>"20335", "name"=>"Upvote", "kind"=>"user_to_user", "currency_type"=>"USD", "currency_value"=>"0.05000", "commission_percent"=>"0.00", "status"=>"active"}], "meta"=>{"next_page_payload"=>{}}, "price_points"=>{"OST"=>{"USD"=>"0.310465"}}, "client_tokens"=>{"client_id"=>1124, "name"=>"hkedgrd 3", "symbol"=>"ghpi", "symbol_icon"=>"token_icon_4", "conversion_factor"=>"0.03085", "token_erc20_address"=>"0x482095c5C7c3C3F3dC7F365f81baB80Ff87aEf7d", "airdrop_contract_addr"=>"0x3afd9f2273af535c513c2a35f56aF1Fe65E1dBaA", "simple_stake_contract_addr"=>"0x89df946ce158E128e223428Cb4e50D4032Fcc91c"}}}
```

#### Failure Response
```
TBD
```

#### Returns
Returns a hash with a key _result-type_. The value of _result-type_ is in-turn a key _transaction_type_. This key _transaction_type_ is an array of upto 25 transactions. Each entry in the array is a separate transaction object. If there are subsequent transactions the resulting hash in the response will come with the a meta parameter _next_page_payload_ as shown below. 

#### Pagination
```
"meta"=>{"next_page_payload"=>{"page_no"=>2}}
```

Each entry in the array is a separate user object with its latest update. If there are subsequently more users the resulting response will come with the a meta parameter _next_page_payload_ as shown above. If no there are no more users available, the resulting response will have the meta parameter with an empty value of _next_page_payload_.

If no more transactions are available, the resulting hash will have the meta parameter with an empty value of next_page_payload.