'use client';

import { fetchUSDTDecimals } from '@/app/lib/data';
import { ReactNode, useEffect, useState } from 'react';
import { createContext } from 'react';
import { produce } from 'immer';
const defaultContextValue = {
	USDT: {
		decimals: 6,
	},
};
export const TreasureTracingContext = createContext(defaultContextValue);

export function TreasureTracingProvider({ children }: { children: ReactNode }) {
	const [contextValue, setContextValue] = useState(defaultContextValue);
	useEffect(() => {
		fetchUSDTDecimals().then((res) => {
			const newContextValue = produce(contextValue, (draft) => {
				draft.USDT.decimals = res;
			});
			setContextValue(newContextValue);
		});
	}, []);
	return (
		<TreasureTracingContext value={contextValue}>
			{children}
		</TreasureTracingContext>
	);
}
