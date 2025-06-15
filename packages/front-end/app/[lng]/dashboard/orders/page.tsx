import { Metadata } from 'next';
import prisma from '@/app/lib/prisma';
import { Suspense } from 'react';
import OrderTable from '@/app/ui/dashboard/orders/OrderTable';
import { Skeleton } from 'antd';
import { auth } from '@/auth';
import { fetchOrdersByCompany, fetchUserByEmail } from '@/app/lib/data';
import { orders, product_types } from '@/generated/prisma';
import OrderTableWrapper from './order-table-wrapper';
export const metadata: Metadata = {
	title: 'Warehouse',
};
export default async function Page() {
	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">订单管理</h1>
			</div>
			{/* 将 products 传给前端组件 */}
			<Suspense fallback={<Skeleton />}>
				<OrderTableWrapper />
			</Suspense>
		</div>
	);
}
