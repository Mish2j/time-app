import ReactDOM from "react-dom";
import { useContext } from "react";
import ModalContext from "../../store/modal-context";
import Button from "./Button";

import styles from "./Modal.module.css";

const Modal = () => {
  const modalCtx = useContext(ModalContext);

  const closeModalHandler = () => {
    modalCtx.closeModal();
  };

  const modalContent = (
    <>
      <div onClick={closeModalHandler} className={styles.backdrop} />
      <div className={styles.modal}>
        <h3>{modalCtx.title}</h3>
        <p>{modalCtx.message}</p>
        <Button onClick={closeModalHandler}>Close</Button>
      </div>
    </>
  );

  return ReactDOM.createPortal(
    modalCtx.isModalActive ? modalContent : null,
    document.getElementById("modal-root")
  );
};

export default Modal;
