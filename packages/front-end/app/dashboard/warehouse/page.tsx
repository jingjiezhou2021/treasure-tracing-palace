import { Metadata } from 'next';
import { Suspense } from 'react';
import { Button, Skeleton } from 'antd';
import ProductTableWrapper from './product-table-wrapper';
import Link from 'next/link';
export const metadata: Metadata = {
	title: 'Warehouse',
};
export default async function Page() {
	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">库存管理</h1>
			</div>
			<div className="flex justify-end mb-4">
				<Link href="/dashboard/product_type/create">
					<Button type="primary">新增商品</Button>
				</Link>
			</div>
			{/* 将 products 传给前端组件 */}
			<Suspense fallback={<Skeleton />}>
				<ProductTableWrapper />
			</Suspense>
		</div>
	);
}
