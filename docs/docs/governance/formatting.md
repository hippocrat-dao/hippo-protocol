---
title: Formatting a Proposal
order: 4
---

<!-- markdown-link-check-disable -->

Many proposals allow for long form text to be included, usually under the key `description`. These provide the opportunity to include [markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) if formatted correctly, as well as line breaks with `\n`.

Beware, however, that if you are using the CLI to create a proposal, and setting `description` using a flag, the text will be [escaped](https://en.wikipedia.org/wiki/Escape_sequences_in_C) which may have undesired effects.

Formatting a proposal can be a trial-and-error process, which is why first submitting to the [testnet](submitting.md#submitting-your-proposal-to-the-testnet) is recommended.

<!-- markdown-link-check-enable -->

The examples shown below are of the text in a `json` file packaged into a `submit-proposal` transaction sent on-chain. More details about how to submit a proposal are in the [Submitting a Governance Proposal](./submitting.md) section, but for now just be aware that the examples are the contents of a file separate from the transaction. As a general rule, any flags specific to a proposal (e.g., Title, description, deposit, parameters, recipient) can be placed in a `json` file, while flags general to a transaction of any kind (e.g., chain-id, node-id, gas, fees) can remain in the CLI.

## Text

Text proposals are used by delegators to agree to a certain strategy, plan, commitment, future upgrade, or any other statement in the form of text. Aside from having a record of the proposal outcome on the Hippo Protocol chain, a text proposal has no direct effect on the change Hippo Protocol.

There are four components:

1. **Title** - the distinguishing name of the proposal, typically the way that explorers list proposals
2. **Summary** - the body of the proposal that further describes what is being proposed and details surrounding the proposal
3. **Deposit** - the amount that will be contributed to the deposit (in alpha-HPs "ahp") from the account submitting the proposal
4. **Metadata** - usually a link to an off-chain resource

### Real example

Proposal could ask if the Hippo Protocol community of validators charging 0% commission is harmful to the success of the Hippo Protocol.

You can use `hippod tx gov draft-proposal` and choose `text` to create the proposal file.

You must submit the proposal using `hippod tx gov submit-proposal <path_to_text_proposal.json>`.

```json
{
  "title": "Are Validators Charging 0% Commission Harmful to the Success of the Hippo Protocol?",
  "summary": "This governance proposal is intended to act purely as a signalling proposal. Throughout this history of the Hippo Protocol, there has been much debate about the impact that validators charging 0% commission has on the Hippo Protocol, particularly with respect to the decentralization of the Hippo Protocol and the sustainability for validator operations. Discussion around this topic has taken place in many places including numerous threads on the Cosmos Forum, public Telegram channels, and in-person meetups. Because this has been one of the primary discussion points in off-chain Cosmos governance discussions, we believe it is important to get a signal on the matter from the on-chain governance process of the Hippo Protocol. There have been past discussions on the Cosmos Forum about placing an in-protocol restriction on validators from charging 0% commission. https://forum.cosmos.network/t/governance-limit-validators-from-0-commission-fee/2182 This proposal is NOT proposing a protocol-enforced minimum. It is merely a signalling proposal to query the viewpoint of the bonded Atom holders as a whole. We encourage people to discuss the question behind this governance proposal in the associated Hippo Protocol forum post here: https://forum.cosmos.network/t/proposal-are-validators-charging-0-commission-harmful-to-the-success-of-the-cosmos-hub/2505 Also, for voters who believe that 0% commission rates are harmful to the network, we encourage optionally sharing your belief on what a healthy minimum commission rate for the network using the memo field of their vote transaction on this governance proposal or linking to a longer written explanation such as a Forum or blog post. The question on this proposal is “Are validators charging 0% commission harmful to the success of the Hippo Protocol?”. A Yes vote is stating that they ARE harmful to the network's success, and a No vote is a statement that they are NOT harmful.",
  "deposit": "1000000000000000000ahp",
  "metadata": "ipfs://CID"
}
```

## Community Pool Spend

There are five (5) components:

1. **Title** - the distinguishing name of the proposal, typically the way that explorers list proposals
2. **Summary** - the body of the proposal that further describes what is being proposed and details surrounding the proposal
3. **Recipient** - the Hippo Protocol (bech32-based) address that will receive funding from the Community Pool
4. **Amount** - the amount of funding that the recipient will receive in alpha-HPs (ahp)
5. **Deposit** - the amount that will be contributed to the deposit (in alpha-HPs "ahp") from the account submitting the proposal

If the description says that a certain address will receive a certain number of HPs, it should also be programmed to do that, but it's possible that that's not the case (accidentally or otherwise). Check that the description aligns with the 'recipient' address.

### Real example

The `amount` is `1000000000000000000ahp`. 1000000000000000000 alpha-HP is equal to 1 HP, so `recipient` address `hippo1xf2qwf6g6xvuttpf37xwrgp08qq984244952ze` will receive 1000 HP if this proposal is passed.

The `"deposit": "1000000000000000000ahp` results in 1 HP being used from the proposal submitter's account.

You can use the `hippod tx gov draft-proposal` utility and choose `/cosmos.distribution.v1beta1.MsgCommunityPoolSpend` to create a draft proposal file.

You must use `hippod tx gov submit-proposal <path_to_proposal_file.json>` to submit the proposal. The proposal cannot be submitted using `submit-legacy-proposal`.

```json
{
  "messages": [
    {
      "@type": "/cosmos.distribution.v1beta1.MsgCommunityPoolSpend",
      "authority": "hippo10d07y265gmmuvt4z0w9aw880jnsr700j6zn9kn",
      "recipient": "hippo00af8sd0a9dfansdfoiasf0a9ssd9fa09i99990",
      "amount": [
        {
          "denom": "ahp",
          "amount": "1000000000000000000000"
        }
      ]
    }
  ],
  "deposit": "1000000000000000000ahp",
  "proposer": "hippo12xpdapokdfpsodf32das75sokdaadapsokd1sa",
  "metadata": "Community Pool Spend Proposal Example",
  "title": "Activate governance discussions on the Discourse forum using community pool funds",
  "summary": "## Summary\nProposal to request for 1000 HP from the community spending pool to be sent to a multisig who will put funds towards stewardship of the Discourse forum to make it an authoritative record of governance decisions as well as a vibrant space to draft and discuss proposals.\n## Details\nWe are requesting 1000 HP from the community spending pool to activate and steward the Hippo Protocol (Discourse) forum for the next six months.\n\nOff-chain governance conversations are currently highly fragmented, with no shared public venue for discussing proposals as they proceed through the process of being drafted and voted on. It means there is no record of discussion that voters can confidently point to for context, potentially leading to governance decisions becoming delegitimized by stakeholders.\n\nThe requested amount will be sent to a multisig comprising individuals (members listed below) who can ensure that the tokens are spent judiciously. We believe stewardship of the forum requires:\n\n* **Moderation**: Format, edit, and categorize posts; Standardize titles and tags; Monitor and approve new posts; Archive posts.\n* **Facilitation**: Ask clarifying questions in post threads; Summarize discussions; Provide historical precedence to discussions.\n* **Engagement**: Circulate important posts on other social channels to increase community participation; Solicit input from key stakeholders.\n* **Guidance**: Orient and assist newcomers; Guide proposers through governance process; Answer questions regarding the forum or Cosmos ecosystem.\nThe work to steward the forum will be carried out by members of [Hypha Worker Co-op](https://hypha.coop/) and individuals selected from the community to carry out scoped tasks in exchange for HP from this budget.\n## Multisig Members\n* Hypha: Mai Ishikawa Sutton (Hypha Co-op)\n* Validator: Daniel Hwang (Stakefish)\n* Hippo Protocol developer: Lauren Gallinaro (Interchain Berlin)\n\nWe feel the membership of the multisig should be rotated following the six-month pilot period to preserve insight from the distinct specializations (i.e., Hippo Protocol validators and developers).\n## Timeline and Deliverables\nWe estimate the total work to take 250-300 hours over six months where we hope to produce:\n* **Moving summaries:** Provide succinct summaries of the proposals and include all publicly stated reasons why various entities are choosing to vote for/against a given proposal. These summaries will be written objectively, not siding with any one entity.\n* **Validator platforms:** Create a section of the Forum where we collate all validators' visions for Hippo Protocol governance to allow them to state their positions publicly. We will work with the smaller validators to ensure they are equally represented.\n* **Regular check-ins with the Cosmonaut DAO:** Collaborate with the future Cosmonaut DAO to ensure maximal accessibility and engagement. Community management is a critical, complementary aspect of increasing participation in governance.\n* **Announcement channel:** Create a read-only announcement channel in the Cosmos Community Discord, so that new proposals and major discussions can be easily followed.\n* **Tooling friendly posts:** Tag and categorize posts so that they can be easily ingested into existing tooling that validators have setup.\n* **Neutral moderation framework:** Document and follow transparent standards for how the forum is moderated.\n\nAt the end of the period, we will produce a report reflecting on our successes and failures, and recommendations for how the work of maintaining a governance venue can be continuously sustained (e.g., through a DAO). We see this initiative as a process of discovery, where we are learning by doing.\n\nFor more context, you can read through the discussions on this [proposal on the Discourse forum](https://forum.cosmos.network/t/proposal-draft-activate-governance-discussions-on-the-discourse-forum-using-community-pool-funds/5833).\n\n## Governance Votes\nThe following items summarize the voting options and what it means for this proposal:\n**YES** - You approve this community spend proposal to deposit 1000 HP to a multisig that will spend them to improve governance discussions in the Discourse forum.\n**NO** - You disapprove of this community spend proposal in its current form (please indicate why in the Cosmos Forum).\n**NO WITH VETO** - You are strongly opposed to this change and will exit the network if passed.\n**ABSTAIN** - You are impartial to the outcome of the proposal.\n## Recipient\nhippo1xf2qwf6g6xvuttpf37xwrgp08qq984244952ze\n## Amount\n1000 HP\n\n***Disclosure**: Hypha has an existing contract with the Interchain Foundation focused on the testnet program and improving documentation. This work is beyond the scope of that contract and is focused on engaging the community in governance.*\n\nIPFS pin of proposal on-forum: (https://ipfs.io/ipfs/Qmaq7ftqWccgYCo8U1KZfEnjvjUDzSEGpMxcRy61u8gf2Y)"
}
```

## Legacy Param Change

:::tip
Legacy parameter change proposals are not available for cosmos-sdk modules.

You can update these Hippo Protocol modules using `submit-legacy-proposal`:

- ibc (transfer, interchain-accounts)
- provider
  :::

**Note:** The changes outlined here must be submitted using `submit-legacy-proposal`.

For `param-change` proposals, there are arguably seven (7) components, though three are nested beneath 'Changes':

1. **Title** - the distinguishing name of the proposal, typically the way that explorers list proposals
2. **Description** - the body of the proposal that further describes what is being proposed and details surrounding the proposal
3. **Changes** - a component containing
4. **Subspace** - the Hippo Protocol module with the parameter that is being changed
5. **Key** - the parameter that will be changed
6. **Value** - the value of the parameter that will be changed by the governance mechanism
7. **Deposit** - the amount that will be contributed to the deposit (in alpha-HPs "ahp") from the account submitting the proposal

The components must be presented as shown in the example.

:::info
To update any of the cosmos-sdk modules you must use `hippod tx gov submit-proposal` with a correctly formatted proposal file containing a `MsgUpdateParams`.

When using `MsgUpdateParams` please note that **all** fields must always be specified (`PUT` semantics). Please be careful to not accidentally submit a proposal
that changes more parameters than was intended. The parameters that you do not want to change you can simply copy from existing module params.
:::

### Real example

This example is 'real', because it was put on-chain using the Theta testnet and can be seen in the block explorer [here](https://explorer.theta-testnet.polypore.xyz/proposals/87).

Not all explorers will show the proposed parameter changes that are coded into the proposal, so ensure that you verify that the description aligns with what the governance proposal is programmed to enact. If the description says that a certain parameter will be increased, it should also be programmed to do that, but it's possible that that's not the case (accidentally or otherwise).

```json
{
  "title": "Doc update test: Param change for transfer/SendEnabled",
  "description": "Testing the proposal format for enabling IBC transfers on our chain",
  "changes": [
    {
      "subspace": "transfer",
      "key": "transfer",
      "value": true
    }
  ],
  "deposit": "1000000000000000000ahp"
}
```
