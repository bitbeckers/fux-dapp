# Graph

The FUX Subgraph is a set of mappings that define how to extract data from the FUX contracts on the Goerli testnet and store it in a format that can be easily queried. The subgraph defines entities such as `User`, `Workstream`, `RewardDistribution`, `Evaluation`, and `WorkstreamContributor`, and allows developers to query the data associated with these entities using GraphQL.

## Installation

To install the package, run the following command:

`yarn install`

This will install the required dependencies for the package.

## Usage

The package provides the following scripts:

- `codegen`: Generates TypeScript types for the subgraph schema.
- `build`: Builds the subgraph.
- `deploy`: Deploys the subgraph to the Graph Hosted Service.
- `test`: Runs the subgraph tests.

## Deployment

FUX contracts and Graph are only on Goerli during the development phase.

### Goerli

Graph: [bitbeckers/fux-goerli](https://thegraph.com/hosted-service/subgraph/bitbeckers/fux-goerli)

## Entities

- `User`: Represents a user in the system. A user can be a contributor or a coordinator of a workstream. A user can have multiple balances of different tokens.
- `Workstream`: Represents a workstream in the system. A workstream is a project or task that contributors can work on. A workstream has a coordinator, a deadline, a name, a URI, and a status. A workstream can have multiple contributors, a reward distribution, and balances of different tokens.
- `RewardDistribution`: Represents a reward distribution for a workstream. A reward distribution is a way to distribute rewards to contributors based on their shares. A reward distribution has a workstream, contributors, and shares.
- `Evaluation`: Represents an evaluation of a contributor's work on a workstream. An evaluation has a creator, a workstream, a contributor, and a rating.
- `WorkstreamContributor`: Represents a contributor to a workstream. A workstream contributor has a workstream, a contributor, a commitment, and an active status.
- `Token`: Represents a token in the system. A token has an ID, a number of decimal places, a name, a symbol, and balances for users and workstreams.
- `UserBalance`: Represents a balance of a token for a user. A user balance has a user, a token, and an amount.
- `WorkstreamBalance`: Represents a balance of a token for a workstream. A workstream balance has a workstream, a token, and an amount.
- `WorkstreamContestation`: Represents a contestation of a workstream. A workstream contestation has a user, a workstream, and a URI.

These entities are related in the following ways:

- A `user` can have multiple balances of different `tokens`, and a `balance` belongs to a `user` and a `token`.
- A `workstream` has a `coordinator`, multiple `contributors`, a `reward distribution`, and `balances` of different tokens.

* A `reward distribution` belongs to a `workstream` and has multiple `contributors` and `shares`. A `workstream balance` belongs to a `workstream` and a `token`.

- An `evaluation` has a `creator`, a `workstream`, a `contributor`, and a `rating`.
- A `workstream contributor` belongs to a `workstream` and a `user`.
- A `workstream contestation` has a `user` and a `workstream`.

## License

This package is licensed under the MIT License. See the LICENSE file for more information.

## Author

This package was created by bitbeckers.
