'use client';
import { ConnectButton, Connector } from '@ant-design/web3';
export default function ConnectWallet() {
	return (
		<div>
			<Connector
				modalProps={{
					mode: 'simple',
				}}
			>
				<ConnectButton quickConnect />
			</Connector>
		</div>
	);
}
