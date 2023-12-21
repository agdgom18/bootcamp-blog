import React, { useState } from 'react';
import logo from '../../img/logo.svg';
import styles from './header.module.scss';
import Modal from '../Modal/Modal';
import styles2 from '../Modal/modal.module.scss';
const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(inputEmail);
    setIsValid(isValidEmail);
  };

  const changeModalStatus = () => setModalOpen((prev) => !prev);
  const signIn = () => {
    console.log(email);
    setIsLogin((prev) => !prev);
  };
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo"></img>

      {!isLogin ? (
        <button onClick={changeModalStatus} className={styles.button}>
          შესვლა
        </button>
      ) : (
        <button className={styles.button}>დაამატე ბლოგი</button>
      )}

      <Modal isOpen={isModalOpen} onClose={changeModalStatus}>
        {isLogin ? (
          <div>
            <h3 className={styles.title}>წარმატებული ავტორიზაცია</h3>
          </div>
        ) : (
          <div>
            <h3 className={styles.title}>შესვლა</h3>

            <form className={styles.form}>
              <label>
                ელ-ფოსტა:
                <input
                  onChange={handleEmailChange}
                  type="email"
                  name="email"
                  placeholder="Example@redberry.ge"
                  style={{ borderColor: email.length > 0 && isValid ? '#5d37f3' : 'red' }}
                />
              </label>
              <button onClick={signIn} className={styles.submitBtn}>
                შესვლა
              </button>
            </form>
          </div>
        )}
      </Modal>
    </header>
  );
};

export default Header;
