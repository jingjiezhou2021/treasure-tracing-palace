'use client';
import { useT } from '@/app/i18n/client';
import { addCommodoty } from '@/app/lib/actions';
import { fetchUserByEmail } from '@/app/lib/data';
import useUSDTDecimals from '@/app/ui/dashboard/hooks/USDTDecimals';
import {
	product_types,
	products,
	ProductStatus,
	users,
} from '@/generated/prisma';
import { CryptoInput } from '@ant-design/web3';
import { USDT } from '@ant-design/web3-wagmi';
import { Select, Button, Image } from 'antd';
import useMessage from 'antd/es/message/useMessage';
import { Formik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { parseUnits } from 'viem';
import * as Yup from 'yup';

export default function AddSellForm({
	product_types,
}: {
	product_types: (product_types & { products: products[] })[];
}) {
	const { t } = useT('dashboard');
	const [messageApi, messageContext] = useMessage();
	const router = useRouter();
	const USDTDecimals = useUSDTDecimals();
	const [selectedProductType, setSelectedProductType] = useState<
		(product_types & { products: products[] }) | null
	>(null);
	const session = useSession();
	const [user, setUser] = useState<users | null>(null);
	useEffect(() => {
		fetchUserByEmail(session.data?.user?.email!).then((res) => {
			setUser(res);
		});
	}, []);
	return (
		<Formik
			initialValues={{
				price: 0n as bigint | null,
				productTypeId: null as number | null,
				creatorId: null as null | string,
			}}
			validationSchema={Yup.object({
				price: Yup.number().required(t('价格不能为空')),
			})}
			onSubmit={(values) => {
				values.creatorId = user?.id!;
				addCommodoty({
					productTypeId: values.productTypeId!,
					creatorId: values.creatorId,
					CommodotyPrice: values.price!,
				})
					.then(() => {
						return messageApi.success(t('添加商品到零售成功'));
					})
					.then(() => {
						router.push('/dashboard/retail/sell');
					})
					.catch((err) => {
						messageApi.error(t('添加商品到零售失败'), err);
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
								{t('选择商品种类')}
							</label>
							<Select
								className="w-full"
								options={product_types?.map((pt) => {
									return { value: pt.id, label: pt.name };
								})}
								onChange={(id: number) => {
									const target = product_types.find(
										(pt) => pt.id === id,
									)!;
									setSelectedProductType(target);
									setFieldValue('price', target.price);
									setFieldValue('productTypeId', target.id);
								}}
							/>
						</div>
						{selectedProductType && (
							<>
								<div>
									<label className="block mb-2 font-medium">
										{t('商品图片')}
									</label>
									<Image
										src={`/api/ipfs/file?cid=${selectedProductType.coverCid}`}
										className="max-h-64 rounded-2xl shadow-md"
									/>
								</div>
								<div>
									<label className="block mb-2 font-medium">
										{t('设置零售价格')}
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
											inputString:
												values.price?.toString(),
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
										selectedProductType.products.filter(
											(p) =>
												p.status ===
												ProductStatus.FOR_SALE,
										).length
									}
								</div>
							</>
						)}

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
