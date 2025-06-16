'use client';
import { useT } from '@/app/i18n/client';
import { updateCommodoty } from '@/app/lib/actions';
import useUSDTDecimals from '@/app/ui/dashboard/hooks/USDTDecimals';
import {
	Commodoty,
	product_types,
	products,
	ProductStatus,
} from '@/generated/prisma';
import { CryptoInput } from '@ant-design/web3';
import { USDT } from '@ant-design/web3-wagmi';
import { Button, Image } from 'antd';
import useMessage from 'antd/es/message/useMessage';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { parseUnits } from 'viem';
import * as Yup from 'yup';
export default function UpdateSellForm({
	commodoty,
}: {
	commodoty: Commodoty & {
		productType: product_types & { products: products[] };
	};
}) {
	const { t } = useT('dashboard');
	const [messageApi, messageContext] = useMessage();
	const router = useRouter();
	const USDTDecimals = useUSDTDecimals();
	return (
		<Formik
			initialValues={{
				price: commodoty.CommodotyPrice as bigint | null,
				productTypeId: commodoty.productTypeId as number | null,
				creatorId: commodoty.creatorId as null | string,
			}}
			validationSchema={Yup.object({
				price: Yup.number().required(t('价格不能为空')),
			})}
			onSubmit={(values) => {
				updateCommodoty(commodoty.id, {
					CommodotyPrice: values.price!,
				})
					.then(() => {
						return messageApi.success(t('更新零售商品信息成功'));
					})
					.then(() => {
						router.push('/dashboard/retail/sell');
					});
			}}
		>
			{({
				handleSubmit,
				errors,
				setFieldValue,
				values,
				handleBlur,
				isSubmitting,
			}) => {
				return (
					<form
						className="max-w-xl space-y-4"
						onSubmit={handleSubmit}
					>
						{messageContext}
						{/* 👇 不可编辑但展示 */}
						<div>
							<label className="block mb-2 font-medium">
								{t('商品种类')}
							</label>
							{commodoty.productType.name}
						</div>

						<>
							<div>
								<label className="block mb-2 font-medium">
									{t('商品图片')}
								</label>
								<Image
									src={`/api/ipfs/file?cid=${commodoty.productType.coverCid}`}
									className="max-h-64 rounded-2xl shadow-md"
								/>
							</div>
							<div>
								<label className="block mb-2 font-medium">
									{t('零售价格')}
								</label>
								<CryptoInput
									disabled
									onBlur={handleBlur}
									value={{
										token: USDT,
										amount: values.price
											? parseUnits(
													values.price.toString(),
													USDTDecimals,
												)
											: undefined,
										inputString: values.price?.toString(),
									}}
									footer={false}
									options={[USDT]}
									onChange={(val) => {
										if (val?.amount) {
											setFieldValue(
												'price',
												val?.amount / BigInt(1e6),
											);
										} else {
											setFieldValue('price', null);
										}
									}}
								/>
								{errors.price && (
									<p className="text-red-500 text-sm mt-1">
										{errors.price}
									</p>
								)}
							</div>
							<div>
								<label className="block mb-2 font-medium">
									{t('库存数量')}
								</label>
								{
									commodoty.productType.products.filter(
										(p) =>
											p.status === ProductStatus.FOR_SALE,
									).length
								}
							</div>
						</>

						<Button
							type="primary"
							htmlType="submit"
							className="mr-4"
							loading={isSubmitting}
						>
							{t('提交')}
						</Button>
					</form>
				);
			}}
		</Formik>
	);
}
