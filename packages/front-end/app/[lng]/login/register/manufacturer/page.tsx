import RegisterForm from '@/app/ui/login/register/manufacturer/register-form';
import prisma from '@/app/lib/prisma';
export default async function RegisterPage() {
	const companies = await prisma.companies.findMany();
	return <RegisterForm {...{ companies }} />;
}
