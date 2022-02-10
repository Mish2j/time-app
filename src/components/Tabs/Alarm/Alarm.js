import { useState, useEffect, useContext } from "react";

import { ALARM, localeOptions } from "../../../helper/config";
import { formatLocalTime } from "../../../helper/util";

import ModalContext from "../../../store/modal-context";

import AlarmForm from "./AlarmForm";
import AlarmItem from "./AlarmItem";
import EmptyContent from "../../UI/EmptyContent";
import DataList from "../../UI/DataList";

import styles from "./Alarm.module.css";

const Alarm = (props) => {
  const [alarms, setAlarms] = useState([]);
  const { openModal } = useContext(ModalContext);

  const removeAlarmHandler = (id) => {
    const filteredAlarms = alarms.filter((a) => a.id !== id);
    setAlarms(filteredAlarms);
  };

  const alarmDataHandler = (alarm) => {
    const { id, time } = alarm;

    setAlarms((prevAlarms) => [
      {
        id: id,
        time: time,
      },
      ...prevAlarms,
    ]);
  };

  useEffect(() => {
    if (alarms.length === 0) return;

    const interval = setInterval(() => {
      const now = new Date();

      const time = formatLocalTime(
        now,
        localeOptions.locale,
        localeOptions.timeOptions
      );

      alarms.forEach((alarmTime) => {
        if (alarmTime.time === time) {
          openModal({
            title: ALARM,
            message: `It is ${alarmTime.time}`,
          });

          const filteredAlarms = alarms.filter((a) => a.id !== alarmTime.id);

          setAlarms(filteredAlarms);
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [alarms, openModal]);

  const displayAlarms = alarms.map((a) => {
    return (
      <AlarmItem
        key={a.id}
        time={a.time}
        id={a.id}
        onRemove={removeAlarmHandler}
      />
    );
  });

  const content =
    alarms.length > 0 ? (
      <DataList>{displayAlarms}</DataList>
    ) : (
      <EmptyContent text={`You haven't set an alarm yet.`} />
    );

  const isShown = props.isActive;
  const tabClasses = `${styles["alarm__container"]} ${
    isShown ? "active" : "disable"
  }`;

  return (
    <div className={tabClasses}>
      <h3 className={styles["alarm__heading"]}>
        Choose a time to set the alarm
      </h3>
      <AlarmForm alarmData={alarmDataHandler} />
      <div>{content}</div>
    </div>
  );
};

export default Alarm;
