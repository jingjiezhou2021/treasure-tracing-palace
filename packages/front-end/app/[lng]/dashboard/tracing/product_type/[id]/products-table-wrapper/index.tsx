'use client';
import { useT } from '@/app/i18n/client';
import ProductsTable from '@/app/ui/dashboard/warehouse/products/products-table';
import { products } from '@/generated/prisma';
import { Button } from 'antd';
import Link from 'next/link';

export default function ProductsTableWrapper({
	products,
}: {
	products: products[];
}) {
	const { t } = useT('dashboard');
	return (
		<ProductsTable
			products={products}
			actionArea={(id) => {
				return (
					<Link href={`/dashboard/tracing/product/${id}`}>
						<Button variant="solid" color="green">
							{t('商品追溯')}
						</Button>
					</Link>
				);
			}}
		/>
	);
}
