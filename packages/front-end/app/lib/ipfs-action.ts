import { create } from 'kubo-rpc-client';
import { ApiError } from 'next/dist/server/api-utils';
import toBuffer from 'it-to-buffer';
const client = create(
	process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
		? '/ip4/127.0.0.1/tcp/5001'
		: 'https://ipfs.io',
);
export async function uploadFile(file: File): Promise<string> {
	const res = await client.add({ content: file });
	const cid = res.cid.toString();
	if (
		process.env.NODE_ENV === 'development' ||
		process.env.NODE_ENV === 'test'
	) {
		await client.files.cp(
			res.cid,
			`/${res.path}.${file.type.split('/')[1]}`,
		);
	}
	return cid;
}
export async function getFileByCid(cid: string | undefined): Promise<Blob> {
	console.log('this is the cid:', cid);
	if (cid === undefined) {
		throw new ApiError(400, 'cid should not be null');
	}
	const res = client.cat(cid);
	const ret = new Blob([await toBuffer(res)]);
	return ret;
}
