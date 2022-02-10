export const ALARM = "Alarm";
export const WORLD_CLOCK = "WorldClock";
export const LOCAL_TIME = "LocalTime";
export const TIMER = "Timer";
export const STOPWATCH = "Stopwatch";

export const STOPWATCH_ACTION = {
  START: "START",
  STOP: "STOP",
  RESET: "RESET",
};

export const SECONDS_IN_HOUR = 3600;
export const SECONDS_IN_MIN = 60;

export const API_URL = "https://worldtimeapi.org/api/timezone";

export const REQUEST_ERROR = "Request failed!";

export const localeOptions = {
  locale: navigator.language,

  timeOptions: {
    hour: "numeric",
    minute: "numeric",
  },

  dateOptions: {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  },

  timezoneOptions: {
    timeZoneName: "long",
  },
};
