import * as ACTIONS from "./actions";

export const stopwatchStart = () => {
  return {
    type: ACTIONS.STOPWATCH_START,
    isRunning: true,
    isPaused: false,
  };
};

export const stopwatchStop = () => {
  return {
    type: ACTIONS.STOPWATCH_STOP,
    isRunning: false,
    isPaused: true,
  };
};

export const stopwatchReset = () => {
  return {
    type: ACTIONS.STOPWATCH_RESET,
    isRunning: false,
    isPaused: false,
  };
};
