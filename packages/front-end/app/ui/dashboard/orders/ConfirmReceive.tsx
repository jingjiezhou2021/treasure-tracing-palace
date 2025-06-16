'use client';

import { useT } from '@/app/i18n/client';
import { confirmReceiving } from '@/app/lib/actions';
import { fetchOrderById } from '@/app/lib/data';
import { OrderStatus } from '@/generated/prisma';
import { Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ConfirmReceive({
	order,
}: {
	order: NonNullable<Awaited<ReturnType<typeof fetchOrderById>>>;
}) {
	const { t } = useT('dashboard');
	const [messageApi, contextHolder] = message.useMessage();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	return (
		<>
			{contextHolder}
			<Button
				variant="solid"
				color="green"
				disabled={order.status === OrderStatus.DELIVERED}
				loading={isLoading}
				onClick={() => {
					setIsLoading(true);
					confirmReceiving(order)
						.then(() => {
							return messageApi.success(t('确认收货成功'));
						})
						.then(() => {
							setIsLoading(false);
							router.refresh();
						});
				}}
			>
				{t('确认收货')}
			</Button>
		</>
	);
}
