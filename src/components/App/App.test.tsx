import { render } from '@testing-library/react';
import App from '.';

describe('App component', () => {
	test('should match snapshot', () => {
		// Given
		// When
		const rendered = render(<App />);

		// Then
		expect(rendered).toMatchSnapshot();
	});
});
