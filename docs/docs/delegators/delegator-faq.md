---
title: Delegator FAQ
order: 4
---

## What is a delegator?

People who cannot or do not want to operate [validator nodes](../validators/overview.md) can still participate in the staking process as delegators. Indeed, validators are not chosen based on their self-delegated stake but based on their total stake, which is the sum of their self-delegated stake and of the stake that is delegated to them. This is an important property, as it makes delegators a safeguard against validators that exhibit bad behavior. If a validator misbehaves, their delegators will move their HPs away from them, thereby reducing their stake. Eventually, if a validator's stake falls under the top 22 addresses with highest stake, they will exit the validator set.

**Delegators share the revenue of their validators, but they also share the risks.** In terms of revenue, validators and delegators differ in that validators can apply a commission on the revenue that goes to their delegator before it is distributed. This commission is known to delegators beforehand and can only change according to predefined constraints (see [section](#choosing-a-validator) below). In terms of risk, delegators' HPs can be slashed if their validator misbehaves. For more, see [Risks](#risks) section.

To become delegators, HP holders need to send a ["Delegate transaction"](./delegator-guide-cli.md#sending-transactions) where they specify how many HPs they want to bond and to which validator. A list of validator candidates will be displayed in Hippo Protocol explorers. Later, if a delegator wants to unbond part or all of their stake, they need to send an "Unbond transaction". From there, the delegator will have to wait 3 weeks to retrieve their HPs. Delegators can also send a "Rebond Transaction" to switch from one validator to another, without having to go through the 3 weeks waiting period.

For a practical guide on how to become a delegator, click [here](./delegator-guide-cli.md).

## Choosing a validator

<!-- markdown-link-check-disable-next-line -->

In order to choose their validators, delegators have access to a range of information directly in [Hippo River](https://river.hippoprotocol.ai/hippo-protocol/staking) or other Hippo Protocol block explorers.

- **Validator's moniker**: Name of the validator candidate.
- **Validator's description**: Description provided by the validator operator.
- **Validator's website**: Link to the validator's website.
- **Initial commission rate**: The commission rate on revenue charged to any delegator by the validator (see below for more detail).
- **Commission max change rate:** The maximum daily increase of the validator's commission. This parameter cannot be changed by the validator operator.
- **Maximum commission:** The maximum commission rate this validator candidate can charge. This parameter cannot be changed by the validator operator.
- **Validator self-bond amount**: A validator with a high amount of self-delegated HPs has more skin-in-the-game than a validator with a low amount.

## Directives of delegators

Being a delegator is not a passive task. Here are the main directives of a delegator:

- **Perform careful due diligence on validators before delegating.** If a validator misbehaves, part of their total stake, which includes the stake of their delegators, can be slashed. Delegators should therefore carefully select validators they think will behave correctly.
- **Actively monitor their validator after having delegated.** Delegators should ensure that the validators they delegate to behave correctly, meaning that they have good uptime, do not double sign or get compromised, and participate in governance. They should also monitor the commission rate that is applied. If a delegator is not satisfied with its validator, they can unbond or switch to another validator (Note: Delegators do not have to wait for the unbonding period to switch validators. Rebonding takes effect immediately).
- **Participate in governance.** Delegators can and are expected to actively participate in governance. A delegator's voting power is proportional to the size of their bonded stake. If a delegator does not vote, they will inherit the vote of their validator(s). If they do vote, they override the vote of their validator(s). Delegators therefore act as a counterbalance to their validators.

## Revenue

Validators and delegators earn revenue in exchange for their services. This revenue is given in three forms:

- **Block provisions (HPs):** They are paid in newly created HPs. Block provisions exist to incentivize HP holders to stake. The yearly inflation rate begins with 25% and decreases to 0 as time goes, pursuing sustainable incentive economy only with fees, similar to that of Bitcoin.
- **Transaction fees (HPs):** Each transfer on the Hippo Protocol comes with transactions fees. These fees can be paid in HPs. Fees are distributed to bonded HP holders in proportion to their stake. The first whitelisted token at launch is the HP.

## Validator Commission

Each validator receives revenue based on their total stake. Before this revenue is distributed to delegators, the validator can apply a commission. In other words, delegators have to pay a commission to their validators on the revenue they earn. Let us look at a concrete example:

We consider a validator whose stake (i.e. self-delegated stake + delegated stake) is 10% of the total stake of all validators. This validator has 20% self-delegated stake and applies a commission of 10%. Now let us consider a block with the following revenue:

- 990 HPs in block provisions
- 10 HPs in transaction fees.

This amounts to a total of 1000 HPs to be distributed among all staking pools.

Our validator's staking pool represents 10% of the total stake, which means the pool obtains 100 HPs. Now let us look at the internal distribution of revenue:

- Commission = `10% * 80% * 100` HPs = 8 HPs
- Validator's revenue = `20% * 100` HPs + Commission = 28 HPs
- Delegators' total revenue = `80% * 100` HPs - Commission = 72 HPs

Then, each delegator in the staking pool can claim their portion of the delegators' total revenue.

## Risks

Staking HPs is not free of risk. First, staked HPs are locked up, and retrieving them requires a 3 week waiting period called unbonding period. Additionally, if a validator misbehaves, a portion of their total stake can be slashed (i.e. destroyed). This includes the stake of their delegators.

There is one main slashing condition:

- **Double signing:** If someone reports on that a validator signed two different blocks with the same chain ID at the same height, this validator will get slashed.

This is why HP holders should perform careful due diligence on validators before delegating. It is also important that delegators actively monitor the activity of their validators. If a validator behaves suspiciously or is too often offline, delegators can choose to unbond from them or switch to another validator. **Delegators can also mitigate risk by distributing their stake across multiple validators.**
