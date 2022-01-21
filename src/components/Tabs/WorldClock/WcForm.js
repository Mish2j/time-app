import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "../../UI/Button";

import styles from "./WcForm.module.css";

const WcForm = (props) => {
  const API_URL = "https://worldtimeapi.org/api/timezone";
  const enteredCityRef = useRef();

  const getJSON = async (url) => {
    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error("Request failed!");

      const data = await res.json();

      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  // return city if it exists
  const returnCity = async function (searchCity, url) {
    try {
      const formatCityName = searchCity
        .trim()
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("_");

      const allCities = await getJSON(url);

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

  const returnCityTime = async function (city, url) {
    try {
      const data = await getJSON(`${url}/${city}`);

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

  const getFormattedCityName = (city) => {
    const splitArr = city.split("/");
    const result = splitArr[splitArr.length - 1];
    return result;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

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
      props.modalData.setMessage(`${error.message}`);
    } finally {
      props.isLoading(false);
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
