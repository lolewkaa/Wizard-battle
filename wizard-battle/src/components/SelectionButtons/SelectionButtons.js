import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SelectionButtons.module.css';
import Button from '../Button/Button';

export default function SelectionButtons({ setIsAutoSelect, clickButton }) {
  const navigate = useNavigate();

  function autoSelection() {
    setIsAutoSelect(true);
    navigate('/opponents');
  }

  function manualSelection() {
    navigate('/opponents');
  }
  return (
      <>
      <section className={styles.selection}>
     <div className={styles.selection__container}>
       {/* <Button onClick={selectYourself} text='вручную' />
       <Button onClick={selectAuto} text='автоматически' /> */}
       <button className={styles.selection__button} onClick={manualSelection}>вручную</button>
       <button className={styles.selection__button} onClick={autoSelection}>автоматически</button>
     </div>
     <Button clickButton={clickButton} text='тестик попапа'/>
     </section>
      </>
  );
}
