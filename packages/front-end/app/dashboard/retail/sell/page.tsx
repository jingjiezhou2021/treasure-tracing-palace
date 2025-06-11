import { fetchCommodotiesByUser, fetchUserByEmail } from '@/app/lib/data';
import CardsGrid from '@/app/ui/components/cardsGrid';
import { auth } from '@/auth';
import { ProductStatus } from '@/generated/prisma';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import Link from 'next/link';

export default async function Page() {
	const session = await auth();
	const user = await fetchUserByEmail(session?.user?.email!);
	const commodoties = await fetchCommodotiesByUser(user!);
	return (
		<CardsGrid
			cardsContent={commodoties.map((c) => {
				return {
					title: c.productType.name,
					id: c.id,
					linkHref: `/dashboard/retail/sell/update/${c.id}`,
					coverUrl: `/api/pinita/file?cid=${c.productType.coverCid}`,
					description: `库存数量：${c.productType.products.filter((p) => p.status === ProductStatus.FOR_SALE).length}`,
				};
			})}
		>
			<Link href={`/dashboard/retail/sell/add`}>
				<Card
					hoverable
					style={{ width: 240 }}
					cover={
						<div className="h-44 pt-6 text-center">
							<PlusCircleOutlined
								className="text-9xl"
								style={{
									color: '#fb923c',
								}}
							/>
						</div>
					}
				>
					<Meta
						title={
							<p className="text-center truncate">
								添加商品到零售
							</p>
						}
					></Meta>
				</Card>
			</Link>
		</CardsGrid>
	);
}
