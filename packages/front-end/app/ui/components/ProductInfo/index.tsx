import { ReactNode } from 'react';
import { Descriptions, Image } from 'antd';
export default function ProductInfo({
	imgUrl,
	children,
	name,
}: {
	imgUrl: string;
	children: ReactNode;
	name?: string;
}) {
	return (
		<div className="flex flex-col xl:flex-row gap-6">
			{/* 商品图片 */}
			<div className="flex-shrink-0 w-full xl:w-1/4">
				<div className="flex justify-center xl:justify-start w-full">
					<Image
						src={imgUrl}
						className="rounded-2xl shadow-md max-h-72"
					/>
				</div>
			</div>

			{/* 商品信息 */}
			<div className="flex-1">
				<Descriptions
					column={1}
					labelStyle={{ fontWeight: 600, fontSize: 18 }}
					contentStyle={{ fontSize: 18 }}
					title={<h1 className="text-4xl">{name}</h1>}
				>
					{children}
				</Descriptions>
			</div>
		</div>
	);
}
