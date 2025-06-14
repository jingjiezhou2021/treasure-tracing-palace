import { OrderRegistry } from 'smart-contract';
import { ProductRegistry } from 'smart-contract';
import { USDT } from 'smart-contract';
import { sepoliaUSDT } from 'smart-contract';
import fs from 'fs';

console.log('writing to contracts/abi...');

fs.writeFileSync(
	'./contracts/abi/OrderRegistry.ts',
	`export default ${JSON.stringify(OrderRegistry)} as const;`,
);
fs.writeFileSync(
	'./contracts/abi/ProductRegistry.ts',
	`export default ${JSON.stringify(ProductRegistry)} as const;`,
);
let usdtContent: string = '';
if (process.env.NODE_ENV === 'production') {
	console.warn('production environment, using sepolia usdt abi');
	usdtContent = JSON.stringify(sepoliaUSDT);
} else {
	usdtContent = JSON.stringify(USDT);
}
fs.writeFileSync(
	'./contracts/abi/USDT.ts',
	`export default ${usdtContent} as const;`,
);

console.log('write to contracts/abi successful');
