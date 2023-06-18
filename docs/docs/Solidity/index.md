# Solidity API

## NotAllowed

```solidity
error NotAllowed()
```

_Throws a NotAllowed error when an action is not allowed
Example case: A user tries to call a function that is restricted to the contract owner_

## NonTransferableFux

```solidity
error NonTransferableFux()
```

_Throws a NonTransferableFux error when FUX tokens cannot be transferred
Example case: A user tries to transfer FUX tokens to another user or contract, which is not allowed_

## NotContributor

```solidity
error NotContributor()
```

_Throws a NotContributor error when the caller is not a contributor to a workstream
Example case: A user tries to contribute to a workstream that they are not a part of_

## NotCoordinator

```solidity
error NotCoordinator()
```

_Throws a NotCoordinator error when the caller is not the coordinator of a workstream
Example case: A user tries to close a workstream that they are not the coordinator of_

## NotEnoughBalance

```solidity
error NotEnoughBalance(address token)
```

_Throws a NotEnoughBalance error with the address of the token when the caller does not have enough balance of a specified token
Example case: A user tries to transfer tokens, but they do not have enough balance of the specified token_

## NotEnoughFux

```solidity
error NotEnoughFux()
```

_Throws a NotEnoughFux error when the caller does not have enough FUX tokens
Example case: A user tries to contribute to a workstream, but they do not have enough FUX tokens_

## NotEnoughVFux

```solidity
error NotEnoughVFux()
```

_Throws a NotEnoughVFux error when the caller does not have enough VFUX tokens
Example case: A user tries to claim rewards for a workstream, but they do not have enough VFUX tokens_

## TokensAlreadyMinted

```solidity
error TokensAlreadyMinted()
```

_Throws a TokensAlreadyMinted error when tokens have already been minted
Example case: A user tries to mint tokens, but the tokens have already been minted_

## NonExistentWorkstream

```solidity
error NonExistentWorkstream()
```

_Throws a NonExistentWorkstream error when a workstream does not exist
Example case: A user tries to contribute to a workstream that does not exist_

## NotApprovedOrOwner

```solidity
error NotApprovedOrOwner()
```

_Throws a NotApprovedOrOwner error when the caller is not the owner or has not been approved
Example case: A user tries to transfer tokens, but they are not the owner or have not been approved_

## InvalidInput

```solidity
error InvalidInput(string message)
```

_Throws an InvalidInput error with the specified message when the input is invalid
Example case: A user tries to call a function with invalid input parameters_

## WorkstreamState

```solidity
enum WorkstreamState {
  Started,
  Evaluation,
  Closed
}
```

## FUX

_FUX is a protocol for staking your attention span. We utilise FUX token as a parallel for attention and vFUX are the rewards allocated by the coordinator after normalised ratings informed by your peers.
This contract implements the FUX token and the VFUX token, which are ERC-1155 tokens used to reward contributors to workstreams._

### URI_SETTER_ROLE

```solidity
bytes32 URI_SETTER_ROLE
```

Role definitions

### UPGRADER_ROLE

```solidity
bytes32 UPGRADER_ROLE
```

### FUX_TOKEN_ID

```solidity
uint256 FUX_TOKEN_ID
```

### VFUX_TOKEN_ID

```solidity
uint256 VFUX_TOKEN_ID
```

### counter

```solidity
uint256 counter
```

### ERC1155_ACCEPTED

```solidity
bytes4 ERC1155_ACCEPTED
```

### ERC1155_BATCH_ACCEPTED

```solidity
bytes4 ERC1155_BATCH_ACCEPTED
```

### FuxClaimed

```solidity
event FuxClaimed(address user)
```

_Emitted when a user claims FUX tokens._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | The address of the user who claimed the tokens. |

### FuxGiven

```solidity
event FuxGiven(address user, uint256 workstreamID, uint256 amount)
```

_Emitted when FUX are given by a user for a workstream._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | The address of the user who gave FUX. |
| workstreamID | uint256 | The ID of the workstream for which FUX were given. |
| amount | uint256 | The amount of FUX given. |

### FuxWithdrawn

```solidity
event FuxWithdrawn(address user, uint256 workstreamID, uint256 amount)
```

_Emitted when the user withdraws their FUX from a workstream._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address |  |
| workstreamID | uint256 | The ID of the workstream from which the user withdrew their FUX. |
| amount | uint256 | The amount of FUX withdrawn. |

### WorkstreamMinted

```solidity
event WorkstreamMinted(uint256 workstreamID, uint256 deadline, address[] rewardsToken, uint256[] rewards, uint256 value, string metadataUri)
```

_This event is emitted when a new workstream is minted_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the newly minted workstream |
| deadline | uint256 | The deadline for contributors to submit their evaluations |
| rewardsToken | address[] | An array of addresses of the tokens used to reward contributors |
| rewards | uint256[] | An array of the amounts of each token used to reward contributors |
| value | uint256 |  |
| metadataUri | string | A URI pointing to metadata about the workstream |

### ContributorsUpdated

```solidity
event ContributorsUpdated(uint256 workstreamID, address[] contributors, bool add)
```

_This event is emitted when contributors are added to a workstream_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream to which contributors were added |
| contributors | address[] | An array of addresses of the contributors who were added |
| add | bool |  |

### EvaluationSubmitted

```solidity
event EvaluationSubmitted(uint256 workstreamID, address creator, address[] contributors, uint256[] ratings)
```

_This event is emitted when an evaluation is submitted for a workstream_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream for which the evaluation was submitted |
| creator | address | The address of the creator of the workstream |
| contributors | address[] | An array of addresses of the contributors who submitted evaluations |
| ratings | uint256[] | An array of ratings submitted by the contributors |

### WorkstreamClosed

```solidity
event WorkstreamClosed(uint256 workstreamID, address[] contributors, uint256[] vFux)
```

_This event is emitted when a workstream is closed_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream that was closed |
| contributors | address[] | An array of addresses of the contributors to the workstream |
| vFux | uint256[] | An array of the amounts of vFUX tokens awarded to each contributor |

### StateUpdated

```solidity
event StateUpdated(uint256 workstreamID, enum WorkstreamState state)
```

The workstream can be in one of three states: Started, Evaluation, or Closed

_This event is emitted when the state of a workstream is updated_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream whose state was updated |
| state | enum WorkstreamState | The new state of the workstream |

### UpdatedWorkstreamURI

```solidity
event UpdatedWorkstreamURI(uint256 workstreamID, string uri)
```

_This event is emitted when the URI of a workstream is updated_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream whose URI was updated |
| uri | string | The new URI of the workstream |

### WorkstreamContested

```solidity
event WorkstreamContested(uint256 workstreamID, address user, string uri)
```

_This event is emitted when a user wants to contest the proceedings of a workstream_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream being contested |
| user | address | The address of the user contesting the workstream |
| uri | string | The URI pointing to the contestation |

### Workstream

```solidity
struct Workstream {
  string name;
  address creator;
  uint256 deadline;
  enum WorkstreamState state;
  bool exists;
}
```

### Evaluation

```solidity
struct Evaluation {
  address[] contributors;
  uint256[] ratings;
}
```

### isFuxer

```solidity
mapping(address => bool) isFuxer
```

_This mapping keeps track of whether an address is a FUXer_

### workstreams

```solidity
mapping(uint256 => struct FUX.Workstream) workstreams
```

_This mapping keeps track of the workstreams based on uint256 IDs_

### workstreamContributors

```solidity
mapping(uint256 => mapping(address => bool)) workstreamContributors
```

_This mapping track the contributors of a workstream_

### userWorkstreamFux

```solidity
mapping(address => mapping(uint256 => uint256)) userWorkstreamFux
```

_This mapping keeps track of the FUX committed by a user per workstream_

### userWorkstreamIndex

```solidity
mapping(address => mapping(uint256 => uint256)) userWorkstreamIndex
```

_This mapping keeps track of the index of a user's workstream_

### evaluations

```solidity
mapping(address => mapping(uint256 => struct FUX.Evaluation)) evaluations
```

_This mapping keeps track of the evaluations submitted for a workstream_

### workstreamTokens

```solidity
mapping(uint256 => address[]) workstreamTokens
```

_This mapping keeps track of the tokens used to reward contributors to a workstream_

### workstreamTokenBalances

```solidity
mapping(uint256 => mapping(address => uint256)) workstreamTokenBalances
```

_This mapping keeps track of the balances of a workstream's tokens_

### workstreamURIs

```solidity
mapping(uint256 => string) workstreamURIs
```

_This mapping keeps track of the URIs of the workstreams_

### constructor

```solidity
constructor() public
```

### initialize

```solidity
function initialize() public
```

This function init ERC1155, AccessControl, ERC1155Supply, UUPSUpgradeable
This function grants DEFAULT_ADMIN_ROLE, URI_SETTER_ROLE, UPGRADER_ROLE to the contract deployer

_This function initializes the contract and grants roles to the contract deployer_

### getCommitment

```solidity
function getCommitment(address user, uint256 workstreamID) external view returns (uint256 fuxGiven)
```

_This function returns the amount of FUX tokens committed by a user to a workstream_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | The address of the user |
| workstreamID | uint256 | The ID of the workstream |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| fuxGiven | uint256 | The amount of FUX tokens committed by the user to the workstream |

### getEvaluation

```solidity
function getEvaluation(address user, uint256 workstreamID) external view returns (struct FUX.Evaluation evaluation)
```

_This function returns the evaluation submitted by a user for a workstream_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | The address of the user |
| workstreamID | uint256 | The ID of the workstream |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| evaluation | struct FUX.Evaluation | The Evaluation struct containing the user's evaluation |

### getWorkstream

```solidity
function getWorkstream(uint256 workstreamID) external view returns (struct FUX.Workstream workstream)
```

_This function returns the Workstream struct for a given workstream ID_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstream | struct FUX.Workstream | The Workstream struct for the given workstream ID |

### getWorkstreamRewards

```solidity
function getWorkstreamRewards(uint256 workstreamID, address token) external view returns (uint256 availableRewards)
```

_This function returns the available rewards for a workstream in a given token_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream |
| token | address | The address of the token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| availableRewards | uint256 | The amount of rewards available to the workstream in the given token |

### readWorkstreamState

```solidity
function readWorkstreamState(uint256 workstreamID) external view returns (string)
```

The returned string will be one of the following: "Started", "Evaluation", "Closed"

_Returns the state of the specified workstream as a string_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | A string representing the state of the workstream |

### uri

```solidity
function uri(uint256 tokenId) public view returns (string)
```

_Returns the URI for a given token ID_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenId | uint256 | The ID of the token |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | string | The URI for the given token ID |

### mintFux

```solidity
function mintFux() public
```

This function can only be called once per address

_Mints FUX tokens to the caller
Emits a FuxClaimed event upon successful minting
Throws a TokensAlreadyMinted error if the caller has already minted FUX tokens_

### mintWorkstream

```solidity
function mintWorkstream(string name, address[] _contributors, uint256 coordinatorCommitment, uint256 deadline, address[] rewardsTokens, uint256[] rewards, string metadataUri) public payable
```

_Creates a new workstream and mints FUX tokens to the coordinator
Emits a WorkstreamMinted event upon successful creation of the workstream
Emits a ContributorsAdded event upon successful addition of contributors to the workstream
Throws a NotAllowed error if the workstream is not in the Started state_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| name | string | The name of the workstream |
| _contributors | address[] | An array of addresses to add as contributors to the workstream |
| coordinatorCommitment | uint256 | The amount of FUX tokens the coordinator is committing to the workstream |
| deadline | uint256 | The deadline for the workstream |
| rewardsTokens | address[] | An array of addresses representing the reward tokens for the workstream |
| rewards | uint256[] | An array of reward amounts corresponding to the reward tokens |
| metadataUri | string | The URI for the workstream metadata |

### updateContributors

```solidity
function updateContributors(uint256 workstreamID, address[] _contributors, bool add) external
```

This function can only be called by the coordinator of the workstream

_Updates the contributor mapping
Emits a ContributorsUpdated event upon successful addition of contributors to the workstream
Throws a NotAllowed error if the workstream is not in the Started state_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream |
| _contributors | address[] | An array of addresses to add as contributors to the workstream |
| add | bool | A boolean indicating whether to add or remove the contributors |

### commitToWorkstream

```solidity
function commitToWorkstream(uint256 workstreamID, uint256 fuxGiven) public
```

This function can only be called by a contributor to the workstream

_Commits FUX tokens to a workstream
Emits a FuxGiven event upon successful commitment of FUX tokens
Throws a NotContributor error if the caller is not a contributor to the workstream
Throws an InvalidInput error if the current commitment equals the new commitment_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream |
| fuxGiven | uint256 | The amount of FUX tokens to commit |

### withdrawFromWorkstream

```solidity
function withdrawFromWorkstream(uint256 workstreamID) public
```

_Allows FUXxers to withdraw their FUX from a workstream at any time_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | the ID of the workstream to withdraw from |

### setWorkstreamToEvaluation

```solidity
function setWorkstreamToEvaluation(uint256 workstreamID) public
```

This function can only be called by the coordinator of the workstream.
The workstream must be in the Started state to be set to the Evaluation state.
Emits a StateUpdated event with the new state of the workstream.

_Allows the coordinator of a workstream to set the workstream to the Evaluation state._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream to set to the Evaluation state. |

### submitEvaluation

```solidity
function submitEvaluation(uint256 workstreamID, address[] _contributors, uint256[] ratings) public
```

This function can only be called by a contributor to the workstream

_Submits an evaluation for a workstream
Emits an EvaluationSubmitted event upon successful submission of an evaluation
Throws a NotContributor error if the caller is not a contributor to the workstream
Throws a NotAllowed error if the caller has not committed any FUX tokens to the workstream
Throws an InvalidInput error if the length of the _contributors array does not match the length of the ratings array, or if the sum of the ratings is not equal to 100_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream |
| _contributors | address[] | An array of addresses representing the contributors being evaluated |
| ratings | uint256[] | An array of ratings corresponding to the contributors being evaluated |

### finalizeWorkstream

```solidity
function finalizeWorkstream(uint256 workstreamID, address[] _contributors, uint256[] vFuxGiven) public
```

This function can only be called by the coordinator of the workstream

_Finalizes a workstream and distributes rewards to contributors
Emits a WorkstreamClosed event upon successful closure of the workstream
Throws a NotAllowed error if the workstream does not exist or is not in the Closed state_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream |
| _contributors | address[] | An array of addresses representing the contributors to the workstream |
| vFuxGiven | uint256[] | An array of vFUX tokens to be distributed to the contributors |

### closeWorkstream

```solidity
function closeWorkstream(uint256 workstreamID, address[] _contributors) public
```

Allows the coordinator to close a workstream without paying VFUX and with returning funds to themselves
This function can only be called by the coordinator of the workstream

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream |
| _contributors | address[] | An array of addresses representing the contributors to the workstream |

### postContestation

```solidity
function postContestation(uint256 workstreamID, string _uri) public
```

_Posts a contest event for a workstream_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream |
| _uri | string | The URI of the contestation |

### _getTotal

```solidity
function _getTotal(uint256[] values) internal pure returns (uint256 total)
```

_Calculates the total value of an array of uint256 values_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| values | uint256[] | An array of uint256 values |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| total | uint256 | The total value of the array |

### _noSelfFuxing

```solidity
function _noSelfFuxing(address[] _contributors) internal view
```

_Checks that the caller is not included in the list of contributors
Throws a NotAllowed error if the caller is included in the list of contributors_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _contributors | address[] | An array of addresses representing the contributors to a workstream |

### _userWorkstreamIndex

```solidity
function _userWorkstreamIndex(address user, uint256 workstreamID) internal view returns (uint256 index)
```

_Returns the index of a user's workstream_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | The address of the user |
| workstreamID | uint256 | The ID of the workstream |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| index | uint256 | The index of the user's workstream |

### setURI

```solidity
function setURI(uint256 tokenID, string newuri) public
```

_Sets the URI for a token
Throws an AccessControlError if the caller does not have the URI_SETTER_ROLE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenID | uint256 | The ID of the token |
| newuri | string | The new URI for the token |

### setWorkstreamURI

```solidity
function setWorkstreamURI(uint256 workstreamID, string newuri) public
```

_Sets the URI for a workstream._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream to update. |
| newuri | string | The new URI for the workstream. |

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address newImplementation) internal
```

_Authorizes an upgrade to a new implementation contract
Throws an AccessControlError if the caller does not have the UPGRADER_ROLE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| newImplementation | address | The address of the new implementation contract |

### safeTransferFrom

```solidity
function safeTransferFrom(address, address, uint256, uint256, bytes) public pure
```

_from_ The address of the sender
_to_ The address of the recipient
_id_ The ID of the token being transferred
_amount_ The amount of tokens being transferred
_data_ Additional data with no specified format

_Disallows the transfer of FUX tokens between users or other contracts
Throws a NotAllowed error_

### safeBatchTransferFrom

```solidity
function safeBatchTransferFrom(address, address, uint256[], uint256[], bytes) public pure virtual
```

_from_ The address of the sender
_to_ The address of the recipient
_ids_ An array of IDs of the tokens being transferred
_amounts_ An array of amounts of tokens being transferred
_data_ Additional data with no specified format

_Disallows the batch transfer of FUX tokens between users or other contracts
Throws a NotAllowed error_

### onlyCoordinator

```solidity
modifier onlyCoordinator(uint256 workstreamID)
```

_Throws a NotCoordinator error if the caller is not the coordinator of the specified workstream_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream |

### isActiveWorkstream

```solidity
modifier isActiveWorkstream(uint256 workstreamID)
```

_Throws a NotAllowed error if the specified workstream is closed or does not exist_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| workstreamID | uint256 | The ID of the workstream |

### _beforeTokenTransfer

```solidity
function _beforeTokenTransfer(address operator, address from, address to, uint256[] ids, uint256[] amounts, bytes data) internal
```

_Hook that is called before any token transfer. This includes minting
and burning, as well as batched variants.

The same hook is called on both single and batched variants. For single
transfers, the length of the `ids` and `amounts` arrays will be 1.

Calling conditions (for each `id` and `amount` pair):

- When `from` and `to` are both non-zero, `amount` of ``from``'s tokens
of token type `id` will be  transferred to `to`.
- When `from` is zero, `amount` tokens of token type `id` will be minted
for `to`.
- when `to` is zero, `amount` of ``from``'s tokens of token type `id`
will be burned.
- `from` and `to` are never both zero.
- `ids` and `amounts` have the same, non-zero length.

To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks]._

### supportsInterface

```solidity
function supportsInterface(bytes4 interfaceId) public view returns (bool)
```

### onERC1155Received

```solidity
function onERC1155Received(address, address, uint256, uint256, bytes) external pure returns (bytes4)
```

### onERC1155BatchReceived

```solidity
function onERC1155BatchReceived(address, address, uint256[], uint256[], bytes) external pure returns (bytes4)
```

