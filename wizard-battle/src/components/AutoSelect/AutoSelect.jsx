import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AutoSelect.module.css";
import Card from "../Card/Card.jsx";
import PopupWithMessage from "../PopupWithMessage/PopupWithMessage.jsx";

const baseUrl = "https://wizard-world-api.herokuapp.com/Wizards";

function getRandomWizzard(arr) {
  const randomNum = Math.random() * arr.length;
  const randomIndex = Math.floor(randomNum);
  return arr[randomIndex];
}

export default function AutoSelect({ isOpenPopup, setIsOpenPopup }) {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [wizzardsData, setWizzardsData] = useState([]);
  const [firstOpponent, setFirstOpponent] = useState(
    JSON.parse(localStorage.getItem("firstOpponentId")) || null,
  );
  const [secondOpponent, setSecondOpponent] = useState(
    JSON.parse(localStorage.getItem("secondOpponentId")) || null,
  );

  useEffect(() => {
    if (localStorage.getItem("firstOpponentId") !== undefined) {
      setFirstOpponent(JSON.parse(localStorage.getItem("firstOpponentId")));
    }
    if (localStorage.getItem('secondOpponentId') !== undefined) {
      setFirstOpponent(JSON.parse(localStorage.getItem('secondOpponentId')));
    }

    axios.get(baseUrl).then((res) => {
      setWizzardsData(res.data);
    });
    // if (localStorage.getItem('firstOpponentId')
    //= == null && localStorage.getItem('secondOpponentId') === null) {
    //   setFirstOpponent(getRandomWizzard(wizzardsData));
    //   setSecondOpponent(getRandomWizzard(wizzardsData));
    // }
  }, []);

  const handleFindFighters = () => {
    setIsDisableButton(true);
    const animation = setInterval(() => {
      setFirstOpponent(getRandomWizzard(wizzardsData));
      setSecondOpponent(getRandomWizzard(wizzardsData));
    }, 200);
    setTimeout(() => {
      clearInterval(animation);
      setFirstOpponent(getRandomWizzard(wizzardsData));
      setSecondOpponent(getRandomWizzard(wizzardsData));
      setIsDisableButton(false);
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem('firstOpponentId', JSON.stringify(firstOpponent));
  }, [firstOpponent]);

  useEffect(() => {
    localStorage.setItem('secondOpponentId', JSON.stringify(secondOpponent));
  }, [secondOpponent]);
  function openPopup() {
    setIsOpenPopup(true);
  }
  return (
    <div className={styles.auto}>
      <Card
        name={firstOpponent?.firstName}
        lastName={firstOpponent?.lastName}
      />
      <div className={styles.auto__container}>
        <button
          className={styles.auto__button}
          onClick={handleFindFighters}
          disabled={isDisableButton}
        >
          Найти
        </button>
        <button
          className={styles.auto__button}
          disabled={isDisableButton}
          onClick={openPopup}
        >
          К бою!
        </button>
      </div>
      <Card
        name={secondOpponent?.firstName}
        lastName={secondOpponent?.lastName}
      />
      {isOpenPopup && (
        <PopupWithMessage
          setIsOpenPopup={setIsOpenPopup}
          text="Redirect to the battle page"
        ></PopupWithMessage>
      )}
    </div>
  );
}
