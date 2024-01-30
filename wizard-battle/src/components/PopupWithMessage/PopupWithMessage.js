import React from 'react';
import styles from './PopupWithMessage.module.css';

export default function PopupWithMessage({isOpen}) {
  return (
      <div className={styles.popup}>
        <button className={ isOpen ? `${styles.popup_open}` : `${styles.popup}`}></button>
      </div>
  );
}
