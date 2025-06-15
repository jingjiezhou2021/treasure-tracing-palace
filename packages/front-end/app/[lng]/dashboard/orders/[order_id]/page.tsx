import Loading from '@/app/ui/loading';
import OrderDetailPageContent from './content';
import { Suspense } from 'react';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Order',
};
export default async function OrderDetailPage(props: {
	params: Promise<{ order_id: string }>;
}) {
	const params = await props.params;
	const id = parseInt(params.order_id);
	return (
		<div className="max-w-4xl min-h-[935px] mx-auto p-6 bg-white rounded shadow relative">
			<h1 className="text-2xl font-bold mb-4">订单 #{id}</h1>
			<Suspense fallback={<Loading />}>
				<OrderDetailPageContent id={id} />
			</Suspense>
		</div>
	);
}
