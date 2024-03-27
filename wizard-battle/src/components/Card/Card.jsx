import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({
  name,
  lastName,
  toggleSelectionOpponent,
  colorPlace,
}) {
  const location = useLocation();
  const button = location.pathname === '/manual-selection';

  return (
          <>
            <div className={styles.card}>
              <div className={styles.card__container}>
                <h2 className={styles.card__name}>{name}</h2>
                <h2 className={styles.card__name}>{lastName}</h2>
              </div>
              {button && <button
               onClick={toggleSelectionOpponent}
               style={{ backgroundColor: colorPlace ? 'green' : 'red' }}
               >Выбрать</button>}
              </div>

          </>
  );
}
