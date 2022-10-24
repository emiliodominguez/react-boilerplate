import { DateService } from '.';

describe('Date service tests', () => {
	const dateService = new DateService();

	beforeEach(() => {
		dateService.setLocale('en-us');
	});

	describe('checkIfToday', () => {
		test('should return true if date is today', () => {
			// Given
			// When
			const result = dateService.checkIfToday(dateService.today.getDate());

			// Then
			expect(result).toEqual(true);
		});

		test("should return false if date isn't today", () => {
			// Given
			const yesterday = dateService.getDateFrom(-1);

			// When
			const result = dateService.checkIfToday(yesterday.getDate());

			// Then
			expect(result).toEqual(false);
		});
	});

	describe('checkIfCurrentMonthAndYear', () => {
		test('should return true if current month and year', () => {
			// Given
			const month = dateService.currentMonth;
			const year = dateService.currentYear;

			// When
			const result = dateService.checkIfCurrentMonthAndYear(month, year);

			// Then
			expect(result).toEqual(true);
		});

		test('should return false if not current month and year', () => {
			// Given
			const month = dateService.currentMonth;
			const year = 2010;

			// When
			const result = dateService.checkIfCurrentMonthAndYear(month, year);

			// Then
			expect(result).toEqual(false);
		});
	});

	describe('getFirstDayOfAMonth', () => {
		test('should get the first day of any given month and year', () => {
			// Given
			const month = 11;
			const year = 2022;

			// When
			const result = dateService.getFirstDayOfAMonth(month, year);

			// Then
			expect(result instanceof Date).toEqual(true);
			expect(result.getDate()).toEqual(1);
		});
	});

	describe('getMonthDates', () => {
		test('should return an array containing the dates of any given month and year', () => {
			// Given
			const month = 11;
			const year = 2022;

			// When
			const result = dateService.getMonthDates(month, year);

			// Then
			expect(result).toEqual(expect.arrayContaining([expect.any(Date)]));
			expect(result.length).toEqual(31);
		});
	});

	describe('getNumberOfDaysInAMonth', () => {
		test('should return the number of days within a month and year', () => {
			// Given
			const month = 11;
			const year = 2022;

			// When
			const result = dateService.getNumberOfDaysInAMonth(month, year);

			// Then
			expect(typeof result === 'number').toEqual(true);
			expect(result).toEqual(31);
		});
	});

	describe('getDateFrom', () => {
		test('should return a date given any amount of days', () => {
			// Given
			const amountOfDays = 15;

			// When
			const result = dateService.getDateFrom(amountOfDays);
			const daysBetweenDates = dateService.daysBetweenDates(dateService.today, result);

			// Then
			expect(result instanceof Date).toEqual(true);
			expect(daysBetweenDates).toEqual(amountOfDays);
		});
	});

	describe('daysBetweenDates', () => {
		test('should get the amount of days within a range of dates', () => {
			// Given
			// When
			const yesterday = dateService.daysBetweenDates(dateService.today, dateService.getDateFrom(-1));
			const twoDaysFromToday = dateService.daysBetweenDates(dateService.today, dateService.getDateFrom(2));
			const sevenDaysFromToday = dateService.daysBetweenDates(dateService.today, dateService.getDateFrom(7));

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
			const result = dateService.getDatesInRange(dateService.today, dateService.getDateFrom(7));

			// Then
			expect(result instanceof Array<Date>).toEqual(true);
			expect(result.length).toBe(8); // Seven days plus today
		});
	});

	describe('getWeekStartEndDates', () => {
		test('should get an array containing the start and end of any given week', () => {
			// Given
			// When
			const todaysWeek = dateService.getWeekStartEndDates();
			const randomWeek = dateService.getWeekStartEndDates(new Date(2015, 11, 13));

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

	describe('getMonthsNames', () => {
		test('should return an array containing the month names', () => {
			// Given
			// When
			const result = dateService.getMonthsNames();

			// Then
			expect(result.length).toEqual(12);
			expect(result).toEqual(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
		});

		test('should return an array containing the month names for a different locale', () => {
			// Given
			dateService.setLocale('es');

			// When
			const result = dateService.getMonthsNames();

			// Then
			expect(result.length).toEqual(12);
			expect(result).toEqual(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']);
		});
	});

	describe('getWeekDaysNames', () => {
		test('should return an array containing the week days names', () => {
			// Given
			// When
			const result = dateService.getWeekDaysNames();

			// Then
			expect(result.length).toEqual(7);
			expect(result).toEqual(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
		});

		test('should return an array containing the week days names for a different locale', () => {
			// Given
			dateService.setLocale('es');

			// When
			const result = dateService.getWeekDaysNames();

			// Then
			expect(result.length).toEqual(7);
			expect(result).toEqual(['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']);
		});
	});

	describe('getLocalizedDate', () => {
		test('should return a localized date (without options)', () => {
			// Given
			// When
			const date = dateService.getLocalizedDate(13, 11, 2022);

			// Then
			expect(typeof date === 'string').toEqual(true);
			expect(date).toEqual('Tue, December 13, 2022');
		});

		test('should return a localized date (with options)', () => {
			// Given
			// When
			const date = dateService.getLocalizedDate(13, 11, 2022, { weekday: 'long', month: 'short' });

			// Then
			expect(typeof date === 'string').toEqual(true);
			expect(date).toEqual('Tuesday, Dec 13, 2022');
		});
	});
});
