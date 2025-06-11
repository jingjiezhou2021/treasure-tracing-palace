'use client';

import { Button, message } from 'antd';
import ClientCryptoPrice from '../../components/ClientCryptoPrice';
import { UsdtCircleColorful } from '../../components/ClientIcons';
import { fetchOrderById } from '@/app/lib/data';
import { useAccount, useSignMessage } from 'wagmi';
import { applyForReceivingUSDT } from '@/app/lib/actions';
import { useState } from 'react';
import { Address } from '@ant-design/web3';
import { OrderStatus } from '@/generated/prisma';
import { useRouter } from 'next/navigation';
export default function ReceiveMoney({
	order,
}: {
	order: NonNullable<Awaited<ReturnType<typeof fetchOrderById>>>;
}) {
	const router = useRouter();
	const { address, isConnected } = useAccount();
	const { signMessageAsync } = useSignMessage();
	const [txHash, setTxHash] = useState('');
	const [messageApi, contextHolder] = message.useMessage();
	return (
		<section className="mb-6">
			{contextHolder}
			<h2 className="text-lg font-semibold">
				{order.status === OrderStatus.PAID ? '已' : ''}领取金额
			</h2>
			<p className="text-xl font-bold flex justify-between">
				<ClientCryptoPrice
					icon={<UsdtCircleColorful />}
					value={(order.totalPrice - 1n) * 100_0000n}
					decimals={6}
					symbol="USDT"
				/>
				<Button
					className="w-24"
					disabled={order.status === OrderStatus.PAID}
					icon={<UsdtCircleColorful />}
					onClick={() => {
						if (!address || !isConnected) {
							messageApi.error('未连接钱包');
						} else {
							signMessageAsync({
								message: order.id.toString(),
							})
								.then((res) => {
									return applyForReceivingUSDT(
										address,
										order.id,
										res,
									);
								})
								.then((res) => {
									setTxHash(res);
									messageApi.success(
										`领取 ${(
											Number(order.totalPrice) - 1
										).toString()} USDT成功`,
									);
									router.refresh();
								})
								.catch((err) => {
									messageApi.error(`领取失败，${err}`);
									console.error(err);
								});
						}
					}}
				>
					{order.status === OrderStatus.PAID ? '已' : ''}领取
				</Button>
			</p>
			{txHash !== '' ? (
				<Address
					ellipsis={{
						headClip: 8,
						tailClip: 6,
					}}
					copyable
					address={txHash}
				/>
			) : null}
		</section>
	);
}
