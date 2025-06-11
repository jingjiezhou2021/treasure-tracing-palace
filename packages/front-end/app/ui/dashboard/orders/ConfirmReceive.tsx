'use client';

import { confirmReceiving } from '@/app/lib/actions';
import { fetchOrderById } from '@/app/lib/data';
import { OrderStatus } from '@/generated/prisma';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';

export default function ConfirmReceive({
	order,
}: {
	order: NonNullable<Awaited<ReturnType<typeof fetchOrderById>>>;
}) {
	const [messageApi, contextHolder] = message.useMessage();
	const router = useRouter();
	return (
		<>
			{contextHolder}
			<Button
				variant="solid"
				color="green"
				disabled={order.status === OrderStatus.DELIVERED}
				onClick={() => {
					confirmReceiving(order)
						.then(() => {
							return messageApi.success('确认收货成功');
						})
						.then(() => {
							router.refresh();
						});
				}}
			>
				确认收货
			</Button>
		</>
	);
}
