import React from 'react';
import ReactModal from 'react-modal';



// Компонент модального окна
const Modal = ({ isOpen, onRequestClose, title, children }) => {
  return (
    <ReactModal
      className="sdsdds"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false} // Отключаем предупреждение об aria-атрибутах
    >
      <h2>{title}</h2>
      <div>{children}</div>
      <button onClick={onRequestClose}>Закрыть</button>
    </ReactModal>
  );
};

export default Modal;