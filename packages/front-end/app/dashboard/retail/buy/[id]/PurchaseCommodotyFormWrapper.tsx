'use client';

import { createCommodotyOrder, createOrder } from '@/app/lib/actions';
import { fetchCommodotyById } from '@/app/lib/data';
import ProductPurchaseForm from '@/app/ui/dashboard/purchase/form';
import { abi, contractAddress, platformWalletAddr } from '@/contracts';
import { ProductStatus } from '@/generated/prisma';
import { parseUnits } from 'viem';
// import { abi, contractAddress, platformWalletAddr } from '@/contracts/index';
import { useWriteContract } from 'wagmi';

export default function PurchaseCommodotyFormWrapper({
	commodoty,
}: {
	commodoty: NonNullable<Awaited<ReturnType<typeof fetchCommodotyById>>>;
}) {
	const { writeContractAsync, isPending } = useWriteContract();
	return (
		<ProductPurchaseForm
			sellerId={commodoty.creatorId}
			lockedPrice={commodoty.CommodotyPrice}
			maxLength={commodoty.productType.products.length}
			handleSubmit={(o) => {
				return writeContractAsync({
					address: contractAddress.USDT as `0x${string}`,
					abi: abi.USDT.abi,
					functionName: 'transfer',
					args: [
						platformWalletAddr,
						parseUnits(`${o.lockedPrice * BigInt(o.quantity)}`, 6),
					],
				}).then(() => {
					return createCommodotyOrder({
						commodoty,
						order_info: o,
					});
				});
			}}
		/>
	);
}
