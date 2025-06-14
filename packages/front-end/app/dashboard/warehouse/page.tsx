import { Metadata } from 'next';
import { Suspense } from 'react';
import { Button, Skeleton } from 'antd';
import ProductTableWrapper from './product-table-wrapper';
import Link from 'next/link';
import { auth } from '@/auth';
import prisma from '@/app/lib/prisma';
import { Role } from '@/generated/prisma';
import { AuthError } from 'next-auth';
export const metadata: Metadata = {
	title: 'Warehouse',
};
export default async function Page() {
	const session = await auth();
	if (!session?.user?.email) {
		throw new AuthError('未登录或 session 信息不完整');
	}
	const user = await prisma.users.findUnique({
		where: { email: session.user.email },
		include: { foundedCompany: true },
	});
	if (user === null) {
		throw new AuthError('未登录或 session 信息不完整');
	}
	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">库存管理</h1>
			</div>
			{user?.role === Role.MANUFACTURER ? (
				<div className="flex justify-end mb-4">
					<Link href="/dashboard/product_type/create">
						<Button type="primary">新增商品</Button>
					</Link>
				</div>
			) : null}
			{/* 将 products 传给前端组件 */}
			<Suspense fallback={<Skeleton />}>
				<ProductTableWrapper user={user} />
			</Suspense>
		</div>
	);
}
