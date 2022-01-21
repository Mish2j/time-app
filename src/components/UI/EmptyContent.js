import styles from "./EmptyContent.module.css";

const EmptyContent = (props) => {
  return (
    <div className={styles["ec__container"]}>
      <p className={styles["ec__text"]}>{props.text}</p>
    </div>
  );
};

export default EmptyContent;
