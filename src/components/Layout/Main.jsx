import ModalContextProvider from "../../store/modal-provider";

import LocalTime from "../Tabs/LocalTime/LocalTime";
import WorldClock from "../Tabs/WorldClock/WorldClock";
import Alarm from "../Tabs/Alarm/Alarm";
import Timer from "../Tabs/Timer/Timer";
import Stopwatch from "../Tabs/Stopwatch/Stopwatch";
import TabContainer from "../Tabs/TabContainer";

import styles from "./Main.module.css";

const Main = () => {
  return (
    <ModalContextProvider>
      <main className={styles.main}>
        <TabContainer>
          <LocalTime />
          <WorldClock />
          <Alarm />
          <Timer />
          <Stopwatch />
        </TabContainer>
      </main>
    </ModalContextProvider>
  );
};

export default Main;
