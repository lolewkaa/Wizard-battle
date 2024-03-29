import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ 
  name,
  lastName,
  toggleSelectionOpponent,
  colorPlace,
  healthPoints,
  manaPoints,
}) {
  const location = useLocation();
  const button = location.pathname === '/manual-selection';
  const locationSelect = location.pathname === '/manual-selection' || location.pathname === '/auto-selection';
  const locationBattle = location.pathname === '/battle';
  // const healthPoints = 100;
  // const manaPoints = 100;
 
  return (
          <>
            {locationSelect && <div className={styles.card}>
               <h2 className={styles.card__name}>{name}</h2>
               <h2 className={styles.card__name}>{lastName}</h2>
               <h2 className={styles.card__health}></h2>
               <h2 className={styles.card__mana}></h2>
               {button && <button
               onClick={toggleSelectionOpponent}
               style={{ backgroundColor: colorPlace ? 'green' : 'red' }}
               >Выбрать</button>}
            </div>}
            {locationBattle && <div className={styles.card}>
              <div className={styles.card__container}>
                <h2 className={styles.card__name}>{name}</h2>
                <h2 className={styles.card__name}>{lastName}</h2>
                <h2 className={styles.card__health}>Здоровье: {healthPoints}</h2>
               <h2 className={styles.card__mana}>Мана: {manaPoints}</h2>
              </div>
              </div>
            }

          </>
  );
}
