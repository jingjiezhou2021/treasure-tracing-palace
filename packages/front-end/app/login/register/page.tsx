import { Button } from '@/app/ui/button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
export default function Page() {
	return (
		<div className="px-6">
			<p className="h-16">请选择角色</p>
			<Link href={'/login'}>
				<Button className="mt-4 w-full" type="button">
					返回登陆{' '}
					<ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
				</Button>
			</Link>
		</div>
	);
}
