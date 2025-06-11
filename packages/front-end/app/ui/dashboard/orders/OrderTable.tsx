'use client';
import FilterTable from '@/app/ui/components/FilterTable';
import React from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import { UsdtCircleColorful } from '@ant-design/web3-icons';
import { orders, OrderStatus, product_types } from '@/generated/prisma';
import ClientCryptoPrice from '../../components/ClientCryptoPrice';
interface OrderTableProps {
	orders: (orders & { productType: product_types })[];
}
const mapping = {
	['PENDING']: '未发货',
	['CONFIRMED']: '已发货',
	['DELIVERED']: '已收货',
	['PAID']: '已收款',
};
const ProductTable: React.FC<OrderTableProps> = ({ orders }) => {
	const columns = [
		{
			title: '订单编号',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: '商品名称',
			dataIndex: 'product_name',
			key: 'product_name',
		},
		{
			title: '锁定价格',
			dataIndex: 'lockedPrice',
			key: 'lockedPrice',
			render: (price: number) => {
				return (
					<div>
						<ClientCryptoPrice
							icon={<UsdtCircleColorful />}
							value={BigInt(price) * 100_0000n}
							decimals={6}
							symbol="USDT"
						/>
					</div>
				);
			},
			unsearchable: true,
		},
		{
			title: '购买数量',
			dataIndex: 'quantity',
			key: 'quantity',
		},
		{
			title: '收货地址',
			dataIndex: 'shippingAddress',
			key: 'shippingAddress',
		},
		{
			title: '收货人',
			dataIndex: 'recipientName',
			key: 'recipientName',
		},
		{
			title: '联系电话',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
		},
		{
			title: '订单状态',
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
									详情
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
