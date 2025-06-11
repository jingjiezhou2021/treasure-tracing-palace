import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Home',
	description: 'Home page for Next.js dashboard',
};
export default function Page() {
	return (
		<main className="flex min-h-screen flex-col p-6">
			<div className="flex h-20 shrink-0 items-end rounded-lg bg-orange-500 p-4 md:h-52">
				<AcmeLogo />
			</div>
			<div className="mt-4 flex grow flex-col gap-4 md:flex-row">
				<div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
					<div className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black" />
					<p
						className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
					>
						<strong>欢迎来到溯宝阁！</strong>
					</p>
					<p
						className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
					>
						溯宝阁是一个去中心化的供应链管理系统，让您能够高效便捷地管理产品分销链。这有助于防止假冒产品流入市场。这对于追踪药品和品牌产品尤为有用。
					</p>
					<p
						className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
					>
						它从制造商在系统注册产品的根层级开始。产品上市后，会以预先设定的价格出售给零售商。之后，消费者可以从零售商处购买该产品。所有这些交易都记录在区块链上，这使得产品流通更加透明。产品的完整历史记录也会向用户展示，用户可以看到产品自生产以来的流通过程。
					</p>
					<p
						className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
					>
						本平台使用泰达币（USDT）作为支付工具
					</p>
					<Link
						href="/login"
						className="flex items-center gap-5 self-start rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-400 md:text-base"
					>
						<span>登陆</span>{' '}
						<ArrowRightIcon className="w-5 md:w-6" />
					</Link>
				</div>
				<div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
					{/* Add Hero Images Here */}
					<Image
						src="/subaoge.jpg"
						width={5157}
						height={3438}
						className="block"
						alt="Screenshots of the dashboard project showing desktop version"
					/>
				</div>
			</div>
		</main>
	);
}
