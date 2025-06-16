'use client';
import { fetchOrderById } from '@/app/lib/data';
import FilterTable from '../../components/FilterTable';
import ClientCryptoPrice from '../../components/ClientCryptoPrice';
import { product_types, products, ProductStatus } from '@/generated/prisma';
import Link from 'next/link';
import { Button } from 'antd';
import { useT } from '@/app/i18n/client';

export default function OrdersItemTable({
	order,
}: {
	order: NonNullable<Awaited<ReturnType<typeof fetchOrderById>>>;
}) {
	const { t } = useT('dashboard');
	const columns = [
		{
			title: t('商品名称'),
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: t('商品价格'),
			dataIndex: 'lockedPrice',
			key: 'lockedPrice',
			render: (price: bigint | undefined) => {
				price = order.lockedPrice!;
				return (
					<div>
						<ClientCryptoPrice value={price} />
					</div>
				);
			},
			unsearchable: true,
		},
		{
			title: t('描述'),
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
								[ProductStatus.MANUFACTURING]: t('已生产'),
								[ProductStatus.DISTRIBUTING]: t('运输中'),
								[ProductStatus.FOR_SALE]: t('销售中'),
								[ProductStatus.SOLD]: t('已销售'),
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
								title: t('商品序列号'),
								dataIndex: 'serialNumber',
								key: 'serialNumber',
							},
							{
								title: t('生产日期'),
								dataIndex: 'manufactureDate',
								key: 'manufactureDate',
							},
							{
								title: t('登记日期'),
								dataIndex: 'createdAt',
								key: 'createdAt',
							},
							{
								title: t('状态'),
								dataIndex: 'status',
								key: 'status',
							},
							{
								title: t('操作'),
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
												{t('商品追溯')}
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
