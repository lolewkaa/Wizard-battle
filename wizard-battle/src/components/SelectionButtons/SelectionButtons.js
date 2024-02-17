import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SelectionButtons.module.css';
import Button from '../Button/Button';

export default function SelectionButtons({ setIsAutoSelect, setIsOpenPopup }) {
  const navigate = useNavigate();
  const [isDisable, setIsBisable] = useState(false);

  function autoSelection() {
    setIsAutoSelect(true);
    navigate('/auto-selection');
  }

  function manualSelection() {
    navigate('/manual-selection');
  }

  function openPopup() {
    setIsBisable(true);
    setIsOpenPopup(true);
  }
  return (
      <>
      <section className={styles.selection}>
     <div className={styles.selection__container}>
       <Button clickButton={manualSelection} text='вручную'/>
       <Button clickButton={autoSelection} text='автоматически'/>
     </div>
     <Button clickButton={openPopup} text='тестик попапа'/>
     </section>
      </>
  );
}
