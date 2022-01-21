import styles from "./SwTimer.module.css";

const SwTimer = (props) => {
  return (
    <div className={styles["stopwatch__time"]}>
      <span>{props.min}</span>
      <span className={styles["stopwatch__dots"]}>:</span>
      <span>{props.sec}</span>
      <span className={styles["stopwatch__dots"]}>.</span>
      <span>{props.mil}</span>
    </div>
  );
};

export default SwTimer;
