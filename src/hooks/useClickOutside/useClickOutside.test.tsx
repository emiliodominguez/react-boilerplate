import { useRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import * as useClickOutsideHook from '.';

describe('useClickOutside', () => {
	const dummyFunction = jest.fn();

	// eslint-disable-next-line require-jsdoc
	function TestComponent(): JSX.Element {
		const innerRef = useRef<HTMLDivElement>(null);

		useClickOutsideHook.useClickOutside<HTMLDivElement>(innerRef, dummyFunction);

		return (
			<div data-testid="outer">
				<div data-testid="inner" ref={innerRef}></div>
			</div>
		);
	}

	test('should execute when clicking outside target element', async () => {
		// Given
		const useClickOutsideSpy = jest.spyOn(useClickOutsideHook, 'useClickOutside');
		const { findByTestId } = render(<TestComponent />);

		// When
		const outerDiv = await findByTestId('outer');
		const innerDiv = await findByTestId('inner');

		// Then
		expect(useClickOutsideSpy).toBeCalledTimes(1);
		expect(outerDiv).toBeInTheDocument();
		expect(innerDiv).toBeInTheDocument();
		fireEvent.click(innerDiv);
		expect(dummyFunction).toBeCalledTimes(0);
		fireEvent.click(outerDiv);
		expect(dummyFunction).toBeCalledTimes(1);
	});
});
