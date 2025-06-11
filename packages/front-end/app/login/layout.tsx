import AcmeLogo from '@/app/ui/acme-logo';
import { Suspense } from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex justify-center">
			<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
				<div className="flex h-20 w-full items-end rounded-lg bg-orange-500 p-3 md:h-36">
					<div className="w-full text-white">
						<AcmeLogo abbreviation={true} />
					</div>
				</div>
				<Suspense>{children}</Suspense>
			</div>
		</main>
	);
}
