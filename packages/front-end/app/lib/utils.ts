import { ProductStatus } from '@/generated/prisma';
import { TFunction } from 'i18next';
export enum ProductStatusSolidity {
	MANUFACTURING,
	DISTRIBUTING,
	FOR_SALE,
	SOLD,
}
export function ProductStatusToString(
	status: ProductStatus | ProductStatusSolidity,
	t?: TFunction,
) {
	const tmp: Record<typeof status, string> = {
		[ProductStatus.MANUFACTURING]: '已生产',
		[ProductStatus.DISTRIBUTING]: '运输中',
		[ProductStatus.FOR_SALE]: '销售中',
		[ProductStatus.SOLD]: '已销售',
		[ProductStatusSolidity.MANUFACTURING]: '已生产',
		[ProductStatusSolidity.DISTRIBUTING]: '运输中',
		[ProductStatusSolidity.FOR_SALE]: '销售中',
		[ProductStatusSolidity.SOLD]: '已销售',
	};
	if (t) {
		for (const key in tmp) {
			tmp[key as typeof status] = t(tmp[key as typeof status]);
		}
	}
	return tmp[status];
}

export function BigInt2Date(n: bigint) {
	return new Date(Number(n));
}
