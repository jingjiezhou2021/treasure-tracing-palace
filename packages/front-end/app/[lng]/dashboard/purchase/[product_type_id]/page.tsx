import PurchaseInfo from '@/app/ui/dashboard/purchase/info';
import ProductPurchaseFormWrapper from './PurchaseFormWrapper';
import { fetchProductTypeById } from '@/app/lib/data';
export default async function ProductDetailPage({
	params,
}: {
	params: Promise<{ product_type_id: string }>;
}) {
	const product_type = (await fetchProductTypeById(
		parseInt((await params).product_type_id),
	))!;
	return (
		<PurchaseInfo product_type={product_type}>
			<ProductPurchaseFormWrapper product_type={product_type} />
		</PurchaseInfo>
	);
}
