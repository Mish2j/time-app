import React, { useContext, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import { API_URL, WORLD_CLOCK } from "../../../helper/config";
import { getFormattedCityName, getJson } from "../../../helper/util";
import ModalContext from "../../../store/modal-context";

import Button from "../../UI/Button";

import styles from "./WcForm.module.css";

const WcForm = (props) => {
  const enteredCityRef = useRef();
  const modalCtx = useContext(ModalContext);

  // return city if it exists
  const returnCity = async (searchCity, url) => {
    try {
      const formatCityName = searchCity
        .trim()
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("_");

      const allCities = await getJson(url);

      const city = allCities.filter((cityName) =>
        cityName.includes(`${formatCityName}`)
      );

      if (city.length > 1)
        throw new Error(
          `The search result returned more than one city. Please try to enter the full name of the city.`
        );

      if (city.length === 0)
        throw new Error(
          `The city '${searchCity}' you are looking for does not exist. Try another one.`
        );

      return city[0];
    } catch (error) {
      throw error;
    }
  };

  const returnCityTime = async (city, url) => {
    try {
      const data = await getJson(`${url}/${city}`);

      const { datetime } = data;

      const filterTime = datetime
        .slice(datetime.indexOf("T") + 1)
        .split(":", 2)
        .join(":");

      return filterTime;
    } catch (error) {
      throw error;
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    props.isLoading(true);

    const searchedCityName = enteredCityRef.current.value;

    enteredCityRef.current.value = "";

    try {
      if (searchedCityName.trim() === "") {
        throw new Error("Please enter the city name you are looking for.");
      }

      const searchedCity = await returnCity(searchedCityName, API_URL);
      const searchedCityDateTime = await returnCityTime(searchedCity, API_URL);
      const formattedCityName = getFormattedCityName(searchedCity);

      const isCityNameInList = props.cityList.some((c) => {
        return c.cityName === formattedCityName;
      });

      if (isCityNameInList) {
        throw new Error("You have this city in your list. Try another one.");
      }

      sendData(formattedCityName, searchedCityDateTime);
    } catch (error) {
      modalCtx.openModal({ title: WORLD_CLOCK, message: `${error.message}` });
    } finally {
      props.isLoading(false);
      enteredCityRef.current.blur();
    }
  };

  const sendData = (name, dateTime) => {
    const wcDataObj = {
      id: uuidv4(),
      cityName: name,
      dateTime: dateTime,
    };
    props.worldClockData(wcDataObj);
  };

  return (
    <form onSubmit={submitHandler} className={styles["wc__search"]}>
      <input
        ref={enteredCityRef}
        type="text"
        placeholder="Search by city name"
      />
      <Button type="submit">
        <i className="fas fa-search"></i>
      </Button>
    </form>
  );
};

export default WcForm;
