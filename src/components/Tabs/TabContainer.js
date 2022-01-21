import styles from "./TabContainer.module.css";

const TabContainer = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default TabContainer;
