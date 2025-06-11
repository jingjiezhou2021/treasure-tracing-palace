import {
	fetchOnChainNumber,
	fetchProductIsOnChain,
	fetchProductTypes,
	fetchUserByEmail,
	fetchUserProductTypes,
} from '@/app/lib/data';
import CardsGrid from '@/app/ui/components/cardsGrid';
import { auth } from '@/auth';
export default async function TracingCards() {
	const session = await auth();
	if (!session?.user?.email) {
		throw new Error('未登录或 session 信息不完整');
	}
	// 根据用户邮箱查公司 ID
	const user = await fetchUserByEmail(session.user.email);
	const product_types = await fetchUserProductTypes(user!);
	const onChainNumber = await fetchOnChainNumber(product_types);
	return (
		<CardsGrid
			cardsContent={product_types.map((pt) => {
				return {
					id: pt.id,
					coverUrl: `/api/pinita/file?cid=${pt.coverCid}`,
					linkHref: `/dashboard/tracing/product_type/${pt.id}`,
					title: pt.name,
					description: `上链数量:${onChainNumber.get(pt.id)}`,
				};
			})}
		/>
	);
}
