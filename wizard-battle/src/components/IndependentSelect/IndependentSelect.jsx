import React, { useState, useEffect } from 'react';
import styles from './IndependentSelect.module.css';
import Card from '../Card/Card.jsx';

const wizzards = [
  {
    id: '0',
    name: 'Harry',
    lastName: 'Potter',
    healthPoints: 100,
    manaPoints: 100,
    status: 'active',
  },

  {
    id: '1',
    name: 'Sirius',
    lastName: 'Snake',
    healthPoints: 100,
    manaPoints: 1000,
    status: 'active',
  },

  {
    id: '2',
    name: 'Hermiona',
    lastName: 'Granger',
    healthPoints: 100,
    manaPoints: 1000,
    status: 'active',
  },
];

export default function IndependentSelect({ setIsOpenPopup }) {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [firstOpponentId, setFirstOpponentId] = useState(JSON.parse(localStorage.getItem('firstOpponentId')) || '');
  const [secondOpponentId, setSecondOpponentId] = useState(JSON.parse(localStorage.getItem('secondOpponentId')) || '');

  function openPopup() {
    setIsOpenPopup(true);
  }
  const toggleSelectionOpponent = (wizardId, opponent) => {
    if (opponent === 'firstOpponentId') {
      if (firstOpponentId === wizardId) {
        setFirstOpponentId('');
      } else {
        setFirstOpponentId(wizardId);
      }
    }
    if (opponent === 'secondOpponentId') {
      if (secondOpponentId === wizardId) {
        setSecondOpponentId('');
      } else {
        setSecondOpponentId(wizardId);
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
              {wizzards.map((wizzard) => (
                  <Card
                    colorPlace={wizzard.id === firstOpponentId}
                    toggleSelectionOpponent = {() => toggleSelectionOpponent(wizzard.id, 'firstOpponentId')}
                    key={wizzard.name}
                    name={wizzard.name}
                  />))}
              </div>
              <button
              onClick={openPopup}
              disabled={isDisableButton}
              className={styles.manual__button
              }>В бой</button>
              <div className={styles.manual__container}>
              {wizzards.map((wizzard) => (
                  <Card
                    colorPlace={wizzard.id === secondOpponentId}
                    toggleSelectionOpponent = {() => toggleSelectionOpponent(wizzard.id, 'secondOpponentId')}
                    key={wizzard.name}
                    name={wizzard.name}
                  />))}
              </div>
            </section>
          </>
  );
}
