import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../../App.css';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';
import SelectionButtons from '../SelectionButtons/SelectionButtons.jsx';
import Battle from '../Battle/Battle.jsx';
import Feedback from '../Feedback/Feedback.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import AutoSelect from '../AutoSelect/AutoSelect.jsx';
import IndependentSelect from '../IndependentSelect/IndependentSelect.jsx';

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
        <Route path='/auto-selection' element={<AutoSelect isOpenPopup={isOpenPopup} setIsOpenPopup={setIsOpenPopup} setIsBlockButtonFind={setIsBlockButtonFind} />} />
        <Route path='/manual-selection' element={<IndependentSelect isOpenPopup={isOpenPopup} setIsOpenPopup={setIsOpenPopup}/>} />
        <Route path='/battle' element={<Battle isOpenPopup={isOpenPopup} setIsOpenPopup={setIsOpenPopup}/>} />
        <Route path='/feedback' element={<Feedback />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
