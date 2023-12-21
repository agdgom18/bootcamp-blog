import React from 'react';
import styles from './modal.module.scss';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.75732 16.2426L16.2426 7.75736" stroke="#1A1A1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.2426 16.2426L7.75732 7.75736" stroke="#1A1A1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
