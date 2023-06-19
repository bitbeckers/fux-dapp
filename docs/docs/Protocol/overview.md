---
slug: /protocol
sidebar_position: 1
---

# Protocol

The FUX lifecycle can be broken down into the following steps:

1. Create a workstream: A user can create a new workstream by calling the mintWorkstream function and providing the necessary parameters, such as the name, deadline, reward tokens, and rewards. This function creates a new workstream and mints FUX tokens to the coordinator of the workstream.

2. Add contributors: The coordinator of a workstream can add contributors to the workstream by calling the updateContributors function and providing an array of addresses to add as contributors. This function updates the contributor mapping for the workstream.

3. Commit coordinator to workstream: The coordinator of a workstream can commit FUX tokens to the workstream by calling the commitToWorkstream function and providing the amount of FUX tokens to commit. This function adds the committed FUX tokens to the workstream balance.

4. Evaluate workstream contributions: Contributors to a workstream can submit evaluations of the work done by other contributors by calling the evaluateWorkstream function and providing the workstream ID, contributor address, and evaluation rating. The coordinator of the workstream can then accept or reject the evaluation.

5. Close workstream: The coordinator of a workstream can close the workstream by calling the closeWorkstream function. This function distributes the remaining FUX tokens in the workstream balance to the contributors and sets the workstream state to Closed.

Throughout the lifecycle of a workstream, the `WorkstreamState` enum is used to represent the current state of the workstream. The possible states are `Started`, `Evaluation`, and `Closed`.

The `updateContributors` and `closeWorkstream` functions can only be called by the coordinator of the workstream, while the `evaluateWorkstream` and `commitToWorkstream` functions can be called by any contributor to the workstream.
