'use client';
import { CryptoPrice } from '@ant-design/web3';
import { UsdtCircleColorful } from '@ant-design/web3-icons';
import { parseUnits } from 'viem';
import useUSDTDecimals from '../../dashboard/hooks/USDTDecimals';
export default function ClientCryptoPrice({
	value,
}: {
	value: number | bigint;
}) {
	const USDTDecimals = useUSDTDecimals();
	return (
		<CryptoPrice
			icon={<UsdtCircleColorful />}
			value={parseUnits(`${value}`, USDTDecimals)}
			decimals={USDTDecimals}
			symbol="USDT"
		/>
	);
}
