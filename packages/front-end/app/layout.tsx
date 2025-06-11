import '@/app/ui/global.scss';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import AntDesignCustomConfigProvider from '@/app/context/antDesignProvider';
export const metadata: Metadata = {
	title: {
		template: '%s | Acme Dashboard',
		default: 'Acme Dashboard',
	},
	description:
		'The official Next.js Course Dashboard, built with App Router.',
	metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<AntDesignCustomConfigProvider>
					{children}
				</AntDesignCustomConfigProvider>
			</body>
		</html>
	);
}
