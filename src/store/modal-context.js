import React, { useState, useCallback } from "react";
import Modal from "../components/UI/Modal";

const ModalContext = React.createContext({
  isModalActive: false,
  title: "",
  message: "",
  openModal() {},
  closeModal() {},
});

export const ModalContextProvider = (props) => {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const openModalHandler = useCallback((modalContent) => {
    setTitle(modalContent.title);
    setMessage(modalContent.message);
    setIsActive(true);
  }, []);

  const closeModalHandler = () => {
    setTitle("");
    setMessage("");
    setIsActive(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isModalActive: isActive,
        title: title,
        message: message,
        openModal: openModalHandler,
        closeModal: closeModalHandler,
      }}
    >
      <Modal />
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContext;
