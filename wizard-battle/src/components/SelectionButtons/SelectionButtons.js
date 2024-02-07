import React from 'react';
import styles from './SelectionButtons.module.css';
import Button from '../Button/Button';

export default function SelectionButtons({ text, clickButton, selectAuto, selectYourself }) {
  return (
      <>
      <section className={styles.selection}>
     <div className={styles.selection__container}>
       {/* <Button onClick={selectYourself} text='вручную' />
       <Button onClick={selectAuto} text='автоматически' /> */}
       <button className={styles.selection__button} onClick={selectYourself}>вручную</button>
       <button className={styles.selection__button} onClick={selectAuto}>автоматически</button>
     </div>
     <Button clickButton={clickButton} text='тестик попапа'/>
     </section>
      </>
  );
}