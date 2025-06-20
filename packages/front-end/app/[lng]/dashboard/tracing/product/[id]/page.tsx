import {
	fetchOrderById,
	fetchProductById,
	fetchProductOnChain,
	fetchProductOrdersOnChain,
} from '@/app/lib/data';
import { BigInt2Date, ProductStatusToString } from '@/app/lib/utils';
import ProductInfo from '@/app/ui/components/ProductInfo';
import { Descriptions, Steps } from 'antd';
import {
	ApiOutlined,
	GlobalOutlined,
	ShopOutlined,
	ShoppingOutlined,
	TruckOutlined,
} from '@ant-design/icons';
import { notFound } from 'next/navigation';
import ClientCryptoPrice from '@/app/ui/components/ClientCryptoPrice';
import { UsdtCircleColorful } from '@/app/ui/components/ClientIcons';
import { parseUnits } from 'viem';
import { orders, Role } from '@/generated/prisma';
import { getT } from '@/app/i18n';
export default async function Page(props: { params: Promise<{ id: string }> }) {
	const { t } = await getT('dashboard');
	const params = await props.params;
	const id = parseInt(params.id);
	const product = await fetchProductById(id);
	if (product === null) {
		notFound();
	}
	const productOnChain = await fetchProductOnChain(product.serialNumber);
	const productOrdersOnChain = await fetchProductOrdersOnChain(
		product.serialNumber,
	);
	const offlineOrdersData = new Map<
		bigint,
		Awaited<ReturnType<typeof fetchOrderById>>
	>();
	for (const o of productOrdersOnChain) {
		offlineOrdersData.set(
			o.orderId,
			await fetchOrderById(Number(o.orderId)),
		);
	}

	return (
		<div className="p-8 space-y-6">
			<ProductInfo
				imgUrl={`/api/ipfs/file?cid=${product.type?.coverCid}`}
				name={productOnChain.name}
			>
				<Descriptions.Item label={t('商品序列号')}>
					{productOnChain.serialNumber}
				</Descriptions.Item>
				<Descriptions.Item label={t('生产日期')}>
					{new Date(
						Number(productOnChain.manufactureDate),
					).toLocaleString()}
				</Descriptions.Item>
				<Descriptions.Item label={t('登记日期')}>
					{new Date(
						Number(productOnChain.createdAt),
					).toLocaleString()}
				</Descriptions.Item>
				<Descriptions.Item label={t('当前拥有者')}>
					{productOnChain.currentOwnerEmail}
				</Descriptions.Item>

				<Descriptions.Item label={t('商品状态')}>
					{ProductStatusToString(productOnChain.status, t)}
				</Descriptions.Item>
			</ProductInfo>
			<div className="mb-6">
				<h1 className="text-2xl font-bold">{t('商品溯源')}</h1>
			</div>
			<Steps
				direction="vertical"
				current={productOrdersOnChain.length * 2}
				items={[
					{
						title: t('生产商'),
						icon: <ApiOutlined />,
						subTitle: productOnChain.companyName,
						description: (
							<Descriptions
								column={1}
								styles={{
									label: { fontSize: 12 },
									content: { fontSize: 12 },
								}}
								className="!pt-3"
							>
								<Descriptions.Item label={t('序列号')}>
									{productOnChain.serialNumber}
								</Descriptions.Item>
								<Descriptions.Item label={t('生产日期')}>
									{BigInt2Date(
										productOnChain.manufactureDate,
									).toLocaleString()}
								</Descriptions.Item>
							</Descriptions>
						),
					},
					...productOrdersOnChain
						.map((po) => {
							return [
								{
									title: t('订单'),
									icon: <TruckOutlined />,
									description: (
										<Descriptions
											column={1}
											className="!pt-3"
											styles={{
												label: { fontSize: 12 },
												content: { fontSize: 12 },
											}}
										>
											<Descriptions.Item
												label={t('订单编号')}
											>
												{po.orderId}
											</Descriptions.Item>
											<Descriptions.Item
												label={t('成交价格')}
											>
												<ClientCryptoPrice
													value={po.lockedPrice}
												/>
											</Descriptions.Item>
											<Descriptions.Item
												label={t('发货地址')}
											>
												{po.shippingOriginAddress}
											</Descriptions.Item>
											<Descriptions.Item
												label={t('发货人')}
											>
												{po.sellerName}
											</Descriptions.Item>
											<Descriptions.Item
												label={t('成交时间')}
											>
												{new Date(
													Number(
														po.timestamp * 1000n,
													),
												).toLocaleString()}
											</Descriptions.Item>
										</Descriptions>
									),
								},
								{
									title:
										offlineOrdersData.get(po.orderId)?.buyer
											.role === Role.DISTRIBUTOR
											? t('销售商')
											: t('消费者'),
									icon:
										offlineOrdersData.get(po.orderId)?.buyer
											.role === Role.DISTRIBUTOR ? (
											<ShopOutlined />
										) : (
											<ShoppingOutlined />
										),
									subTitle:
										offlineOrdersData.get(po.orderId)?.buyer
											.mycompany?.name ??
										offlineOrdersData.get(po.orderId)?.buyer
											.foundedCompany[0]?.name ??
										offlineOrdersData.get(po.orderId)?.buyer
											.email,
									description: (
										<Descriptions
											column={1}
											className="!pt-3"
											styles={{
												label: { fontSize: 12 },
												content: { fontSize: 12 },
											}}
										>
											<Descriptions.Item
												label={t('收货地址')}
											>
												{po.shippingDestinationAddress}
											</Descriptions.Item>

											<Descriptions.Item
												label={t('收货人')}
											>
												{po.buyerName}
											</Descriptions.Item>
										</Descriptions>
									),
								},
							];
						})
						.reduce((prev, cur) => {
							return [...prev, ...cur];
						}, []),
				]}
			/>
		</div>
	);
}
