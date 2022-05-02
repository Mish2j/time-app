import React from "react";

const initialState = {
  isModalActive: false,
  title: "",
  message: "",
  openModal() {},
  closeModal() {},
};

const ModalContext = React.createContext(initialState);

export default ModalContext;
