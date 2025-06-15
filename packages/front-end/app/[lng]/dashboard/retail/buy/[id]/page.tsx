import { fetchCommodotyById, fetchUserByEmail } from '@/app/lib/data';
import PurchaseInfo from '@/app/ui/dashboard/purchase/info';
import { auth } from '@/auth';
import PurchaseCommodotyFormWrapper from './PurchaseCommodotyFormWrapper';

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const commodoty = await fetchCommodotyById(parseInt(id));
	return (
		<PurchaseInfo
			product_type={{
				...commodoty?.productType!,
				price: commodoty.CommodotyPrice,
			}}
		>
			<PurchaseCommodotyFormWrapper commodoty={commodoty} />
		</PurchaseInfo>
	);
}
