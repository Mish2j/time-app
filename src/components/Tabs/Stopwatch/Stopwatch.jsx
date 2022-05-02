import { useReducer, useState, useEffect, createRef, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import * as reducer from "../../../reducers/index";
import { formatTime } from "../../../helper/util";
import { STOPWATCH } from "../../../constants/const";

import TabContext from "../../../store/tab-context";

import SwTimer from "./SwTimer";
import SwControl from "./SwControl";
import SwLaps from "./SwLaps";

import CSSTransition from "react-transition-group/CSSTransition";

import styles from "./Stopwatch.module.css";

const Stopwatch = () => {
  const { activeTab } = useContext(TabContext);
  const isActive = activeTab === STOPWATCH;

  const tabRef = createRef(null);
  const [laps, setLaps] = useState([]);

  const [stopwatchState, dispatchStopwatch] = useReducer(
    reducer.stopwatchReducer,
    {
      isRunning: false,
      isPaused: false,
    }
  );

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
    dispatchStopwatch(reducer.stopwatchStart());

    if (laps.length !== 0) return;

    addNewLap();
  };

  const stopwatchLapHandler = () => {
    if (!stopwatchState.isRunning) return;

    setLapStartTime(0);
    addNewLap();
  };

  const stopwatchResetHandler = () => {
    dispatchStopwatch(reducer.stopwatchReset());

    setElapsedTime(0);
    setLapStartTime(0);
    setLapsSum(0);

    setLaps([]);
  };

  const stopwatchStopHandler = () => {
    dispatchStopwatch(reducer.stopwatchStop());
  };

  const addNewLap = () => {
    setLapsSum((prevVal) => prevVal + lapStartTime);
    const newLap = { time: lapStartTime, id: uuidv4() };
    setLaps((prevLaps) => [...prevLaps, newLap]);
  };

  const { minute, seconds, milliseconds } = formatTime(elapsedTime);

  const tabClasses = `${styles["stopwatch__container"]} ${
    isActive ? "active" : "disable"
  }`;

  return (
    <CSSTransition
      in={isActive}
      timeout={200}
      classNames="slide"
      nodeRef={tabRef}
    >
      <div className={tabClasses} ref={tabRef}>
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
    </CSSTransition>
  );
};

export default Stopwatch;
