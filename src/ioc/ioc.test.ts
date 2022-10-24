import { Services, HttpService } from '@app/services';
import { container } from '.';

describe('Dependency injection container tests', () => {
	test('HTTP Service: should resolve injection', () => {
		// Given
		// When
		const dependency = container.get<HttpService>(Services.HttpService);

		// Then
		expect(dependency instanceof HttpService).toEqual(true);
	});
});
