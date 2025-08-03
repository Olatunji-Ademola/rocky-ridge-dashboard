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

let AwardNominees = $state(null);
export const getNominees = () => AwardNominees;
export const setNominees = (nominee) => {
	AwardNominees = nominee;
};

let presentTime = $state('');
export const getPresentTime = () => presentTime;
export const setPresentTime = (time) => {
	presentTime = time;
};

let timeSheetHours = $state(null);
export const getTimeSheetHours = () => timeSheetHours;
export const setTimeSheetHours = (sheetHours) => {
	timeSheetHours = { ...timeSheetHours, ...sheetHours };
};
export const clearTimeSheetHours = () => {
	timeSheetHours = null;
};
export const deleteTimeSheetHours = (date) => {
	delete timeSheetHours[date];
};

let timeSheetList = $state(null);
export const getTimeSheetList = () => timeSheetList;
export const setTimeSheetList = (timeSheet) => {
	if (timeSheetList) timeSheetList = [...timeSheetList, ...timeSheet];
	else timeSheetList = timeSheet;
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

// show timesheet model
let timeSheetModelData = $state(null);

export const getTimeSheetModelData = () => {
	return timeSheetModelData;
};

export const showTimeSheetModel = (data) => {
	timeSheetModelData = data;
};

export const hideTimeSheetModel = (data) => {
	timeSheetModelData = null;
};
