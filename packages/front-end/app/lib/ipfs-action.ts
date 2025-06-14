import { create } from 'kubo-rpc-client';
import { ApiError } from 'next/dist/server/api-utils';
import toBuffer from 'it-to-buffer';
import { PinataError, PinataSDK } from 'pinata';
const pinata =
	process.env.NODE_ENV === 'production'
		? new PinataSDK({
				pinataJwt: `${process.env.PINATA_JWT}`,
				pinataGateway: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}`,
				pinataGatewayKey: `${process.env.PINATA_GATEWAY_KEY}`,
			})
		: null;
const kurboClient = create(process.env.IPFS_RPC_URL);
export async function uploadFile(file: File): Promise<string> {
	if (process.env.NODE_ENV === 'production') {
		if (!pinata) {
			throw new PinataError('pinata sdk creation failed');
		}
		const { cid } = await pinata.upload.public.file(file);
		return cid;
	} else {
		const res = await kurboClient.add({ content: file });
		const cid = res.cid.toString();
		await kurboClient.files.cp(
			res.cid,
			`/${res.path}-${Date.now()}.${file.type.split('/')[1]}`,
		);
		return cid;
	}
}
export async function getFileByCid(cid: string | undefined): Promise<Blob> {
	console.log('this is the cid:', cid);
	if (cid === undefined) {
		throw new ApiError(400, 'cid should not be null');
	}
	if (process.env.NODE_ENV === 'production') {
		if (!pinata) {
			throw new PinataError('pinata sdk creation failed');
		}
		return (await pinata?.gateways.public.get(cid))!.data as Blob;
	} else {
		const res = kurboClient.cat(cid);
		const ret = new Blob([await toBuffer(res)]);
		return ret;
	}
}
