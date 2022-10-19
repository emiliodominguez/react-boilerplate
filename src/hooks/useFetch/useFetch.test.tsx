import { render, renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '.';

interface IToDo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

describe('useFetch', () => {
	const testUrl = 'https://jsonplaceholder.typicode.com/todos/1';

	// eslint-disable-next-line require-jsdoc
	function TestComponent(): JSX.Element {
		useFetch<IToDo>(testUrl);
		return <></>;
	}

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should fetch data from any given endpoint', async () => {
		// Given
		const { result } = renderHook(() => useFetch<IToDo>(testUrl));

		// When
		expect(result.current.data).toBe(null);
		expect(result.current.loading).toBe(true);
		expect(result.current.error).toBe(undefined);

		await waitFor(() => expect(result.current.loading).toBe(false));

		// Then
		expect(result.current.data).toMatchObject({
			userId: expect.any(Number),
			id: expect.any(Number),
			title: expect.any(String),
			completed: expect.any(Boolean)
		});
		expect(result.current.loading).toBe(false);
		expect(result.current.error).toBe(undefined);
	});

	test('should handle errors gracefully', async () => {
		// Given
		const errorMessage = { error: 'Error!' };
		global.fetch = jest.fn(() => Promise.reject(errorMessage));
		const { result } = renderHook(() => useFetch<IToDo>(testUrl));

		// When
		expect(result.current.data).toBe(null);
		expect(result.current.loading).toBe(true);
		expect(result.current.error).toBe(undefined);

		await waitFor(() => expect(result.current.loading).toBe(false));

		// Then
		expect(result.current.data).toBe(null);
		expect(result.current.loading).toBe(false);
		expect(result.current.error).toBe(errorMessage);
	});

	test('should instantiate an AbortController and call it when cleaning up', async () => {
		// Given
		const { unmount } = render(<TestComponent />);
		const abortSpy = jest.spyOn(AbortController.prototype, 'abort');

		abortSpy.mockImplementationOnce(jest.fn);

		// When
		unmount();

		// Then
		expect(abortSpy).toBeCalledTimes(1);
	});
});
