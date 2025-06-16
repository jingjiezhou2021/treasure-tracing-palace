export const dynamic = 'force-dynamic';
import { fetchCommodotyById, fetchUserByEmail } from '@/app/lib/data';
import UpdateSellForm from './form';
import { getT } from '@/app/i18n';

export default async function Page(props: { params: Promise<{ id: string }> }) {
	const { t } = await getT('dashboard');
	const { id } = await props.params;
	const commodoty = await fetchCommodotyById(parseInt(id));
	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">{t('修改零售商品信息')}</h1>
			<UpdateSellForm commodoty={commodoty!} />
		</div>
	);
}
