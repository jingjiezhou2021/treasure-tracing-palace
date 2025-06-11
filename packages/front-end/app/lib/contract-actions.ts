import 'server-only';
import { abi, contractAddress, createPlatformWallet } from '@/contracts';
import OrderRegistry from '@/contracts/abi/OrderRegistry';
import {
	BaseError,
	ContractFunctionExecutionError,
	ContractFunctionRevertedError,
	encodeFunctionData,
	getContract,
	parseUnits,
} from 'viem';
import { ProductStatusSolidity } from './utils';

const platformWallet = createPlatformWallet();
const productRegistryContract = getContract({
	address: contractAddress.ProductRegistry as `0x${string}`,
	abi: abi.ProductRegistry.abi,
	client: platformWallet,
});
const orderRegistryContract = getContract({
	address: contractAddress.OrderRegistry as `0x${string}`,
	abi: abi.OrderRegistry.abi,
	client: platformWallet,
});
const USDTContract = getContract({
	address: contractAddress.USDT as `0x${string}`,
	abi: abi.USDT.abi,
	client: platformWallet,
});

export async function getProductBySerialNumber(searialNumber: string) {
	return await productRegistryContract.read.getProductBySerialNumber([
		searialNumber,
	]);
}
export async function productExists(searialNumber: string) {
	const ret = await productRegistryContract.read.existsBySerial([
		searialNumber,
	]);
	console.log(`serial number:${searialNumber}`);
	console.log(`exists:${ret}`);

	return ret;
}
export async function PublishProductOnChain(
	args: Parameters<typeof productRegistryContract.write.registerProduct>[0],
) {
	console.warn('商品未上链，正在上链中...');
	const txHash = await productRegistryContract.write.registerProduct(args);
	console.warn('商品上联成功', txHash);
	return txHash;
}
export async function transferOwnership(
	productId: bigint,
	newOwnerEmail: string,
) {
	console.log('添加流转记录中...');
	const txHash = await productRegistryContract.write.transferOwnership([
		productId,
		newOwnerEmail,
	]);
	console.log('流转记录添加成功', txHash);
}
export async function updateProductStatus(
	product_id: bigint,
	product_status: ProductStatusSolidity,
) {
	console.log('商品状态更新中...');
	const txHash = await productRegistryContract.write.updateProductStatus([
		product_id,
		product_status,
	]);
	console.log('商品状态更新成功', txHash);
	return txHash;
}
export async function transferUSDT(addr: `0x${string}`, amount: string) {
	console.warn(`转移${amount}USDT中...`);
	const txHash = await USDTContract.write.transfer([
		addr,
		parseUnits(amount.toString(), 6),
	]);
	console.warn(`转移USDT成功`, txHash);
	return txHash;
}
export async function detectIsOnChain(serialNumber: string) {
	try {
		await productRegistryContract.read.getProductBySerialNumber([
			serialNumber,
		]);
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}
export async function recordOrder(
	order: Parameters<typeof orderRegistryContract.write.createOrder>[0],
) {
	console.log('记录订单中...');
	// const txHash = await orderRegistryContract.write.createOrder(order);
	try {
		const { request } =
			await orderRegistryContract.simulate.createOrder(order);
		const txHash = await platformWallet.writeContract(request);
		console.log('记录订单成功', txHash);
		return txHash;
	} catch (err) {
		if (err instanceof BaseError) {
			console.error('is base error');
			const revertError = err.walk(
				(err) => err instanceof ContractFunctionRevertedError,
			);
			if (revertError instanceof ContractFunctionRevertedError) {
				const errorName = revertError.data?.errorName ?? '';
				// do something with `errorName`
				console.error('custom error occured:', errorName);
				console.error('custom error args:', revertError.data?.args);
			} else {
				console.error('not ContractFunctionRevertedError');
				console.error(err);
			}
		} else {
			console.error('not base error');
		}
	}
}
export async function getProductOrders(serialNumber: string) {
	return await productRegistryContract.read.getOrderOfProduct([serialNumber]);
}
