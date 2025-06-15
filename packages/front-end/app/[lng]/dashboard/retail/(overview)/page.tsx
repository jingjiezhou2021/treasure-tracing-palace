'use client';

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
	const router = useRouter();
	useEffect(() => {
		router.replace('/dashboard/retail/sell');
	});
	return (
		<Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
	);
}
