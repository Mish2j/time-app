import TransitionGroup from "react-transition-group/TransitionGroup";

import styles from "./DataList.module.css";

const DataList = ({ children }) => {
  return (
    <TransitionGroup component="ul" className={styles.dataList}>
      {children}
    </TransitionGroup>
  );
};

export default DataList;
