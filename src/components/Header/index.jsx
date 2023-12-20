import React, { useState } from 'react';
import logo from '../../img/logo.svg';
import styles from './header.module.scss';
import Modal from '../Modal/Modal';
const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo"></img>

      <button onClick={openModal} className={styles.button}>
        შესვლა
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Header;
