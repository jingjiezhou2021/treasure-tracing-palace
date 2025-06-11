import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login page for Next.js dashboard',
};

export default function LoginPage() {
	return <LoginForm />;
}
