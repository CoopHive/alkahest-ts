// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Script} from "forge-std/Script.sol";
import {ETHPaymentObligation} from "./obligations/ETHPaymentObligation.sol";

/**
 * @title DeployETHPaymentObligation
 * @notice Deployment script for ETH Payment Obligation contract
 */
contract DeployETHPaymentObligation is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Mock EAS and Schema Registry addresses for testnet
        // In production, these would be the actual deployed EAS contracts
        address easContract = 0x4200000000000000000000000000000000000021; // Base Sepolia EAS
        address schemaRegistry = 0x4200000000000000000000000000000000000020; // Base Sepolia Schema Registry
        
        vm.startBroadcast(deployerPrivateKey);
        
        ETHPaymentObligation ethPaymentObligation = new ETHPaymentObligation(
            easContract,
            schemaRegistry
        );
        
        vm.stopBroadcast();
        
        // Log deployment info (using vm.writeJson for output)
        string memory deploymentInfo = string.concat(
            '{"ethPaymentObligation":"',
            vm.toString(address(ethPaymentObligation)),
            '","attestationSchema":"',
            vm.toString(ethPaymentObligation.ATTESTATION_SCHEMA()),
            '"}'
        );
        
        vm.writeFile("./deployment-info.json", deploymentInfo);
    }
}