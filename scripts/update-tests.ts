#!/usr/bin/env bun

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

// Pattern to match in test files
const oldImportPattern = `import { beforeAll, expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import { privateKeyToAccount, nonceManager } from "viem/accounts";
import { baseSepolia } from "viem/chains";`;

const newImportPattern = `import { beforeAll, beforeEach, expect, test } from "bun:test";
import { contractAddresses, makeClient } from "../src";
import { ANVIL_ACCOUNTS, createTestClient } from "./utils/anvil";
import { abi as erc20Abi } from "../src/contracts/IERC20";`;

const oldClientCreationPattern = `beforeAll(() => {
	// create clients
	clientBuyer = makeClient(
		createWalletClient({
			account: privateKeyToAccount(process.env.PRIVKEY_ALICE as \`0x\${string}\`, {
				nonceManager, // automatic nonce management
			}),
			chain: baseSepolia,
			transport: http(process.env.RPC_URL as string),
		}),
	);
	clientSeller = makeClient(
		createWalletClient({
			account: privateKeyToAccount(process.env.PRIVKEY_BOB as \`0x\${string}\`, {
				nonceManager, // automatic nonce management
			}),
			chain: baseSepolia,
			transport: http(process.env.RPC_URL as string),
		}),
	);
});`;

const newClientCreationPattern = `beforeAll(() => {
	// create clients using Anvil default accounts
	clientBuyer = makeClient(createTestClient(ANVIL_ACCOUNTS.ALICE.privateKey));
	clientSeller = makeClient(createTestClient(ANVIL_ACCOUNTS.BOB.privateKey));
});`;

async function updateTestFiles() {
  const testsDir = join(process.cwd(), 'tests');
  
  // Get all test files
  const files = await readdir(testsDir);
  const testFiles = files.filter(file => file.endsWith('.test.ts'));
  
  console.log(`Found ${testFiles.length} test files to update.`);
  
  for (const file of testFiles) {
    const filePath = join(testsDir, file);
    console.log(`Updating ${file}...`);
    
    let content = await readFile(filePath, 'utf8');
    
    // Skip files that we've already updated (tradeErc20.test.ts)
    if (content.includes('import { ANVIL_ACCOUNTS, createTestClient } from "./utils/anvil"')) {
      console.log(`Skipping ${file}, already updated.`);
      continue;
    }
    
    // Replace imports
    content = content.replace(oldImportPattern, newImportPattern);
    
    // Replace client creation
    content = content.replace(oldClientCreationPattern, newClientCreationPattern);
    
    // Remove createWalletClient import if it exists
    content = content.replace('import {\n\tcreateWalletClient,', 'import {');
    content = content.replace('import { createWalletClient,', 'import {');
    content = content.replace(',\n\thttp,', ',');
    content = content.replace(', http,', ',');
    
    // Write updated content back to file
    await writeFile(filePath, content);
    console.log(`Updated ${file}`);
  }
  
  console.log('All test files updated successfully!');
}

updateTestFiles().catch(console.error);