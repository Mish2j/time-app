import { useEffect, useState, createRef } from "react";

import WcItem from "./WcItem";
import DataList from "../../UI/DataList";

import CSSTransition from "react-transition-group/CSSTransition";

import { formatDateTime } from "../../../helper/util";
import { LOCALE_OPTIONS } from "../../../constants/const";

const WcCityList = ({ cities, isTabActive, onRemove }) => {
  const [time, setTime] = useState(Date.now);

  useEffect(() => {
    if (!isTabActive) return;

    const interval = setInterval(() => setTime(Date.now()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isTabActive]);

  const removeHandler = (id) => {
    onRemove(id);
  };

  const searchedCities = cities.map((city) => {
    const itemRef = createRef(null);

    const searchedCityTime = formatDateTime(time, LOCALE_OPTIONS.locale, {
      timeZone: city.cityName,
      ...LOCALE_OPTIONS.timeOptions,
    });

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
          time={searchedCityTime}
          id={city.id}
          onRemove={removeHandler}
        />
      </CSSTransition>
    );
  });

  return <DataList>{searchedCities}</DataList>;
};

export default WcCityList;
