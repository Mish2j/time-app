import { useState, useContext } from "react";

import TabContext from "../../store/tab-context";

import {
  LOCAL_TIME,
  WORLD_CLOCK,
  ALARM,
  TIMER,
  STOPWATCH,
} from "../../constants/const";

import SidebarLink from "./SidebarLink";
import Button from "../UI/Button";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { activeTab } = useContext(TabContext);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const tabNames = [LOCAL_TIME, WORLD_CLOCK, ALARM, TIMER, STOPWATCH];
  const tabIcons = [
    "far fa-clock",
    "fas fa-globe-americas",
    "far fa-bell",
    "fas fa-hourglass-start",
    "fas fa-stopwatch",
  ];

  const sidebarToggleHandler = () => {
    setIsMobileSidebarOpen((prevState) => !prevState);
  };

  const mobileSidebarCloseHandler = () => {
    setIsMobileSidebarOpen(false);
  };

  const tabLinks = tabNames.map((tabName, index, self) => {
    return (
      <SidebarLink
        key={tabName}
        tabName={tabName}
        onMobileSidebarClose={mobileSidebarCloseHandler}
        isActive={self[index] === activeTab}
        icon={tabIcons[index]}
      />
    );
  });

  return (
    <div className={styles.sidebar}>
      <div className={styles["tab__container"]}>
        <ul className={isMobileSidebarOpen ? styles["sidebar__active"] : ""}>
          {tabLinks}
        </ul>
        <Button
          className={styles["sidebar__openBtn"]}
          onClick={sidebarToggleHandler}
        >
          <i className="fas fa-ellipsis-h"></i>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
