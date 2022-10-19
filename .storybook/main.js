const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/preset-create-react-app'],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5'
	},
	webpackFinal: config => {
		[].push.apply(config.resolve.plugins, [new TsconfigPathsPlugin({ extensions: config.resolve.extensions })]);
		config.resolve.alias['@app'] = path.resolve(__dirname, '../src');
		return config;
	}
};
