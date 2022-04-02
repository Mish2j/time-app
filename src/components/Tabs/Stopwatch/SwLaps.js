import { createRef } from "react";

import EmptyContent from "../../UI/EmptyContent";
import DataList from "../../UI/DataList";

import styles from "./SwLaps.module.css";

import CSSTransition from "react-transition-group/CSSTransition";

const SwLaps = (props) => {
  const laps = props.lapList;

  const renderLaps = laps
    .map((lap, i) => {
      const elemRef = createRef(null);
      return (
        <CSSTransition
          exit={false}
          nodeRef={elemRef}
          key={lap.id}
          classNames="fade"
          timeout={300}
        >
          <li ref={elemRef}>
            <p>Lap {i + 1}</p>
            <p>{lap.time}</p>
          </li>
        </CSSTransition>
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
