import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AutoSelect.module.css';
import Card from '../Card/Card.jsx';

const baseUrl = 'https://wizard-world-api.herokuapp.com/Wizards';

const wizzards = [
  {
    name: 'Harry',
    lastName: 'Potter',
    healthPoints: 100,
    manaPoints: 100,
    status: 'active',
  },

  {
    name: 'Sirius',
    lastName: 'Snake',
    healthPoints: 100,
    manaPoints: 1000,
    status: 'active',
  },

  {
    name: 'Hermiona',
    lastName: 'Granger',
    healthPoints: 100,
    manaPoints: 1000,
    status: 'active',
  },

  {
    name: 'fff',
    lastName: 'Granger',
    healthPoints: 100,
    manaPoints: 1000,
    status: 'active',
  },

  {
    name: 'qqqqqq',
    lastName: 'Granger',
    healthPoints: 100,
    manaPoints: 1000,
    status: 'active',
  },
  {
    name: 'zzzzzz',
    lastName: 'Granger',
    healthPoints: 100,
    manaPoints: 1000,
    status: 'active',
  },

  {
    name: 'hello',
    lastName: 'Granger',
    healthPoints: 100,
    manaPoints: 1000,
    status: 'active',
  },

];

function getRandomWizzard(arr) {
  const randomNum = Math.random() * arr.length;
  const randomIndex = Math.floor(randomNum);
  return arr[randomIndex];
}

export default function AutoSelect({ setIsOpenPopup }) {
  const [isDisableButton, setIsDisableButton] = useState(false);
  // const [wizzardsData, setWizzardsData] = useState(wizzards);
  const [wizzardsData, setWizzardsData] = useState([]);
  const [firstOpponent, setFirstOpponent] = useState(JSON.parse(localStorage.getItem('firstOpponentId')) || null);
  const [secondOpponent, setSecondOpponent] = useState(JSON.parse(localStorage.getItem('secondOpponentId')) || null);

  axios.get(baseUrl).then((res) => {
    setWizzardsData(res.data);
  });

  useEffect(() => {
    if (localStorage.getItem('firstOpponentId') === null && localStorage.getItem('secondOpponentId') === null) {
      setFirstOpponent(getRandomWizzard(wizzardsData));
      setSecondOpponent(getRandomWizzard(wizzardsData));
    }
  }, []);

  const handleFindFighters = () => {
    setIsDisableButton(true);
    setTimeout(() => {
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
        <Card name={firstOpponent?.firstName} lastName={firstOpponent?.lastName}/>
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
        >К бою!</button>
      </div>
      <Card name={secondOpponent?.firstName} lastName={secondOpponent?.lastName}/>
    </div>
  );
}
