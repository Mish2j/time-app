import styles from "./SwControl.module.css";

import Button from "../../UI/Button";

const SwControl = (props) => {
  const isTimerPaused = props.isPaused;
  const isTimerRunning = props.isRunning;

  return (
    <div className={styles["stopwatch__control"]}>
      <Button onClick={isTimerPaused ? props.onReset : props.onLapAdd}>
        {isTimerPaused ? "RESET" : "LAP"}
      </Button>
      {props.children}
      <Button onClick={isTimerRunning ? props.onStop : props.onStart}>
        {isTimerRunning ? "STOP" : "START"}
      </Button>
    </div>
  );
};

export default SwControl;
