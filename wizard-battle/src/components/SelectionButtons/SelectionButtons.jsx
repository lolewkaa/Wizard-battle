import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SelectionButtons.module.css';
import Button from '../Button/Button';

export default function SelectionButtons({ setIsAutoSelect }) {
  const navigate = useNavigate();

  function autoSelection() {
    setIsAutoSelect(true);
    navigate('/auto-selection');
  }

  function manualSelection() {
    navigate('/manual-selection');
  }

  return (
      <>
      <section className={styles.selection}>
     <div className={styles.selection__container}>
       <Button clickButton={manualSelection} text='вручную'/>
       <Button clickButton={autoSelection} text='автоматически'/>
     </div>
     </section>
      </>
  );
}
