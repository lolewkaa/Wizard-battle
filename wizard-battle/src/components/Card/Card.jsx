import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card({ name, toggleSelectionOpponent, colorPlace }) {
  const location = useLocation();
  const button = location.pathname === '/manual-selection';
  return (
          <>
            <div className={styles.card}>
               <h2 className={styles.card__name}>{name}</h2>
               <h2 className={styles.card__health}></h2>
               <h2 className={styles.card__mana}></h2>
               {button && <button
               onClick={toggleSelectionOpponent}
               style={{ backgroundColor: colorPlace ? 'green' : 'red' }}
               >Выбрать</button>}
            </div>
          </>
  );
}
