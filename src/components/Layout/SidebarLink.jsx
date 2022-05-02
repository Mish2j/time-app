import { useContext } from "react";

import TabContext from "../../store/tab-context";

import styles from "./SidebarLink.module.css";

const SidebarLink = ({ isActive, icon, tabName, onMobileSidebarClose }) => {
  const tabCtx = useContext(TabContext);

  const activeTabHandler = () => {
    tabCtx.displayTabContent(tabName);
    onMobileSidebarClose();
  };

  const linkStyles = `${styles["sidebar__link"]} ${
    isActive ? styles["active__link"] : ""
  }`.trim();

  return (
    <li onClick={activeTabHandler} className={linkStyles}>
      <i className={icon}></i>
      {tabName}
    </li>
  );
};

export default SidebarLink;
