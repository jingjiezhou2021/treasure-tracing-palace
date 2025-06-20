import { Card } from 'antd';
import ClientCryptoPrice from '@/app/ui/components/ClientCryptoPrice';
import { UsdtCircleColorful } from '@/app/ui/components/ClientIcons';
import { auth } from '@/auth';
import { fetchSellingOrdersByCompany, fetchUserByEmail } from '@/app/lib/data';
import { orders, OrderStatus } from '@/generated/prisma';
import { parseUnits } from 'viem';
import { AuthError } from 'next-auth';
import { getT } from '@/app/i18n';
export default async function DashInfo() {
	const { t } = await getT('dashboard');
	const session = await auth();
	if (!session?.user?.email) {
		throw new AuthError(t('未登录或 session 信息不完整'));
	}
	// 根据用户邮箱查公司 ID
	const user = await fetchUserByEmail(session.user.email);
	let orders: orders[] = [];
	const company_id = user?.companiesId || user?.foundedCompany[0].id;
	if (company_id) {
		orders = await fetchSellingOrdersByCompany(company_id);
		orders = orders.filter((o) => {
			return o.status === OrderStatus.PAID;
		});
	}
	const totalSalesCapital = orders.reduce((prev, cur) => {
		return prev + cur.totalPrice;
	}, 0n);
	const totalSales = orders.reduce((prev, cur) => {
		return prev + cur.quantity;
	}, 0);
	const numOfClients = new Set(
		orders.map((o) => {
			return o.buyerId;
		}),
	).size;
	return (
		<>
			<Card title={t('总销售额')}>
				<ClientCryptoPrice value={totalSalesCapital} />
			</Card>
			<Card title={t('总销量')}>{totalSales}</Card>
			<Card title={t('订单数量')}>{orders.length}</Card>
			<Card title={t('客户数量')}>{numOfClients}</Card>
		</>
	);
}
