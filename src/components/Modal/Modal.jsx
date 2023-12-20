import React from 'react';
import styles from './modal.module.scss';

const Modal = ({ isOpen, onClose }) => {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.75732 16.2426L16.2426 7.75736" stroke="#1A1A1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M16.2426 16.2426L7.75732 7.75736" stroke="#1A1A1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <h3 className={styles.title}>შესვლა</h3>

        <form className={styles.form}>
          <label>
            ელ-ფოსტა:
            <input ref={inputRef} type="email" name="email" placeholder="Example@redberry.ge" />
          </label>
          <button className={styles.submitBtn}>შესვლა</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
