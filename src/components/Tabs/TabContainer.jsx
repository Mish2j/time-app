import styles from "./TabContainer.module.css";

const TabContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default TabContainer;
