import { forwardRef } from "react";

import styles from "./WcItem.module.css";

import Button from "../../UI/Button";

const WcItem = forwardRef((props, ref) => {
  const removeHandler = () => {
    props.onRemove(props.id);
  };

  return (
    <li ref={ref}>
      <p className={styles["wc__location"]}>{props.cityName}</p>
      <p className={styles["wc__time"]}>{props.dateTime}</p>
      <Button onClick={removeHandler}>
        <i className="fas fa-times"></i>
      </Button>
    </li>
  );
});

export default WcItem;
