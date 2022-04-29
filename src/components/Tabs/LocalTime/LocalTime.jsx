import { useState, useEffect, createRef } from "react";

import CSSTransition from "react-transition-group/CSSTransition";

import { formatDateTime } from "../../../helper/util";
import { LOCALE_OPTIONS } from "../../../constants/const";

import LocalData from "./LocalData";

const LocalTime = ({ isActive }) => {
  const [time, setTime] = useState(Date.now());
  const tabRef = createRef(null);

  const { locale, timeOptions, dateOptions, timezoneOptions } = LOCALE_OPTIONS;

  const formattedTime = formatDateTime(time, locale, timeOptions);
  const date = formatDateTime(time, locale, dateOptions);
  const timezone = formatDateTime(time, locale, timezoneOptions).split(",")[1];

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  return (
    <CSSTransition
      nodeRef={tabRef}
      in={isActive}
      timeout={200}
      classNames="slide"
    >
      <div className={isActive ? "active" : "disable"} ref={tabRef}>
        <LocalData title="Time" data={formattedTime} />
        <LocalData title="Date" data={date} />
        <LocalData title="Timezone" data={timezone} />
      </div>
    </CSSTransition>
  );
};

export default LocalTime;
