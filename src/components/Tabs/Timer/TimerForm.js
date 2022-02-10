import { useState, useEffect, useContext, useCallback } from "react";

import { SECONDS_IN_HOUR, SECONDS_IN_MIN, TIMER } from "../../../helper/config";
import ModalContext from "../../../store/modal-context";

import TimerTime from "./TimerTime";
import Button from "../../UI/Button";
import TimerLabel from "./TimerLabel";

import styles from "./TimerForm.module.css";

const TimerForm = (props) => {
  const modalCtx = useContext(ModalContext);
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
      modalCtx.openModal({
        title: TIMER,
        message: "Please enter the time to start the timer.",
      });
      return;
    }

    setIsRunning(true);

    setTimeInSeconds(
      Math.abs(+hour * SECONDS_IN_HOUR + +minute * SECONDS_IN_MIN + +seconds)
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

  const updateTimer = useCallback(() => {
    const formattedTimerHour = String(
      Math.trunc(timeInSeconds / SECONDS_IN_HOUR)
    ).padStart(2, 0);

    const formattedTimerMin = String(
      Math.trunc((timeInSeconds / SECONDS_IN_MIN) % SECONDS_IN_MIN)
    ).padStart(2, 0);

    const formattedTimerSec = String(timeInSeconds % SECONDS_IN_MIN).padStart(
      2,
      0
    );

    setTimerTime({
      timerHour: formattedTimerHour,
      timerMinute: formattedTimerMin,
      timerSeconds: formattedTimerSec,
    });
  }, [timeInSeconds]);

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
  }, [isRunning, timeInSeconds, updateTimer]);

  return (
    <>
      <div className={styles["timer__set"]}>
        <TimerLabel />
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
    </>
  );
};

export default TimerForm;
