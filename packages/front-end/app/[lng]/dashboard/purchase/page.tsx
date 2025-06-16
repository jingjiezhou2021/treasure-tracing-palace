// pages/purchase.tsx

import { fetchProductTypes } from '@/app/lib/data';
import { Button } from 'antd';
import ClientCryptoPrice from '@/app/ui/components/ClientCryptoPrice/index';
import Link from 'next/link';
import { ProductStatus } from '@/generated/prisma';
import { Metadata } from 'next';
import { getT } from '@/app/i18n';
export async function generateMetadata(): Promise<Metadata> {
	const { t } = await getT('dashboard');
	return { title: t('采购商品') };
}
export default async function PurchasePage() {
	const { t } = await getT('dashboard');
	const productTypes = await fetchProductTypes();
	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-6">{t('采购商品')}</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{productTypes.map((product) => (
					<div
						key={product.id}
						className="border p-4 rounded shadow hover:shadow-md transition relative	"
					>
						{product.coverCid && (
							<img
								src={`/api/ipfs/file?cid=${product.coverCid}`}
								alt={product.name}
								className="w-auto h-40 object-cover mb-3 rounded"
							/>
						)}
						<h2 className="text-xl font-semibold">
							{product.name}
						</h2>
						<p className="text-gray-600 text-sm mb-1">
							{t('生产商：')}
							{product.manufacturerCompany.name}
						</p>
						<p className="text-sm">
							{t('库存数量：')}
							{
								product.products.filter((p) => {
									return (
										p.status === ProductStatus.MANUFACTURING
									);
								}).length
							}
						</p>
						<div className="pb-14"></div>
						<div className="absolute bottom-4 left-0 w-full px-4 flex flex-col-reverse lg:justify-between lg:flex-row">
							<Link href={`/dashboard/purchase/${product.id}`}>
								<Button type="primary" className="max-w-24">
									{t('详情')}
								</Button>
							</Link>
							<ClientCryptoPrice value={product.price} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
