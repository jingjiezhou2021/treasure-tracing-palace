import ProductRegistry from './abi/ProductRegistry';
import USDT from './abi/USDT';
import OrderRegistry from './abi/OrderRegistry';
import { privateKeyToAccount } from 'viem/accounts';
import { createWalletClient, http } from 'viem';
import { sepolia } from 'viem/chains';
export const abi = {
	ProductRegistry,
	USDT,
	OrderRegistry,
};
export const contractAddress = {
	USDT: process.env.NEXT_PUBLIC_USDT,
	ProductRegistry: process.env.NEXT_PUBLIC_PRODUCT_REGISTRY,
	OrderRegistry: process.env.NEXT_PUBLIC_ORDER_REGISTRY,
};
export const platformWalletAddr = process.env
	.NEXT_PUBLIC_PLATFORM_WALLET_ADDR as `0x${string}`;
export const platformWalletPrivateKey = process.env
	.PLATFORM_WALLET_PRIVATE_KEY as `0x${string}`;
export const createPlatformWallet = () => {
	const account = privateKeyToAccount(platformWalletPrivateKey);
	const client = createWalletClient({
		account,
		chain: sepolia,
		transport: http(),
	});
	return client;
};
