import React, { useEffect, useState } from "react";
import { useLocation, Route, Routes } from "react-router-dom";

import "../../App.css";
import SelectionButtons from "../SelectionButtons/SelectionButtons.jsx";
import Battle from "../Battle/Battle.jsx";
import Feedback from "../Feedback/Feedback.jsx";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import AutoSelect from "../AutoSelect/AutoSelect.jsx";
import IndependentSelect from "../IndependentSelect/IndependentSelect.jsx";
import styles from "./App.module.css";

function App() {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isAutoSelect, setIsAutoSelect] = useState(false);
  const [isBlockButtonFind, setIsBlockButtonFind] = useState(false);
  const [isBattleStarted, setIsBattleStarted] = useState(
    JSON.parse(localStorage.getItem("isBattleStarted")) || false,
  );
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== "/battle" && isBattleStarted === true) {
      localStorage.removeItem("secondOpponentId");
      localStorage.removeItem("firstOpponentId");
      localStorage.removeItem("isBattleStarted");
    }
  }, []);

  return (
    <>
      <div className={styles.page}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <SelectionButtons
                setIsOpenPopup={setIsOpenPopup}
                setIsAutoSelect={setIsAutoSelect}
              />
            }
          />
          <Route
            path="/auto-selection"
            element={
              <AutoSelect
                isOpenPopup={isOpenPopup}
                setIsOpenPopup={setIsOpenPopup}
                setIsBlockButtonFind={setIsBlockButtonFind}
              />
            }
          />
          <Route
            path="/manual-selection"
            element={
              <IndependentSelect
                isOpenPopup={isOpenPopup}
                setIsOpenPopup={setIsOpenPopup}
              />
            }
          />
          <Route
            path="/battle"
            element={
              <Battle
                setIsBattleStarted={setIsBattleStarted}
                isOpenPopup={isOpenPopup}
                setIsOpenPopup={setIsOpenPopup}
              />
            }
          />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
