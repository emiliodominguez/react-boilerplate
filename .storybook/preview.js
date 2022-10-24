import 'reflect-metadata';
import '../src/ioc/bindings';
import '../src/styles/main.scss';

export const parameters = {
	layout: 'fullscreen',
	actions: {
		argTypesRegex: '^on[A-Z].*'
	},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	}
};
