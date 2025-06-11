import { createConfig, http, cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia, localhost } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export function getConfig() {
	return createConfig({
		chains: [mainnet, sepolia, localhost],
		ssr: true,
		storage: createStorage({
			storage: cookieStorage,
		}),
		connectors: [metaMask()],
		transports: {
			[mainnet.id]: http(),
			[sepolia.id]: http(),
			[localhost.id]: http('http://127.0.0.1:7545'),
		},
	});
}
