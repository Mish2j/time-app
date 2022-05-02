export const ALARM = "Alarm";
export const WORLD_CLOCK = "World Clock";
export const LOCAL_TIME = "Local Time";
export const TIMER = "Timer";
export const STOPWATCH = "Stopwatch";

export const SECONDS_IN_HOUR = 3600;
export const SECONDS_IN_MIN = 60;

export const API_URL = "https://worldtimeapi.org/api/timezone";

export const REQUEST_ERROR = "Request failed!";

export const TIMER_EMPTY_INPUT_ERR =
  "Please set the duration of time to start the timer.";

export const WORLD_CLOCK_SEARCH_ERROR =
  "The city you are looking for does not exist. Try another one.";
export const WORLD_CLOCK_RESULT_ERROR =
  "The search result returned more than one city. Please try entering the full name of the city.";
export const WORLD_CLOCK_NO_INPUT_ERROR = "Please enter a city name!";
export const WORLD_CLOCK_EMPTY_LIST = "You don't have any search results yet.";

export const STOPWATCH_EMPTY_LIST = "Click start to run the stopwatch.";

export const ALARM_EMPTY_LIST = "You haven't set an alarm yet.";

export const LOCALE_OPTIONS = {
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
