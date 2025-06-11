'use client';
import { createProduct } from '@/app/lib/actions';
import { fetchUserByEmail } from '@/app/lib/data';
import {
	companies,
	product_types,
	ProductStatus,
	users,
} from '@/generated/prisma';
import { CryptoInput, CryptoPrice } from '@ant-design/web3';
import { USDT } from '@ant-design/web3-assets/tokens';
import { UsdtCircleColorful, USDTCircleFilled } from '@ant-design/web3-icons';
import { Button, DatePicker, Input, Select, message } from 'antd';
import useMessage from 'antd/es/message/useMessage';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function CreateProductForm({
	product_type,
	companies,
	users,
}: {
	product_type: product_types;
	companies: companies[];
	users: users[];
}) {
	const session = useSession();
	const [messageApi, contextHolder] = useMessage();
	const router = useRouter();
	const [currentTime, setCurrentTime] = useState(dayjs());

	const formik = useFormik({
		initialValues: {
			manufactureDate: null as Date | null,
			createdAt: currentTime.toDate(),
			serialNumber: '',
			typeId: product_type.id,
			status: ProductStatus.MANUFACTURING,
			currentOwnerId: '',
			creatorId: '',
		},
		validationSchema: Yup.object({
			serialNumber: Yup.string().required('序列号不能为空'),
			manufactureDate: Yup.date().required('生产日期不能为空'),
		}),
		onSubmit: async () => {
			// 提交交给 form 的 action，不在这里处理
			try {
				await createProduct(formik.values as any);
				await messageApi.open({
					type: 'success',
					content: '添加商品记录成功',
				});
				router.replace('/dashboard/warehouse');
			} catch (err) {
				console.error(err);
				messageApi.open({
					type: 'error',
					content: '添加商品记录失败',
				});
			}
		},
	});

	useEffect(() => {
		setInterval(() => {
			setCurrentTime(dayjs());
		}, 1000);
		const email = session.data?.user?.email;
		if (email) {
			fetchUserByEmail(email).then((res) => {
				formik.setFieldValue('currentOwnerId', res?.id);
				formik.setFieldValue('creatorId', res?.id);
			});
		}
	}, []);
	return (
		<div className="p-8">
			{contextHolder}
			<h1 className="text-2xl font-bold mb-6">新增商品记录</h1>
			<form
				onSubmit={formik.handleSubmit} // 表单提交目标
				className="max-w-xl space-y-4"
			>
				{/* 👇 不可编辑但展示 */}
				<div>
					<label className="block mb-2 font-medium">商品名称</label>
					<Input name="name" value={product_type.name} disabled />
				</div>

				<div>
					<label className="block mb-2 font-medium">商品描述</label>
					<Input.TextArea
						name="description"
						disabled
						value={product_type.description ?? ''}
						rows={4}
					/>
				</div>

				<div>
					<label className="block mb-2 font-medium">制造公司</label>
					<Select
						className="w-full"
						disabled
						options={companies?.map((v) => {
							return { value: v.id, label: v.name };
						})}
						value={product_type.companyId}
					/>
				</div>

				<div>
					<label className="block mb-2 font-medium">设置价格</label>
					<CryptoPrice
						icon={<UsdtCircleColorful />}
						value={product_type.price * 100_0000n}
						decimals={6}
						symbol="USDT"
					/>
				</div>

				<div>
					<label className="block mb-2 font-medium">序列号</label>
					<Input
						name="serialNumber"
						value={formik.values.serialNumber}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						placeholder="请输入序列号"
					/>
					{formik.touched.serialNumber &&
					formik.errors.serialNumber ? (
						<div className="text-red-500 text-sm mt-1">
							{formik.errors.serialNumber}
						</div>
					) : null}
				</div>
				<div>
					<label className="block mb-2 font-medium">制造日期</label>
					<DatePicker
						className="w-full"
						name="manufactureDate"
						placeholder="选择商品制造日期"
						showTime
						value={
							formik.values.manufactureDate
								? dayjs(formik.values.manufactureDate)
								: null
						}
						onChange={(date) => {
							formik.setFieldValue(
								'manufactureDate',
								date.toDate(),
							);
						}}
					/>
					{formik.touched.manufactureDate &&
						formik.errors.manufactureDate && (
							<div className="text-red-500 text-sm mt-1">
								{formik.errors.manufactureDate}
							</div>
						)}
				</div>
				{/* 👇 不可编辑但展示 */}

				<div>
					<label className="block mb-2 font-medium">
						商品登记日期
					</label>
					<DatePicker
						className="w-full"
						name="createdAt"
						placeholder="商品登记日期（当前）"
						showTime
						disabled
						value={currentTime}
						onChange={(date) => {
							formik.setFieldValue('createdAt', date.toDate());
						}}
					/>
				</div>
				<div>
					<label className="block mb-2 font-medium">
						商品登记负责人
					</label>
					<Select
						className="w-full"
						disabled
						options={users?.map((v) => {
							return { value: v.id, label: v.name };
						})}
						value={formik.values.creatorId}
					/>
				</div>

				<Button type="primary" htmlType="submit" className="mr-4">
					提交
				</Button>
				<Button
					htmlType="button"
					onClick={() => formik.resetForm()} // ✨ 直接清空表单
					className="mr-4"
				>
					重置
				</Button>
				<Button
					htmlType="button"
					color="danger"
					variant="solid"
					onClick={() => {
						router.back();
					}}
				>
					返回
				</Button>
			</form>
		</div>
	);
}
