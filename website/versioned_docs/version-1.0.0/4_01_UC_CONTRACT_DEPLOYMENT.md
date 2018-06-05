---
id: version-1.0.0-uc_contract_deploy
title: UC Contract Deployment Guide
sidebar_label: UC Contract Deployment Guide
original_id: uc_contract_deploy
---

# Deploying smart contracts on the OpenST Utility Chain

## OpenSTProtocol and Utility Chains 

The OpenST protocol allows for the staking of $OST⍺ on Ropsten Ethereum that enables Branded Tokens to be created, or "minted" on the OpenST network of sidechains. You can learn more about the OpenST Protocol [here.](https://openst.org/)

The following tutorial will help anyone to get started with writing smart-contracts, deploying them to the OpenST Utility sidechain and be able to interact with it.

## Prerequisites

1. Make sure you have brew for mac, if not use:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
2. If you already have brew, update it, install go-ethereum (geth), the solidity compiler (solc), git and wget

```bash
brew update
brew upgrade
brew tap ethereum/ethereum
brew install ethereum
brew install solidity
brew install git
brew install wget
```

## Syncing with the OpenST Utility Chain

1. To be able to sync the OpenST Utility chain (UC) you need to start with cloning Benjamin Bollen's [gist](https://gist.github.com/benjaminbollen/6e0eb979c911bf465896d49cf08e86da) to a new directory, cd into the `6e0eb979c911bf465896d49cf08e86da` directory and take a look at the files here.

```bash
mkdir uc_smart_contract
cd uc_smart_contract
git clone https://gist.github.com/6e0eb979c911bf465896d49cf08e86da.git 
cd 6e0eb979c911bf465896d49cf08e86da
ls -l
```
This gist contains the bash script `setup_utility_chain_1409` required to do the following - 
a. Check if `geth` is installed
b. Create a directory where the `chaindata` would be store
c. Connect geth to listen on the Network listening port (default: 30303) 
d. Connect geth to listen on the HTTP-RPC server listening port (default: 8545)
e. Connect geth to listen on the WS-RPC server listening port (default: 8546)
f. Download the Bootnode files 
g. Download the Genesis file
h. Finally combine all the requirements together and inititalize `geth` with the above parameters in the following command.

```bash
$GETH_EXEC --networkid $networkid --datadir $datadir --port $port --rpc --rpcapi eth,net,web3,personal --rpcport $rpcport --ws --wsport $wsport --bootnodes $bootNodes $extraArgs;
```
Some of the essential parameters for geth would be found at the top of the bash script.

```bash
networkid=1409;
environment=sandbox;
assetPath="https://s3.amazonaws.com/assets.simpletoken.com/utility_chain/$environment";
```

2. You must first modify the rights to be able to execute the Bash script `setup_utility_chain_1409`

```bash
chmod 755 setup_utility_chain_1409

```
Here `chmod 755` is equal to `chmod u=rwx,go=rx` which means that the user can read, write and execute this script.

3. Execute the bash script by pressing `return` to pass all the params, look further into the code to see what it [means](https://gist.github.com/benjaminbollen/6e0eb979c911bf465896d49cf08e86da) and allow your geth node to sync. 

```bash
./setup_utility_chain_1409
```

Copy the `ipc` path displayed as the script starts the geth node sync starts up with the UC, this is the (local) path to geth node from which you will later need to deploy our contracts. Learn more about [ipc](https://en.wikipedia.org/wiki/Inter-process_communication) you will find the path beside `IPC endpoint opened` in the console.

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
INFO [05-28|19:20:10] IPC endpoint opened                      url=/Users/noslav/uc_node_1409/geth.ipc <- Copy this path
INFO [05-28|19:20:10] HTTP endpoint opened                     url=http://127.0.0.1:8545               cors= vhosts=localhost
INFO [05-28|19:20:10] WebSocket endpoint opened                url=ws://127.0.0.1:8546
```

The sync may take anywhere from 3 hours to 12, depending on your internet connection. Check for the `chaindata` directory size to know if your node is in sync with the latest blocks (and transactions).

```bash
cd ~/uc_node_1409/geth
ls -l 
```
At the time of writing this tutorial, the `chaindata` size was approximately 6.1 GB.


## Composing a simple sample smart-contract 

1. Open up a new console and start composing our sample contract, create an empty file called `StorageTest.sol`, open it up, add our solidity code and save the file.

```bash
touch StorageTest.sol
nano StorageTest.sol

```

```solidity
pragma solidity ^0.4.23;
contract StorageTest {
  uint256 storedData;
  function set(uint256 data) public {
    storedData = data;
  }
  function get() public view returns (uint256) {
    return storedData;
  }
}
```
The contracts is called `StorageTest` and it has two functions 
a. Fn `set`, sets the data you want to store in the contract
b. Fn `get`, gets the saved data you have already stored

Since every call to ethereum storage is a transaction (txn) requiring gas we will execute txns to save/store the data. `get` will get this data without costing gas, see steps 4 of section _Contract Deployment and testing on the UC_ to know what is `gas` and how to get it for the UC. 

2. Compile this contract by parsing it into a `json` format and assigning it to a JavaScript variable `storageTestOutput`. Save this to the present working directory as the `storageTest.js` file. Check if you have the files (and its contents), before moving forward.

```bash
echo "var storageTestOutput=`solc --optimize --combined-json abi,bin,interface StorageTest.sol`" > storageTest.js

cat storageTest.js 
```

## Account Creation and Obtaining Gas

1. Open up a new console (yes, a third one) and attach a geth node to the `ipc` path saved from step 3 of the _Syncing with the OpenST Utility Chain_ section.

```bash
geth attach /Users/noslav/uc_node_1409/geth.ipc //this path will be different in your case 
```

2. Create a new account for which you have the private keys,from which you will deploy your sample smart-contract and be able call the functions in your deployed contract. Enter an easy passphrase so you can use it frequently (& fast), to know about the list of available commands for geth look [here](https://ethereum.stackexchange.com/questions/28703/full-list-of-geth-terminal-commands)

```bash
> personal.newAccount()
Passphrase:
Repeat passphrase:
```

3. This newly created account should be your coinbase (if you haven't already previously created an account) for which you have the private key and the passphrase, check for the coinbase account address and make sure its the same as above, then take a look at your account's balance (this should be 0).

```bash
> eth.coinbase
> eth.getBalance(eth.coinbase)
```
Copy the account address displayed here.

4. Now you need some funds - OST⍺' or `gas` to deploy your sample contract with geth for. You should use the new [transfers api](https://dev.ost.com/docs/api_transfers_create.html)
make sure to transfer (using the [ost-sdk-ruby](https://github.com/OpenSTFoundation/ost-sdk-ruby/) or [ost-sdk-js](https://github.com/OpenSTFoundation/ost-sdk-js) ) to the coinbase address you have copied above.

For executing this step you will need to [register for OST KIT⍺](https://dev.ost.com/docs/kit.html). Complete the steps in this tutorial. 

5. In a separate console spin up an official OST KIT⍺ sdk and execute the new [transfers api](https://dev.ost.com/docs/api_transfers_create.html)
a. javascript - https://github.com/OpenSTFoundation/ost-sdk-js
b. ruby - https://github.com/OpenSTFoundation/ost-sdk-ruby
c. php - https://github.com/OpenSTFoundation/ost-sdk-php

Here we show the example of the JavaScript SDK. Make sure that the `to_address` is the coinbase address you copied previously, the amount required can be understood [from dev.ost.com documentation](https://dev.ost.com/docs/api_transfers_create.html#amount)

```javascript
const transferService = ostObj.services.transfers; // transfer object creation 
transferService.execute({to_address:'0xd2b789293674faEE51bEb2d0338d15401dEbfdE3', amount:1000000000000000000}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); }); //here the address will be the coinbase address you copied, the amount is in Wei,hence equal to 1 OST ⍺'

```

## Contract Deployment on the UC

1. Check if you have the funds in your account (also make sure you are in sync with the UC), in the console you used in section _Syncing with the OpenST Utility Chain_.

```bash
> eth.getBalance(eth.coinbase)
```

If you have the balance you requested (as per the above example) this should show up as `1000000000000000000`


2. If this shows up the funds you requested for, proceed with loading the contract scripts into geth, check for the key-pair values in `storageTestOutput`, this would display the `abi` - application binary interface and `bin` - binary file which you will need.

```bash
> loadScript('storageTest.js')
> storageTestOutput
```

3. Get the contract's `abi` from storageTestOutput and store it into a variable (var) called `storageTestContractAbi` and check out its contents.

```bash
> var storageTestContractAbi = storageTestOutput.contracts['StorageTest.sol:StorageTest'].abi
> storageTestContractAbi
```

4. Store the contract's `abi` into a variable called `storageTestContract` by passing it as an argument to the `eth.contract` function.

```bash
> var storageTestContract = eth.contract(JSON.parse(storageTestContractAbi))
```

5. Store the contract's `bin` into a variable called `storageTestBinCode` and concatenate it with the hexadecimal prefix `0x` so it is callable in a transaction. Check out its contents. 

```bash
> var storageTestBinCode = "0x" + storageTestOutput.contracts['StorageTest.sol:StorageTest'].bin
> storageTestBinCode
```

6. Unlock your coinbase account (with OST⍺') to start the deployment process and give in the passphrase you used to create the account.

```bash
> personal.unlockAccount(eth.accounts[0])
> Passphrase:
```

Anytime in the following steps if you get a `Error: authentication needed: password or unlock`
use this command to unlock your account.

7. Store the deployable transaction object into a variable called `deployTransactionObject` using the `storageTestBinCode` as data and set the gas value to `1000000` for the sample contract.

```bash
> var deployTransactionObject = { from: eth.accounts[0], data: storageTestBinCode, gas: 1000000 };
```

8. Store the storageTest contract instance in a variable called `storageTestInstance` by using the deployable transaction object as its argument. Deploy the contract by calling the transaction object `storageTestInstance`

```bash 
> var storageTestInstance = storageTestContract.new(deployTransactionObject)
> storageTestInstance
```

The contract sent a transaction for deployment and this returned a web3 contract instance, which unfortunately lacks an address until it is mined. 

9. Grab the transaction receipt of your deployed contract using the `getTransactionReceipt` function.

```bash
> eth.getTransactionReceipt(storageTestInstance.transactionHash);
```
The address returned here is the unique, immutable address of the contract, it is calculated from the hash of the sender address and the transaction nonce. When you interact with this contract instance you need to mention this address.

10. Store the address of the deployed contract into the a `storageTestAddress` variable 

```bash
> var storageTestAddress = eth.getTransactionReceipt(storageTestInstance.transactionHash).contractAddress
```

## Contract Interaction on the UC

1. Interact with the contract by storing the `storageTestAddress` saved above in a `storage` variable and checkout its contents. 

```bash
> var storage = storageTestContract.at(storageTestAddress);
> storage
```
2. Call the `get` storage value function of the deployed contract

```bash
> storage.get.call()
```
This should return `0` as nothing is stored here at the moment.

3. Call the `set` storage value public function of the deployed conrtact as a transaction, if you get an `error`, employ step no 20 and since this step is writing to the contract data storage it will cost gas.

```bash
> storage.set.sendTransaction(1001, {from: eth.accounts[0], gas: 1000000})
```

4. Call the `get` storage value function for the updated value, give some time for the transaction to be mined.

```bash
> storage.get.call()
```
This should return `1001` or the value you chose to pass in the `sendTransaction` function. 
This completes the objective of this tutorial.

>_last updated 5 June 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2



