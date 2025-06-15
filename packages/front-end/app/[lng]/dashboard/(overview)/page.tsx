import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import DashInfo from './dash-info';
import ProductTableWrapper from '../warehouse/product-table-wrapper';
import OrderTableWrapper from '../orders/order-table-wrapper';
import { Skeleton } from 'antd';
import { fetchUserByEmail } from '@/app/lib/data';
import { Role } from '@/generated/prisma';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export const metadata: Metadata = {
	title: 'Overview',
	description: 'Overview page for Next.js dashboard',
};
export default async function Page() {
	const session = await auth();
	const user = await fetchUserByEmail(session?.user?.email!);
	if (user?.role === Role.CUSTOMER) {
		redirect('/dashboard/customer/retail');
	}
	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				综合数据
			</h1>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<Suspense fallback={<CardsSkeleton />}>
					{/* <CardWrapper /> */}
					<DashInfo />
				</Suspense>
			</div>
			<div className="mt-6">
				<h2
					className={`${lusitana.className} mb-4 text-xl md:text-2xl`}
				>
					最新订单
				</h2>
				<Suspense fallback={<Skeleton />}>
					<div>
						<OrderTableWrapper take={10} />
					</div>
				</Suspense>
			</div>
		</main>
	);
}
