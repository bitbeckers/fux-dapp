# summon-raid-app

## QUICKSTART

1. `yarn` to install all packages and dependencies
2. Create `.env` file in `./evm` based of `./evm/.env.example`
   > for now, the mnemonic is the most important since this is local)
3. run `yarn deploy` in `./evm` to deploy a local instance
   > You should/could see an updated `./evm/deployments/localhost` folder
4. Create `.env` file in `./app` based of `./app/env.local.example`
   > Use addresses from `./evm/deployments/localhost` in `./app/.env`
5. From root dir `./` run `yarn start`

Yarn start triggers, in order:

- the smart contract test suite
- typechain to provide the front end with typings for Quiver
- `hardhat node` from `./evm/` instance for local evm chain
- `yarn dev` from `./app` for local frontend on `localhost:3000`

Connect you wallet to RPC `http://localhost:8545/`

Changes to front-end will be live, changed to smart-contract code require restart

## DEVELOPMENT

#### Smart contracts

- Create or change smart contracts in `./emv/contracts/`
- Create or change test suites in `./evm/test/`
- Run `yarn test` from `./evm/`
  > This will also create types for the app and abis for the Graph

#### Front-end

- Create `./app/.env.local` from `./app/.env.local.template`
- Update `./app/hooks/`
- Create or change pages (and components) in `./app/pages/`

#### Run local

- Run `yarn start` from `./`
  > Runs smart contracts tests
  > Generates types for app and ABIs for Graph
  > Start local hardhat node (evm instance)
  > Start front-end app

To interact with the app, connect your wallet to local RPC `http://localhost:8485/`

#### Graph

In case you need more complex data objects, or want to reduce multiple get calls to the contract to a single database query, or whatever, you can use the Graph. This package runs a local instance of the Graph where you can deploy to and call the endpoint via your app. It requires `docker-compose`.

- Change and/or update `./graph/schema.graphql`
  > Define your entitites and relations
- Change and/or update `./graph/subgraph.yaml.ts`
  > Define the data sources
- Change and/or update `./graph/mapping.ts`

  > Define the data processing from events from source to entities and relations in schema

- Run `yarn setup` from `./graph`
  > Create Docker-compose instance
- Run `yarn create:local` from `./graph`

Inspect your Graph on http://localhost:8000/subgraphs/name/summon/raid-app/graphql

#### Local integration

> If you're using the Graph open 2 terminals

- Run `yarn start` from `./`

  > Inspect app on localhost:3000
  > Remember to connect your wallet to RPC localhost:8545

- Run yarn start:grap`from`./`

Play around with the interaction. The second derived address in your wallet is the owner of the token as you can see under ERC20

- Mint some tokens
- Stake portion of those tokens
- Claim rewards
- Mint NFTs
- Play around

Cool bonus: when you create a stake, that is registered by the Graph and displayed in the 'Latest stakes' card under Staking

## DEPLOYMENT - SMART CONTRACT

The used addresses for `deployer`, `owner` and `user` are configured in `./evm/hardhat.config.ts`. For local testing different addresses are used to validate the ownership or role-based modifiers.

- Update or add deployment scripts in `./evm/deploy/`
- Run `hardhat deploy` to validate the deployment
- Run `yarn hardhat --network [NETWORK_NAME_HERE] deploy`
  > Use a network configured in `./evm/hardhat.config.ts`
- Run `yarn hardhat --network [NETWORK_NAME_HERE] etherscan-verify` to verify the contracts on the relevant block explorer.

## DEPLOYMENT - APP

Check out Vercel

-[ ] Add in fleek.co deployment

## DEPLOYMENT - GRAPH

- Create subgraph entry in [Hosted Version Dashboard](https://thegraph.com/hosted-service/dashboard)
- Update deploy script with subgraph name
- Run `yarn deploy` from `./graph`

## CODEBASE

**APP**

- NextJS
- [Raid Guild Design System](https://github.com/raid-guild/design-system)

**EVM**

- [Solidity-template](https://github.com/PaulRBerg/solidity-template)
- [Hardhat-deploy](https://github.com/wighawag/hardhat-deploy/tree/master)

## TODO

-[ ] Error handling and toasts -[X] Add Graph module -[X] Staking pools contract and tests
