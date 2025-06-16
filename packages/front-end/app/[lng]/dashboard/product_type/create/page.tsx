import { getT } from '@/app/i18n';
import { createProductType } from '@/app/lib/actions';
import SingleProductTypeForm from '@/app/ui/dashboard/warehouse/product_type/single_product_type';
import { Metadata } from 'next';
export async function generateMetadata(): Promise<Metadata> {
	const { t } = await getT('dashboard');
	return { title: t('新增商品') };
}
const Page = async () => {
	const { t } = await getT('dashboard');
	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-6">{t('新增商品种类')}</h1>
			<SingleProductTypeForm
				handleSubmit={async (form) => {
					'use server';
					return await createProductType(form);
				}}
			/>
		</div>
	);
};

export default Page;
