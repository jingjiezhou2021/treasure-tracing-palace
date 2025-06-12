'use client';
import { useContext } from 'react';
import { TreasureTracingContext } from '../context/TreasureTracingProvider';

export default function useUSDTDecimals() {
	return useContext(TreasureTracingContext).USDT.decimals;
}
