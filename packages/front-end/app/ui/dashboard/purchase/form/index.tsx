'use client';

import { createOrder } from '@/app/lib/actions';
import { fetchUserByEmail } from '@/app/lib/data';
import ClientCryptoPrice from '@/app/ui/components/ClientCryptoPrice';
// import { abi, contractAddress, platformWalletAddr } from '@/contracts/index';
import { UsdtCircleColorful } from '@ant-design/web3-icons';
import { Button, Input, InputNumber, message } from 'antd';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function ProductPurchaseForm({
	sellerId,
	lockedPrice,
	maxLength,
	handleSubmit,
}: {
	sellerId: string;
	lockedPrice: bigint;
	maxLength: number;
	handleSubmit: (
		val: Parameters<typeof createOrder>[0]['order_info'],
	) => Promise<void>;
}) {
	const [messageApi, contextHolder] = message.useMessage();
	const session = useSession();
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			quantity: 1,
			totalPrice: 0,
			shippingAddress: '',
			recipientName: '',
			phoneNumber: '',
			buyerId: '',
			sellerId,
			lockedPrice,
		},
		validationSchema: Yup.object({
			quantity: Yup.number()
				.min(1, '数量不能小于1')
				.required('请填写购买数量'),
			shippingAddress: Yup.string().required('请填写收货地址'),
			recipientName: Yup.string().required('请填写收货人姓名'),
			phoneNumber: Yup.string()
				.matches(/^1[3-9]\d{9}$/, '手机号格式不正确')
				.required('请填写联系电话'),
			buyerId: Yup.string().required('买家id未加载成功'),
		}),
		onSubmit: (values) => {
			handleSubmit(values)
				.then(() => {
					return messageApi.success('购买商品成功');
				})
				.then(() => {
					router.back();
				})
				.catch(() => {
					messageApi.error('购买商品失败');
				});
		},
	});
	useEffect(() => {
		const email = session.data?.user?.email;
		if (email) {
			fetchUserByEmail(email).then((res) => {
				formik.setFieldValue('buyerId', res?.id);
			});
		}
	}, []);
	const [totalCost, setTotalCost] = useState(0n);
	useEffect(() => {
		formik.setFieldValue('totalPrice', totalCost);
	}, [totalCost]);

	useEffect(() => {
		setTotalCost(lockedPrice * BigInt(formik.values.quantity));
	}, [formik.values.quantity, lockedPrice]);

	return (
		<form
			onSubmit={formik.handleSubmit}
			className="space-y-4 p-4 border rounded-xl shadow"
		>
			{contextHolder}
			<div>
				<label className="block font-semibold mb-1">购买数量</label>
				<InputNumber
					name="quantity"
					min={1}
					max={maxLength}
					defaultValue={1}
					changeOnWheel
					onChange={(v) => {
						formik.setFieldValue('quantity', v);
					}}
					onBlur={(v) => {
						formik.handleBlur(v);
					}}
					value={formik.values.quantity}
				/>
				{formik.touched.quantity && formik.errors.quantity && (
					<div className="text-red-500 text-sm">
						{formik.errors.quantity}
					</div>
				)}
			</div>

			<div>
				<label className="block font-semibold mb-1">收货地址</label>
				<Input
					type="text"
					name="shippingAddress"
					className="w-full border px-3 py-2 rounded"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.shippingAddress}
				/>
				{formik.touched.shippingAddress &&
					formik.errors.shippingAddress && (
						<div className="text-red-500 text-sm">
							{formik.errors.shippingAddress}
						</div>
					)}
			</div>

			<div>
				<label className="block font-semibold mb-1">收货人姓名</label>
				<Input
					type="text"
					name="recipientName"
					className="w-full border px-3 py-2 rounded"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.recipientName}
				/>
				{formik.touched.recipientName &&
					formik.errors.recipientName && (
						<div className="text-red-500 text-sm">
							{formik.errors.recipientName}
						</div>
					)}
			</div>

			<div>
				<label className="block font-semibold mb-1">联系电话</label>
				<Input
					type="tel"
					name="phoneNumber"
					className="w-full border px-3 py-2 rounded"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.phoneNumber}
				/>
				{formik.touched.phoneNumber && formik.errors.phoneNumber && (
					<div className="text-red-500 text-sm">
						{formik.errors.phoneNumber}
					</div>
				)}
			</div>

			<div>
				<label className="block font-semibold mb-1">花费：</label>
				<ClientCryptoPrice
					icon={<UsdtCircleColorful />}
					value={totalCost * 100_0000n}
					decimals={6}
					symbol="USDT"
				/>
			</div>
			<Button htmlType="submit" type="primary">
				提交订单
			</Button>
		</form>
	);
}
