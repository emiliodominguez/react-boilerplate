export const today = new Date();
today.setHours(0, 0, 0, 0);

export const oneDayMS = 1000 * 60 * 60 * 24;

export const yesterday = new Date(today.getTime() - oneDayMS);

export const tomorrow = new Date(today.getTime() + oneDayMS);

export const twoDaysFromToday = new Date(today.getTime() + oneDayMS * 2);

export const sevenDaysFromToday = new Date(today.getTime() + oneDayMS * 7);

/**
 * Gets a date from today until any given amount of days
 * @param days The amount of days
 */
export function getDateFrom(days: number): Date {
	const date = new Date(new Date().getTime() - days * oneDayMS);
	date.setHours(0, 0, 0, 0);
	return date;
}

/**
 * Gets a range of date between two dates
 * @param dateFrom The date FROM
 * @param dateTo The date TO
 * @returns The days amount
 */
export function daysBetweenDates(dateFrom: Date, dateTo: Date): number {
	const from = new Date(dateFrom.getTime());
	const to = new Date(dateTo.getTime());
	from.setHours(0, 0, 0, 0);
	to.setHours(0, 0, 0, 0);
	return Math.floor(Math.abs(from.getTime() - to.getTime()) / oneDayMS);
}

/**
 * Gets an array of dates within a range
 * @param start The start date
 * @param end The end date
 * @returns The array of dates
 */
export function getDatesInRange(start: Date, end: Date): Date[] {
	const currentDate = new Date(start);
	const datesInRange = [];

	while (currentDate <= new Date(end)) {
		datesInRange.push(new Date(currentDate));
		currentDate.setUTCDate(currentDate.getUTCDate() + 1);
	}

	return datesInRange;
}

/**
 * Gets both the start and end days of a week
 * @param date An optional initial date
 * @returns The week dates range
 */
export function getWeekStartEndDates(date?: Date): Date[] {
	const current = date ?? new Date();
	const day = current.getDay();
	const firstDay = new Date(current.getTime() - oneDayMS * day);
	const lastDay = new Date(firstDay.getTime() + oneDayMS * 6);
	return [firstDay, lastDay];
}
