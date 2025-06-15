module.exports = {
	locales: ['zh'],
	defaultNamespace: 'common',
	defaultValue: (locale: string, namespace: string, key: string) => {
		if (locale === 'zh') {
			return key;
		} else {
			return '';
		}
	},
	output: 'public/locales/$LOCALE/$NAMESPACE.json',
	input: ['app/**/*.{js,jsx,ts,tsx}'],
	createOldCatalogs: false,
	keepRemoved: false,
	sort: true,
	lexers: {
		tsx: [
			{
				lexer: 'JavascriptLexer',
				functions: ['t'], // Array of functions to match
				namespaceFunctions: ['useT', 'getT'], // Array of functions to match for namespace
			},
		],
	},
};
