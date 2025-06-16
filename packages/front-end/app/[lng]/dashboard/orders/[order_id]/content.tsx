// pages/orders/[id].tsx
import { getT } from '@/app/i18n';
import { fetchOrderById, fetchUserByEmail } from '@/app/lib/data';
import ClientCryptoPrice from '@/app/ui/components/ClientCryptoPrice/index';
import { UsdtCircleColorful } from '@/app/ui/components/ClientIcons/index';
import ConfirmReceive from '@/app/ui/dashboard/orders/ConfirmReceive';
import OrdersItemTable from '@/app/ui/dashboard/orders/OrdersItemTable';
import ReceiveMoney from '@/app/ui/dashboard/orders/ReceiveMoney';
import ShipModal from '@/app/ui/dashboard/orders/ShipModal';
import { auth } from '@/auth';
import { OrderStatus } from '@/generated/prisma';
import { AuthError } from 'next-auth';
import { notFound } from 'next/navigation';

export default async function OrderDetailPageContent(props: { id: number }) {
	const { t } = await getT('dashboard');
	const mapping = {
		['PENDING']: t('未发货'),
		['CONFIRMED']: t('已发货'),
		['DELIVERED']: t('已收货'),
		['PAID']: t('已收款'),
	};
	const order = await fetchOrderById(props.id);
	if (order === null) {
		notFound();
	}
	const session = await auth();
	if (!session?.user?.email) {
		throw new AuthError(t('未登录或 session 信息不完整'));
	}
	// 根据用户邮箱查公司 ID
	const user = await fetchUserByEmail(session.user.email);
	return (
		<>
			<section className="mb-6">
				<h2 className="text-lg font-semibold">{t('买家信息')}</h2>
				<p>
					{t('姓名')}: {order.buyer.name}
				</p>
				<p>
					{t('电子邮箱')}: {order.buyer.email}
				</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold">{t('收货信息')}</h2>
				<p>
					{t('收件人')}: {order.recipientName}
				</p>
				<p>
					{t('收件地址')}: {order.shippingAddress}
				</p>
				<p>
					{t('联系电话')}: {order.phoneNumber}
				</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold">
					{t('订单包含商品物件')}
				</h2>
				<OrdersItemTable order={order} />
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold">{t('总消费')}</h2>
				<p className="text-xl font-bold">
					<ClientCryptoPrice value={order.totalPrice} />
				</p>
			</section>

			<section className="mb-6">
				<h2 className="text-lg font-semibold">{t('订单状态')}</h2>
				<p className="text-blue-600 font-medium">
					{mapping[order.status]}
				</p>
			</section>

			{order.status !== OrderStatus.PENDING ? (
				<>
					<section className="mb-6">
						<h2 className="text-lg font-semibold">
							{t('发货信息')}
						</h2>
						<p>
							{t('发件人')}: {order.shippingOriginPersonName}
						</p>
						<p>
							{t('发件地址')}: {order.shippingOriginAddress}
						</p>
						<p>
							{t('快递编号')}: {order.shippingExpressNumber}
						</p>
						<p>
							{t('联系电话')}: {order.shippingOriginPhoneNumber}
						</p>
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
		</>
	);
}
