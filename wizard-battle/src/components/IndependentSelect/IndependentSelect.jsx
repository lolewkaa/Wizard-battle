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
  const [colorPlace, setColorPlace] = useState(false);
  const [firstOpponentId, setFirstOpponentId] = useState(JSON.parse(localStorage.getItem('firstOpponentId')) || '');
  const [secondOpponentId, setSecondOpponentId] = useState(JSON.parse(localStorage.getItem('secondOpponentId')) || '');
  // const [firstOpponentId, setFirstOpponentId] = useState('')
  // const [secondOpponentId, setSecondOpponentId] = useState('')

  function openPopup() {
    setIsOpenPopup(true);
  }
  const toggleSelectionOpponent = (wizardId) => {
    setFirstOpponentId(wizardId);
    setSecondOpponentId(wizardId);
    //это проверка
    if (secondOpponentId !== '') {
      console.log('выбрали второго')
    }
    setColorPlace(!colorPlace);
  };

  useEffect(() => {
    localStorage.setItem('firstOpponent', JSON.stringify(firstOpponentId));
  }, [firstOpponentId]);

  useEffect(() => {
    localStorage.setItem('secondOpponent', JSON.stringify(secondOpponentId));
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
                    toggleSelectionOpponent = {() => toggleSelectionOpponent(wizzard.id)}
                    key={wizzard.name}
                    name={wizzard.name}
                  />),
              )}
              </div>
              <button
              onClick={openPopup}
              disabled={isDisableButton}
              className={styles.manual__button
              }>В бой</button>
            </section>
          </>
  );
}
