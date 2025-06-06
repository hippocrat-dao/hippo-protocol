---
title: Parameter Changes
order: 4
---

This documentation aims to provide guidelines for creating and assessing parameter-change proposals.

Drafting and submitting a parameter-change governance proposal involves two kinds of risk: losing proposal deposit amounts and the potential to alter the function of the Hippo Protocol network in an undesirable way.

## What parameters can be changed?

The complete parameters of the Hippo Protocol are split up into different modules, each of which has its own set of parameters. Most parameters can be updated by submitting a governance proposal.

List of modules whose parameters can be changed via governance:

- x/auth
- x/bank
- x/distribution
- x/evidence
- x/feegrant
- x/gov
- x/mint
- x/slashing
- x/staking
- ibc-go/transfer
- interchain-security/provider

Each cosmos-sdk module uses `MsgUpdateParams` for providing parameter changes. You can learn more about it in the cosmos-sdk documentation of each module (e.g. https://docs.cosmos.network/v0.47/build/modules/staking#msgupdateparams)

## What are the current parameter values?

<!-- markdown-link-check-enable -->

There are ways to query the current settings for each module's parameter(s). Some can be queried with the command line program [`hippod`](../../getting-started/installation).

You can begin by using the command `hippod q [module] -h` to get help about the subcommands for the module you want to query. For example, `hippod q staking params` returns the settings of relevant parameters:

```sh
bond_denom: ahp
historical_entries: 10000
max_entries: 7
max_validators: 22
unbonding_time: 1814400s
```

If a parameter-change proposal is successful, the change takes effect immediately upon completion of the voting period.

**Note:** You cannot currently query the `bank` module's parameter, which is `sendenabled`. You also cannot query the `crisis` module's parameters.

## Risks in parameter change proposals

Because parameters dictate some of the ways in which the chain operates, changing them can have an impact beyond what is immediately obvious.

For example, reducing the unbonding period might seem like the only effect is in how quickly delegators can liquidate their assets. It might also have a much greater impact on the overall security of the network that would be hard to realize at first glance.

This is one of the reasons that having a thorough discussion before going on-chain is so important - talking through the impacts of a proposal is a great way to avoid unintended effects.
