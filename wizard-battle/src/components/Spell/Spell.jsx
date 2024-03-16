import React from 'react';
import styles from './Spell.module.css';

export default function Spell({ spellName }) {
  return (
    <div className={styles.spell}>
      <h2 className={styles.spell__name}>{spellName}</h2>
    </div>
  );
}
