import { fetchUserByEmail, fetchUserProductTypes } from '@/app/lib/data';
import { auth } from '@/auth';
import AddSellForm from './form';
import { getT } from '@/app/i18n';

export default async function Page() {
	const { t } = await getT('dashboard');
	const session = await auth();
	const user = await fetchUserByEmail(session?.user?.email!);
	const product_types = (await fetchUserProductTypes(user!)).filter((pt) => {
		return !pt.commodoty.some((c) => {
			return c.creatorId === user?.id;
		});
	});

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">{t('添加商品到零售')}</h1>
			<AddSellForm product_types={product_types} />
		</div>
	);
}
