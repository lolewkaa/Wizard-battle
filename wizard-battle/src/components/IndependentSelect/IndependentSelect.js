import React, { useState } from 'react';
import styles from './IndependentSelect.module.css';
import Card from '../Card/Card';

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
];

export default function IndependentSelect({ setIsOpenPopup }) {
  const [isDisableButton, setIsDisableButton] = useState(false);
  // const [selectFirstOpponent, setSelectFirstOpponent] = useState(false);
  // const [selectSecondOpponent, setSelectSecondOpponent] = useState(false);
  const [colorPlace, setColorPlace] = useState(false);
  const [selectOpponent, setSelectOpponent] = useState(false);
  function openPopup() {
    setIsOpenPopup(true);
  }
  const toggleSelectionOpponent = () => {
    setSelectOpponent(!selectOpponent);
    setColorPlace(!colorPlace);
  };
  const wizzardCards = wizzards.map((wizzard) => <Card
  colorPlace={colorPlace}
  toggleSelectionOpponent = {toggleSelectionOpponent}
  key={wizzard.name}
  name={wizzard.name}/>);
  return (
          <>
            <section className={styles.manual}>
              <div className={styles.manual__container}>
                {wizzardCards}
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
