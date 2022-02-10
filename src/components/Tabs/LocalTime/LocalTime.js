import { useState, useEffect } from "react";

import {
  formatLocalTime,
  formatDate,
  formatTimezone,
} from "../../../helper/util";
import { localeOptions } from "../../../helper/config";

import LocalData from "./LocalData";

const LocalTime = (props) => {
  const [time, setTime] = useState(Date.now());

  const { locale, timeOptions, dateOptions, timezoneOptions } = localeOptions;

  const formattedTime = formatLocalTime(time, locale, timeOptions);
  const date = formatDate(time, locale, dateOptions);
  const timezone = formatTimezone(time, locale, timezoneOptions);
  const isShown = props.isActive;

  useEffect(() => {
    if (!isShown) return;

    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isShown]);

  return (
    <div className={isShown ? "active" : "disable"}>
      <LocalData title="Time" data={formattedTime} />
      <LocalData title="Date" data={date} />
      <LocalData title="Timezone" data={timezone} />
    </div>
  );
};

export default LocalTime;
