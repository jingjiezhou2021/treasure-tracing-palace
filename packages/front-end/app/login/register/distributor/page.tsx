import RegisterForm from '@/app/ui/login/register/distributor/register-form';
import { Metadata } from 'next';
import prisma from '@/app/lib/prisma';
export const metadata: Metadata = {
	title: 'Register',
	description: 'Register page for Next.js dashboard',
};

export default async function RegisterPage() {
	const companies = await prisma.companies.findMany();
	return <RegisterForm {...{ companies }} />;
}
