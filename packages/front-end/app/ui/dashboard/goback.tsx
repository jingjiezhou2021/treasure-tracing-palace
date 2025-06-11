'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FloatButton } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
export default function GoBack() {
	const router = useRouter();
	const pathname = usePathname();
	if (pathname === '/dashboard') {
		return null;
	}
	return (
		<div className="mb-4">
			<FloatButton
				className="block !static"
				icon={<LeftOutlined />}
				onClick={() => {
					router.back();
				}}
			></FloatButton>
		</div>
	);
}
