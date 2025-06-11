'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { redirect } from 'next/navigation';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import {
	order_items,
	orders,
	OrderStatus,
	product_types,
	ProductStatus,
	Role,
} from '@/generated/prisma';
import { fetchCommodotyById, fetchOrderById, fetchUserByEmail } from './data';
import {
	getContract,
	InvalidParameterError,
	parseUnits,
	ResourceNotFoundRpcError,
	RpcRequestError,
	verifyMessage,
} from 'viem';
import {
	getProductBySerialNumber,
	PublishProductOnChain,
	recordOrder,
	transferOwnership,
	transferUSDT,
	updateProductStatus,
} from './contract-actions';
import { uploadFile, getFileByCid, pinata } from './ipfs-action';
import { ProductStatusSolidity } from './utils';

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		const email = formData.get('email');
		const user = await fetchUserByEmail(email as string);
		if (user && user.role === Role.CUSTOMER) {
			formData.set('redirectTo', '/dashboard/customer/retail');
		}
		await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch ((error as any).type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.';
				default:
					return 'Something went wrong.';
			}
		}
		throw error;
	}
}

export async function registerBussiness(regForm: {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
	bindCompany: null | string;
	companyName: string;
	physicalAddress: string;
	registrationNumber: string;
	taxId: string;
	redirectTo: string;
	addingCompany: boolean;
	role: Role;
}) {
	const hashedPassword = await bcrypt.hash(regForm.password, 10);
	if (!regForm.addingCompany) {
		await prisma.users.create({
			data: {
				email: regForm.email,
				name: regForm.name,
				password: hashedPassword,
				role: regForm.role,
				companiesId:
					regForm.bindCompany === null
						? null
						: parseInt(regForm.bindCompany),
			},
		});
	} else {
		await prisma.users.create({
			data: {
				email: regForm.email,
				name: regForm.name,
				role: regForm.role,
				password: hashedPassword,
				foundedCompany: {
					create: {
						name: regForm.companyName,
						physicalAddress: regForm.physicalAddress,
						registrationNumber: regForm.registrationNumber,
						taxId: regForm.taxId,
					},
				},
			},
		});
	}
	await signIn('credentials', {
		email: regForm.email,
		password: regForm.password,
		redirectTo: regForm.redirectTo,
	});
}

export async function registerCustomer(regForm: {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
	redirectTo: string;
}) {
	const hashedPassword = await bcrypt.hash(regForm.password, 10);
	await prisma.users.create({
		data: {
			email: regForm.email,
			name: regForm.name,
			password: hashedPassword,
			role: Role.CUSTOMER,
		},
	});
	await signIn('credentials', {
		email: regForm.email,
		password: regForm.password,
		redirectTo: regForm.redirectTo,
	});
}
export async function createProduct(p: {
	manufactureDate: Date;
	createdAt: Date;
	serialNumber: string;
	currentOwnerId: string;
	creatorId: string;
	status: ProductStatus;
	typeId: number;
}) {
	await prisma.products.create({
		data: p,
	});
}
export async function createProductType(p: {
	name: string;
	description: string;
	companyId: number;
	price: bigint | number;
	coverCid: string | undefined;
}) {
	await prisma.product_types.create({
		data: {
			...p,
		},
	});
}
export async function updateProductType(
	id: number,
	p: {
		name: string;
		description: string;
		companyId: number;
		price: bigint | number;
		coverCid: string | undefined;
	},
) {
	await prisma.product_types.update({
		where: {
			id,
		},
		data: {
			...p,
		},
	});
}

export async function createCommodotyOrder(o: {
	commodoty: NonNullable<Awaited<ReturnType<typeof fetchCommodotyById>>>;
	order_info: {
		quantity: number;
		shippingAddress: string;
		recipientName: string;
		totalPrice: number;
		phoneNumber: string;
		buyerId: string;
		lockedPrice: bigint;
	};
}) {
	const selectedProducts = o.commodoty.productType.products.slice(
		0,
		o.order_info.quantity,
	);
	await prisma.orders.create({
		data: {
			productTypeId: o.commodoty.productTypeId,
			...o.order_info,
			order_items: {
				create: selectedProducts.map((p) => {
					return {
						productId: p.id,
					};
				}),
			},
		},
	});
	await prisma.products.updateMany({
		where: {
			id: {
				in: selectedProducts.map((p) => {
					return p.id;
				}),
			},
		},
		data: {
			status: ProductStatus.DISTRIBUTING,
		},
	});
}

export async function createOrder(o: {
	product_type: product_types;
	order_info: {
		quantity: number;
		shippingAddress: string;
		recipientName: string;
		totalPrice: number;
		phoneNumber: string;
		buyerId: string;
		lockedPrice: bigint;
	};
}) {
	const selectedProducts = await prisma.products.findMany({
		where: {
			typeId: o.product_type.id,
			status: ProductStatus.MANUFACTURING,
		},
		take: o.order_info.quantity,
	});
	await prisma.orders.create({
		data: {
			productTypeId: o.product_type.id,
			...o.order_info,
			order_items: {
				create: selectedProducts.map((p) => {
					return {
						productId: p.id,
					};
				}),
			},
		},
	});
	await prisma.products.updateMany({
		where: {
			id: {
				in: selectedProducts.map((p) => {
					return p.id;
				}),
			},
		},
		data: {
			status: ProductStatus.DISTRIBUTING,
		},
	});
}

export async function addShippingInfo(shippingInfo: {
	address: string;
	sender: string;
	phone: string;
	trackingNumber: string;
	order_id: number;
}) {
	await prisma.orders.update({
		where: {
			id: shippingInfo.order_id,
		},
		data: {
			shippingOriginAddress: shippingInfo.address,
			shippingExpressNumber: shippingInfo.trackingNumber,
			shippingOriginPersonName: shippingInfo.sender,
			shippingOriginPhoneNumber: shippingInfo.phone,
			status: OrderStatus.CONFIRMED,
		},
	});
	const order = await fetchOrderById(shippingInfo.order_id);
	if (order) {
		publishOnChainIfNot(order);
	}
}
async function publishOnChainIfNot(
	order: NonNullable<Awaited<ReturnType<typeof fetchOrderById>>>,
) {
	for (const oi of order.order_items) {
		try {
			await getProductBySerialNumber(oi.product.serialNumber);
		} catch (err) {
			await PublishProductOnChain([
				{
					id: BigInt(oi.productId),
					name: order.productType.name,
					description: order.productType.description ?? '',
					serialNumber: oi.product.serialNumber,
					creatorEmail: oi.product.creator.email,
					currentOwnerEmail: oi.product.creator.email,
					status: ProductStatusSolidity.MANUFACTURING,
					manufactureDate: BigInt(
						oi.product.manufactureDate.getTime(),
					),
					createdAt: BigInt(oi.product.createdAt.getTime()),
					companyId: BigInt(order.productType.companyId),
					companyName: order.productType.manufacturerCompany.name,
					onChainTimestamp: 0n,
				},
			]);
		}
	}
}
export async function confirmReceiving(
	order: NonNullable<Awaited<ReturnType<typeof fetchOrderById>>>,
) {
	await prisma.orders.update({
		where: {
			id: order.id,
		},
		data: {
			status: OrderStatus.DELIVERED,
		},
	});
	const receiver_id = (await prisma.orders.findUnique({
		where: {
			id: order.id,
		},
		select: {
			buyerId: true,
		},
	}))!.buyerId;
	publishOnChainIfNot(order);
	for (const oi of order.order_items) {
		await prisma.products.update({
			data: {
				currentOwnerId: receiver_id,
				status:
					order.buyer.role === Role.DISTRIBUTOR
						? ProductStatus.FOR_SALE
						: ProductStatus.SOLD,
			},
			where: {
				id: oi.product.id,
			},
		});
		await transferOwnership(BigInt(oi.productId), order.buyer.email);
		await updateProductStatus(
			BigInt(oi.productId),
			order.buyer.role === Role.DISTRIBUTOR
				? ProductStatusSolidity.FOR_SALE
				: ProductStatusSolidity.SOLD,
		);
	}
}
async function transferUSDTTo(addr: `0x${string}`, amount: string) {
	const tx = await transferUSDT(addr, amount);
	return tx;
}
export async function applyForReceivingUSDT(
	addr: `0x${string}`,
	order_id: number,
	signature: `0x${string}`,
) {
	const recovered = await verifyMessage({
		address: addr,
		message: order_id.toString(),
		signature,
	});
	if (recovered) {
		const order = await fetchOrderById(order_id);
		if (order?.status === OrderStatus.PAID) {
			throw new Error('已经领取过订单金额');
		}
		const txHash = await transferUSDTTo(
			addr,
			(Number(order?.totalPrice) - 1).toString(),
		);
		await prisma.orders.update({
			where: {
				id: order?.id,
			},
			data: {
				status: OrderStatus.PAID,
			},
		});
		await recordOrderOnChain(order_id);
		return txHash;
	} else {
		throw new AuthError('signature verification failed');
	}
}
async function recordOrderOnChain(id: number) {
	const order = await fetchOrderById(id);
	if (order) {
		await recordOrder([
			{
				orderId: BigInt(order.id),
				buyerName: order?.buyer.name,
				sellerName: order?.seller?.name!,
				shippingOriginAddress: order.shippingOriginAddress!,
				shippingDestinationAddress: order.shippingAddress,
				productSerials: order.order_items.map((oi) => {
					return oi.product.serialNumber;
				}),
				quantity: BigInt(order.quantity),
				lockedPrice: order.lockedPrice,
				totalPrice: order.totalPrice,
				timestamp: 0n,
			},
		]);
	} else {
		throw new Error('order not found');
	}
}
export async function addCommodoty(commodoty: {
	productTypeId: number;
	creatorId: string;
	CommodotyPrice: bigint;
}) {
	await prisma.commodoty.create({
		data: commodoty,
	});
}
export async function updateCommodoty(
	id: number,
	commodoty: {
		productTypeId?: number;
		creatorId?: string;
		CommodotyPrice: bigint;
	},
) {
	await prisma.commodoty.update({
		where: { id },
		data: {
			...commodoty,
		},
	});
}
