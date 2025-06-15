import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">商品购买</h1>
			</div>
			{/* 将 products 传给前端组件 */}
			{children}
		</div>
	);
}
