import SideNav from '@/app/ui/dashboard/sidenav';
import AuthProvider from '@/app/context/authProvider';
import { auth } from '@/auth';
import ConnectWallet from '@/app/ui/dashboard/connect-wallet';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { SSRWagmiProvider } from '@/app/ui/dashboard/context/wagmeProvider';
import { getConfig } from '@/wagme-config';
import GoBack from '@/app/ui/dashboard/goback';
export const experimental_ppr = true;
export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	let initialState = undefined;
	try {
		initialState = cookieToInitialState(
			getConfig(),
			(await headers()).get('cookie'),
		);
	} catch (err) {
		console.warn(err);
	}
	return (
		<div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
			<SSRWagmiProvider initialState={initialState}>
				<AuthProvider session={session}>
					<div className="w-full flex-none md:w-64">
						<SideNav />
					</div>
					<div className="flex-grow p-6 md:overflow-y-auto md:p-12 relative">
						<GoBack />
						{children}
						<div className="connect absolute top-6 right-6 md:top-12 md:right-12">
							<ConnectWallet />
						</div>
					</div>
				</AuthProvider>
			</SSRWagmiProvider>
		</div>
	);
}
