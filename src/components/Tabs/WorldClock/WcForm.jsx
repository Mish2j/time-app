import React, { useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  API_URL,
  WORLD_CLOCK,
  WORLD_CLOCK_RESULT_ERROR,
  WORLD_CLOCK_SEARCH_ERROR,
  WORLD_CLOCK_NO_INPUT_ERROR,
} from "../../../constants/const";
import { formatEnteredCityName, getJson } from "../../../helper/util";
import ModalContext from "../../../store/modal-context";

import Button from "../../UI/Button";

import styles from "./WcForm.module.css";

const WcForm = ({ isLoading, worldClockData }) => {
  const enteredCityRef = useRef();
  const modalCtx = useContext(ModalContext);

  const sendCityData = (name) => {
    const wcDataObj = {
      id: uuidv4(),
      cityName: name,
    };
    worldClockData(wcDataObj);
  };

  const resetInput = () => {
    enteredCityRef.current.value = "";
    enteredCityRef.current.blur();
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      isLoading(true);

      const searchedCity = enteredCityRef.current.value;

      if (searchedCity.trim().length === 0) {
        throw new Error(WORLD_CLOCK_NO_INPUT_ERROR);
      }

      const formattedCityName = formatEnteredCityName(searchedCity);

      const timezonesData = await getJson(API_URL);

      const matchingCities = timezonesData.filter((cityName) =>
        cityName.includes(`${formattedCityName}`)
      );

      if (matchingCities.length === 0)
        throw new Error(WORLD_CLOCK_SEARCH_ERROR);

      if (matchingCities.length > 1) throw new Error(WORLD_CLOCK_RESULT_ERROR);

      sendCityData(matchingCities[0]);
    } catch (error) {
      modalCtx.openModal({ title: WORLD_CLOCK, message: `${error.message}` });
    } finally {
      resetInput();
      isLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles["wc__search"]}>
      <input ref={enteredCityRef} type="text" placeholder="Enter a city name" />
      <Button type="submit">
        <i className="fas fa-search"></i>
      </Button>
    </form>
  );
};

export default WcForm;
