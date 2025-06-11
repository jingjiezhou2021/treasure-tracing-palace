// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import {OrderRegistry} from "./OrderRegistry.sol";
// --- Custom Errors ---
error SerialNumberAlreadyRegistered(string serialNumber);
error ProductNotFound(string serialNumber);
contract ProductRegistry {
    modifier onlyOwner() {
        // require(msg.sender == owner);
        require(msg.sender == i_owner, "not owner");
        _;
    }
    OrderRegistry internal orderRegistry;
    address internal immutable i_owner;

    constructor() {
        i_owner=msg.sender;
    }

    function setOrderRegistry(address _addr) external onlyOwner {
        orderRegistry = OrderRegistry(_addr);
    }

    enum ProductStatus {
        MANUFACTURING,
        DISTRIBUTING,
        FOR_SALE,
        SOLD
    }

    struct Product {
        uint256 id;
        string name;
        string description;
        string serialNumber;
        string creatorEmail;
        string currentOwnerEmail;
        ProductStatus status;
        uint256 manufactureDate;
        uint256 createdAt;
        uint256 companyId;
        string companyName;
        uint256 onChainTimestamp; // ✅ 新增：数据上链时间
    }

    uint256 private productCounter = 1;

    mapping(uint256 => Product) public products;
    mapping(string => OrderRegistry.OrderRecord[]) public orders;

    mapping(string => uint256) public serialNumberToProductId; // serialNumber -> productId

    event ProductRegistered(uint256 indexed productId, string serialNumber);
    event OwnershipTransferred(
        uint256 indexed productId,
        string fromEmail,
        string toEmail
    );
    event StatusUpdated(uint256 indexed productId, ProductStatus newStatus);
    event addingOrderToProduct(string serialNumber);

    // --- 商品登记 ---
    function registerProduct(
        Product memory record
    ) external {
        if (serialNumberToProductId[record.serialNumber] != 0) {
            revert SerialNumberAlreadyRegistered(record.serialNumber);
        }

        record.onChainTimestamp=block.timestamp;
        products[record.id] = record;

        serialNumberToProductId[record.serialNumber] = record.id;

        emit ProductRegistered(record.id, record.serialNumber);
    }

    // --- 商品转移 ---
    function transferOwnership(
        uint256 productId,
        string calldata newOwnerEmail
    ) external {
        Product storage product = products[productId];
        product.currentOwnerEmail = newOwnerEmail;

        emit OwnershipTransferred(
            productId,
            product.creatorEmail,
            newOwnerEmail
        );
    }

    // --- 修改商品状态 ---
    function updateProductStatus(
        uint256 productId,
        ProductStatus newStatus
    ) external {
        Product storage product = products[productId];
        product.status = newStatus;

        emit StatusUpdated(productId, newStatus);
    }

    // --- 查询 ---
    function getProductById(
        uint256 productId
    ) external view returns (Product memory) {
        return products[productId];
    }

    function getProductBySerialNumber(
        string calldata serialNumber
    ) external view returns (Product memory) {
        uint256 productId = serialNumberToProductId[serialNumber];
        if (productId == 0) {
            revert ProductNotFound(serialNumber);
        }

        return products[productId];
    }

    function exists(uint256 productId) external view returns (bool) {
        return products[productId].id != 0;
    }

    // 检查产品是否存在（通过 serialNumber）
    function existsBySerial(
        string calldata serialNumber
    ) public view returns (bool) {
        uint256 id = serialNumberToProductId[serialNumber];
        return id != 0;
    }

    function addOrderToProduct(string calldata serialNumber,OrderRegistry.OrderRecord memory record) external {
        require(existsBySerial(serialNumber),"product not exist");
        emit addingOrderToProduct(serialNumber);
        orders[serialNumber].push(record);
    }

    function getOrderOfProduct(string calldata serialNumber) external view returns (OrderRegistry.OrderRecord[] memory) {
        require(existsBySerial(serialNumber),"product not exist");
        return orders[serialNumber];
    }
}
