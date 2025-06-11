'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { Web3ConfigProvider, zh_CN } from '@ant-design/web3';
import { ReactNode } from 'react';
export default function AntDesignCustomConfigProvider({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<Web3ConfigProvider locale={zh_CN}>
			<AntdRegistry>
				<ConfigProvider
					theme={{
						token: {
							// Seed Token
							colorPrimary: '#f97316',
						},
					}}
				>
					{children}
				</ConfigProvider>
			</AntdRegistry>
		</Web3ConfigProvider>
	);
}
