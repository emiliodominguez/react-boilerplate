import * as helpers from '.';

describe('Date helpers', () => {
	describe('getDateFrom', () => {
		test('should return a date given any amount of days', () => {
			// Given
			const amountOfDays = 15;

			// When
			const result = helpers.getDateFrom(amountOfDays);
			const daysBetweenDates = helpers.daysBetweenDates(helpers.today, result);

			// Then
			expect(result instanceof Date).toBeTruthy();
			expect(daysBetweenDates).toEqual(amountOfDays);
		});
	});

	describe('daysBetweenDates', () => {
		test('should get the amount of days within a range of dates', () => {
			// Given
			// When
			const yesterday = helpers.daysBetweenDates(helpers.today, helpers.yesterday);
			const twoDaysFromToday = helpers.daysBetweenDates(helpers.today, helpers.twoDaysFromToday);
			const sevenDaysFromToday = helpers.daysBetweenDates(helpers.today, helpers.sevenDaysFromToday);

			// Result
			expect(typeof yesterday === 'number').toEqual(true);
			expect(typeof twoDaysFromToday === 'number').toEqual(true);
			expect(typeof sevenDaysFromToday === 'number').toEqual(true);
			expect(yesterday).toEqual(1);
			expect(twoDaysFromToday).toEqual(2);
			expect(sevenDaysFromToday).toEqual(7);
		});
	});

	describe('getDatesInRange', () => {
		test('should get an array of dates within two dates (start and end)', () => {
			// Given
			// When
			const result = helpers.getDatesInRange(helpers.today, helpers.sevenDaysFromToday);

			// Then
			expect(result instanceof Array<Date>).toEqual(true);
			expect(result.length).toBe(8); // Seven days plus today
		});
	});

	describe('getWeekDates', () => {
		test('should get an array containing the start and end of any given week', () => {
			// Given
			// When
			const todaysWeek = helpers.getWeekStartEndDates();
			const randomWeek = helpers.getWeekStartEndDates(new Date(2015, 11, 13));

			// Then
			expect(todaysWeek instanceof Array<Date>).toEqual(true);
			expect(todaysWeek.length).toBe(2);
			expect(todaysWeek[0].getDay()).toBe(0); // Sunday
			expect(todaysWeek[1].getDay()).toBe(6); // Saturday
			expect(randomWeek instanceof Array<Date>).toEqual(true);
			expect(randomWeek.length).toBe(2);
			expect(randomWeek[0].getDay()).toBe(0); // Sunday
			expect(randomWeek[1].getDay()).toBe(6); // Saturday
		});
	});
});
