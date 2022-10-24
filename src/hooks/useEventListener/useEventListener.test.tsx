import { renderHook } from '@testing-library/react';
import { useEventListener } from '.';

describe('useEventListener', () => {
	test('should add an event listener when the component is mounted and remove it when unmounted', () => {
		// Given
		const target = document.body;
		const addEventListenerSpy = jest.spyOn(target, 'addEventListener').mockImplementation(jest.fn);
		const removeEventListenerSpy = jest.spyOn(target, 'removeEventListener').mockImplementation(jest.fn);
		const [event, callback, options] = ['click', jest.fn, { once: true }];

		// When
		const { unmount } = renderHook(() => useEventListener(event, callback, target, options));

		// Then
		expect(addEventListenerSpy).toBeCalledTimes(1);
		expect(addEventListenerSpy).toBeCalledWith(event, callback, options);

		unmount();

		expect(removeEventListenerSpy).toBeCalledTimes(1);
		expect(removeEventListenerSpy).toBeCalledWith(event, callback, options);
	});
});
