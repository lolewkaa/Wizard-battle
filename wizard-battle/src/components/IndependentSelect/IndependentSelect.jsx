import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './IndependentSelect.module.css';
import Card from '../Card/Card.jsx';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';

const baseUrl = 'https://wizard-world-api.herokuapp.com/Wizards';

export default function IndependentSelect({ setIsOpenPopup, isOpenPopup }) {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [firstOpponentId, setFirstOpponentId] = useState(JSON.parse(localStorage.getItem('firstOpponentId')) || '');
  const [secondOpponentId, setSecondOpponentId] = useState(JSON.parse(localStorage.getItem('secondOpponentId')) || '');
  const [wizzardsData, setWizzardsData] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setWizzardsData(res.data);
    });
  }, []);
  function openPopup() {
    setIsOpenPopup(true);
  }

  const toggleSelectionOpponent = (id, opponent) => {
    if (opponent === 'firstOpponentId') {
      if (firstOpponentId === id) {
        setFirstOpponentId('');
      } else {
        setFirstOpponentId(id);
      }
    }
    if (opponent === 'secondOpponentId') {
      if (secondOpponentId === id) {
        setSecondOpponentId('');
      } else {
        setSecondOpponentId(id);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('firstOpponentId', JSON.stringify(firstOpponentId));
  }, [firstOpponentId]);

  useEffect(() => {
    localStorage.setItem('secondOpponentId', JSON.stringify(secondOpponentId));
  }, [secondOpponentId]);

  useEffect(() => {
    setIsDisableButton(firstOpponentId === '' || secondOpponentId === '');
  }, [firstOpponentId, secondOpponentId]);
  return (
          <>
            <section className={styles.manual}>
              <div className={styles.manual__container}>
              {wizzardsData.map((wizzard) => (
                  <Card
                    colorPlace={wizzard.id === firstOpponentId}
                    toggleSelectionOpponent = {() => toggleSelectionOpponent(wizzard.id, 'firstOpponentId')}
                    key={wizzard.id}
                    name={wizzard.firstName}
                    lastName={wizzard.lastName}
                  />))}
              </div>
              <button
              onClick={openPopup}
              disabled={isDisableButton}
              className={styles.manual__button
              }>В бой</button>
              <div className={styles.manual__container}>
              {wizzardsData.map((wizzard) => (
                  <Card
                    colorPlace={wizzard.id === secondOpponentId}
                    toggleSelectionOpponent = {() => toggleSelectionOpponent(wizzard.id, 'secondOpponentId')}
                    key={wizzard.id}
                    name={wizzard.firstName}
                    lastName={wizzard.lastName}
                  />))}
              </div>
            </section>
            {isOpenPopup && <PopupWithMessage setIsOpenPopup={setIsOpenPopup} text='Перенапрявляем вас на страницу сражения'></PopupWithMessage>}
          </>
  );
}
