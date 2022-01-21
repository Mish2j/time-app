import { Fragment, useState, useEffect } from "react";

import TimerTime from "./TimerTime";
import Button from "../../UI/Button";

import styles from "./TimerForm.module.css";

const TimerForm = (props) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [seconds, setSeconds] = useState("");

  const [isRunning, setIsRunning] = useState(false);

  const [timerTime, setTimerTime] = useState({
    timerHour: "00",
    timerMinute: "00",
    timerSeconds: "00",
  });

  const [timeInSeconds, setTimeInSeconds] = useState(0);

  const secondsInOneHour = 3600;
  const secondsInOneMin = 60;

  const hourInputHandler = (e) => {
    setHour(e.target.value);
  };

  const minuteInputHandler = (e) => {
    setMinute(e.target.value);
  };

  const secondsInputHandler = (e) => {
    setSeconds(e.target.value);
  };

  const timerStartHandler = function () {
    if (!hour && !minute && !seconds) {
      props.modal.setMessage("Please enter the time to start the timer.");
      return;
    }

    setIsRunning(true);

    setTimeInSeconds(
      Math.abs(+hour * secondsInOneHour + +minute * secondsInOneMin + +seconds)
    );

    setHour("");
    setMinute("");
    setSeconds("");
  };

  const timerStopHandler = function () {
    setTimeInSeconds(0);
    setIsRunning(false);

    setTimerTime({ timerHour: "00", timerMinute: "00", timerSeconds: "00" });
  };

  const updateTimer = () => {
    const formattedTimerHour = String(
      Math.trunc(timeInSeconds / secondsInOneHour)
    ).padStart(2, 0);

    const formattedTimerMin = String(
      Math.trunc((timeInSeconds / secondsInOneMin) % secondsInOneMin)
    ).padStart(2, 0);

    const formattedTimerSec = String(timeInSeconds % secondsInOneMin).padStart(
      2,
      0
    );

    setTimerTime({
      timerHour: formattedTimerHour,
      timerMinute: formattedTimerMin,
      timerSeconds: formattedTimerSec,
    });
  };

  useEffect(() => {
    if (!isRunning) return;
    updateTimer();
    if (timeInSeconds === 0) return;

    const tick = setInterval(() => {
      setTimeInSeconds((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(tick);
    };
  }, [isRunning, timeInSeconds]);

  return (
    <Fragment>
      <div className={styles["timer__set"]}>
        <div className={styles["timer__headings"]}>
          <label htmlFor="hour">
            <h5>Hours</h5>
          </label>
          <label htmlFor="minute">
            <h5>Min</h5>
          </label>
          <label htmlFor="seconds">
            <h5>Sec</h5>
          </label>
        </div>
        <div className={styles["timer__inputs"]}>
          <input
            onChange={hourInputHandler}
            type="number"
            value={hour}
            id="hour"
          />
          <input
            onChange={minuteInputHandler}
            type="number"
            value={minute}
            id="minute"
          />
          <input
            onChange={secondsInputHandler}
            type="number"
            value={seconds}
            id="seconds"
          />
        </div>
      </div>
      <div className={styles["timer__control"]}>
        <Button onClick={timerStopHandler}>STOP</Button>
        <TimerTime time={timerTime} />
        <Button onClick={timerStartHandler}>START</Button>
      </div>
    </Fragment>
  );
};

export default TimerForm;
