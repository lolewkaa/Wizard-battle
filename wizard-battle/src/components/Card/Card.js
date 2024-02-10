import React from 'react';
import styles from './Card.module.css';

export default function Card() {
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
  return (
          <>
            <div className={styles.card}>
               <h2 className={styles.card__name}>{wizzards.name}</h2>
               <h2 className={styles.card__health}>{wizzards.healthPoints}</h2>
               <h2 className={styles.card__mana}>{wizzards.manaPoints}</h2>
            </div>
          </>
  );
}
