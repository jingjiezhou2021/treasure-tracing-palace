import { Suspense } from 'react';
import TracingCards from './tracing-cards';
import TracingCardsSkeleton from './tracing-cards/Skeleton';

export default async function Page() {
	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">商品溯源信息</h1>
			</div>
			{/* <h1 className="text-2xl font-bold mb-6">商品溯源信息</h1> */}
			<Suspense fallback={<TracingCardsSkeleton />}>
				<TracingCards />
			</Suspense>
		</div>
	);
}
