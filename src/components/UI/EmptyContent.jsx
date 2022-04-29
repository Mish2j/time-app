import styles from "./EmptyContent.module.css";

const EmptyContent = ({ text }) => {
  return (
    <div className={styles["ec__container"]}>
      <p className={styles["ec__text"]}>{text}</p>
    </div>
  );
};

export default EmptyContent;
