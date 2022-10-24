import { HttpService } from '.';

describe('HTTP service tests', () => {
	const httpService = new HttpService();

	/**
	 * Mocks the fetch API for every situation
	 * @param callback The callback
	 */
	function mockFetchOnce(callback: () => void): void {
		global.fetch = jest.fn().mockImplementationOnce(callback as any);
	}

	/**
	 * Mocks the fetch operation resolver
	 */
	function mockFetchResolve<T>(data: T, delay?: number): T {
		mockFetchOnce(() =>
			Promise.resolve({
				status: 200,
				headers: new Headers({ 'Content-Type': 'application/json' }),
				json: () => (delay ? setTimeout(() => Promise.resolve(data), delay) : Promise.resolve(data))
			})
		);

		return data;
	}

	/**
	 * Mocks the fetch operation rejection
	 */
	function mockFetchReject(message: string = 'Error!'): string {
		mockFetchOnce(() => Promise.reject({ status: 404, message }));
		return message;
	}

	describe('get', () => {
		test('should get data on resolve', async () => {
			// Given
			const mockedResponse = mockFetchResolve<string>('Success!');

			// When
			const response = await httpService.get<string>({ url: '' });

			// Then
			expect(response).toEqual(mockedResponse);
		});

		test('should throw an error on reject', async () => {
			// Given
			mockFetchReject();

			try {
				// When
				await httpService.get<string>({ url: '' });
			} catch (e) {
				// Then
				expect(e).toBeTruthy();
			}
		});
	});

	describe('post', () => {
		const payload = { firstName: 'Lorem', lastName: 'Ipsum' };

		test('should post data on resolve', async () => {
			// Given
			const mockedResponse = mockFetchResolve<string>('Success!');

			// When
			const response = await httpService.post<typeof payload, string>({ url: '', payload });

			// Then
			expect(response).toEqual(mockedResponse);
		});

		test('should throw an error on reject', async () => {
			// Given
			mockFetchReject();

			try {
				// When
				await httpService.post<typeof payload, string>({ url: '', payload });
			} catch (e) {
				// Then
				expect(e).toBeTruthy();
			}
		});
	});

	describe('put', () => {
		const payload = { firstName: 'Lorem', lastName: 'Ipsum' };

		test('should post data on resolve', async () => {
			// Given
			const mockedResponse = mockFetchResolve<string>('Success!');

			// When
			const response = await httpService.put<typeof payload, string>({ url: '', payload });

			// Then
			expect(response).toEqual(mockedResponse);
		});

		test('should throw an error on reject', async () => {
			// Given
			const payload = { firstName: 'Lorem', lastName: 'Ipsum' };

			mockFetchReject();

			try {
				// When
				await httpService.put<typeof payload, string>({ url: '', payload });
			} catch (e) {
				// Then
				expect(e).toBeTruthy();
			}
		});
	});

	describe('delete', () => {
		test('should get data on resolve', async () => {
			// Given
			const mockedResponse = mockFetchResolve<string>('Success!');

			// When
			const response = await httpService.delete<number, string>({ url: '', payload: 1 }); // Delete something with ID 1

			// Then
			expect(response).toEqual(mockedResponse);
		});

		test('should throw an error on reject', async () => {
			// Given
			mockFetchReject();

			try {
				// When
				await httpService.delete<number, string>({ url: '', payload: 1 }); // Delete something with ID 1
			} catch (e) {
				// Then
				expect(e).toBeTruthy();
			}
		});
	});
});
