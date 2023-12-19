import React from 'react';
import logo from '../../img/logo.svg';
import styles from './header.module.scss';
const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo"></img>
      <button className={styles.button}>შესვლა</button>
    </header>
  );
};

export default Header;
