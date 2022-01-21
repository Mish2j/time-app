import styles from "./DataList.module.css";

const DataList = (props) => {
  return <ul className={styles.dataList}>{props.children}</ul>;
};

export default DataList;
