import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

export default function NotFoundComponent({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<main className="flex h-full flex-col items-center justify-center gap-2">
			<FaceFrownIcon className="w-10 text-gray-400" />
			<h2 className="text-xl font-semibold">404 Not Found</h2>
			{/* <p>订单不存在</p> */}
			{children}
		</main>
	);
}
