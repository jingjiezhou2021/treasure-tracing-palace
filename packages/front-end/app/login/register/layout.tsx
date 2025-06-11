'use client';
import { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<div className="bg-gray-50">
			<div className="px-6">
				<label htmlFor="role" className="block my-4">
					选择用户角色
				</label>
				<select
					name="role"
					id="role"
					className="block my-4 w-full"
					onChange={(v) => {
						router.push(`/login/register/${v.target.value}`);
					}}
					defaultValue={pathname.split('/').at(-1)}
				>
					<option value="">请选择</option>
					<option value="manufacturer">生产商</option>
					<option value="distributor">销售商</option>
					<option value="customer">消费者</option>
				</select>
			</div>
			{children}
		</div>
	);
}
