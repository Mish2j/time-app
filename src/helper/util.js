import { SECONDS_IN_MIN, REQUEST_ERROR } from "../constants/const";

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

export const returnFilteredCityName = (city) => {
  const splitArr = city.split("/");
  return splitArr[splitArr.length - 1].replace(/[^a-zA-Z]+/g, " ");
};

// to match the name from API data
export const formatEnteredCityName = (cityName) => {
  return cityName
    .trim()
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("_");
};

export const formatDateTime = (dateTime, locale, options) => {
  return new Intl.DateTimeFormat(locale, options).format(dateTime);
};

export const isTimeFormat12Hour = (locale) => {
  return (
    Intl.DateTimeFormat(locale, {
      hour: "numeric",
    }).resolvedOptions().hourCycle === "h12"
  );
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
