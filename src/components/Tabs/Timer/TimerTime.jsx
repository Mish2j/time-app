import styles from "./TimerTime.module.css";

const TimerTime = ({ time }) => {
  const { timerHour, timerMinute, timerSeconds } = time;

  return (
    <div className={styles["timer__time"]}>
      <span>{timerHour}</span>
      <span className={styles["timer__dots"]}>:</span>
      <span>{timerMinute}</span>
      <span className={styles["timer__dots"]}>:</span>
      <span>{timerSeconds}</span>
    </div>
  );
};

export default TimerTime;
