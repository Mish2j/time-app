import TimerForm from "./TimerForm";

import styles from "./Timer.module.css";

const Timer = (props) => {
  const modalData = {
    title: "Alarm",
    message: "",

    setMessage(msg) {
      this.message = msg;
      props.onOpenModal(this);
    },
  };

  const isShown = props.isActive;
  const tabClasses = `${styles["timer__container"]} ${
    isShown ? "active" : "disable"
  }`;

  return (
    <div className={tabClasses}>
      <h3>Enter a number to set the timer</h3>
      <TimerForm modal={modalData} />
    </div>
  );
};

export default Timer;
