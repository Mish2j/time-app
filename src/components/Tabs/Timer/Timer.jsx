import { createRef, useContext } from "react";

import { TIMER } from "../../../constants/const";
import TabContext from "../../../store/tab-context";

import CSSTransition from "react-transition-group/CSSTransition";
import TimerForm from "./TimerForm";

import styles from "./Timer.module.css";

const Timer = () => {
  const { activeTab } = useContext(TabContext);
  const isActive = activeTab === TIMER;
  const tabRef = createRef(null);

  const tabClasses = `${styles["timer__container"]} ${
    isActive ? "active" : "disable"
  }`;

  return (
    <CSSTransition
      in={isActive}
      timeout={200}
      classNames="slide"
      nodeRef={tabRef}
    >
      <div className={tabClasses} ref={tabRef}>
        <h3>Set the duration of time to start the timer</h3>
        <TimerForm />
      </div>
    </CSSTransition>
  );
};

export default Timer;
