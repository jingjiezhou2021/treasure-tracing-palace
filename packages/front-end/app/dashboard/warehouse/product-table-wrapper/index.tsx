import prisma from '@/app/lib/prisma';
import ProductTable from '@/app/ui/dashboard/warehouse/productTable';
import { auth } from '@/auth';
import { fetchProductIsOnChain, fetchUserProductTypes } from '@/app/lib/data';
export default async function ProductTableWrapper({ take }: { take?: number }) {
	const session = await auth();
	if (!session?.user?.email) {
		throw new Error('未登录或 session 信息不完整');
	}
	// 根据用户邮箱查公司 ID
	const user = await prisma.users.findUnique({
		where: { email: session.user.email },
		include: { foundedCompany: true },
	});
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
