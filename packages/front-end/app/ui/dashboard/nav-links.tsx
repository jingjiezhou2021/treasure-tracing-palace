'use client';
import {
	UserGroupIcon,
	HomeIcon,
	DocumentDuplicateIcon,
	ArchiveBoxArrowDownIcon,
	BuildingStorefrontIcon,
	NewspaperIcon,
	ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import clsx from 'clsx';
import { fetchUserByEmail } from '@/app/lib/data';
import { useSession } from 'next-auth/react';
import { ReactElement, useEffect, useState } from 'react';
import { Role } from '@/generated/prisma';
import { useT } from '@/app/i18n/client';
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.

export default function NavLinks() {
	const { t } = useT('dashboard');
	const manufacturerLinks = [
		{ name: t('综合数据'), href: '/dashboard', icon: HomeIcon },
		{
			name: t('库存管理'),
			href: '/dashboard/warehouse',
			icon: ArchiveBoxArrowDownIcon,
		},
		{
			name: t('订单管理'),
			href: '/dashboard/orders',
			icon: DocumentDuplicateIcon,
		},
		{
			name: t('商品溯源'),
			href: '/dashboard/tracing',
			icon: NewspaperIcon,
		},
	];
	const distributorLinks = [
		{ name: t('综合数据'), href: '/dashboard', icon: HomeIcon },
		{
			name: t('商品采购'),
			href: '/dashboard/purchase',
			icon: BuildingStorefrontIcon,
		},
		{
			name: t('商品零售'),
			href: '/dashboard/retail',
			icon: ShoppingBagIcon,
		},
		{
			name: t('库存管理'),
			href: '/dashboard/warehouse',
			icon: ArchiveBoxArrowDownIcon,
		},
		{
			name: t('订单管理'),
			href: '/dashboard/orders',
			icon: DocumentDuplicateIcon,
		},
	];
	const customerLinks = [
		{
			name: t('商品购买'),
			href: '/dashboard/customer/retail',
			icon: ShoppingBagIcon,
		},
		{
			name: t('订单管理'),
			href: '/dashboard/orders',
			icon: DocumentDuplicateIcon,
		},
	];
	const lng = useParams()?.lng;
	const session = useSession();
	const [links, setLinks] = useState<
		{
			href: string;
			name: string;
			icon: any;
		}[]
	>([]);
	const pathname = usePathname();
	useEffect(() => {
		if (session.data?.user?.email) {
			fetchUserByEmail(session.data?.user?.email).then((res) => {
				switch (res?.role) {
					case Role.DISTRIBUTOR: {
						setLinks(distributorLinks);
						break;
					}
					case Role.MANUFACTURER: {
						setLinks(manufacturerLinks);
						break;
					}
					case Role.CUSTOMER: {
						setLinks(customerLinks);
						break;
					}
				}
			});
		}
	}, []);
	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon;
				return (
					<Link
						key={link.name}
						href={link.href}
						className={clsx(
							'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-orange-50 hover:text-orange-600 md:flex-none md:justify-start md:p-2 md:px-3',
							{
								'bg-orange-50 text-orange-600':
									pathname === `/${lng}/dashboard`
										? pathname === `/${lng}${link.href}`
										: pathname.startsWith(
												`/${lng}${link.href}`,
											) && link.href !== '/dashboard',
							},
						)}
					>
						<LinkIcon className="w-6" />
						<p className="hidden md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
