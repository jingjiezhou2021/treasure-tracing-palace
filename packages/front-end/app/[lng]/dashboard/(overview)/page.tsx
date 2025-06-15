import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import DashInfo from './dash-info';
import OrderTableWrapper from '../orders/order-table-wrapper';
import { Skeleton } from 'antd';
import { fetchUserByEmail } from '@/app/lib/data';
import { Role } from '@/generated/prisma';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getT } from '@/app/i18n';

export async function generateMetadata(): Promise<Metadata> {
	const { t } = await getT('dashboard');
	return { title: t('总览'), description: t('溯宝阁后台管理总览页面') };
}
export default async function Page() {
	const { t } = await getT('dashboard');
	const session = await auth();
	const user = await fetchUserByEmail(session?.user?.email!);
	if (user?.role === Role.CUSTOMER) {
		redirect('/dashboard/customer/retail');
	}
	return (
		<main>
			<h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
				{t('综合数据')}
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
					{t('最新订单')}
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
