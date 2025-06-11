'use client';

import { createOrder } from '@/app/lib/actions';
import { fetchProductTypeById } from '@/app/lib/data';
import ProductPurchaseForm from '@/app/ui/dashboard/purchase/form';
import { abi, contractAddress, platformWalletAddr } from '@/contracts';
import { ProductStatus } from '@/generated/prisma';
import { parseUnits } from 'viem';
// import { abi, contractAddress, platformWalletAddr } from '@/contracts/index';
import { useWriteContract } from 'wagmi';

export default function ProductPurchaseFormWrapper({
	product_type,
}: {
	product_type: NonNullable<Awaited<ReturnType<typeof fetchProductTypeById>>>;
}) {
	const { writeContractAsync, isPending } = useWriteContract();
	return (
		<ProductPurchaseForm
			sellerId={product_type.manufacturerCompany.founderId}
			lockedPrice={product_type.price}
			maxLength={
				product_type.products.filter((p) => {
					return p.status === ProductStatus.MANUFACTURING;
				}).length
			}
			handleSubmit={(values) => {
				return writeContractAsync({
					address: contractAddress.USDT as `0x${string}`,
					abi: abi.USDT.abi,
					functionName: 'transfer',
					args: [
						platformWalletAddr,
						parseUnits(
							`${values.lockedPrice * BigInt(values.quantity)}`,
							6,
						),
					],
				}).then(() => {
					return createOrder({
						product_type,
						order_info: values,
					});
				});
			}}
		/>
	);
}
