import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { getT } from '@/app/i18n';

export default async function SideNav() {
	const { t } = await getT('dashboard');
	return (
		<div className="flex h-full flex-col px-3 py-4 md:px-2">
			<Link
				className="mb-2 flex h-20 items-end justify-start rounded-md bg-orange-500 p-4 md:h-40"
				href="/"
			>
				<div className="w-full text-white">
					<AcmeLogo abbreviation={true} />
				</div>
			</Link>
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<NavLinks />
				<div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
				<form
					action={async () => {
						'use server';
						await signOut({ redirectTo: '/' });
					}}
				>
					<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
						<PowerIcon className="w-6" />
						<div className="hidden md:block">{t('登出')}</div>
					</button>
				</form>
			</div>
		</div>
	);
}
