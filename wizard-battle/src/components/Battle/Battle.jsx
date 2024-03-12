import React, { useState } from 'react';
import styles from './Battle.module.css';
import Card from '../Card/Card.jsx';

export default function Battle() {
  const [firstOpponent, setFirstOpponent] = useState(JSON.parse(localStorage.getItem('firstOpponent')));
  const [secondOpponent, setSecondOpponent] = useState(JSON.parse(localStorage.getItem('secondOpponent')));
  return (
        <>
        <section className={styles.battle}>
          <Card name={firstOpponent.name}/>
          <Card name={secondOpponent.name}/>
        </section>
        </>
  );
}