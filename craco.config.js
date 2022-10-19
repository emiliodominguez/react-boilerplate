const path = require('path');

module.exports = {
	webpack: {
		configure: config => ({
			...config,
			ignoreWarnings: [/DefinePlugin/, /Failed to parse source map/],
			stats: 'errors-only'
		}),
		alias: { '@app': path.resolve(__dirname, './src') }
	}
};
