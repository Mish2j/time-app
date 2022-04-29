import { createRef } from "react";

import EmptyContent from "../../UI/EmptyContent";
import DataList from "../../UI/DataList";

import { STOPWATCH_EMPTY_LIST } from "../../../constants/const";

import styles from "./SwLaps.module.css";

import CSSTransition from "react-transition-group/CSSTransition";

const SwLaps = ({ lapList }) => {
  const renderLaps = lapList
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
      {lapList.length > 0 ? (
        <DataList>{renderLaps}</DataList>
      ) : (
        <EmptyContent text={STOPWATCH_EMPTY_LIST} />
      )}
    </div>
  );
};

export default SwLaps;
