import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import Link from 'next/link';
import { ReactNode } from 'react';
export default function CardsGrid({
	cardsContent,
	children,
}: {
	cardsContent: {
		id: string | number | bigint;
		linkHref: string;
		coverUrl: string;
		title: string;
		description: ReactNode;
	}[];
	children?: ReactNode;
}) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{cardsContent.map((card) => {
				return (
					<Link key={card.id} href={card.linkHref}>
						<Card
							hoverable
							style={{ width: 240 }}
							cover={
								<div className="h-44 pt-1">
									<img
										className="max-h-44 block mx-auto"
										alt={card.title}
										src={card.coverUrl}
									/>
								</div>
							}
						>
							<Meta
								title={
									<p className="text-center truncate">
										{card.title}
									</p>
								}
								description={
									<div className="text-center">
										{card.description}
									</div>
								}
							></Meta>
						</Card>
					</Link>
				);
			})}
			{children}
		</div>
	);
}
