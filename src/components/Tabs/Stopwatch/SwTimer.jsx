import styles from "./SwTimer.module.css";

const SwTimer = ({ min, sec, mil }) => {
  return (
    <div className={styles["stopwatch__time"]}>
      <span>{min}</span>
      <span className={styles["stopwatch__dots"]}>:</span>
      <span>{sec}</span>
      <span className={styles["stopwatch__dots"]}>.</span>
      <span>{mil}</span>
    </div>
  );
};

export default SwTimer;
