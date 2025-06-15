import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';
import { getT } from '@/app/i18n';

export async function generateMetadata(): Promise<Metadata> {
	const { t } = await getT('login_and_register');
	return { title: t('登录'), description: t('登录页面') };
}

export default function LoginPage() {
	return <LoginForm />;
}
