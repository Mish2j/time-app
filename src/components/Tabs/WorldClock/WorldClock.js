import { useState } from "react";

import WcForm from "./WcForm";
import WcItem from "./WcItem";
import EmptyContent from "../../UI/EmptyContent";
import DataList from "../../UI/DataList";

import styles from "./WorldClock.module.css";

const WorldClock = (props) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const modalData = {
    title: "World Clock",
    message: "",

    setMessage(msg) {
      this.message = msg;
      props.onOpenModal(this);
    },
  };

  const removeHandler = (id) => {
    const filteredCities = cities.filter((c) => c.id !== id);
    setCities(filteredCities);
  };

  const onDataLoadHandler = (loading) => {
    setIsLoading(loading);
  };

  const worldClockDataHandler = (wcData) => {
    const { id, cityName, dateTime } = wcData;

    setCities((prevCities) => [
      {
        id,
        cityName,
        dateTime,
      },
      ...prevCities,
    ]);
  };

  const searchedCities = cities.map((city) => {
    return (
      <WcItem
        key={city.id}
        cityName={city.cityName}
        dateTime={city.dateTime}
        id={city.id}
        onRemove={removeHandler}
      />
    );
  });

  const content =
    searchedCities.length > 0 ? (
      <DataList>{searchedCities}</DataList>
    ) : (
      <EmptyContent text={`You don't have any search results yet.`} />
    );

  const isShown = props.isActive;
  const tabClasses = `${styles["Worldclock__container"]} ${
    isShown ? "active" : "disable"
  }`;

  return (
    <div className={tabClasses}>
      <WcForm
        cityList={cities}
        modalData={modalData}
        worldClockData={worldClockDataHandler}
        isLoading={onDataLoadHandler}
      />
      <div>{content}</div>
      {isLoading ? <div className="loader" /> : null}
    </div>
  );
};

export default WorldClock;
