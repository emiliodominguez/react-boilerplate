import { Services, HttpService, DateService } from '@app/services';
import { container } from '.';

describe('Dependency injection container tests', () => {
	test('HTTP Service: should resolve injection', () => {
		// Given
		// When
		const dependency = container.get<HttpService>(Services.HttpService);

		// Then
		expect(dependency instanceof HttpService).toEqual(true);
	});

	test('Date Service: should resolve injection', () => {
		// Given
		// When
		const dependency = container.get<DateService>(Services.DateService);

		// Then
		expect(dependency instanceof DateService).toEqual(true);
	});
});
