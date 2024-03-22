import React from 'react';
import styles from './Spell.module.css';

export default function Spell({ spellName, disableButton, clickButton, damage, mana }) {
  return (
    <><button
      onClick={clickButton}
      disabled={disableButton}
      className={styles.spell}
    >
      {spellName}
      Урон:
      {damage}
      Мана: {mana}
    </button>
    </>
  );
}
