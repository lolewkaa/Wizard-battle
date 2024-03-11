import React from 'react';
import styles from './Card.module.css';

export default function Card({ name }) {
  return (
          <>
            <div className={styles.card}>
               <h2 className={styles.card__name}>{name}</h2>
               <h2 className={styles.card__health}></h2>
               <h2 className={styles.card__mana}></h2>
            </div>
          </>
  );
}
