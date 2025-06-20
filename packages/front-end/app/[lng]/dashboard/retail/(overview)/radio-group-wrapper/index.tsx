'use client';
import { useT } from '@/app/i18n/client';
import { Group as RadioGroup } from 'antd/es/radio';
import { usePathname, useRouter } from 'next/navigation';
export default function RadioGroupWrapper() {
	const router = useRouter();
	const pathName = usePathname();
	const { t } = useT('dashboard');
	return (
		<RadioGroup
			block
			options={[
				{ value: 'buy', label: t('买') },
				{ value: 'sell', label: t('卖') },
			]}
			value={
				pathName.includes('sell')
					? 'sell'
					: pathName.includes('buy')
						? 'buy'
						: null
			}
			optionType="button"
			buttonStyle="solid"
			onChange={(val) => {
				router.replace(`/dashboard/retail/${val.target.value}`);
			}}
		/>
	);
}
