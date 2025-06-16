import { getT } from '@/app/i18n';
import { createProductType } from '@/app/lib/actions';
import SingleProductTypeForm from '@/app/ui/dashboard/warehouse/product_type/single_product_type';
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
