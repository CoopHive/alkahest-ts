import { createPublicClient, http } from 'viem';
import { foundry } from 'viem/chains';
import { createTokenTestExtension } from './tokenTestUtils';

// Example of how to use token test extensions with viem client
async function example() {
  // Create a public client
  const baseClient = createPublicClient({
    chain: foundry,
    transport: http('http://localhost:8545'),
  });

  // Extend the client with token test capabilities
  const client = baseClient.extend(createTokenTestExtension());

  // Sample token objects following the types from src/types.ts
  const erc20Token = {
    address: '0x1234567890123456789012345678901234567890' as `0x${string}`,
    value: 1000000000000000000n
  };

  const erc721Token = {
    address: '0x2345678901234567890123456789012345678901' as `0x${string}`,
    id: 123n
  };

  const erc1155Token = {
    address: '0x3456789012345678901234567890123456789012' as `0x${string}`,
    id: 456n,
    value: 10n
  };

  const aliceAddress = '0xabcdef1234567890abcdef1234567890abcdef12' as `0x${string}`;

  try {
    // Get ERC20 balance using structured token object
    const erc20Balance = await client.getERC20Balance(erc20Token, aliceAddress);
    console.log(`ERC20 Balance: ${erc20Balance}`);

    // Get ERC721 owner using structured token object
    const erc721Owner = await client.getERC721Owner(erc721Token);
    console.log(`ERC721 Owner: ${erc721Owner}`);

    // Get ERC1155 balance using structured token object
    const erc1155Balance = await client.getERC1155Balance(erc1155Token, aliceAddress);
    console.log(`ERC1155 Balance: ${erc1155Balance}`);
  } catch (error) {
    console.error('Error interacting with tokens:', error);
  }
}

// The example function isn't meant to be executed in this context
// It's just to demonstrate the API usage pattern