---
id: version-1.0.0-uc_contract_deploy
title: UC Contract Deployment Guide
sidebar_label: UC Contract Deployment Guide
original_id: uc_contract_deploy
---

# Deploying smart contracts on the utility blockchain

## Goal of this document

To help anyone get started with writing a smart contract and deploying them to the openSTUtility chain, to be able to interact with them

## Turorial

1. make sure you have brew for mac, if not use:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
2. if you already have brew, update it, install go-ethereum (geth), the solidity compiler (solc), git and wget

```bash
brew update
brew upgrade
brew tap ethereum/ethereum
brew install solidity
brew linkapps solidity
brew install git
brew install wget
```
3. go ahead and make a new dir to store all the code you will be using, and let's start with cloning Ben's [gist](https://gist.github.com/benjaminbollen/6e0eb979c911bf465896d49cf08e86da) to sync with the UC

```bash
mkdir uc_smart_contract
cd uc_smart_contract
git clone https://gist.github.com/6e0eb979c911bf465896d49cf08e86da.git 
```
4. cd into the `6e0eb979c911bf465896d49cf08e86da` directory and take a look at the files here:

```bash
cd 6e0eb979c911bf465896d49cf08e86da
ls -l
```

5. `setup_utility_chain_1409` is the bash script we are going to run in the current console to sync with the uc, but first we must edit the rights on this file to be able to excute it:

```bash
chmod 755 setup_utility_chain_1409

```
here `chmod 755` is equal to `chmod u=rwx,go=rx` which means that the user can read, write and execute

6. execute the bash script and allow your node to sync

```bash
./setup_utility_chain_1409
```
press enter to accept all the params, look further into the code to see what it [means](https://gist.github.com/benjaminbollen/6e0eb979c911bf465896d49cf08e86da)

7. copy the `ipc` path displayed as the geth node sync starts up with the UC, this is the (local) path to geth node we will later need to deploy our contract to. learn more about [ipc](https://en.wikipedia.org/wiki/Inter-process_communication)

```
INFO [05-28|19:20:07] Maximum peer count                       ETH=25 LES=0 total=25
INFO [05-28|19:20:07] Allocated cache and file handles         database=/Users/noslav/uc_node_1409/geth/chaindata cache=16 handles=16
INFO [05-28|19:20:08] Persisted trie from memory database      nodes=1 size=204.00B time=3.397µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [05-28|19:20:08] Successfully wrote genesis state         database=chaindata                                 hash=56b364…cffdd0
INFO [05-28|19:20:08] Allocated cache and file handles         database=/Users/noslav/uc_node_1409/geth/lightchaindata cache=16 handles=16
INFO [05-28|19:20:08] Persisted trie from memory database      nodes=1 size=204.00B time=4.137µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [05-28|19:20:08] Successfully wrote genesis state         database=lightchaindata                                 hash=56b364…cffdd0
INFO [05-28|19:20:08] Maximum peer count                       ETH=25 LES=0 total=25
INFO [05-28|19:20:08] Starting peer-to-peer node               instance=Geth/v1.8.2-stable/darwin-amd64/go1.10
INFO [05-28|19:20:08] Allocated cache and file handles         database=/Users/noslav/uc_node_1409/geth/chaindata cache=768 handles=1024
INFO [05-28|19:20:08] Initialised chain configuration          config="{ChainID: 1409 Homestead: 1 DAO: <nil> DAOSupport: false EIP150: 2 EIP155: 3 EIP158: 3 Byzantium: 4 Constantinople: <nil> Engine: clique}"
INFO [05-28|19:20:08] Initialising Ethereum protocol           versions="[63 62]" network=1409
INFO [05-28|19:20:08] Loaded most recent local header          number=173105 hash=5ab820…fa0ed5 td=346002
INFO [05-28|19:20:08] Loaded most recent local full block      number=0      hash=56b364…cffdd0 td=1
INFO [05-28|19:20:08] Loaded most recent local fast block      number=138286 hash=9c6c4e…d3f9a6 td=276364
INFO [05-28|19:20:08] Upgrading chain index                    type=bloombits percentage=42
INFO [05-28|19:20:08] Loaded local transaction journal         transactions=0 dropped=0
INFO [05-28|19:20:08] Regenerated local transaction journal    transactions=0 accounts=0
INFO [05-28|19:20:08] Starting P2P networking
INFO [05-28|19:20:10] UDP listener up                          self=enode://12c784bd9fc1a53b2fea73452de3c163ad83617a7b906f6bdc3fadee3a6a70ef16be1346ebc7356906fb3977157abb1f4c7c1d36e6b7f2cec96f56cbf3603b49@[::]:30303
INFO [05-28|19:20:10] RLPx listener up                         self=enode://12c784bd9fc1a53b2fea73452de3c163ad83617a7b906f6bdc3fadee3a6a70ef16be1346ebc7356906fb3977157abb1f4c7c1d36e6b7f2cec96f56cbf3603b49@[::]:30303
-><copy this line> INFO [05-28|19:20:10] IPC endpoint opened                      url=/Users/noslav/uc_node_1409/geth.ipc
INFO [05-28|19:20:10] HTTP endpoint opened                     url=http://127.0.0.1:8545               cors= vhosts=localhost
INFO [05-28|19:20:10] WebSocket endpoint opened                url=ws://127.0.0.1:8546
```

7. now open up a new console, lets start writing our contracts, create an empty file called Storage.sol, and open it up

```bash
touch Storage.sol
nano Storage.sol
```
8. copy and paste the following code into your console 

```solidity
pragma solidity ^0.4.10;
contract Storage {
  uint256 storedData;
  function set(uint256 data) {
    storedData = data;
  }
  function get() constant returns (uint256) {
    return storedData;
  }
}
```
save it using `ctrl+0` -> `return` -> `ctrl+x` 

the contracts name is `storage`, it has two functions `set`, sets the data you wanna store in the contract, `get`, gets the saved data you have already stored, since every call in etheruem is a transaction we will perform those to save and get the data.

9. to compile this contract this contract we will put it in a json format and assign a JavaScript variable and save it to this directoru, then we send it to an output file.

```bash
echo "var storageOutput=`solc --optimize --combined-json abi,bin,interface Storage.sol`" > storage.js

cat storage.js

ls -l 
```
10. open up a new console (yes, a third one) and connect to geth using the `ipc` path we saved before:

```bash
geth attach /Users/noslav/uc_node_1409/geth.ipc //the path will be different in your case 
```

11. first things first, create a new account from which we will deploy our contract and also be able call functions on our deployed, enter an easy password so we can use it frequently (& fast), to know about the list of available commands see [this](https://ethereum.stackexchange.com/questions/28703/full-list-of-geth-terminal-commands)

```bash
> personal.newAccount()
Passphrase:
Repeat passphrase:
```

12. this account created is your coinbase (base account), check using the following:
```bash
eth.coinbase
```
copy the account address displayed here

13. now we need some funds (ost alpha prime) or `gas` to deploy our contract with geth, for which you should use the new [transfers api](https://dev.ost.com/docs/api_transfers_create.html):
make sure to transfer (using the [ost-sdk-ruby](https://github.com/OpenSTFoundation/ost-sdk-ruby/) or [ost-sdk-js](https://github.com/OpenSTFoundation/ost-sdk-js) ) to the address you have copied above:

```javascript
const transferService = ostObj.services.transfers;
transferService.execute({to_address:'0xd2b789293674faEE51bEb2d0338d15401dEbfdE3', amount:1000000000000000000}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); }); //here the address will be the above address you copied, the amount can stay the same [taken from dev.ost.com documentation]

```

alternatively 

send the address to pranay@ost.com with sub "need ost alpha prime" and this will fund you account, wait for a confirmation from pranay@ost.com


14. check if you have the funds in your account, in the last console you were using (with geth attached to the uc)

```bash
> eth.getBalance(eth.coinbase)
```

if you have the balance you requested this should show up `1000000000000000000`

15. if this shows up the funds you requested for proceed with loading the script into geth, check for the key-pair values with `storageOutput`, this would display the `abi` - application binary interface and `bin` - binary file which you will need in the coming steps

```bash
> loadScript('storage.js')
> storageOutput
```

16. get the contract's `abi` from storageOutput and store it into a variable (var) called `storageContractAbi`

```bash
> var storageContractAbi = storageOutput.contracts['Storage.sol:Storage'].abi
```

17. store the contract's `abi` into a variable called `storageContract` by passing it as an argument to the `eth.contract` function

```bash
> var storageContract = eth.contract(JSON.parse(storageContractAbi))
```

18. store the contract's `bin` into a variable called `storageBinCode` and concatenate it with the hexadecimal prefix `0x`

```bash
> var storageBinCode = "0x" + storageOutput.contracts['Storage.sol:Storage'].bin
```

19. check out the contents of the variable by calling the stored variables:

```bash
> storageContractAbi
> storageBinCode
```
20. unlock your account to start the deployment process and give in the passphare (simple and easy to remember) you used to create the account

```bash
> personal.unlockAccount(eth.accounts[0])
```

anytime in the following steps if you get a `Error: authentication needed: password or unlock`
use this command to unlock your account

21. store the deployable transaction object into a variable called `deployTransactionObject` using the `storageBinCode`

```bash
> var deployTransactionObject = { from: eth.accounts[0], data: storageBinCode, gas: 1000000 };
```


22. store the storage contract instance in a variable called `storageInstance` by using the deployable transaction object, 

```bash 
> var storageInstance = storageContract.new(deployTransationObject)
```

23. deploy the contract by calling the transaction object by calling `storageInstance`

```bash
> storageInstance
```

the contract sent a transaction to deploy an instance and returned a web3 contract instance, which unfortunately lacks an address. It should know the address but it did not because it was not mined yet.

24. grab the transaction receipt of your deployed contract

```bash
> eth.getTransactionReceipt(storageInstance.transactionHash);
```
the address returned is the unique, immutable address of the contract, it is calculated from the hash of the sender address and the transaction nonce. When you interact with this contract instance you need to mention this address.

25. store the address of the deployed contract into the `storageAddress` variable 

```bash
> var storageAddress = eth.getTransactionReceipt(storageInstance.transactionHash).contractAddress
```

26. interact with the contract by storing the `storageAddress` saved above in a `storage` variable 

```bash
> var storage = storageContract.at(storageAddress);
> storage
```
27. call the get function of the deployed contract

```bash
> storage.get.call()
```
this should return `0` as nothing is stored here at the moment

28. call the set function of the deployed conrtact, if you get an error, use step no 20. 

```bash
> storage.set.sendTransaction(1001, {from: eth.accounts[0], gas: 1000000})
```

29. call the get function for the updated value (give some time for the tx to be mined)

```bash
> storage.get.call()
```
this should return `1001` or the value you chose

30. Next try to deploy a contract that can read differnt kinds of data!  

