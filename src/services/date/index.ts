import { injectable } from 'inversify';
import { capitalize } from '@app/helpers';

@injectable()
export class DateService {
	private _locale: string;

	private _today: Date;

	private _currentMonth: number;

	private _currentYear: number;

	private _localizedMonths: string[];

	private _localizedWeekDays: string[];

	private _oneDayMilliseconds: number;

	get today(): Date {
		return this._today;
	}

	get currentMonth(): number {
		return this._currentMonth;
	}

	get currentYear(): number {
		return this._currentYear;
	}

	get localizedMonths(): string[] {
		return this._localizedMonths;
	}

	get localizedWeekDays(): string[] {
		return this._localizedWeekDays;
	}

	constructor() {
		this._locale = 'en-us';
		this._today = new Date();
		this._today.setHours(0, 0, 0, 0);
		this._oneDayMilliseconds = 1000 * 60 * 60 * 24;
		this._currentMonth = this._today.getMonth();
		this._currentYear = this._today.getFullYear();
		this._localizedMonths = this.getMonthsNames();
		this._localizedWeekDays = this.getWeekDaysNames();
	}

	/**
	 * Sets the current locale
	 * @param locale The locale
	 */
	setLocale(locale: string): void {
		this._locale = locale;
	}

	/**
	 * Jumps to an specific year
	 * @param year - The year
	 */
	goToYear(year: number): void {
		this._currentYear = year;
	}

	/**
	 * Goes to the previous month
	 */
	goToPreviousMonth(): void {
		this._currentMonth = this._currentMonth === 0 ? 11 : this._currentMonth - 1;
	}

	/**
	 * Goes to the next month
	 */
	goToNextMonth(): void {
		this._currentMonth = (this._currentMonth + 1) % 12;
	}

	/**
	 * Jumps to an specific month
	 * @param month - The month
	 */
	goToMonth(month: number): void {
		this._currentMonth = month;
	}

	/**
	 * Restores the date to the current values
	 */
	restoreDate(): void {
		this._currentMonth = this._today.getMonth();
		this._currentYear = this._today.getFullYear();
	}

	/**
	 * Checks if the current day is today
	 * @param date - The date
	 */
	checkIfToday(date: number): boolean {
		return date === this._today.getDate() && this._currentMonth === this._today.getMonth() && this._currentYear === this._today.getFullYear();
	}

	/**
	 * Checks if current month and year
	 */
	checkIfCurrentMonthAndYear(month: number, year: number): boolean {
		return this._currentMonth === month && this.currentYear === year;
	}

	/**
	 * Gets the first day on a month
	 */
	getFirstDayOfAMonth(month?: number, year?: number): Date {
		return new Date(month ?? this._currentYear, year ?? this._currentMonth);
	}

	/**
	 * Get the dates within any given month and year
	 * @param month The month
	 * @param year The year
	 * @returns The array of dates
	 */
	getMonthDates(month: number, year: number): Date[] {
		const numberOfDays = this.getNumberOfDaysInAMonth(month, year);
		return [...Array(numberOfDays).keys()].map(day => {
			const date = new Date(year, month, day + 1);
			date.setHours(0, 0, 0);
			return date;
		});
	}

	/**
	 * Gets the amount of days in a month
	 * @param month - The month
	 * @param year - The year
	 * @returns The number of days in a month
	 */
	getNumberOfDaysInAMonth(month: number, year: number): number {
		/**
            The function new Date(year, month, 32) returns the 32nd day
            after the month started. Subtracting that date from 32,
            gets the final day of that month.
        */
		return 32 - new Date(year, month, 32).getDate();
	}

	/**
	 * Gets a date from today until any given amount of days
	 * @param amount The amount of days
	 */
	getDateFrom(amount: number): Date {
		return new Date(this._today.getTime() + this._oneDayMilliseconds * amount);
	}

	/**
	 * Gets a range of date between two dates
	 * @param dateFrom The date FROM
	 * @param dateTo The date TO
	 * @returns The days amount
	 */
	daysBetweenDates(dateFrom: Date, dateTo: Date): number {
		const from = new Date(dateFrom.getTime());
		const to = new Date(dateTo.getTime());
		from.setHours(0, 0, 0, 0);
		to.setHours(0, 0, 0, 0);
		return Math.floor(Math.abs(from.getTime() - to.getTime()) / this._oneDayMilliseconds);
	}

	/**
	 * Gets an array of dates within a range
	 * @param start The start date
	 * @param end The end date
	 * @returns The array of dates
	 */
	getDatesInRange(start: Date, end: Date): Date[] {
		const datesInRange = [];

		start.setHours(0, 0, 0, 0);

		while (start.getTime() <= end.getTime()) {
			datesInRange.push(start);
			start.setUTCDate(start.getUTCDate() + 1);
		}

		return datesInRange;
	}

	/**
	 * Gets both the start and end days of a week
	 * @param date An optional initial date
	 * @returns The week dates range
	 */
	getWeekStartEndDates(date?: Date): Date[] {
		const current = date ?? new Date();
		const day = current.getDay();
		const firstDay = new Date(current.getTime() - this._oneDayMilliseconds * day);
		const lastDay = new Date(firstDay.getTime() + this._oneDayMilliseconds * 6);
		return [firstDay, lastDay];
	}

	/**
	 * Gets the months names
	 * @param options - The format options
	 * @returns An array of localized month names
	 */
	getMonthsNames(options?: Intl.DateTimeFormatOptions): string[] {
		const date = new Date(2000, 0);
		const months: string[] = [];

		for (let i = 0; i < 12; i++) {
			const month = date.toLocaleString(this._locale, { month: 'long', ...options });
			months.push(capitalize(month));
			date.setMonth(i + 1);
		}

		return months;
	}

	/**
	 * Gets the week days names
	 * @param options - The format options
	 * @returns An array of localized day names
	 */
	getWeekDaysNames(options?: Intl.DateTimeFormatOptions): string[] {
		const date = new Date(2000, 0);
		const days: string[] = [];
		const daysOrder = [2, 3, 4, 5, 6, 7, 1]; // Starts on Sunday

		for (const order of daysOrder) {
			date.setDate(order);
			const day = date.toLocaleString(this._locale, { weekday: 'long', ...options });
			days.push(capitalize(day));
		}

		return days;
	}

	/**
	 * Gets the localized date
	 * @param day - The day
	 * @param month - The month
	 * @param year - The year
	 * @param options - The format options
	 * @returns A localized date string
	 */
	getLocalizedDate(day: number, month: number, year: number, options?: Intl.DateTimeFormatOptions): string {
		const date = new Date();
		const defaultOptions: Intl.DateTimeFormatOptions = {
			weekday: 'short',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			timeZone: 'UTC'
		};

		date.setDate(day);
		date.setMonth(month);
		date.setFullYear(year);
		return date.toLocaleDateString(this._locale, { ...defaultOptions, ...options });
	}
}
