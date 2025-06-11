import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo(props: { abbreviation?: boolean }) {
	return (
		<div
			className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
		>
			<GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
			<p className="text-[44px]">
				{!props.abbreviation
					? '溯宝阁-基于区块链的高价值商品溯源与销售平台'
					: '溯宝阁'}
			</p>
		</div>
	);
}
