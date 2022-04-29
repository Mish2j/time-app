import * as ACTIONS from "./actions";

export const stopwatchReducer = (state, action) => {
  if (action.type === ACTIONS.STOPWATCH_START) {
    return { isRunning: action.isRunning, isPaused: action.isPaused };
  }

  if (action.type === ACTIONS.STOPWATCH_STOP) {
    return { isRunning: action.isRunning, isPaused: action.isPaused };
  }

  if (action.type === ACTIONS.STOPWATCH_RESET) {
    return { isRunning: action.isRunning, isPaused: action.isPaused };
  }

  return state;
};
