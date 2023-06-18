# FUX Contracts

The FUX Contracts package contains the smart contracts that power the FUX decentralized application (Dapp) on the Ethereum blockchain. The contracts are written in Solidity and use the OpenZeppelin library for secure and tested smart contract development.

## FUX.sol

FUX.sol is the main contract that defines the FUX token and the workstream system. The contract inherits from several OpenZeppelin contracts, including `ERC1155Upgradeable`, `AccessControlUpgradeable`, `ERC1155URIStorageUpgradeable`, `ERC1155ReceiverUpgradeable`, `ReentrancyGuard`, `Initializable`, and `UUPSUpgradeable`.

## Deployment

FUX contracts and Graph are only on Goerli during the development phase.

### Goerli

Contract: [0x4923b3Ee71499A4F7a295771E3F9fc17f68537CA](https://goerli.etherscan.io/address/0x4923b3Ee71499A4F7a295771E3F9fc17f68537CA)

## Usage

### Pre Requisites

Before running any command, you need to create a `.env` file and set a BIP-39 compatible mnemonic as an environment
variable. Follow the example in `.env.example`. If you don't already have a mnemonic, use this [website](https://iancoleman.io/bip39/) to generate one.

Then, proceed with installing dependencies:

```sh
$ yarn install
```

### Compile

Compile the smart contracts with Hardhat:

```sh
$ yarn compile
```

### TypeChain

Compile the smart contracts and generate TypeChain artifacts:

```sh
$ yarn typechain
```

### Lint Solidity

Lint the Solidity code:

```sh
$ yarn lint:sol
```

### Lint TypeScript

Lint the TypeScript code:

```sh
$ yarn lint:ts
```

### Test

Run the Mocha tests:

```sh
$ yarn test
```

### Coverage

Generate the code coverage report:

```sh
$ yarn coverage
```

### Report Gas

See the gas usage per unit test and average gas per method call:

```sh
$ REPORT_GAS=true yarn test
```

### Clean

Delete the smart contract artifacts, the coverage reports and the Hardhat cache:

```sh
$ yarn clean
```

### Deploy

Deploy the contracts to Hardhat Network:

```sh
$ yarn deploy --greeting "Bonjour, le monde!"
```

## Syntax Highlighting

If you use VSCode, you can enjoy syntax highlighting for your Solidity code via the [hardhat-vscode](https://github.com/NomicFoundation/hardhat-vscode) extension.

## Caveats

### Ethers and Waffle

If you can't get the [Waffle matchers](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html) to work, try to
make your `ethers` package version match the version used by the `@ethereum-waffle/chai` package. Seem
[#111](https://github.com/paulrberg/solidity-template/issues/111) for more details.
