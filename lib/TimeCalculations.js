/* 
    @param {string} startDateTime yyyy-mm-ddThh:mm:ss.sssZ
    @param {string} endDateTime yyyy-mm-ddThh:mm:ss.sssZ
    @returns {string} upcoming, live, past
*/
export const compareDateTime = (startDateTime, endDateTime) => {
  const now = new Date();
  const now5 = new Date(now.getTime() + 5 * 60 * 60 * 1000);
  // 1. current time is before the given times
  // 2. current time is between the given times
  // 3. current time is after the given times
  if (now5 < new Date(startDateTime)) {
    return "upcoming";
  }
  if (now5 >= new Date(startDateTime) && now5 < new Date(endDateTime)) {
    return "live";
  }
  if (now5 > new Date(endDateTime)) {
    return "past";
  }
};
/* 
    @param {string} dateString yyyy-mm-ddThh:mm:ss.sssZ
    @param {number} duration in minutes
    @returns {object} start and end time in ISOString format that is yyyy-mm-ddThh:mm:ss.sssZ
*/
export const getPaperDateTime = (dateString, duration) => {

  if(!dateString){
    return {
      start: null,
      end: null,
    };
  }

  const startTime = new Date(dateString);
  const endTime = new Date(startTime.getTime() + duration * 60 * 1000);

  return {
    start: startTime.toISOString(),
    end: endTime.toISOString(),
  };
};

/* 
    @param {string} dateString yyyy-mm-ddThh:mm:ss.sssZ
    @returns {string} formattedDateTime dd/mm/yyyy, hh:mm:ss PM
*/
export const convertDateTimeToStrings = (dateString, withDate) => {
  const date = new Date(dateString);
  const dateOptions = {
    timeZone: "Europe/London",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDateTime = date.toLocaleString("en-US", dateOptions);
  return withDate ? formattedDateTime.slice(0, -10) : formattedDateTime.slice(-8);
};

/* 
    @param {object} paper
    @returns {string} upcoming, live, past
*/
export const getPaperStatus = (paper) => {
  const { start, end } = getPaperDateTime(paper.date, paper.duration);
  return compareDateTime(start, end);
};

/* 

*/
export const getRemainingTime = (endTime) => {
  const now = new Date();
  const time = new Date(endTime);
  const now5 = new Date(now.getTime() + 5 * 60 * 60 * 1000);
  const timeDiff = time - now5;

  if (timeDiff < 0) return "00:00:00";

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);

  const remainingTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return remainingTime;
};
