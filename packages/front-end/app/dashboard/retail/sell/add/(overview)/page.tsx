import { fetchUserByEmail, fetchUserProductTypes } from '@/app/lib/data';
import { auth } from '@/auth';
import { Button, Input, Select } from 'antd';
import AddSellForm from './form';

export default async function Page() {
	const session = await auth();
	const user = await fetchUserByEmail(session?.user?.email!);
	const product_types = (await fetchUserProductTypes(user!)).filter((pt) => {
		return !pt.commodoty.some((c) => {
			return c.creatorId === user?.id;
		});
	});

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">添加商品到零售</h1>
			<AddSellForm product_types={product_types} />
		</div>
	);
}
