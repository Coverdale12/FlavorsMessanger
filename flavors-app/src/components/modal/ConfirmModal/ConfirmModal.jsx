import React from 'react';
import ReactModal from 'react-modal';
import "./ConfirmModal.scss";


// Стили для модального окна
const styleModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '25rem',
    width: "100%",
    padding: '1.3rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    transitionDuration: '0.3s'
  },
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transitionDuration: '0.3s',
  },
};

// Компонент модального окна
const ConfirmModal = ({ isOpen, message, onConfirm, onCancel, confirmText = 'Да', cancelText = 'Нет' }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCancel}
      ariaHideApp={false}
      style={styleModal}
    >
      <h2 className="confirm-modal__title">
        Подтверждение
      </h2>
      <p className="confirm-modal__message">
        {message}
      </p>
      <div className="confirm-modal__panel">
        <button onClick={onConfirm} className='confirm-modal__button'>{confirmText}</button>
        <button onClick={onCancel} className='confirm-modal__button'>{cancelText}</button>
      </div>
    </ReactModal>
  );
};

export default ConfirmModal;