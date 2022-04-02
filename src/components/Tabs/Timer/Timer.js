import { createRef } from "react";

import CSSTransition from "react-transition-group/CSSTransition";

import TimerForm from "./TimerForm";

import styles from "./Timer.module.css";

const Timer = (props) => {
  const tabRef = createRef(null);

  const isShown = props.isActive;
  const tabClasses = `${styles["timer__container"]} ${
    isShown ? "active" : "disable"
  }`;

  return (
    <CSSTransition
      in={isShown}
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
