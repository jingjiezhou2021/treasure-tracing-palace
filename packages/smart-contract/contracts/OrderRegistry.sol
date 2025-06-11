// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {ProductRegistry} from "./ProductRegistry.sol"; // ✅ 直接导入合约源文件

error ProductNotFound(string serialNumber);

contract OrderRegistry {
    ProductRegistry internal productRegistry;

    constructor(address _productRegistry) {
        i_prAddr = _productRegistry;
        productRegistry = ProductRegistry(_productRegistry);
    }

    struct OrderRecord {
        uint256 orderId;
        string buyerName;
        string sellerName;
        string shippingOriginAddress;
        string shippingDestinationAddress;
        string[] productSerials;
        uint256 quantity;
        uint256 lockedPrice;
        uint256 totalPrice;
        uint256 timestamp;
    }

    OrderRecord[] public orders;
    address public immutable i_prAddr;

    event checkingSerialNumber(string serialNumber);
    event OrderCreated(
        OrderRecord record
    );

    function createOrder(
        OrderRecord memory record
    ) external {
        record.timestamp=block.timestamp;
        // 🔐 校验所有产品是否合法
        for (uint256 i = 0; i < record.productSerials.length; i++) {
            emit checkingSerialNumber(record.productSerials[i]);
            require(
                productRegistry.existsBySerial(record.productSerials[i]),
                "product not exist"
            );
            record.productSerials[i] = record.productSerials[i];
        }
        orders.push(record);
        emit OrderCreated(
            record
        );
        for (uint256 i = 0; i < record.productSerials.length; i++) {
            productRegistry.addOrderToProduct(record.productSerials[i],record);
        }
    }

    function getSerialsOfOrder(
        uint256 orderId
    ) external view returns (string[] memory) {
        for (uint256 i = 0; i < orders.length; ++i) {
            if (orders[i].orderId == orderId) {
                return orders[i].productSerials;
            }
        }
        require(false, "product unfound");
    }
}
