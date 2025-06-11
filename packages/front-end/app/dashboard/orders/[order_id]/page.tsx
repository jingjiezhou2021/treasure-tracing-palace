// pages/orders/[id].tsx
import { fetchOrderById, fetchUserByEmail } from '@/app/lib/data';
import ClientCryptoPrice from '@/app/ui/components/ClientCryptoPrice/index';
import { UsdtCircleColorful } from '@/app/ui/components/ClientIcons/index';
import ConfirmReceive from '@/app/ui/dashboard/orders/ConfirmReceive';
import OrdersItemTable from '@/app/ui/dashboard/orders/OrdersItemTable';
import ReceiveMoney from '@/app/ui/dashboard/orders/ReceiveMoney';
import ShipModal from '@/app/ui/dashboard/orders/ShipModal';
import { auth } from '@/auth';
import { OrderStatus } from '@/generated/prisma';
import { notFound } from 'next/navigation';
const mapping = {
	['PENDING']: '未发货',
	['CONFIRMED']: '已发货',
	['DELIVERED']: '已收货',
	['PAID']: '已收款',
};
export default async function OrderDetailPage(props: {
	params: Promise<{ order_id: string }>;
}) {
	const params = await props.params;
	const id = parseInt(params.order_id);
	const order = await fetchOrderById(id);
	if (order === null) {
		notFound();
	}
	const session = await auth();
	if (!session?.user?.email) {
		throw new Error('未登录或 session 信息不完整');
	}
	// 根据用户邮箱查公司 ID
	const user = await fetchUserByEmail(session.user.email);
	return (
		<div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
			<h1 className="text-2xl font-bold mb-4">订单 #{id}</h1>

			<section className="mb-6">
				<h2 className="text-lg font-semibold">买家信息</h2>
				<p>姓名: {order.buyer.name}</p>
				<p>电子邮箱: {order.buyer.email}</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold">收货信息</h2>
				<p>收件人: {order.recipientName}</p>
				<p>收件地址: {order.shippingAddress}</p>
				<p>联系电话: {order.phoneNumber}</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold">订单包含商品物件</h2>
				<OrdersItemTable order={order} />
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold">总消费</h2>
				<p className="text-xl font-bold">
					<ClientCryptoPrice
						icon={<UsdtCircleColorful />}
						value={order.totalPrice * 100_0000n}
						decimals={6}
						symbol="USDT"
					/>
				</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold">订单状态</h2>
				<p className="text-blue-600 font-medium">
					{mapping[order.status]}
				</p>
			</section>

			{order.status !== OrderStatus.PENDING ? (
				<>
					<section className="mb-6">
						<h2 className="text-lg font-semibold">发货信息</h2>
						<p>发件人: {order.shippingOriginPersonName}</p>
						<p>发件地址: {order.shippingOriginAddress}</p>
						<p>快递编号: {order.shippingExpressNumber}</p>
						<p>联系电话: {order.shippingOriginPhoneNumber}</p>
					</section>
				</>
			) : null}

			<section className="mb-6">
				{order.buyerId === user?.id &&
				order.status === OrderStatus.CONFIRMED ? (
					<ConfirmReceive order={order} />
				) : null}
				{order.buyerId !== user?.id &&
				order.status === OrderStatus.PENDING ? (
					<ShipModal order={order} />
				) : null}
			</section>
			{order.buyerId !== user?.id &&
			(order.status === OrderStatus.DELIVERED ||
				order.status === OrderStatus.PAID) ? (
				<ReceiveMoney order={order} />
			) : null}
		</div>
	);
}
