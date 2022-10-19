import { renderHook } from '@testing-library/react';
import * as useEventListenerHook from '../useEventListener';
import { useWindowWidth } from '.';

describe('useWindowWidth', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation(query => ({
				matches: false,
				media: query,
				addEventListener: jest.fn(),
				removeEventListener: jest.fn()
			}))
		});
	});

	test('should register a window size event listener', () => {
		// Given
		const useEventListenerSpy = jest.spyOn(useEventListenerHook, 'useEventListener');

		// When
		renderHook(() => useWindowWidth('lg'));

		// Then
		expect(window.matchMedia).toHaveBeenCalledTimes(1);
		expect(useEventListenerSpy).toHaveBeenCalledTimes(1);
	});
});
