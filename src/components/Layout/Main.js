import { useState } from "react";

import LocalTime from "../Tabs/LocalTime/LocalTime";
import WorldClock from "../Tabs/WorldClock/WorldClock";
import Alarm from "../Tabs/Alarm/Alarm";
import Timer from "../Tabs/Timer/Timer";
import Stopwatch from "../Tabs/Stopwatch/Stopwatch";
import TabContainer from "../Tabs/TabContainer";
import Modal from "../UI/Modal";

import styles from "./Main.module.css";

const Main = (props) => {
  const [modal, setModal] = useState({
    isModalActive: false,
    title: "",
    message: "",
  });

  const modalOpenHandler = (modalData) => {
    const modalDataCopy = { ...modal };

    modalDataCopy.title = modalData.title;
    modalDataCopy.message = modalData.message;
    modalDataCopy.isModalActive = !modalDataCopy.isModalActive;

    setModal(modalDataCopy);
  };

  const modalCloseHandler = () => {
    setModal({
      isModalActive: false,
      title: "",
      message: "",
    });
  };

  return (
    <main className={styles.main}>
      <TabContainer>
        <LocalTime
          onOpenModal={modalOpenHandler}
          isActive={props.tabName === "LocalTime" ? true : false}
        />
        <WorldClock
          onOpenModal={modalOpenHandler}
          isActive={props.tabName === "WorldClock" ? true : false}
        />
        <Alarm
          onOpenModal={modalOpenHandler}
          isActive={props.tabName === "Alarm" ? true : false}
        />
        <Timer
          onOpenModal={modalOpenHandler}
          isActive={props.tabName === "Timer" ? true : false}
        />
        <Stopwatch
          onOpenModal={modalOpenHandler}
          isActive={props.tabName === "Stopwatch" ? true : false}
        />
      </TabContainer>
      <Modal onClose={modalCloseHandler} modalData={modal} />
    </main>
  );
};

export default Main;
