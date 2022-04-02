import { useState, createRef } from "react";

import CSSTransition from "react-transition-group/CSSTransition";

import WcForm from "./WcForm";
import WcItem from "./WcItem";
import EmptyContent from "../../UI/EmptyContent";
import DataList from "../../UI/DataList";

import styles from "./WorldClock.module.css";

const WorldClock = (props) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const tabRef = createRef(null);

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
    const itemRef = createRef(null);
    return (
      <CSSTransition
        nodeRef={itemRef}
        key={city.id}
        classNames="fade"
        timeout={300}
      >
        <WcItem
          ref={itemRef}
          cityName={city.cityName}
          dateTime={city.dateTime}
          id={city.id}
          onRemove={removeHandler}
        />
      </CSSTransition>
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
    <CSSTransition
      in={isShown}
      timeout={200}
      classNames="slide"
      nodeRef={tabRef}
    >
      <div className={tabClasses} ref={tabRef}>
        <WcForm
          cityList={cities}
          worldClockData={worldClockDataHandler}
          isLoading={onDataLoadHandler}
        />
        <div>{content}</div>
        {isLoading ? <div className="loader" /> : null}
      </div>
    </CSSTransition>
  );
};

export default WorldClock;
