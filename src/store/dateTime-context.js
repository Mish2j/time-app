import React from "react";

const DateTimeContext = React.createContext({
  locale: navigator.language,
  // locale: "ru-RU",

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

  isTimeFormat12Hour() {
    return Intl.DateTimeFormat(this.locale, {
      hour: "numeric",
    }).resolvedOptions().hourCycle === "h12"
      ? true
      : false;
  },

  formatTime(time) {
    return new Intl.DateTimeFormat(this.locale, this.timeOptions).format(time);
  },

  formatDate(time) {
    return new Intl.DateTimeFormat(this.locale, this.dateOptions).format(time);
  },

  formatTimezone(time) {
    return new Intl.DateTimeFormat(this.locale, this.timezoneOptions)
      .format(time)
      .split(",")[1];
  },
});

export default DateTimeContext;
