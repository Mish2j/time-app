import { Fragment } from "react";
import ReactDOM from "react-dom";

import Button from "./Button";

import styles from "./Modal.module.css";

const Modal = (props) => {
  const { isModalActive, title, message } = props.modalData;

  const closeModal = props.onClose;

  const modalContent = (
    <Fragment>
      <div onClick={closeModal} className={styles.backdrop} />
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>
        <Button onClick={closeModal}>Close</Button>
      </div>
    </Fragment>
  );

  return ReactDOM.createPortal(
    isModalActive ? modalContent : null,
    document.getElementById("modal-root")
  );
};

export default Modal;
