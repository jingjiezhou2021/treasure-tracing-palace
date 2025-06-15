import {
	fetchCompanies,
	fetchProductTypeById,
	fetchUsers,
} from '@/app/lib/data';
import CreateProductForm from './CreateProductForm';

const CreateProductPage = async ({
	params,
}: {
	params: Promise<{ product_type_id: string }>;
}) => {
	const product_type = await fetchProductTypeById(
		parseInt((await params).product_type_id),
	);
	const companies = await fetchCompanies();
	const users = await fetchUsers();
	return (
		<CreateProductForm
			product_type={product_type!}
			companies={companies}
			users={users}
		/>
	);
};

export default CreateProductPage;
