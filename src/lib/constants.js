import {
  TransactionsApi,
  SmartContractsApi,
  AccountsApi,
  Configuration,
  InfoApi,
} from '@stacks/blockchain-api-client';
import { StacksTestnet, StacksMainnet } from '@stacks/network';

export const mainnet = window.location.search.includes('chain=mainnet');
export const localMocknet = !mainnet && window.location.search.includes('mocknet=local');
export const testnet =
  (!mainnet && !localMocknet) || window.location.search.includes('chain=testnet');

export const chainSuffix = `?chain=${mainnet ? 'mainnet' : testnet ? 'testnet' : 'mocknet'}`;
export const localNode = localMocknet;
export const localAuth = false;
export const mocknet = localMocknet;

console.log({ localNode, localAuth, mocknet, testnet, mainnet });

export const GENESIS_CONTRACT_ADDRESS = 'ST000000000000000000002AMW42H';
export const BNS_CONTRACT_NAME = 'bns';

export const CONTRACT_DEPLOYER = testnet
  ? 'ST3CK642B6119EVC6CT550PW5EZZ1AJW6608HK60A'
  : 'SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27';
export const CITYCOIN_VRF = 'citycoin-vrf';
export const CITYCOIN_CORE = testnet ? 'citycoin-core-v4' : 'miamicoin-core-v1';
export const CITYCOIN_AUTH = testnet ? 'citycoin-auth' : 'miamicoin-auth';
export const CITYCOIN_TOKEN = testnet ? 'citycoin-token' : 'miamicoin-token';
export const CITYCOIN_NAME = testnet ? 'citycoins' : 'miamicoin';
export const CITYCOIN_SYMBOL = testnet ? '$CITY' : '$MIA';
export const REWARD_CYCLE_LENGTH = mainnet ? 2100 : 50;

// TODO: remove below in favor of const above
// export const TOKEN_CONTRACT_ADDRESS = 'ST3CK642B6119EVC6CT550PW5EZZ1AJW6608HK60A';
export const CITYCOIN_CONTRACT_NAME = mocknet ? 'citycoin' : 'citycoin-core-v1';
export const CITYCOIN_CONTRACT_NAME_TOKEN = 'citycoin-token';
export const CC_NAME = 'citycoin';
export const CC_SYMBOL = '$CITY';

// TODO: add Freehold API endpoint?
export const STACK_API_URL = localNode
  ? 'http://localhost:3999'
  : mainnet
  ? 'https://stacks-node-api.mainnet.stacks.co'
  : 'https://stacks-node-api.testnet.stacks.co';
export const STACKS_API_WS_URL = localNode
  ? 'ws:localhost:3999/'
  : mainnet
  ? 'wss://stacks-node-api.mainnet.stacks.co/'
  : 'wss://stacks-node-api.testnet.stacks.co/';
export const STACKS_API_ACCOUNTS_URL = `${STACK_API_URL}/v2/accounts`;

export const NETWORK = mainnet ? new StacksMainnet() : new StacksTestnet();
NETWORK.coreApiUrl = STACK_API_URL;

const basePath = STACK_API_URL;
const config = new Configuration({ basePath });
export const accountsApi = new AccountsApi(config);
export const smartContractsApi = new SmartContractsApi(config);
export const transactionsApi = new TransactionsApi(config);
export const infoApi = new InfoApi(config);
