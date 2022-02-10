import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ALARM, localeOptions } from "../../../helper/config";
import { isTimeFormat12Hour } from "../../../helper/util";

import ModalContext from "../../../store/modal-context";
import Button from "../../UI/Button";

import styles from "./AlarmForm.module.css";

const AlarmForm = (props) => {
  const [alarmHour, setAlarmHour] = useState("");
  const [alarmMin, setAlarmMin] = useState("");
  const [timePeriod, setTimePeriod] = useState("AM");

  const modalCtx = useContext(ModalContext);
  const is12Hour = isTimeFormat12Hour(localeOptions.locale);

  const alarmHourInputHandler = (e) => {
    const max = is12Hour ? 12 : 24;
    const min = is12Hour ? 1 : 0;
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
      modalCtx.openModal({ title: ALARM, message: "Please enter time." });
      return;
    }

    const formattedHour = is12Hour ? alarmHour : alarmHour.padStart(2, 0);
    const formattedMin = alarmMin.padStart(2, 0);
    const formattedTimePeriod = is12Hour ? timePeriod : "";

    sendData(formattedHour, formattedMin, formattedTimePeriod);

    setAlarmHour("");
    setAlarmMin("");
  };

  const toggleAmPm = is12Hour && (
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
