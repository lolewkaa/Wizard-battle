import React, { useState } from 'react';
import styles from './Button.module.css';

export default function Button({ openPopupWithMessage }) {
  const [isDisable, setIsDisable] = useState('нажми меня');

  const handleChange = (e) => {
    e.preventDefault();
    setIsDisable('меня нажали');
  };
  return (
    <>
    <button className={styles.button} onClick={handleChange}>{isDisable}</button>
    <button className={styles.button} onClick={openPopupWithMessage}></button>
    </>
  );
}
