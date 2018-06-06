---
id: version-1.0.0-uc_overview
title: OpenST Utility Chain Overview
sidebar_label: OpenST Utility Chain Overview
original_id: uc_overview
---

The OpenST protocol allows for the staking of $OST⍺ on Ropsten Ethereum that enables Branded Tokens to be created, or "minted" on the OpenST network of sidechains. You can learn more about the OpenST Protocol [here.](https://openst.org/). The value of the utility tokens on the OpenST Utility Chain (UC) is backed by the $OST⍺ on the OpenST Value Chain (VC) - Ropsten Ethereum.

## OpenST Utility Chain

The UC needs to support lower transaction fees and lower transaction confirmation times than the VC. OpenST Protocol hence is to enable micro-transactions within mainstream consumer applications using the utility tokens. For the utility chain we consider an Ethereum-based
chain consensus engine which seals blocks cryptographically by Proof-of-Authority. Proof-of-Authority is not Byzantine fault-tolerant, but it can still be considered useful in the  Te UC is cryptographically validated by a known set of validators then those validators can each report the block hashes they have seen on public Ethereum and a block hash is considered final when consensus among the validators is reached. In the opposite direction, to report the latest block  o he value chain, the logic involves no subjective threshold parameters when the utility chain is cryptographically sealed by a known set of validators as a complete light client can be implemented as a smart contract on Ethereum. 

To understand more about the details on the protocol please refer to the OpenST [white paper.](https://ost.com/documents)

## Prerequisites

To be able to sync with the UC and also deploy contracts to it, you will need to install the following on your machine.

* [geth](https://github.com/ethereum/go-ethereum/wiki/Installing-Geth) 
* [eth](https://www.ethereum.org/cli) 
* [solc](http://solidity.readthedocs.io/en/v0.4.24/installing-solidity.html) 
* [wget](https://www.gnu.org/software/wget/)


With these you can proceed to syncing with the UC and deploying contracts to it.

>_last updated 5 June 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2


