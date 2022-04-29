import {
  ALARM,
  WORLD_CLOCK,
  TIMER,
  STOPWATCH,
  LOCAL_TIME,
} from "../../constants/const";

import LocalTime from "../Tabs/LocalTime/LocalTime";
import WorldClock from "../Tabs/WorldClock/WorldClock";
import Alarm from "../Tabs/Alarm/Alarm";
import Timer from "../Tabs/Timer/Timer";
import Stopwatch from "../Tabs/Stopwatch/Stopwatch";
import TabContainer from "../Tabs/TabContainer";

import styles from "./Main.module.css";

const Main = ({ tabName }) => {
  return (
    <main className={styles.main}>
      <TabContainer>
        <LocalTime isActive={tabName === LOCAL_TIME} />
        <WorldClock isActive={tabName === WORLD_CLOCK} />
        <Alarm isActive={tabName === ALARM} />
        <Timer isActive={tabName === TIMER} />
        <Stopwatch isActive={tabName === STOPWATCH} />
      </TabContainer>
    </main>
  );
};

export default Main;
