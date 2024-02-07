import React from 'react';
import styles from './Card.module.css';

export default function Card() {
  return (
          <>
            <div className={styles.card}>
               <h2 className={styles.card__name}>имя</h2>
               <h2 className={styles.card__health}>здоровье</h2>
               <h2 className={styles.card__mana}>мана</h2>
            </div>
          </>
  );
}