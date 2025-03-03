import {
  createClient,
  http,
  parseAbi,
  publicActions,
  walletActions,
  createTestClient as viemCreateTestClient,
} from "viem";
import { baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

// Use Base Sepolia for Anvil tests
export const anvilChain = {
  ...baseSepolia,
  rpcUrls: {
    ...baseSepolia.rpcUrls,
    default: {
      http: ["http://localhost:8545"],
    },
    public: {
      http: ["http://localhost:8545"],
    },
  },
};

// Anvil default accounts
export const ANVIL_ACCOUNTS = {
  ALICE: {
    address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    privateKey:
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  },
  BOB: {
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    privateKey:
      "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
  },
};

// Real mock token addresses from deployment
export const MOCK_TOKENS = {
  NFT1: "0x6AA9Fa7A3E3529Ee5F566D4c5c2528BE6D7E2eB4" as `0x${string}`, // MockNFT1
  NFT2: "0x0895b774eB8a8b69Ca2DCe1897636d7e79f98d78" as `0x${string}`, // MockNFT2
  MULTI_TOKEN1: "0x7CAA519f345B4128612cD19F1C8C7Bd76A744B71" as `0x${string}`, // MockMultiToken1
  MULTI_TOKEN2: "0xD3e4a076131bE79940c19Dd721aDEED6516aDb7A" as `0x${string}`, // MockMultiToken2
};

// Export commonly used addresses as variables for easy access in tests
export const mockErc721 = MOCK_TOKENS.NFT1;
export const mockErc1155 = MOCK_TOKENS.MULTI_TOKEN1;

// ABIs for mock contracts
export const MOCK_ABIS = {
  ERC721: parseAbi([
    "function mint(address to, uint256 tokenId) public",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function balanceOf(address owner) view returns (uint256)",
  ]),
  ERC1155: parseAbi([
    "function mint(address to, uint256 id, uint256 amount) public",
    "function balanceOf(address account, uint256 id) view returns (uint256)",
    "function balanceOfBatch(address[] memory accounts, uint256[] memory ids) view returns (uint256[] memory)",
  ]),
};

// Create test client for tests with all required actions
export const createTestClient = (privateKey: string) => {
  const account = privateKeyToAccount(privateKey as `0x${string}`);

  // Create wallet client with the account
  return viemCreateTestClient({
    account,
    chain: baseSepolia,
    mode: "anvil",
    transport: http("http://localhost:8545"),
  })
    .extend(publicActions)
    .extend(walletActions);
};

// Function to advance time on Anvil
export const advanceTime = async (
  client: ReturnType<typeof createTestClient>,
  seconds: number,
) => {
  // TestClient has support for anvil actions
  await client.increaseTime({ seconds });
  await client.mine({ blocks: 1 });
};

// Helper to mint ERC721 tokens
export const mintERC721 = async (
  client: ReturnType<typeof createTestClient>,
  token: `0x${string}`,
  to: `0x${string}`,
  tokenId: bigint,
) => {
  const tx = await client.writeContract({
    address: token,
    abi: MOCK_ABIS.ERC721,
    functionName: "mint",
    args: [to, tokenId],
  });

  const receipt = await client.waitForTransactionReceipt({ hash: tx });
  return receipt;
};

// Helper to mint ERC1155 tokens
export const mintERC1155 = async (
  client: ReturnType<typeof createTestClient>,
  token: `0x${string}`,
  to: `0x${string}`,
  tokenId: bigint,
  amount: bigint,
) => {
  const tx = await client.writeContract({
    address: token,
    abi: MOCK_ABIS.ERC1155,
    functionName: "mint",
    args: [to, tokenId, amount],
  });

  const receipt = await client.waitForTransactionReceipt({ hash: tx });
  return receipt;
};
