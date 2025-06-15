import { Button } from '@/app/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { getT } from '@/app/i18n';
export default async function Page() {
	const { t } = await getT('login_and_register');
	return (
		<div className="px-6">
			<p className="h-16">{t('请选择角色')}</p>
			<Link href={'/login'}>
				<Button className="mt-4 w-full" type="button">
					{t('返回登录')}
					<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
				</Button>
			</Link>
		</div>
	);
}
