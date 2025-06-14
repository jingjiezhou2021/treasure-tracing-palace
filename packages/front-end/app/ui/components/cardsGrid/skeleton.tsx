import { Card } from 'antd';
export default function CardsGridSkeleton({ quantity }: { quantity: number }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{[...Array(quantity).keys()].map((_, index) => {
				return (
					<Card
						key={index}
						hoverable
						style={{ width: 240 }}
						loading
					></Card>
				);
			})}
		</div>
	);
}
