import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import DateTimeContext from "../../../store/dateTime-context";
import Button from "../../UI/Button";

import styles from "./AlarmForm.module.css";

const AlarmForm = (props) => {
  const [alarmHour, setAlarmHour] = useState("");
  const [alarmMin, setAlarmMin] = useState("");
  const [timePeriod, setTimePeriod] = useState("AM");

  const ctx = useContext(DateTimeContext);
  const isTimeFormat12Hour = ctx.isTimeFormat12Hour();

  const alarmHourInputHandler = (e) => {
    const max = isTimeFormat12Hour ? 12 : 24;
    const min = isTimeFormat12Hour ? 1 : 0;
    setAlarmHour(validateInputVal(e.target.value, max, min));
  };

  const alarmMinInputHandler = (e) => {
    const max = 59;
    const min = 0;
    setAlarmMin(validateInputVal(e.target.value, max, min));
  };

  const timePeriodHandler = (e) => {
    setTimePeriod(e.target.value);
  };

  const validateInputVal = (val, max, min) => {
    const maxAllowedDigit = 2;
    let result = val.replace(/[^0-9]/g, "");

    if (+result > max) {
      result = result.slice(0, -1);
    }

    if (+result < min) {
      result = "";
    }

    if (result.length > maxAllowedDigit) {
      result = result.slice(0, -1);
    }

    return result;
  };

  const sendData = (hour, min, timePeriod) => {
    const alarmData = {
      id: uuidv4(),
      time: `${hour}:${min} ${timePeriod}`.trim(),
    };
    props.alarmData(alarmData);
  };

  const alarmSubmitHandler = (e) => {
    e.preventDefault();

    if (!alarmHour || !alarmMin) {
      props.modalData.setMessage("Please enter time.");
      return;
    }

    const formattedHour = isTimeFormat12Hour
      ? alarmHour
      : alarmHour.padStart(2, 0);
    const formattedMin = alarmMin.padStart(2, 0);
    const formattedTimePeriod = isTimeFormat12Hour ? timePeriod : "";

    sendData(formattedHour, formattedMin, formattedTimePeriod);

    setAlarmHour("");
    setAlarmMin("");
  };

  const toggleAmPm = isTimeFormat12Hour && (
    <select
      onChange={timePeriodHandler}
      className={styles["alarm__time"]}
      required
    >
      <option value="AM">AM</option>
      <option value="PM">PM</option>
    </select>
  );

  return (
    <form onSubmit={alarmSubmitHandler} className={styles["alarm__form"]}>
      <input onChange={alarmHourInputHandler} value={alarmHour} />
      <span className={styles["alarm__dots"]}>:</span>
      <input onChange={alarmMinInputHandler} value={alarmMin} />
      {toggleAmPm}
      <Button type="submit">
        <i className="fas fa-plus"></i>
      </Button>
    </form>
  );
};

export default AlarmForm;
