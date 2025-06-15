'use client';
import FilterTable from '@/app/ui/components/FilterTable';
import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { orders, OrderStatus, product_types } from '@/generated/prisma';
import ClientCryptoPrice from '../../components/ClientCryptoPrice';
import { useT } from '@/app/i18n/client';
interface OrderTableProps {
	orders: (orders & { productType: product_types })[];
}

const ProductTable: React.FC<OrderTableProps> = ({ orders }) => {
	const { t } = useT('dashboard');
	const mapping = {
		['PENDING']: t('未发货'),
		['CONFIRMED']: t('已发货'),
		['DELIVERED']: t('已收货'),
		['PAID']: t('已收款'),
	};
	const columns = [
		{
			title: t('订单编号'),
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: t('商品名称'),
			dataIndex: 'product_name',
			key: 'product_name',
		},
		{
			title: t('锁定价格'),
			dataIndex: 'lockedPrice',
			key: 'lockedPrice',
			render: (price: number) => {
				return (
					<div>
						<ClientCryptoPrice value={price} />
					</div>
				);
			},
			unsearchable: true,
		},
		{
			title: t('购买数量'),
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: t('收货地址'),
			dataIndex: 'shippingAddress',
			key: 'shippingAddress',
		},
		{
			title: t('收货人'),
			dataIndex: 'recipientName',
			key: 'recipientName',
		},
		{
			title: t('联系电话'),
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
		},
		{
			title: t('订单状态'),
			dataIndex: 'status',
			key: 'status',
		},
	];

	return (
		<>
			<FilterTable
				columns={columns}
				data={orders.map((o) => {
					return {
						...o,
						price: o.productType.price,
						product_name: o.productType.name,
						status: mapping[o.status],
					};
				})}
			>
				{(id: number | string) => {
					return (
						<>
							<Link
								href={`/dashboard/orders/${id}`}
								className="mr-2"
							>
								<Button variant="solid" color="green">
									{t('详情')}
								</Button>
							</Link>
						</>
					);
				}}
			</FilterTable>
		</>
	);
};

export default ProductTable;
