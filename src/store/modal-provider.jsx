import React, { useState } from "react";

import ModalContext from "./modal-context";

import Modal from "../components/UI/Modal";

const ModalContextProvider = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const openModalHandler = (modalContent) => {
    setTitle(modalContent.title);
    setMessage(modalContent.message);
    setIsActive(true);
  };

  const closeModalHandler = () => {
    setTitle("");
    setMessage("");
    setIsActive(false);
  };

  const modalCtxValue = {
    isModalActive: isActive,
    title: title,
    message: message,
    openModal: openModalHandler,
    closeModal: closeModalHandler,
  };

  return (
    <ModalContext.Provider value={modalCtxValue}>
      <Modal />
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
