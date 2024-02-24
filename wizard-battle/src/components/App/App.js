import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../../App.css';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage';
import SelectionButtons from '../SelectionButtons/SelectionButtons';
import Battle from '../Battle/Battle';
import Feedback from '../Feedback/Feedback';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AutoSelect from '../AutoSelect/AutoSelect';
import IndependentSelect from '../IndependentSelect/IndependentSelect';

function App() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAutoSelect, setIsAutoSelect] = useState(false);
  const [isBlockButtonFind, setIsBlockButtonFind] = useState(false);

  const navigate = useNavigate();

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<SelectionButtons setIsOpenPopup={setIsOpenPopup} setIsAutoSelect={setIsAutoSelect} />} />
        <Route path='/auto-selection' element={<AutoSelect setIsOpenPopup={setIsOpenPopup} setIsBlockButtonFind={setIsBlockButtonFind} />} />
        <Route path='/manual-selection' element={<IndependentSelect setIsOpenPopup={setIsOpenPopup}/>} />
        <Route path='/battle' element={<Battle />} />
        <Route path='/feedback' element={<Feedback />} />
      </Routes>
      {isOpenPopup && <PopupWithMessage setIsOpenPopup={setIsOpenPopup} text='текст'></PopupWithMessage>}
      <Footer />
    </>
  );
}

export default App;
