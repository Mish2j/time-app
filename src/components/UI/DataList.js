import TransitionGroup from "react-transition-group/TransitionGroup";

import styles from "./DataList.module.css";

const DataList = (props) => {
  return (
    <TransitionGroup component="ul" className={styles.dataList}>
      {props.children}
    </TransitionGroup>
  );
};

export default DataList;
