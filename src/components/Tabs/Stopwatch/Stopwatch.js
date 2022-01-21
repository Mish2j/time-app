import { useReducer, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import SwTimer from "./SwTimer";
import SwControl from "./SwControl";
import SwLaps from "./SwLaps";

import styles from "./Stopwatch.module.css";

const stopwatchReducer = (state, action) => {
  if (action.type === "START") {
    return { isRunning: action.isRunning, isPaused: action.isPaused };
  }

  if (action.type === "STOP") {
    return { isRunning: action.isRunning, isPaused: action.isPaused };
  }

  if (action.type === "RESET") {
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
  const [prevTime, setPrevTime] = useState(0);

  const formatTime = (time) => {
    const minFormatted = String(Math.trunc(time / 1000 / 60)).padStart(2, 0);
    const secFormatted = String(Math.trunc((time / 1000) % 60)).padStart(2, 0);
    const millisecFormatted = String(time % 1000).padStart(3, 0);

    return {
      minute: minFormatted,
      seconds: secFormatted,
      milliseconds: millisecFormatted,
    };
  };

  const updateLastLapTime = (time) => {
    const { minute, seconds, milliseconds } = formatTime(time);
    const lapsCopy = [...laps];
    const lastLapCopy = { ...lapsCopy[lapsCopy.length - 1] };
    lastLapCopy.time = `${minute}:${seconds}:${milliseconds}`;
    lapsCopy[lapsCopy.length - 1] = lastLapCopy;

    setLaps(lapsCopy);
  };

  useEffect(() => {
    if (!stopwatchState.isRunning) return;
    setPrevTime(Date.now());

    const interval = setInterval(() => {
      setElapsedTime(
        (prevStateTime) => prevStateTime + (Date.now() - prevTime)
      );
      setLapStartTime(
        (prevStateTime) => prevStateTime + (Date.now() - prevTime)
      );

      setPrevTime(Date.now());
    }, 100);

    updateLastLapTime(lapStartTime);

    return () => {
      clearInterval(interval);
    };
  }, [stopwatchState.isRunning, lapStartTime, prevTime]);

  const stopwatchStartHandler = () => {
    dispatchStopwatch({ type: "START", isRunning: true, isPaused: false });

    if (laps.length !== 0) return;

    addNewLap();
  };

  const stopwatchLapHandler = () => {
    if (!stopwatchState.isRunning) return;

    setLapStartTime(0);
    addNewLap();
  };

  const stopwatchResetHandler = () => {
    dispatchStopwatch({ type: "RESET", isRunning: false, isPaused: false });

    setElapsedTime(0);
    setLapStartTime(0);
    setLaps([]);
  };

  const stopwatchStopHandler = () => {
    dispatchStopwatch({ type: "STOP", isRunning: false, isPaused: true });
  };

  const addNewLap = () => {
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
