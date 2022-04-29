import { useState } from "react";

import SidebarLink from "./SidebarLink";
import Button from "../UI/Button";
import styles from "./Sidebar.module.css";

const Sidebar = ({ onTabContentChange }) => {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const tabOpenHandler = (tabName) => {
    onTabContentChange(tabName);
    setIsMobileSidebarOpen(false);
  };

  const sidebarOpenHandler = () => {
    setIsMobileSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles["tab__container"]}>
        <ul className={isMobileSidebarOpen ? styles["sidebar__active"] : null}>
          <SidebarLink
            onTabOpen={tabOpenHandler}
            onActiveLink={(index) => setActiveLinkIndex(index)}
            tab="Local Time"
            index={0}
            isActive={activeLinkIndex === 0}
            icon="far fa-clock"
          />
          <SidebarLink
            onTabOpen={tabOpenHandler}
            onActiveLink={(index) => setActiveLinkIndex(index)}
            tab="World Clock"
            index={1}
            isActive={activeLinkIndex === 1}
            icon="fas fa-globe-americas"
          />
          <SidebarLink
            onTabOpen={tabOpenHandler}
            onActiveLink={(index) => setActiveLinkIndex(index)}
            tab="Alarm"
            index={2}
            isActive={activeLinkIndex === 2}
            icon="far fa-bell"
          />
          <SidebarLink
            onTabOpen={tabOpenHandler}
            onActiveLink={(index) => setActiveLinkIndex(index)}
            tab="Timer"
            index={3}
            isActive={activeLinkIndex === 3}
            icon="fas fa-hourglass-start"
          />
          <SidebarLink
            onTabOpen={tabOpenHandler}
            onActiveLink={(index) => setActiveLinkIndex(index)}
            tab="Stopwatch"
            index={4}
            isActive={activeLinkIndex === 4}
            icon="fas fa-stopwatch"
          />
        </ul>
        <Button
          className={styles["sidebar__openBtn"]}
          onClick={sidebarOpenHandler}
        >
          <i className="fas fa-ellipsis-h"></i>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
