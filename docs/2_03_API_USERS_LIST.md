---
id: api_users_list
title: OST KIT API List Users
sidebar_label: Users - list
---

For viewing the list of end-users and all their parameters, as last updated. The users are returned sorted by creation time, with the most recent users appearing first.

#### API Endpoint - GET
```url
{{saas_api_url}}/users/list?page_no=1&filter=new&order_by=creation_time&order=ASC
```

#### Parameters 
| Parameter | Type    | Value                                    |
|-----------|---------|------------------------------------------|
| _page_no_   | Integer | The page number of which the data is to be fetched. Example: 1 |
| [_filter_](https://dev.stagingost.com/ostkit-restful-api/docs/user.html#filter-sub-attributes)   | String | The filter method to be used. Example: all.  |
| [_order_by_](https://dev.stagingost.com/ostkit-restful-api/docs/user.html#order-by-sub-attributes)  | String | The sorting method to be used. Example: creation_time.  |
| _order_   | String | The order in which the end-users should be listed. Example: ASC |

### User List Sub-Attributes

#### **_filter_** 
| Attribute | Type    | Description                                   |
|-----------|---------|------------------------------------------|
| _all_   | String | All the end-users that have been previously air-dropped tokens. |
| _never_airdropped_   | String | All the end-users that have **never** been previously any air-dropped tokens. |


#### **_order_by_** 
| Attribute | Type    | Description                                   |
|-----------|---------|------------------------------------------|
| _creation_time_   | String | The method to list end-users by the time of end-user creation. |
| _name_   | String | The method to list end-users by their end-user name. |

#### **_order_** 
| Attribute | Type    | Description                                   |
|-----------|---------|------------------------------------------|
| _ASC_  | String | The method to list selected attribute in ascending order. |
| _DESC_   | String | The method to list selected attribute in descending order. |


#### Sample Code | Curl 
```bash
curl --request GET \
  --url 'http://{{saas_api_url}}/users/
  list?page_no=1&filter=new&order_by=creation_time&order=ASC'
```

#### Success Response
```
{:success=>true, :data=>{"result_type"=>"economy_users", 
"economy_users"=>[{"name"=>"User 4", "uuid"=>"91af390d-843d-44eb-b554-5ad01f874eba", "total_airdropped_tokens"=>"1", "token_balance"=>"1"}, 
{"name"=>"User 0", "uuid"=>"08cd0e56-f3f4-4ab5-8cde-3f778d9c2326", 
"total_airdropped_tokens"=>"1", "token_balance"=>"1"}, 
.
.
.
.
{"name"=>"User 20", "uuid"=>"786b0175-d289-4408-844b-3ada570a7fb9", 
"total_airdropped_tokens"=>"1", "token_balance"=>"1"}, 
{"name"=>"User 21", "uuid"=>"a6201cc2-8c5b-466a-a367-6e7ae962ae83", 
"total_airdropped_tokens"=>"1", "token_balance"=>"1"}], 
"meta"=>{"next_page_payload"=>{"page_no"=>2}}}}
```

#### Failure Response

```
{:success=>false, :err=>{:code=>"companyRestFulApi(s_cu_eu_2:H1Hobct_f)", 
:msg=>"invalid params", :display_text=>"", :display_heading=>"", 
:error_data=>[{"order_by"=>"Unsupported value for order_by"}]}, :data=>{}}
```

#### Pagination
```
"meta"=>{"next_page_payload"=>{"page_no"=>2}}
```
Each entry in the array is a separate user object with its latest update. If there are subsequently more users the resulting response will come with the a meta parameter _next_page_payload_ as shown above. If no there are no more users available, the resulting response will have the meta parameter with an empty value of _next_page_payload_.

#### Returns
Returns a hash with a key _result-type_. The value of _result-type_ is in-turn a key. Example: _economy_users_ for the case above which points to end-users, that the request was made for. This is pointer to an array limited to 25 users and their parameters. For the sake of simplicity not all of the end-user entries are displayed here.


