import { useState, useEffect, useContext } from "react";

import DateTimeContext from "../../../store/dateTime-context";

import AlarmForm from "./AlarmForm";
import AlarmItem from "./AlarmItem";
import EmptyContent from "../../UI/EmptyContent";
import DataList from "../../UI/DataList";

import styles from "./Alarm.module.css";

const Alarm = (props) => {
  const [alarms, setAlarms] = useState([]);
  const ctx = useContext(DateTimeContext);

  const modalData = {
    title: "Alarm",
    message: "",

    setMessage(msg) {
      this.message = msg;
      props.onOpenModal(this);
    },
  };

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
      const time = ctx.formatTime(now);

      alarms.forEach((alarmTime) => {
        if (alarmTime.time === time) {
          modalData.setMessage(`It is ${alarmTime.time}`);

          const filteredAlarms = alarms.filter((a) => a.id !== alarmTime.id);

          setAlarms(filteredAlarms);
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [alarms]);

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
      <h3>Choose a time to set the alarm</h3>
      <AlarmForm modalData={modalData} alarmData={alarmDataHandler} />
      <div>{content}</div>
    </div>
  );
};

export default Alarm;
