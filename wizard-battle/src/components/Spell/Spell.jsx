import React from 'react';
import styles from './Spell.module.css';

export default function Spell({
  damageDiapason,
  manaDiapason,
  spellName,
  disableButton,
  clickButton,
}) {
  return (
    <><button
      onClick={clickButton}
      disabled={disableButton}
      className={styles.spell}
    >
      {spellName}
      Урон:
      {damageDiapason}
      Мана: {manaDiapason}
    </button>
    </>
  );
}
