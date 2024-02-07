import React from 'react';
import styles from './AutoSelect.module.css';
import Card from '../Card/Card';

export default function AutoSelect({ isBlockButtonFind, findFighter }) {
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