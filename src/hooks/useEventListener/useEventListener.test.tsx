import { render } from '@testing-library/react';
import { useEventListener } from '.';

describe('useEventListener', () => {
	const testEvent = 'click';
	const testTarget = document.body;
	const registeredEvents = new Map<string, EventListenerOrEventListenerObject>();

	/**
	 * A dummy component using the useEventListener hook
	 */
	function DummyComponent(): JSX.Element {
		// Registers a click event on the body
		useEventListener(testEvent, jest.fn, testTarget);
		return <></>;
	}

	beforeEach(() => {
		jest.spyOn(testTarget, 'addEventListener').mockImplementationOnce((event, handler) => registeredEvents.set(event, handler));
		jest.spyOn(testTarget, 'removeEventListener').mockImplementationOnce(event => registeredEvents.delete(event));
	});

	afterEach(() => {
		jest.restoreAllMocks();
		registeredEvents.clear();
	});

	test('should register an event listener when the component is mounted', () => {
		// Given
		expect(registeredEvents.size).toBe(0);
		expect(registeredEvents.has(testEvent)).toBe(false);

		// When
		render(<DummyComponent />);

		// Then
		expect(registeredEvents.size).toBe(1);
		expect(registeredEvents.has(testEvent)).toBe(true);
	});

	test('should unregister an event listener when the component is unmounted', () => {
		// Given
		const { unmount } = render(<DummyComponent />);

		expect(registeredEvents.size).toBe(1);
		expect(registeredEvents.has(testEvent)).toBe(true);

		// When
		unmount();

		// Then
		expect(registeredEvents.size).toBe(0);
		expect(registeredEvents.has(testEvent)).toBe(false);
	});
});
