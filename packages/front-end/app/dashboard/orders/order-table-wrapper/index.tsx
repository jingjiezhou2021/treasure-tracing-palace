import { auth } from '@/auth';
import { fetchOrdersByUser, fetchUserByEmail } from '@/app/lib/data';
import OrderTable from '@/app/ui/dashboard/orders/OrderTable';
export default async function OrderTableWrapper({ take }: { take?: number }) {
	const session = await auth();
	if (!session?.user?.email) {
		throw new Error('未登录或 session 信息不完整');
	}
	// 根据用户邮箱查公司 ID
	const user = await fetchUserByEmail(session.user.email);
	let orders = await fetchOrdersByUser(user!);
	if (take) {
		orders = orders.slice(0, take);
	}
	return <OrderTable orders={orders} />;
}
