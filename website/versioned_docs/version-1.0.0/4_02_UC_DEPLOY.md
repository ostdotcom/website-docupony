---
id: version-1.0.0-uc_deploy
title: OpenST Utility Chain Contracts Deployment 
sidebar_label: OpenST Utility Chain Contracts Deployment
original_id: uc_deploy
---

1. Open up a new console and start composing our sample contract, create an empty file called `StorageTest.sol` and open it up.

```bash
touch StorageTest.sol
```
Add our sample smart contract solidity code and save this file. 

```solidity
pragma solidity ^0.4.23;
contract BasicContract {
	bytes32 public constant name = "BasicContract";
}
```
The contract is named `BasicContract` and it contains a public constant, "BasicContract".

2. Compile the above contract using `solc` the solidity compiler, by parsing it into a `json` format and assigning it to a JavaScript variable `storageTestOutput` with the flags `--optimize` and `--combined-json`. Save this to the present working directory as `storageTest.js`. Check if you have the files (and its contents), before moving forward.

```bash
echo "var storageTestOutput=`solc --optimize --combined-json abi,bin,interface StorageTest.sol`" > storageTest.js

cat storageTest.js
```

## Account Creation and Obtaining Gas

1. Open up a new console (yes, a third one) and `attach` `geth` with the `IPC` path saved from step 3 of the _OpenST Utility Chain Sync_ document. This starts an interactive JavaScript environment - connect to node in the go-ethereum command line interface.

```bash
geth attach ~/uc_node_1409/geth.ipc //this path will be different in your case
```

2. Create a new account, for this you will own the private key. So you can deploy your sample smart contract from this account. Enter a passphrase with which only you can access the account. To know about the list of available commands for geth look [here](https://ethereum.stackexchange.com/questions/28703/full-list-of-geth-terminal-commands)

```bash
> personal.newAccount()
Passphrase:
Repeat passphrase:
```

3. This newly created account should be your [coinbase](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethcoinbase) account (if you haven't already previously created an account). Please note this does not have any relation whatsoever to coinbase.com. Check for the coinbase account address and make sure its the same as the one created above, then take a look at your account's balance (this should be 0).

```bash
> eth.coinbase
> eth.getBalance(eth.coinbase)
```
Copy-paste (save) the account address displayed here for the upcoming steps.

4. Now you need some funds - OST⍺ Prime to deploy your sample contract with `geth`. You should use the new [transfers api](https://dev.ost.com/docs/api_transfers_create.html)
make sure to transfer to the coinbase address you have copied above.

For executing this step you will need to [register for OST KIT⍺](https://dev.ost.com/docs/kit.html). Complete the steps in this tutorial before moving forward if you have not already.

5. In a separate console spin up an official OST KIT⍺ SDK and execute the new [Transfers API.](https://dev.ost.com/docs/api_transfers_create.html)
* javascript - https://dev.ost.com/docs/sdk_ruby.html
* ruby - https://dev.ost.com/docs/sdk_ruby.html
* php - https://dev.ost.com/docs/sdk_php.html

Here we show the example of the JavaScript SDK. Make sure that the `to_address` is the coinbase address you copied previously. The amount to be sent to this address can be understood from the [Transfers API documentation.](https://dev.ost.com/docs/api_transfers_create.html#amount)

```javascript
const transferService = ostObj.services.transfers; // transfer object creation
transferService.execute({to_address:'0xd2b789293674faEE51bEb2d0338d15401dEbfdE3', amount:1000000000000000000}).then(function(res) { console.log(JSON.stringify(res)); }).catch(function(err) { console.log(JSON.stringify(err)); }); //here the address will be the coinbase address you copied.

```

## Contract Deployment on the UC

1. Check if you have the funds in your account (also make sure you are in sync with the UC), in the console you used in _OpenST Utility Chain Sync_.

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

3. Call the `set` storage value public function of the deployed conrtact as a transaction, if you get an `error`, employ step no 6 from the _Contract Deployment on the UC_ section and since this step is writing to the contract data storage it will cost gas.

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
