import { createConfig, http, cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia, hardhat } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';
export function getConfig() {
	return createConfig({
		chains: [mainnet, sepolia, hardhat],
		ssr: true,
		storage: createStorage({
			storage: cookieStorage,
		}),
		connectors: [metaMask()],
		transports: {
			[mainnet.id]: http(),
			[sepolia.id]: http(),
			[hardhat.id]: http(process.env.NEXT_PUBLIC_RPC_URL),
		},
	});
}
