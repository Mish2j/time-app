import styles from "./TimerLabel.module.css";

function TimerLabel() {
  return (
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
  );
}

export default TimerLabel;
