import React from 'react';
import styles from './AutoSelect.module.css';
import Card from '../Card/Card';

export default function AutoSelect({ setIsBlockButtonFind, isBlockButtonFind }) {
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
  function getRandomCard(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function findFighter() {
    setIsBlockButtonFind(true);
    console.log(getRandomCard(wizzards));
  }
  return (
          <>
            <div className={styles.auto}>
              <Card />
              <div className={styles.auto__container}>
                <button
                className={styles.auto__button}
                onClick={findFighter}
                disabled={isBlockButtonFind && true}
                >
                  Найти
                </button>
                <button
                className={styles.auto__button}
                disabled={isBlockButtonFind && true}
                >К бою!</button>
              </div>
              <Card />
            </div>
          </>
  );
}
