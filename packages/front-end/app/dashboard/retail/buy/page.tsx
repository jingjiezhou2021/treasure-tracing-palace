import { fetchCommodoties, fetchUserByEmail } from '@/app/lib/data';
import CardsGrid from '@/app/ui/components/cardsGrid';
import { auth } from '@/auth';
import { ProductStatus } from '@/generated/prisma';

export default async function Page() {
	const session = await auth();
	const user = await fetchUserByEmail(session?.user?.email!);
	const commodoties = (await fetchCommodoties()).filter((c) => {
		return c.creatorId !== user?.id;
	});
	return (
		<CardsGrid
			cardsContent={commodoties.map((c) => {
				return {
					title: c.productType.name,
					id: c.id,
					linkHref: `/dashboard/retail/buy/${c.id}`,
					coverUrl: `/api/pinita/file?cid=${c.productType.coverCid}`,
					description: (
						<>
							<span className="block">
								库存数量：
								{
									c.productType.products.filter(
										(p) =>
											p.status === ProductStatus.FOR_SALE,
									).length
								}
							</span>
							<span className="block">
								销售商：
								{c.creator.mycompany?.name ??
									c.creator.foundedCompany[0].name ??
									c.creator.email}
							</span>
						</>
					),
				};
			})}
		></CardsGrid>
	);
}
