'use client';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { en_US, Web3ConfigProvider, zh_CN } from '@ant-design/web3';
import { ReactNode } from 'react';
import { useParams } from 'next/navigation';
export default function AntDesignCustomConfigProvider({
	children,
}: {
	children: ReactNode;
}) {
	const lng = useParams()?.lng as 'zh' | 'en';
	const lngMap = {
		zh: zh_CN,
		en: en_US,
	};
	return (
		<Web3ConfigProvider locale={lngMap[lng]}>
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
