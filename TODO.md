## oracle

- add option to non-ecrow-centered fns to only arbitrate fulfillments for escrows that demand current account as oracle
  - tradeoff is that we must get the escrow attestation. might be more expensive than just validating all
  - filter can also be implemented client-side by returning null for fulfillments to escrows demanding other accounts
- add option to not re-arbitrate fulfillments that you've already arbitrated for
- investigate all tests passing in isolation, but later "listen"s failing when running all tests (anvil concurrency)
- investigate event watching (in oracle listenAndArbitrate and index waitForFulfillment) on websocket transport

  ## other

  - trusted oracle arbiter client for rust
  - higher order arbiters (any, all)
  - remove contextual AI comments
  - make function & internal variable names more consistent
  - update tutorial docs
