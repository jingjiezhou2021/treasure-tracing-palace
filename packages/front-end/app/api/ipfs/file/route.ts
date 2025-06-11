import { getFileByCid, uploadFile } from '@/app/lib/ipfs-action';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
	// If you're going to use auth you'll want to verify here
	const cid = request.nextUrl.searchParams.get('cid')!;
	const file = await getFileByCid(cid);
	const response = new NextResponse(file, { status: 200 });
	response.headers.set('Content-Type', 'image/png');
	return response;
}
export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const file = formData.get('file') as File;
	if (!file) {
		return NextResponse.json(
			{ error: 'No files received.' },
			{ status: 400 },
		);
	}
	const cid = await uploadFile(file);
	return NextResponse.json({
		Message: '上传成功',
		cid,
		status: 200,
	});
}
