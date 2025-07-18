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

// session
let isUserActive = $state(false);
export const getIsUserActive = () => isUserActive;
export const setIsUserActive = (isActive) => {
	isUserActive = isActive;
};

let userSchedule = $state('');
export const getUserSchedule = () => userSchedule;
export const setUserSchedule = (schedule) => {
	userSchedule = schedule;
};

let requestHistory = $state(null);
export const getRequestHistory = () => requestHistory;
export const setRequestHistory = (request) => {
	requestHistory = request;
};
