import React from 'react';
import styles from './PopupWithMessage.module.css';

export default function PopupWithMessage({ onClose, text, children }) {
  return (
    <>
    <div onClick={onClose} className={styles.popup__overlay}></div>
      <div className={styles.popup}>
        <h2 className={styles.popup__title}>{text}</h2>
        <button onClick={onClose} className={styles.popup__close}></button>
      {children}
    </div>
    </>
  );
}
