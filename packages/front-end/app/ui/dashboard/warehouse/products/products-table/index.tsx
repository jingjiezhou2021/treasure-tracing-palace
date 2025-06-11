'use client';
import { ProductStatusToString } from '@/app/lib/utils';
import { products, ProductStatus } from '@/generated/prisma';
import { Button, Space, Table } from 'antd';
import { ReactNode } from 'react';

export default function ProductsTable({
	products,
	actionArea,
}: {
	products: products[];
	actionArea: (id: number) => ReactNode;
}) {
	return (
		<Table<products>
			dataSource={products}
			columns={[
				{
					title: '商品序列号',
					dataIndex: 'serialNumber',
					key: 'serialNumber',
				},
				{
					title: '生产日期',
					dataIndex: 'manufactureDate',
					key: 'manufactureDate',
					render(val: Date) {
						return val.toLocaleString();
					},
				},
				{
					title: '登记日期',
					dataIndex: 'createdAt',
					key: 'createdAt',
					render(val: Date) {
						return val.toLocaleString();
					},
				},
				{
					title: '状态',
					dataIndex: 'status',
					key: 'status',
					render(val: ProductStatus) {
						return ProductStatusToString(val);
					},
				},
				{
					title: '操作',
					key: 'action',
					render: (_, record) => (
						<Space size="middle">{actionArea(record.id)}</Space>
					),
				},
			]}
		/>
	);
}
