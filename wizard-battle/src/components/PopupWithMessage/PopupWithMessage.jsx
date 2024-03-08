import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PopupWithMessage.module.css';

export default function PopupWithMessage({ setIsOpenPopup, children }) {
  const navigate = useNavigate();

  const useCountDown = (initialSeconds) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const countDown = () => {
      setSeconds(seconds - 1);
    };

    const runTimer = () => {
      if (seconds === 0) {
        setIsOpenPopup(false);
        navigate('/');
        return;
      }
      setTimeout(
        () => {
          countDown();
        },
        1000,
      );
    };

    useEffect(() => {
      runTimer();
    }, [seconds]);

    return { seconds };
  };

  const { seconds } = useCountDown(4);
  function onClose() {
    setIsOpenPopup(false);
  }
  return (
    <>
    <div onClick={onClose} className={styles.popup__overlay}></div>
      <div className={styles.popup}>
        <h2 className={styles.popup__title}>{seconds}</h2>
        <button onClick={onClose} className={styles.popup__close}>Изменить выбор</button>
      {children}
    </div>
    </>
  );
}
