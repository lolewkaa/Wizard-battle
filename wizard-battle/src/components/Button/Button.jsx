import React from 'react';
import styles from './Button.module.css';

export default function Button({ text, clickButton }) {
  return (
    <>
    <button onClick={clickButton} className={styles.button}>{text}</button>
    </>
  );
}
