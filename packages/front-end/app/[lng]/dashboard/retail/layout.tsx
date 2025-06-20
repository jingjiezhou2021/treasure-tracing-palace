import { Metadata } from 'next';
import { ReactNode, Suspense } from 'react';
import { Skeleton } from 'antd';
import RadioGroupWrapper from './(overview)/radio-group-wrapper';
import { getT } from '@/app/i18n';
export async function generateMetadata(): Promise<Metadata> {
	const { t } = await getT('dashboard');
	return { title: t('零售管理') };
}
export default async function Layout({ children }: { children: ReactNode }) {
	const { t } = await getT('dashboard');
	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">{t('零售管理')}</h1>
			</div>
			<div className="flex justify-end mb-4">
				<RadioGroupWrapper />
			</div>
			{/* 将 products 传给前端组件 */}
			<Suspense fallback>{children}</Suspense>
		</div>
	);
}
