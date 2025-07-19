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

// showPopup
let popupMessage = $state(null);
let popupMessageTimeoutId = null;
export const setPopupMessage = (message, type = 'default') => {
	if (popupMessageTimeoutId) clearTimeout(popupMessageTimeoutId);

	popupMessage = null;
	setTimeout(() => {
		popupMessage = { message, type };
	}, 0);

	popupMessageTimeoutId = setTimeout(() => {
		popupMessage = null;
	}, 4000);
};
export const getPopupMessage = () => popupMessage;
