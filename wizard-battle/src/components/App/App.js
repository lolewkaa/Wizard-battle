import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../../App.css';
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

  function clickButton() {
    setIsBisable(true);
    setIsOpenPopup(true);
  }

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<SelectionButtons setIsAutoSelect={setIsAutoSelect} clickButton={clickButton} />} />
        <Route path='/opponents' element={<SelectionOpponents setIsBlockButtonFind={setIsBlockButtonFind} isBlockButtonFind={isBlockButtonFind} isAutoSelect={isAutoSelect}/>} />
        <Route path='/battle' element={<Battle />} />
        <Route path='/feedback' element={<Feedback />} />
      </Routes>
      {isOpenPopup && <PopupWithMessage setIsOpenPopup={setIsOpenPopup} text='текст'></PopupWithMessage>}
      <Footer />
    </>
  );
}

export default App;
