'use client';

import { QueryClient } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { type State } from 'wagmi';
import {
	WagmiWeb3ConfigProvider,
	MetaMask,
	OkxWallet,
	Mainnet,
	Sepolia,
	Localhost,
} from '@ant-design/web3-wagmi';
import { getConfig } from '@/wagme-config';

type Props = {
	children: ReactNode;
	initialState: State | undefined;
};

export function SSRWagmiProvider({ children, initialState }: Props) {
	const [config] = useState(() => getConfig());
	const [queryClient] = useState(() => new QueryClient());

	return (
		<WagmiWeb3ConfigProvider
			config={config}
			chains={[Mainnet, Sepolia, Localhost]}
			initialState={initialState}
			ens
			eip6963={{
				autoAddInjectedWallets: true,
			}}
			wallets={[MetaMask(), OkxWallet()]}
			queryClient={queryClient}
		>
			{children}
		</WagmiWeb3ConfigProvider>
	);
}
