import RegisterForm from '@/app/ui/login/register/customer/register-form';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Register',
	description: 'Register page for Next.js dashboard',
};

export default async function RegisterPage() {
	return <RegisterForm />;
}
