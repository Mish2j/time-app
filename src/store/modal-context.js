import React from "react";

const ModalContext = React.createContext({
  isModalActive: false,
  title: "",
  message: "",

  openModalHandler() {
    this.isModalActive = true;
  },

  closeModalHandler() {
    this.isModalActive = false;
    this.title = "";
    this.message = "";
  },
});

export default ModalContext;
