let calendarData = $state(null);

export const getCalendarData = () => calendarData;

export const setCalendarData = (data) => {
	calendarData = data;
};

let announcementData = $state(null);

export const getAnnouncementData = () => announcementData;

export const setAnnouncementData = (data) => {
	announcementData = data;
};
