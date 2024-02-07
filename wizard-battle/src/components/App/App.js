import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import '../../App.css';
import Button from '../Button/Button';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage';
import SelectionButtons from '../SelectionButtons/SelectionButtons';
import SelectionOpponents from '../SelectionOpponents/SelectionOpponents';
import Battle from '../Battle/Battle';
import Feedback from '../Feedback/Feedback';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  const [isDisable, setIsBisable] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAutoSelect, setIsAutoSelect] = useState(false);
  const [isBlockButtonFind, setIsBlockButtonFind] = useState(false);

  const navigate = useNavigate();

  // function openPopup() {
  //   setIsOpenPopup(true);
  // }

  function closePopup() {
    setIsOpenPopup(false);
  }

  function clickButton() {
    setIsBisable(true);
    setIsOpenPopup(true);
  }

  function selectAuto() {
    setIsAutoSelect(true);
    navigate('/opponents');
  }

  function selectYourself() {
    navigate('/opponents');
  }

  function findFighter() {
    setIsBlockButtonFind(true);
  }

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<SelectionButtons selectAuto={selectAuto} selectYourself={selectYourself} clickButton={clickButton} />} />
        <Route path='/opponents' element={<SelectionOpponents isBlockButtonFind={isBlockButtonFind} findFighter={findFighter} isAutoSelect={isAutoSelect}/>} />
        <Route path='/battle' element={<Battle />} />
        <Route path='/feedback' element={<Feedback />} />
      </Routes>
      {isOpenPopup && <PopupWithMessage text='текст' onClose={closePopup}></PopupWithMessage>}
      <Footer />
    </>
  );
}

export default App;
