import { REQUEST_ERROR, SECONDS_IN_MIN } from "../helper/config";

export const formatTime = (time) => {
  const minFormatted = String(
    Math.trunc(time / 1000 / SECONDS_IN_MIN)
  ).padStart(2, 0);
  const secFormatted = String(
    Math.trunc((time / 1000) % SECONDS_IN_MIN)
  ).padStart(2, 0);
  const millisecFormatted = String(time % 1000).padStart(3, 0);

  return {
    minute: minFormatted,
    seconds: secFormatted,
    milliseconds: millisecFormatted,
    time,
  };
};

export const getFormattedCityName = (city) => {
  const splitArr = city.split("/");
  const result = splitArr[splitArr.length - 1];
  return result;
};

export const getJson = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(REQUEST_ERROR);

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const formatLocalTime = (time, locale, options) => {
  return new Intl.DateTimeFormat(locale, options).format(time);
};

export const formatDate = (time, locale, dateOptions) => {
  return new Intl.DateTimeFormat(locale, dateOptions).format(time);
};

export const formatTimezone = (time, locale, timezoneOptions) => {
  return new Intl.DateTimeFormat(locale, timezoneOptions)
    .format(time)
    .split(",")[1];
};

export const isTimeFormat12Hour = (locale) => {
  return Intl.DateTimeFormat(locale, {
    hour: "numeric",
  }).resolvedOptions().hourCycle === "h12"
    ? true
    : false;
};
