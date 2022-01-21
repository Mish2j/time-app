import styles from "./WcItem.module.css";

import Button from "../../UI/Button";

const WcItem = (props) => {
  const removeHandler = () => {
    props.onRemove(props.id);
  };

  return (
    <li>
      <p className={styles["wc__location"]}>{props.cityName}</p>
      <p className={styles["wc__time"]}>{props.dateTime}</p>
      <Button onClick={removeHandler}>
        <i className="fas fa-times"></i>
      </Button>
    </li>
  );
};

export default WcItem;
