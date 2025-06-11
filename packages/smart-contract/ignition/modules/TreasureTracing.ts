import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DeployContracts = buildModule("TreasureTracing", (m) => {
  const productRegistry = m.contract("ProductRegistry");
  const usdt = m.contract("USDT");
  const orderRegistry = m.contract("OrderRegistry", [productRegistry]);

  m.call(productRegistry, "setOrderRegistry", [orderRegistry]);

  return { productRegistry, usdt, orderRegistry };
});

export default DeployContracts;