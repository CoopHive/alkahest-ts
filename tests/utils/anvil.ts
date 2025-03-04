import {
  createClient,
  createWalletClient as viemCreateWalletClient,
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
  // ERC20 tokens
  ERC20_1: "0x28478AAEcA61D3D7E7e2525491b6255F745476A4" as `0x${string}`, // MockToken1
  ERC20_2: "0x03B8179CF21eFD1f0debD293F0992fC33AF52086" as `0x${string}`, // MockToken2
  
  // ERC721 tokens
  ERC721_1: "0x88185A3ea40806c2f2A98D47BCA67318C856FA31" as `0x${string}`, // MockERC721_1
  ERC721_2: "0xcc68456E23d256F35C4bb84E1f71029D314610d8" as `0x${string}`, // MockERC721_2
  
  // ERC1155 tokens
  ERC1155_1: "0x5bD6f569A4448c43df2c51648DCd2BdbD3288A6C" as `0x${string}`, // MockMultiToken1
  ERC1155_2: "0x4B0478B13834962b9b1F60f125b952E70F83F1Ad" as `0x${string}`, // MockMultiToken2
};

// Export commonly used addresses as variables for easy access in tests
export const mockErc20 = MOCK_TOKENS.ERC20_1;
export const mockErc721 = MOCK_TOKENS.ERC721_1;
export const mockErc1155 = MOCK_TOKENS.ERC1155_1;

// ABIs for mock contracts
export const MOCK_ABIS = {
  ERC20: parseAbi([
    "function mint(address to, uint256 amount) public",
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function transferFrom(address from, address to, uint256 amount) returns (bool)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
    "function totalSupply() view returns (uint256)",
  ]),
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

// Create wallet client for alkahest initialization
export const createWalletClient = (privateKey: string) => {
  const account = privateKeyToAccount(privateKey as `0x${string}`);

  // Create wallet client with the account
  return viemCreateWalletClient({
    account,
    chain: baseSepolia,
    transport: http("http://localhost:8545"),
  }).extend(publicActions);
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

// Helper to mint ERC20 tokens
export const mintERC20 = async (
  client: ReturnType<typeof createTestClient>,
  token: `0x${string}`,
  to: `0x${string}`,
  amount: bigint,
) => {
  const tx = await client.writeContract({
    address: token,
    abi: MOCK_ABIS.ERC20,
    functionName: "mint",
    args: [to, amount],
  });

  const receipt = await client.waitForTransactionReceipt({ hash: tx });
  return receipt;
};
