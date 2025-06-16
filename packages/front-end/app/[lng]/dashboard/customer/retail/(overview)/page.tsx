import { getT } from '@/app/i18n';
import { fetchCommodoties } from '@/app/lib/data';
import CardsGrid from '@/app/ui/components/cardsGrid';
import { ProductStatus } from '@/generated/prisma';

export default async function Page() {
	const { t } = await getT('dashboard');
	const commodoties = await fetchCommodoties();
	return (
		<CardsGrid
			cardsContent={commodoties.map((c) => {
				return {
					title: c.productType.name,
					id: c.id,
					linkHref: `/dashboard/customer/retail/${c.id}`,
					coverUrl: `/api/ipfs/file?cid=${c.productType.coverCid}`,
					description: (
						<>
							<span className="block">
								{t('库存数量')}：
								{
									c.productType.products.filter(
										(p) =>
											p.status === ProductStatus.FOR_SALE,
									).length
								}
							</span>
							<span className="block">
								{t('销售商')}：
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
