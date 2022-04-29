import styles from "./LocalData.module.css";

const LocalData = ({ title, data }) => {
  return (
    <div className={styles["lc__data"]}>
      <h5>{title}</h5>
      <p>{data}</p>
    </div>
  );
};

export default LocalData;
