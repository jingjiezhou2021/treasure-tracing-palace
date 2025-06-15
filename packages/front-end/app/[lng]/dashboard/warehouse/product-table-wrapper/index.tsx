import ProductTable from '@/app/ui/dashboard/warehouse/productTable';
import { fetchProductIsOnChain, fetchUserProductTypes } from '@/app/lib/data';
import { companies, users } from '@/generated/prisma';
export default async function ProductTableWrapper({
	take,
	user,
}: {
	take?: number;
	user: users & { foundedCompany: companies[] };
}) {
	let product_types = await fetchUserProductTypes(user!);
	if (take) {
		product_types = product_types.slice(0, take);
	}
	const productId_isOnChain = new Map<number, boolean>();
	await Promise.all(
		product_types.map((pt) => {
			return new Promise<void>((res, rej) => {
				const productPromiseArr: Promise<void>[] = [];
				for (const p of pt.products) {
					productPromiseArr.push(
						fetchProductIsOnChain(p.serialNumber).then(
							(isOnChain) => {
								productId_isOnChain.set(p.id, isOnChain);
							},
						),
					);
				}
				Promise.all(productPromiseArr).then(() => {
					res();
				});
			});
		}),
	);
	return (
		<ProductTable
			product_types={product_types}
			productId_isOnChain={productId_isOnChain}
		/>
	);
}
