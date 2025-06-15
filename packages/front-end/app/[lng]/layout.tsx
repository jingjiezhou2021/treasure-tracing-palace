import '@/app/ui/global.scss';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import AntDesignCustomConfigProvider from '@/app/context/antDesignProvider';
import { languages } from '@/app/i18n/settings';
import { getT } from '@/app/i18n';

export async function generateStaticParams() {
	return languages.map((lng) => ({ lng }));
}
export async function generateMetadata(): Promise<Metadata> {
	const { t } = await getT('common');
	return {
		title: {
			template: `%s | ${t('溯宝阁')}`,
			default: t('溯宝阁'),
		},
		description: t('基于以太坊的去中心化商品销售与追溯平台'),
		metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
	};
}
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body className={`${inter.className} antialiased`}>
				<AntDesignCustomConfigProvider>
					{children}
				</AntDesignCustomConfigProvider>
			</body>
		</html>
	);
}
