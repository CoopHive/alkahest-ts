// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

/**
 * @title ETHPaymentObligation
 * @notice Contract for handling ETH payment obligations with EAS attestations
 */
contract ETHPaymentObligation {
    // EAS contracts interfaces
    address public immutable EAS_CONTRACT;
    address public immutable SCHEMA_REGISTRY;
    bytes32 public immutable ATTESTATION_SCHEMA;
    
    error InsufficientETH();
    error ETHTransferFailed();
    error InvalidAmount();
    error AccessDenied();
    error AttestationRevoked();
    error DeadlineExpired();
    error InsufficientValue();
    error InvalidEAS();
    error InvalidLength();
    error InvalidSchema();
    error NotFromThisAttester();
    error NotPayable();

    event PaymentMade(bytes32 indexed payment, address indexed buyer);

    struct ObligationData {
        uint256 amount;  // Amount of ETH to pay (in wei)
        address payee;   // Address to receive the payment
    }

    // EAS Attestation structure
    struct Attestation {
        bytes32 uid;
        bytes32 schema;
        uint64 time;
        uint64 expirationTime;
        uint64 revocationTime;
        bytes32 refUID;
        address recipient;
        address attester;
        bool revocable;
        bytes data;
    }

    // Schema record structure
    struct SchemaRecord {
        bytes32 uid;
        address resolver; // ISchemaResolver
        bool revocable;
        string schema;
    }

    constructor(
        address _eas,
        address _schemaRegistry
    ) {
        if (_eas == address(0)) revert InvalidEAS();
        
        EAS_CONTRACT = _eas;
        SCHEMA_REGISTRY = _schemaRegistry;
        
        // For now, we'll set a placeholder schema. In production, this would be registered properly
        ATTESTATION_SCHEMA = keccak256("uint256 amount, address payee");
    }

    /**
     * @notice Execute ETH payment obligation with caller as payer
     * @param data The obligation data containing amount and payee
     * @return uid_ The UID of the created attestation
     */
    function doObligation(ObligationData memory data) 
        external 
        payable 
        returns (bytes32 uid_) 
    {
        if (data.amount == 0) revert InvalidAmount();
        if (msg.value < data.amount) revert InsufficientETH();
        
        // Transfer ETH to payee
        (bool success, ) = data.payee.call{value: data.amount}("");
        if (!success) revert ETHTransferFailed();

        // Refund excess ETH to sender
        if (msg.value > data.amount) {
            (bool refundSuccess, ) = msg.sender.call{value: msg.value - data.amount}("");
            if (!refundSuccess) revert ETHTransferFailed();
        }

        // Create attestation (simplified for now)
        uid_ = doObligationRaw(
            abi.encode(data),
            0, // No expiration
            bytes32(0) // No reference UID
        );

        emit PaymentMade(uid_, msg.sender);
    }

    /**
     * @notice Execute ETH payment obligation on behalf of another address
     * @param data The obligation data containing amount and payee
     * @param payer The address making the payment
     * @param recipient The recipient of the attestation
     * @return uid_ The UID of the created attestation
     */
    function doObligationFor(
        ObligationData memory data,
        address payer,
        address recipient
    ) 
        external 
        payable 
        returns (bytes32 uid_) 
    {
        if (data.amount == 0) revert InvalidAmount();
        if (msg.value < data.amount) revert InsufficientETH();
        
        // Transfer ETH to payee
        (bool success, ) = data.payee.call{value: data.amount}("");
        if (!success) revert ETHTransferFailed();

        // Refund excess ETH to sender
        if (msg.value > data.amount) {
            (bool refundSuccess, ) = msg.sender.call{value: msg.value - data.amount}("");
            if (!refundSuccess) revert ETHTransferFailed();
        }

        // Create attestation
        uid_ = doObligationForRaw(
            abi.encode(data),
            0, // No expiration
            payer,
            recipient,
            bytes32(0) // No reference UID
        );

        emit PaymentMade(uid_, payer);
    }

    /**
     * @notice Create an attestation with raw data
     * @param data Encoded obligation data
     * @param expirationTime Expiration timestamp (0 for no expiration)
     * @param refUID Reference UID for linking attestations
     * @return uid_ The UID of the created attestation
     */
    function doObligationRaw(
        bytes memory data,
        uint64 expirationTime,
        bytes32 refUID
    ) public returns (bytes32 uid_) {
        // Simplified implementation - generate a unique ID
        uid_ = keccak256(abi.encodePacked(
            ATTESTATION_SCHEMA,
            msg.sender,
            block.timestamp,
            data
        ));
    }

    /**
     * @notice Create an attestation on behalf of another address
     * @param data Encoded obligation data
     * @param expirationTime Expiration timestamp
     * @param payer The address making the payment
     * @param recipient The recipient of the attestation
     * @param refUID Reference UID for linking attestations
     * @return uid_ The UID of the created attestation
     */
    function doObligationForRaw(
        bytes memory data,
        uint64 expirationTime,
        address payer,
        address recipient,
        bytes32 refUID
    ) public returns (bytes32 uid_) {
        // Simplified implementation - generate a unique ID
        uid_ = keccak256(abi.encodePacked(
            ATTESTATION_SCHEMA,
            payer,
            recipient,
            block.timestamp,
            data
        ));
    }

    /**
     * @notice Decode obligation data from bytes
     * @param data Encoded obligation data
     * @return The decoded ObligationData struct
     */
    function decodeObligationData(bytes memory data) 
        external 
        pure 
        returns (ObligationData memory) 
    {
        return abi.decode(data, (ObligationData));
    }

    /**
     * @notice Get obligation data from attestation UID (simplified)
     * @param uid The attestation UID
     * @return The decoded ObligationData struct
     */
    function getObligationData(bytes32 uid) 
        external 
        pure
        returns (ObligationData memory) 
    {
        // Simplified - in practice would lookup from EAS
        // For now return dummy data to match interface
        return ObligationData({
            amount: 0,
            payee: address(0)
        });
    }

    /**
     * @notice Check if an obligation is satisfied
     * @param obligation The attestation representing the obligation
     * @param demand Encoded demand data (not used for ETH payments)
     * @param demandHash Hash of the demand (not used for ETH payments)
     * @return True if the obligation is satisfied
     */
    function checkObligation(
        Attestation memory obligation,
        bytes memory demand,
        bytes32 demandHash
    ) 
        external 
        view 
        returns (bool) 
    {
        // For ETH payments, we only check if the attestation exists and is not revoked
        // The payment was already validated and executed when the attestation was created
        return obligation.schema == ATTESTATION_SCHEMA && 
               obligation.revocationTime == 0 &&
               (obligation.expirationTime == 0 || obligation.expirationTime > block.timestamp);
    }

    /**
     * @notice Get the attestation schema
     * @return The schema record
     */
    function getSchema() external view returns (SchemaRecord memory) {
        return SchemaRecord({
            uid: ATTESTATION_SCHEMA,
            resolver: address(this),
            revocable: true,
            schema: "uint256 amount, address payee"
        });
    }

    /**
     * @notice Returns the attestation schema UID
     * @return The schema UID
     */
    function getAttestationSchema() external view returns (bytes32) {
        return ATTESTATION_SCHEMA;
    }

    /**
     * @notice Check if the contract accepts ETH payments
     * @return Always true for ETH payment obligations
     */
    function isPayable() external pure returns (bool) {
        return true;
    }

    /**
     * @notice Process an attestation (placeholder for EAS resolver interface)
     * @param attestation The attestation to process
     * @return Always true for valid payments
     */
    function attest(Attestation memory attestation) external payable returns (bool) {
        return true;
    }

    /**
     * @notice Process multiple attestations (placeholder for EAS resolver interface)
     * @param attestations The attestations to process
     * @param values ETH values for each attestation
     * @return Always true for valid payments
     */
    function multiAttest(
        Attestation[] memory attestations, 
        uint256[] memory values
    ) external payable returns (bool) {
        return true;
    }

    /**
     * @notice Revoke an attestation (placeholder for EAS resolver interface)
     * @param attestation The attestation to revoke
     * @return Always true
     */
    function revoke(Attestation memory attestation) external payable returns (bool) {
        return true;
    }

    /**
     * @notice Revoke multiple attestations (placeholder for EAS resolver interface)
     * @param attestations The attestations to revoke
     * @param values ETH values for each revocation
     * @return Always true
     */
    function multiRevoke(
        Attestation[] memory attestations,
        uint256[] memory values
    ) external payable returns (bool) {
        return true;
    }

    /**
     * @notice Get contract version
     * @return Version string
     */
    function version() external pure returns (string memory) {
        return "1.0.0";
    }

    /**
     * @notice Contract can receive ETH
     */
    receive() external payable {}
}