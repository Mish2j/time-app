import styles from "./SidebarLink.module.css";

const SidebarLink = (props) => {
  const activeTabHandler = () => {
    props.onTabOpen(props.tab.replaceAll(" ", ""));
    props.onActiveLink(props.index);
  };

  const isActive = props.isActive;

  const linkStyles = `${styles["sidebar__link"]} ${
    isActive ? styles["active__link"] : ""
  }`.trim();

  return (
    <li onClick={activeTabHandler} className={linkStyles}>
      <i className={props.icon}></i>
      {props.tab}
    </li>
  );
};

export default SidebarLink;
