import React, { useState } from 'react';
import axios from 'axios';
import styles from './Battle.module.css';
import Card from '../Card/Card.jsx';
import Spell from '../Spell/Spell.jsx';

const baseUrl = 'https://wizard-world-api.herokuapp.com/Spells';

export default function Battle() {
  const [firstOpponent, setFirstOpponent] = useState(JSON.parse(localStorage.getItem('firstOpponentId')));
  const [secondOpponent, setSecondOpponent] = useState(JSON.parse(localStorage.getItem('secondOpponentId')));
  const [spells, setSpells] = useState([]);

  axios.get(baseUrl).then((res) => {
    setSpells(res.data);
  });

  return (
        <>
        <section className={styles.battle}>
          <div className={styles.battle__container}>
            <Card name={firstOpponent.firstName} lastName={firstOpponent.lastName}/>
             { spells.map((spell) => {
               if (spells.indexOf(spell) < 30) {
                 return (<Spell
                   spellName={spell.name}
                   key={spell.id} />);
               }
             })}
          </div>
          <div className={styles.battle__container}>
            <Card name={secondOpponent.firstName} lastName={secondOpponent.lastName}/>
            { spells.map((spell) => {
              if (spells.indexOf(spell) > 30 && spells.indexOf(spell) <= 60) {
                return (<Spell
                   spellName={spell.name}
                   key={spell.id} />);
              }
            })}
          </div>
        </section>
        </>
  );
}
