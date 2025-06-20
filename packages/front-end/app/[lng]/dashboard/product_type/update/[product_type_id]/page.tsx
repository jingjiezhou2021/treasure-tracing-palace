import { getT } from '@/app/i18n';
import { updateProductType } from '@/app/lib/actions';
import { fetchProductTypeById } from '@/app/lib/data';
import SingleProductTypeForm from '@/app/ui/dashboard/warehouse/product_type/single_product_type';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
export async function generateMetadata(): Promise<Metadata> {
	const { t } = await getT('dashboard');
	return { title: t('修改商品') };
}
export default async function Page(props: {
	params: Promise<{ product_type_id: string }>;
}) {
	const { t } = await getT('dashboard');
	const params = await props.params;
	const id = parseInt(params.product_type_id);
	const product_type = await fetchProductTypeById(id);
	if (product_type === null) {
		notFound();
	}
	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-6">{t('修改商品种类信息')}</h1>
			<SingleProductTypeForm
				product_type={product_type}
				handleSubmit={async (form) => {
					'use server';
					updateProductType(product_type.id, form);
				}}
			/>
		</div>
	);
}
