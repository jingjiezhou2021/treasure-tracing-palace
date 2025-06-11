'use client';

import { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addShippingInfo } from '@/app/lib/actions';
import { useRouter } from 'next/navigation';
import { orders, OrderStatus } from '@/generated/prisma';

const validationSchema = Yup.object().shape({
	address: Yup.string().required('请输入发货地址'),
	sender: Yup.string().required('请输入发货人姓名'),
	phone: Yup.string()
		.required('请输入联系电话')
		.matches(/^\d{11}$/, '请输入有效的11位手机号'),
	trackingNumber: Yup.string().required('请输入快递单号'),
});

export default function ShipModal({ order }: { order: orders }) {
	const order_id = order.id;
	const router = useRouter();
	const [visible, setVisible] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	return (
		<>
			{contextHolder}
			{order.status === OrderStatus.PENDING ? (
				<Button type="primary" onClick={() => setVisible(true)}>
					发货
				</Button>
			) : null}
			<Modal
				title="填写发货信息"
				open={visible}
				onCancel={() => setVisible(false)}
				footer={null}
				destroyOnClose
			>
				<Formik
					initialValues={{
						address: '',
						sender: '',
						phone: '',
						trackingNumber: '',
						order_id,
					}}
					validationSchema={validationSchema}
					onSubmit={(val) => {
						addShippingInfo(val).then(() => {
							messageApi.success('发货成功');
							setVisible(false);
							router.refresh();
						});
					}}
				>
					{({
						handleSubmit,
						handleChange,
						handleBlur,
						values,
						errors,
						touched,
					}) => (
						<Form layout="vertical" onFinish={handleSubmit}>
							<Form.Item
								label="发货地址"
								validateStatus={
									touched.address && errors.address
										? 'error'
										: ''
								}
								validateTrigger="onBlur"
								help={touched.address && errors.address}
							>
								<Input
									name="address"
									value={values.address}
									onChange={handleChange}
									onBlur={handleBlur} // 必须加上！
								/>
							</Form.Item>
							<Form.Item
								label="发货人姓名"
								validateStatus={
									touched.sender && errors.sender
										? 'error'
										: ''
								}
								validateTrigger="onBlur"
								help={touched.sender && errors.sender}
							>
								<Input
									name="sender"
									value={values.sender}
									onChange={handleChange}
									onBlur={handleBlur} // 必须加上！
								/>
							</Form.Item>
							<Form.Item
								label="联系电话"
								validateStatus={
									touched.phone && errors.phone ? 'error' : ''
								}
								validateTrigger="onBlur"
								help={touched.phone && errors.phone}
							>
								<Input
									name="phone"
									value={values.phone}
									onChange={handleChange}
									onBlur={handleBlur} // 必须加上！
								/>
							</Form.Item>
							<Form.Item
								label="快递单号"
								validateStatus={
									touched.trackingNumber &&
									errors.trackingNumber
										? 'error'
										: ''
								}
								help={
									touched.trackingNumber &&
									errors.trackingNumber
								}
								validateTrigger="onBlur"
							>
								<Input
									name="trackingNumber"
									value={values.trackingNumber}
									onChange={handleChange}
									onBlur={handleBlur} // 必须加上！
								/>
							</Form.Item>
							<Form.Item>
								{}
								<Button type="primary" htmlType="submit" block>
									确认发货
								</Button>
							</Form.Item>
						</Form>
					)}
				</Formik>
			</Modal>
		</>
	);
}
