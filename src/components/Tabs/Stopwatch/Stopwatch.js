import { useReducer, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { formatTime } from "../../../helper/util";
import { STOPWATCH_ACTION } from "../../../helper/config";

import SwTimer from "./SwTimer";
import SwControl from "./SwControl";
import SwLaps from "./SwLaps";

import styles from "./Stopwatch.module.css";

const stopwatchReducer = (state, action) => {
  if (action.type === STOPWATCH_ACTION.START) {
    return { isRunning: action.isRunning, isPaused: action.isPaused };
  }

  if (action.type === STOPWATCH_ACTION.STOP) {
    return { isRunning: action.isRunning, isPaused: action.isPaused };
  }

  if (action.type === STOPWATCH_ACTION.RESET) {
    return { isRunning: action.isRunning, isPaused: action.isPaused };
  }

  return { isRunning: false, isPaused: false };
};

const Stopwatch = (props) => {
  const [laps, setLaps] = useState([]);

  const [stopwatchState, dispatchStopwatch] = useReducer(stopwatchReducer, {
    isRunning: false,
    isPaused: false,
  });

  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapStartTime, setLapStartTime] = useState(0);
  const [lapsSum, setLapsSum] = useState(0);

  const updateLastLapTime = (time) => {
    const { minute, seconds, milliseconds } = formatTime(time);
    const lapsCopy = [...laps];
    const lastLapCopy = { ...lapsCopy[lapsCopy.length - 1] };
    lastLapCopy.time = `${minute}:${seconds}:${milliseconds}`;
    lapsCopy[lapsCopy.length - 1] = lastLapCopy;

    setLaps(lapsCopy);
  };

  useEffect(() => {
    setLapStartTime(elapsedTime - lapsSum);
    updateLastLapTime(lapStartTime);
  }, [elapsedTime, lapStartTime, lapsSum]);

  useEffect(() => {
    if (!stopwatchState.isRunning) return;

    let prevTime = Date.now();
    const interval = setInterval(() => {
      setElapsedTime(
        (prevStateTime) => prevStateTime + (Date.now() - prevTime)
      );
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [stopwatchState.isRunning, elapsedTime]);

  const stopwatchStartHandler = () => {
    dispatchStopwatch({
      type: STOPWATCH_ACTION.START,
      isRunning: true,
      isPaused: false,
    });

    if (laps.length !== 0) return;

    addNewLap();
  };

  const stopwatchLapHandler = () => {
    if (!stopwatchState.isRunning) return;

    setLapStartTime(0);
    addNewLap();
  };

  const stopwatchResetHandler = () => {
    dispatchStopwatch({
      type: STOPWATCH_ACTION.RESET,
      isRunning: false,
      isPaused: false,
    });

    setElapsedTime(0);
    setLapStartTime(0);
    setLapsSum(0);

    setLaps([]);
  };

  const stopwatchStopHandler = () => {
    dispatchStopwatch({
      type: STOPWATCH_ACTION.STOP,
      isRunning: false,
      isPaused: true,
    });
  };

  const addNewLap = () => {
    setLapsSum((prevVal) => prevVal + lapStartTime);
    const newLap = { time: lapStartTime, id: uuidv4() };
    setLaps((prevLaps) => [...prevLaps, newLap]);
  };

  const { minute, seconds, milliseconds } = formatTime(elapsedTime);

  const isShown = props.isActive;
  const tabClasses = `${styles["stopwatch__container"]} ${
    isShown ? "active" : "disable"
  }`;

  return (
    <div className={tabClasses}>
      <SwControl
        isPaused={stopwatchState.isPaused}
        isRunning={stopwatchState.isRunning}
        onStart={stopwatchStartHandler}
        onStop={stopwatchStopHandler}
        onReset={stopwatchResetHandler}
        onLapAdd={stopwatchLapHandler}
      >
        <SwTimer min={minute} sec={seconds} mil={milliseconds} />
      </SwControl>
      <SwLaps lapList={laps} />
    </div>
  );
};

export default Stopwatch;
