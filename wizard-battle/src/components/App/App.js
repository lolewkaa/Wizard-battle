import React, { useState } from 'react';
import '../../App.css';
import Button from '../Button/Button';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage';

function App() {
  const [isPopupMessageOpen, setIsPopupMessageOpen] = useState(false);

  function openPopupWithMessage() {
    setIsPopupMessageOpen(true);
  }
  return (
    <>
    <Button text='нажми меня' openPopupWithMessage={openPopupWithMessage}/>
    <PopupWithMessage isOpen={isPopupMessageOpen}/>
    </>
  );
}

export default App;
