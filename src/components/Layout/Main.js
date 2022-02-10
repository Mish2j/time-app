import {
  ALARM,
  WORLD_CLOCK,
  TIMER,
  STOPWATCH,
  LOCAL_TIME,
} from "../../helper/config";

import LocalTime from "../Tabs/LocalTime/LocalTime";
import WorldClock from "../Tabs/WorldClock/WorldClock";
import Alarm from "../Tabs/Alarm/Alarm";
import Timer from "../Tabs/Timer/Timer";
import Stopwatch from "../Tabs/Stopwatch/Stopwatch";
import TabContainer from "../Tabs/TabContainer";

import styles from "./Main.module.css";

const Main = (props) => {
  return (
    <main className={styles.main}>
      <TabContainer>
        <LocalTime isActive={props.tabName === LOCAL_TIME ? true : false} />
        <WorldClock isActive={props.tabName === WORLD_CLOCK ? true : false} />
        <Alarm isActive={props.tabName === ALARM ? true : false} />
        <Timer isActive={props.tabName === TIMER ? true : false} />
        <Stopwatch isActive={props.tabName === STOPWATCH ? true : false} />
      </TabContainer>
    </main>
  );
};

export default Main;
