import { useState, useEffect, useContext } from "react";

import DateTimeContext from "../../../store/dateTime-context";
import InfoBar from "./InfoBar";

const LocalTime = (props) => {
  const [time, setTime] = useState(Date.now());
  const ctx = useContext(DateTimeContext);

  const formattedTime = ctx.formatTime(time);
  const date = ctx.formatDate(time);
  const timezone = ctx.formatTimezone(time);

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
      <InfoBar title="Time" data={formattedTime} />
      <InfoBar title="Date" data={date} />
      <InfoBar title="Timezone" data={timezone} />
    </div>
  );
};

export default LocalTime;
