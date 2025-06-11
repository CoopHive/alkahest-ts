# Enhanced Filters for arbitratePast Function

This document outlines the comprehensive set of additional filters that have been implemented for the `arbitratePast` function to improve its flexibility and performance.

## Overview

The `arbitratePast` function has been enhanced with five categories of filters:
1. **Time-based Filters** - Control processing based on attestation timestamps
2. **Attestation Property Filters** - Filter by attestation metadata
3. **Block Range Filters** - Limit search to specific blockchain block ranges
4. **Batch Processing Filters** - Control processing volume and order
5. **Performance Filters** - Optimize execution and enable testing modes

## Filter Categories

### 1. Time-Based Filters (`TimeFilters`)

Control processing based on attestation timestamps and ages:

```typescript
interface TimeFilters {
  minTime?: bigint;           // Only process attestations after this timestamp (Unix seconds)
  maxTime?: bigint;           // Only process attestations before this timestamp (Unix seconds)
  excludeExpired?: boolean;   // Skip attestations past their expiration time
  minAge?: bigint;           // Only process attestations older than this duration (seconds)
  maxAge?: bigint;           // Only process attestations newer than this duration (seconds)
}
```

**Use Cases:**
- Process only recent attestations: `maxAge: 3600n` (last hour)
- Skip very old attestations: `minAge: 86400n` (older than 1 day)
- Historical analysis: `minTime: 1672531200n, maxTime: 1675209600n` (specific date range)
- Exclude expired attestations: `excludeExpired: true`

### 2. Attestation Property Filters (`AttestationFilters`)

Filter based on attestation metadata and relationships:

```typescript
interface AttestationFilters {
  specificAttester?: string;    // Only process attestations from specific attester
  excludeAttesters?: string[];  // Skip attestations from these attesters
  specificRecipient?: string;   // Only process attestations for specific recipient
  excludeRevoked?: boolean;     // Skip revoked attestations
  requireRefUID?: boolean;      // Only process attestations with reference UID
  specificSchema?: string;      // Only process attestations with specific schema
}
```

**Use Cases:**
- Trust-based filtering: `specificAttester: "0x123..."` (only trusted sources)
- Blacklist filtering: `excludeAttesters: ["0xabc...", "0xdef..."]`
- Schema-specific processing: `specificSchema: "0x456..."`
- Linked attestations only: `requireRefUID: true`

### 3. Block Range Filters (`BlockFilters`)

Optimize blockchain queries and limit search scope using Viem's native block types:

```typescript
interface BlockFilters {
  fromBlock?: BlockNumber | BlockTag;  // Start from specific block number or tag
  toBlock?: BlockNumber | BlockTag;    // End at specific block number or tag
  maxBlockRange?: bigint;              // Limit the block range to prevent timeouts
}
```

**Block Types (from Viem):**
- `BlockNumber`: `bigint` - Specific block number
- `BlockTag`: `"latest" | "earliest" | "pending" | "safe" | "finalized"` - Block tags

**Use Cases:**
- Recent activity: `fromBlock: currentBlock - 1000n`
- Historical analysis: `fromBlock: 15000000n, toBlock: 16000000n`
- Performance optimization: `maxBlockRange: 10000n`

### 4. Batch Processing Filters (`BatchFilters`)

Control processing volume and order:

```typescript
interface BatchFilters {
  maxStatements?: number;       // Limit number of statements to process
  prioritizeRecent?: boolean;   // Process recent attestations first
  batchSize?: number;          // Process in batches of this size
}
```

**Use Cases:**
- Quick processing: `maxStatements: 10`
- Priority processing: `prioritizeRecent: true, maxStatements: 5`
- Memory management: `batchSize: 100`

### 5. Performance Filters (`PerformanceFilters`)

Optimize execution and enable testing modes:

```typescript
interface PerformanceFilters {
  maxGasPerTx?: bigint;        // Skip if estimated gas exceeds limit
  dryRun?: boolean;            // Only simulate, don't execute transactions
  skipValidation?: boolean;     // Skip validation for faster processing
}
```

**Use Cases:**
- Gas optimization: `maxGasPerTx: 500000n`
- Testing and analysis: `dryRun: true`
- Fast processing: `skipValidation: true`

## Implementation Details

### Enhanced Function Signature

```typescript
const arbitratePast = async <T extends readonly AbiParameter[]>(
  params: ArbitrateParams<T> & EnhancedArbitrateFilters,
) => {
  // Implementation with all filter categories applied
}
```

### Filter Processing Order

1. **Block Range Filtering** - Applied at the blockchain query level
2. **Batch Size and Prioritization** - Applied to the retrieved statements
3. **Time-based Filtering** - Applied per attestation
4. **Attestation Property Filtering** - Applied per attestation
5. **Existing Filters** - `onlyIfEscrowDemandsCurrentOracle`, `skipAlreadyArbitrated`
6. **Performance Filters** - Applied during execution (`dryRun`, `maxGasPerTx`)

### Helper Functions

Two helper functions ensure clean separation of concerns:

```typescript
// Check if attestation passes time-based filters
const passesTimeFilters = (attestation: any, filters: TimeFilters): boolean

// Check if attestation passes property-based filters  
const passesAttestationFilters = (attestation: any, filters: AttestationFilters): boolean
```

## Usage Examples

### Basic Time Filtering
```typescript
await oracle.arbitratePast({
  fulfillment: { /* ... */ },
  arbitrate: async (statement) => /* decision logic */,
  maxAge: 3600n, // Only process attestations from the last hour
  excludeExpired: true, // Skip expired attestations
});
```

### Comprehensive Filtering
```typescript
await oracle.arbitratePast({
  fulfillment: { /* ... */ },
  arbitrate: async (statement) => /* decision logic */,
  // Time filters
  maxAge: 86400n,
  excludeExpired: true,
  // Property filters
  excludeRevoked: true,
  requireRefUID: true,
  // Block filters
  fromBlock: currentBlock - 1000n,
  // Batch filters
  maxStatements: 10,
  prioritizeRecent: true,
  // Performance filters
  maxGasPerTx: 300000n,
  // Existing filters
  skipAlreadyArbitrated: true,
});
```

### Dry Run Analysis
```typescript
const { decisions } = await oracle.arbitratePast({
  fulfillment: { /* ... */ },
  arbitrate: async (statement) => /* decision logic */,
  dryRun: true, // Only simulate, don't execute
  maxStatements: 50, // Analyze up to 50 statements
});

// Analyze simulated results
decisions.forEach(decision => {
  console.log(`Statement: ${decision.attestation.uid}, Decision: ${decision.decision}`);
});
```

## Benefits

1. **Improved Performance** - Block range limits and batch processing reduce query sizes
2. **Enhanced Control** - Granular filtering based on multiple criteria
3. **Better Testing** - Dry run mode enables safe analysis
4. **Flexible Processing** - Time-based and property-based filters support various use cases
5. **Gas Optimization** - Gas limit checking prevents expensive transactions
6. **Operational Safety** - Validation skipping and error handling for production environments

## Backward Compatibility

All new filters are optional, ensuring complete backward compatibility with existing implementations. The original function signature remains unchanged for basic usage:

```typescript
// Original usage still works
await oracle.arbitratePast({
  fulfillment: { /* ... */ },
  arbitrate: async (statement) => /* decision logic */,
});
```
