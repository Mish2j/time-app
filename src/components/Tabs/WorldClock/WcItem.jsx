import { forwardRef } from "react";

import Button from "../../UI/Button";

import { returnFilteredCityName } from "../../../helper/util";

import styles from "./WcItem.module.css";

const WcItem = forwardRef(({ id, time, cityName, onRemove }, ref) => {
  const removeHandler = () => {
    onRemove(id);
  };

  return (
    <li ref={ref}>
      <p className={styles["wc__location"]}>
        {returnFilteredCityName(cityName)}
      </p>
      <p className={styles["wc__time"]}>{time}</p>
      <Button onClick={removeHandler}>
        <i className="fas fa-times"></i>
      </Button>
    </li>
  );
});

export default WcItem;
