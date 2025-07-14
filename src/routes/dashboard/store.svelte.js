let calendarData = $state(null);

export const getCalendarData = () => calendarData;

export const setCalendarData = (data) => {
	calendarData = data;
};
