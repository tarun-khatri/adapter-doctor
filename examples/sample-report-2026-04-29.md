# Adapter Doctor scan — 2026-04-28T20:26:45.241Z

Repo: `C:\Users\dell\job-apply\defillama\DefiLlama-Adapters` @ 2ed9245db
Scanned: **250** adapters · concurrency 5 · timeout 120s
Clean: **102** · Flagged: **148**

## Counts by check

| Check | Count |
|---|---:|
| THROWS / ERROR block | 29 |
| TIMEOUT | 3 |
| NON_ZERO_EXIT | 29 |
| ZERO_TVL | 27 |
| NO_TVL_BLOCK | 0 |
| LEGACY_TVL_SIGNATURE | 0 |
| MISSING_METHODOLOGY | 119 |

## THROWS — 29 adapters

| Adapter | Detail | Run time |
|---|---|---:|
| `projects/01/index.js` | Error: Promise pool failed! \| Error: Failed to post https://api.mainnet-beta.solana.com | 5s |
| `projects/10kswap/index.js` | Error: Promise pool failed! \| TypeError: Spread syntax requires ...iterable[Symbol.iterator] to be a function | 7s |
| `projects/21-co/index.js` | Error: Promise pool failed! \| Error: Failed to post https://api.mainnet-beta.solana.com | 17s |
| `projects/abstraDex/index.js` | Error: Promise pool failed! \| Error: Failed to call: uint256:allPairsLength target: 0x174c4c03dfea09682728a5959a253bf1f7c7766f on chain: [morph] rpc: https://rpc-hoodi.morphl2.io  call reverted, reas | 15s |
| `projects/acala-dex/index.js` | Error: Promise pool failed! \| Error: Elasticsearch client not configured | 9s |
| `projects/acala-lcdot/index.js` | Error: Promise pool failed! \| Error: Elasticsearch client not configured | 6s |
| `projects/acala-lending/index.js` | Error: Promise pool failed! \| Error: Elasticsearch client not configured | 6s |
| `projects/acala-staking/index.js` | Error: Promise pool failed! \| Error: Elasticsearch client not configured | 6s |
| `projects/accumulated-finance/index.js` | Error: Promise pool failed! \| Error: Llama RPC error! method: call | 13s |
| `projects/adrastea/index.js` | Error: Promise pool failed! \| Error: Failed to post https://api.mainnet-beta.solana.com | 5s |
| `projects/adrastea-lrt/index.js` | Error: Promise pool failed! \| Error: Failed to post https://api.mainnet-beta.solana.com | 4s |
| `projects/adrena/index.js` | Error: Promise pool failed! \| Error: Failed to post https://api.mainnet-beta.solana.com | 6s |
| `projects/aegis/index.js` | Error: Promise pool failed! \| TypeError: Cannot read properties of undefined (reading '_meta') | 6s |
| `projects/aeria/index.js` | Error: \| Found export keys that were not part of specification: doublecouted | 5s |
| `projects/aldrin/index.js` | Error: Promise pool failed! \| SolanaJSONRPCError: failed to get accounts owned by program CURVGoZn8zycx6FXwwevgBTB2gVvdbGTEpvMJDbgs2t4: CURVGoZn8zycx6FXwwevgBTB2gVvdbGTEpvMJDbgs2t4 excluded from acco | 9s |
| `projects/alexlab/index.js` | Error: Promise pool failed! \| Error: Elasticsearch client not configured | 8s |
| `projects/allbridge-core/index.js` | Error: Promise pool failed! \| Error: Failed to post https://api.mainnet-beta.solana.com | 10s |
| `projects/allstake/index.js` | Error: Promise pool failed! \| Error: Failed to post https://api.mainnet-beta.solana.com | 12s |
| `projects/alpaca-finance-lend/index.js` | Error: Promise pool failed! \| Error: Multicall failed! | 10s |
| `projects/alpha-arcade/index.js` | Error: Promise pool failed! \| [host: https://g08245wvl7.execute-api.us-east-1.amazonaws.com/api/get-markets] [404] Not Found | 7s |
| `projects/alphix/index.js` | Error: Promise pool failed! \| Error: auth error: payment required for subsequent requests for this API key | 7s |
| `projects/altr-lend/index.js` | Error: Promise pool failed! \| GraphQL request failed! auth error: payment required for subsequent requests for this API key | 5s |
| `projects/amber-finance/index.js` | Error: Promise pool failed! \| Error: Failed to get https://rest-solara.neutron-1.neutron.org/cosmwasm/wasm/v1/contract/neutron1k8xyccg9nvfavagqjsqngh66w4z286utqweswl4txtnewaymkc9ss5f5e8/smart/eyJtYXJ | 6s |
| `projects/amulet-finance/index.js` | Error: Promise pool failed! \| Error: Failed to get https://rest-solara.neutron-1.neutron.org/cosmwasm/wasm/v1/contract/neutron16d4a7q3wfkkawj4jwyzz6g97xtmj0crkyn06ev74fu4xsgkwnreswzfpcy/smart/eyJsaXN | 6s |
| `projects/amulet-v2/index.js` | Error: Promise pool failed! \| Error: Failed to post https://api.mainnet-beta.solana.com | 16s |
| `projects/anyhedge/index.js` | Error: Promise pool failed! \| Data for the date is incomplete, awaiting contract reveals. | 5s |
| `projects/apechainstake/index.js` | Error: Promise pool failed! \| Error: Llama RPC error! method: call | 6s |
| `projects/apollodao/index.js` | Error: Promise pool failed! \| Error: Failed to get https://rest-solara.neutron-1.neutron.org/cosmwasm/wasm/v1/contract/neutron1yvhe4f0q3swtf37pkf9kku59l52nevr3trxs62vah004a08pkl8qlaccc7/smart/eyJpbmZ | 20s |
| `projects/aqua-network/index.js` | Error: Promise pool failed! \| Error: No data found for current date | 6s |

## TIMEOUT — 3 adapters

| Adapter | Detail | Run time |
|---|---|---:|
| `projects/aerodrome-CL/index.js` | test.js exceeded 120s timeout | 120s |
| `projects/aftermath-fi/index.js` | test.js exceeded 120s timeout | 120s |
| `projects/ambient-finance/index.js` | test.js exceeded 120s timeout | 120s |

## ZERO_TVL — 27 adapters

| Adapter | Detail | Run time |
|---|---|---:|
| `projects/0xacid/index.js` | total reported as 0 across all chains | 8s |
| `projects/0xRoulette/index.js` | total reported as 0 across all chains | 6s |
| `projects/0xscans/index.js` | total reported as 0 across all chains | 7s |
| `projects/1155Tech/index.js` | total reported as 0 across all chains | 8s |
| `projects/5ire-dapp-staking/index.js` | total reported as 0 across all chains | 8s |
| `projects/aark/index.js` | total reported as 0 across all chains | 9s |
| `projects/access-protocol/index.js` | total reported as 0 across all chains | 7s |
| `projects/acet/index.js` | total reported as 0 across all chains | 7s |
| `projects/aerie/index.js` | total reported as 0 across all chains | 11s |
| `projects/aethir/index.js` | total reported as 0 across all chains | 8s |
| `projects/agix-staking/index.js` | total reported as 0 across all chains | 4s |
| `projects/aitech/index.js` | total reported as 0 across all chains | 5s |
| `projects/aixcb/index.js` | total reported as 0 across all chains | 5s |
| `projects/akiba/index.js` | total reported as 0 across all chains | 10s |
| `projects/akropolis/index.js` | total reported as 0 across all chains | 7s |
| `projects/algoblocks/index.js` | total reported as 0 across all chains | 6s |
| `projects/alien-finance/index.js` | total reported as 0 across all chains | 5s |
| `projects/alkimi/index.js` | total reported as 0 across all chains | 5s |
| `projects/allora/index.js` | total reported as 0 across all chains | 7s |
| `projects/allspark/index.js` | total reported as 0 across all chains | 7s |
| `projects/alpacacity/index.js` | total reported as 0 across all chains | 7s |
| `projects/alphpad/index.js` | total reported as 0 across all chains | 4s |
| `projects/alta-finance/index.js` | total reported as 0 across all chains | 6s |
| `projects/ambire-wallet/index.js` | total reported as 0 across all chains | 6s |
| `projects/amet-finance/index.js` | total reported as 0 across all chains | 17s |
| `projects/amulet-protocol/index.js` | total reported as 0 across all chains | 8s |
| `projects/animal-farm-dog/index.js` | total reported as 0 across all chains | 9s |

## MISSING_METHODOLOGY — 89 adapters

| Adapter | Detail | Run time |
|---|---|---:|
| `projects/0x0dex/index.js` | no methodology field found in adapter source | 6s |
| `projects/0xDAO/index.js` | no methodology field found in adapter source | 28s |
| `projects/0xzebra/index.js` | no methodology field found in adapter source | 6s |
| `projects/1776meme/index.js` | no methodology field found in adapter source | 7s |
| `projects/1beam/index.js` | no methodology field found in adapter source | 8s |
| `projects/1intro/index.js` | no methodology field found in adapter source | 7s |
| `projects/1swap/index.js` | no methodology field found in adapter source | 8s |
| `projects/246Club/index.js` | no methodology field found in adapter source | 11s |
| `projects/3a-dao/index.js` | no methodology field found in adapter source | 18s |
| `projects/3fmutual/index.js` | no methodology field found in adapter source | 5s |
| `projects/9inch-io/index.js` | no methodology field found in adapter source | 85s |
| `projects/a51-finance-v3/index.js` | no methodology field found in adapter source | 40s |
| `projects/aave-aptos/index.js` | no methodology field found in adapter source | 6s |
| `projects/aave-umbrella/index.js` | no methodology field found in adapter source | 22s |
| `projects/aave-v1/index.js` | no methodology field found in adapter source | 23s |
| `projects/aave-v3/index.js` | no methodology field found in adapter source | 21s |
| `projects/abacus/index.js` | no methodology field found in adapter source | 8s |
| `projects/abex-finance/index.js` | no methodology field found in adapter source | 9s |
| `projects/aborean-CL/index.js` | no methodology field found in adapter source | 15s |
| `projects/abracadabra/index.js` | no methodology field found in adapter source | 10s |
| `projects/abstract/index.js` | no methodology field found in adapter source | 21s |
| `projects/accumulator/index.js` | no methodology field found in adapter source | 13s |
| `projects/acoconut/index.js` | no methodology field found in adapter source | 7s |
| `projects/across/index.js` | no methodology field found in adapter source | 7s |
| `projects/ad-astra/index.js` | no methodology field found in adapter source | 6s |
| `projects/aegis-yusd/index.js` | no methodology field found in adapter source | 6s |
| `projects/aera/index.js` | no methodology field found in adapter source | 59s |
| `projects/aerodrome-ignition/index.js` | no methodology field found in adapter source | 61s |
| `projects/aevo-xyz/index.js` | no methodology field found in adapter source | 10s |
| `projects/affine-defi-liquid/index.js` | no methodology field found in adapter source | 16s |
| `projects/agdex/index.js` | no methodology field found in adapter source | 8s |
| `projects/agora/index.js` | no methodology field found in adapter source | 8s |
| `projects/agoric/index.js` | no methodology field found in adapter source | 6s |
| `projects/ainnswap/index.js` | no methodology field found in adapter source | 6s |
| `projects/airpuff/index.js` | no methodology field found in adapter source | 15s |
| `projects/ajna/index.js` | no methodology field found in adapter source | 10s |
| `projects/ajna-v2/index.js` | no methodology field found in adapter source | 33s |
| `projects/aladdin-dao/index.js` | no methodology field found in adapter source | 14s |
| `projects/alchemist/index.js` | no methodology field found in adapter source | 28s |
| `projects/alchemix/index.js` | no methodology field found in adapter source | 17s |
| `projects/algebra/index.js` | no methodology field found in adapter source | 9s |
| `projects/algofi/index.js` | no methodology field found in adapter source | 5s |
| `projects/algofi-swap/index.js` | no methodology field found in adapter source | 37s |
| `projects/algofi-valgo/index.js` | no methodology field found in adapter source | 5s |
| `projects/algomint/index.js` | no methodology field found in adapter source | 6s |
| `projects/algorai-finance/index.js` | no methodology field found in adapter source | 7s |
| `projects/alienx/index.js` | no methodology field found in adapter source | 6s |
| `projects/alkimiya/index.js` | no methodology field found in adapter source | 6s |
| `projects/alligator-exchange/index.js` | no methodology field found in adapter source | 8s |
| `projects/almanak/index.js` | no methodology field found in adapter source | 24s |
| `projects/alpaca-finance/index.js` | no methodology field found in adapter source | 14s |
| `projects/alpacafinance-gmx/index.js` | no methodology field found in adapter source | 7s |
| `projects/alphafi/index.js` | no methodology field found in adapter source | 21s |
| `projects/alphaX-protocol/index.js` | no methodology field found in adapter source | 7s |
| `projects/alphbanx/index.js` | no methodology field found in adapter source | 6s |
| `projects/altera-finance/index.js` | no methodology field found in adapter source | 9s |
| `projects/alternity/index.js` | no methodology field found in adapter source | 6s |
| `projects/althea-dex/index.js` | no methodology field found in adapter source | 9s |
| `projects/altitude/index.js` | no methodology field found in adapter source | 10s |
| `projects/amnis-finance/index.js` | no methodology field found in adapter source | 6s |
| `projects/amogus-dao/index.js` | no methodology field found in adapter source | 6s |
| `projects/amphor/index.js` | no methodology field found in adapter source | 7s |
| `projects/ancient8/index.js` | no methodology field found in adapter source | 10s |
| `projects/anemoy-capital/index.js` | no methodology field found in adapter source | 9s |
| `projects/anetabtc/index.js` | no methodology field found in adapter source | 19s |
| `projects/angles/index.js` | no methodology field found in adapter source | 10s |
| `projects/angles-liquid/index.js` | no methodology field found in adapter source | 10s |
| `projects/angstrom/index.js` | no methodology field found in adapter source | 7s |
| `projects/animeswap/index.js` | no methodology field found in adapter source | 8s |
| `projects/anome/index.js` | no methodology field found in adapter source | 5s |
| `projects/ante/index.js` | no methodology field found in adapter source | 11s |
| `projects/antfarm-finance/index.js` | no methodology field found in adapter source | 8s |
| `projects/anvil/index.js` | no methodology field found in adapter source | 7s |
| `projects/anyswap/index.js` | no methodology field found in adapter source | 67s |
| `projects/aoabt/index.js` | no methodology field found in adapter source | 5s |
| `projects/aof-stake-mining/index.js` | no methodology field found in adapter source | 6s |
| `projects/ape-express/index.js` | no methodology field found in adapter source | 91s |
| `projects/apebond/index.js` | no methodology field found in adapter source | 13s |
| `projects/apechain/index.js` | no methodology field found in adapter source | 6s |
| `projects/apeCoinStaking/index.js` | no methodology field found in adapter source | 5s |
| `projects/aperture/index.js` | no methodology field found in adapter source | 7s |
| `projects/apestore/index.js` | no methodology field found in adapter source | 6s |
| `projects/apex/index.js` | no methodology field found in adapter source | 7s |
| `projects/apex-omni/index.js` | no methodology field found in adapter source | 7s |
| `projects/apexdefi/index.js` | no methodology field found in adapter source | 10s |
| `projects/apollon/index.js` | no methodology field found in adapter source | 14s |
| `projects/apollox/index.js` | no methodology field found in adapter source | 11s |
| `projects/appchain/index.js` | no methodology field found in adapter source | 10s |
| `projects/aptoswap/index.js` | no methodology field found in adapter source | 6s |

