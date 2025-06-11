'use client';
import { fetchOrderById } from '@/app/lib/data';
import FilterTable from '../../components/FilterTable';
import ClientCryptoPrice from '../../components/ClientCryptoPrice';
import { UsdtCircleColorful } from '../../components/ClientIcons';
import { product_types, products, ProductStatus } from '@/generated/prisma';
import Link from 'next/link';
import { Button } from 'antd';

export default function OrdersItemTable({
	order,
}: {
	order: NonNullable<Awaited<ReturnType<typeof fetchOrderById>>>;
}) {
	const columns = [
		{
			title: '商品名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '商品价格',
			dataIndex: 'lockedPrice',
			key: 'lockedPrice',
			render: (price: bigint | undefined) => {
				price = order.lockedPrice!;
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
			title: '描述',
			dataIndex: 'description',
			key: 'description',
			ellipsis: true,
		},
	];
	return (
		<FilterTable
			columns={columns}
			data={[order.productType].map((pt) => {
				return {
					...pt,
					products: order.order_items.map((oi) => {
						return oi.product;
					}),
				};
			})}
			expandedRowRender={(
				record: product_types & {
					products: products[];
				},
			) => {
				return (
					<FilterTable
						data={record.products.map((p) => {
							const tmp: Record<ProductStatus, string> = {
								[ProductStatus.MANUFACTURING]: '已生产',
								[ProductStatus.DISTRIBUTING]: '运输中',
								[ProductStatus.FOR_SALE]: '销售中',
								[ProductStatus.SOLD]: '已销售',
							};
							return {
								...p,
								status: tmp[p.status],
								manufactureDate:
									p.manufactureDate.toISOString(),
								createdAt: p.createdAt.toISOString(),
							};
						})}
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
							},
							{
								title: '登记日期',
								dataIndex: 'createdAt',
								key: 'createdAt',
							},
							{
								title: '状态',
								dataIndex: 'status',
								key: 'status',
							},
							{
								title: '操作',
								dataIndex: 'action',
								key: 'action',
								fixed: 'right',
								width: 100,
								unsearchable: true,
								render(_, record) {
									return (
										<Link
											href={`/dashboard/tracing/product/${record.id}`}
										>
											<Button
												variant="solid"
												color="green"
											>
												商品追溯
											</Button>
										</Link>
									);
								},
							},
						]}
					></FilterTable>
				);
			}}
		/>
	);
}
