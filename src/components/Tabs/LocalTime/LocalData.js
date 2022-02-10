import styles from "./LocalData.module.css";

const LocalData = (props) => {
  return (
    <div className={styles["lc__data"]}>
      <h5>{props.title}</h5>
      <p>{props.data}</p>
    </div>
  );
};

export default LocalData;
