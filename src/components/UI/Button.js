import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  const btnStyles = `${styles.btn} ${props.className || ""}`.trim();

  return (
    <button
      className={btnStyles}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
