import { useState, createRef, useContext } from "react";

import TabContext from "../../../store/tab-context";

import { WORLD_CLOCK_EMPTY_LIST, WORLD_CLOCK } from "../../../constants/const";

import CSSTransition from "react-transition-group/CSSTransition";
import WcForm from "./WcForm";
import EmptyContent from "../../UI/EmptyContent";
import WcCityList from "./WcCityList";

import styles from "./WorldClock.module.css";

const WorldClock = () => {
  const { activeTab } = useContext(TabContext);
  const isActive = activeTab === WORLD_CLOCK;

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const tabRef = createRef(null);

  const removeCityHandler = (id) => {
    const filteredCities = cities.filter((c) => c.id !== id);
    setCities(filteredCities);
  };

  const onDataLoadHandler = (loading) => {
    setIsLoading(loading);
  };

  const worldClockDataHandler = (wcData) => {
    const { id, cityName } = wcData;

    setCities((prevCities) => [
      {
        id,
        cityName,
      },
      ...prevCities,
    ]);
  };

  const tabClasses = `${styles["Worldclock__container"]} ${
    isActive ? "active" : "disable"
  }`;

  const content =
    cities.length > 0 ? (
      <WcCityList
        onRemove={removeCityHandler}
        cities={cities}
        isTabActive={isActive}
      />
    ) : (
      <EmptyContent text={WORLD_CLOCK_EMPTY_LIST} />
    );

  return (
    <CSSTransition
      in={isActive}
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
