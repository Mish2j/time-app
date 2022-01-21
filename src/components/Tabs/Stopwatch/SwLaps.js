import EmptyContent from "../../UI/EmptyContent";
import DataList from "../../UI/DataList";

import styles from "./SwLaps.module.css";

const SwLaps = (props) => {
  const laps = props.lapList;

  const renderLaps = laps
    .map((lap, i) => {
      return (
        <li key={lap.id}>
          <p>Lap {i + 1}</p>
          <p>{lap.time}</p>
        </li>
      );
    })
    .reverse();

  return (
    <div className={styles["lap__container"]}>
      {laps.length > 0 ? (
        <DataList>{renderLaps}</DataList>
      ) : (
        <EmptyContent text="Click start to run the stopwatch." />
      )}
    </div>
  );
};

export default SwLaps;
