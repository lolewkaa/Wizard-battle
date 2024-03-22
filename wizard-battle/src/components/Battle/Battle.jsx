import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Battle.module.css';
import Card from '../Card/Card.jsx';
import Spell from '../Spell/Spell.jsx';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';

const spellsUrl = 'https://wizard-world-api.herokuapp.com/Spells';
const wizzardsUrl = 'https://wizard-world-api.herokuapp.com/Wizards';

export default function Battle({ isOpenPopup, setIsOpenPopup }) {
  const [firstOpponent, setFirstOpponent] = useState({
    id: JSON.parse(localStorage.getItem('firstOpponentId')),
    lastName: '',
  });

  const [secondOpponent, setSecondOpponent] = useState({
    id: JSON.parse(localStorage.getItem('secondOpponentId')),
    lastName: '',
  });
  const [spells, setSpells] = useState([]);
  const [firstOpponentMove, setFirstOpponentMove] = useState(false);
  const [secondOpponentMove, setSecondOpponentMove] = useState(false);
  const [firstOpponentSpellsDisabled, setFirstOpponentSpellsDisabled] = useState(true);
  const [secondOpponentSpellsDisabled, setSecondOpponentSpellsDisabled] = useState(true);
  const [firstOpponentHealthPoints, setFirstOpponentHealthPoints] = useState(50);
  const [secondOpponentHealthPoints, setSecondOpponentHealthPoints] = useState(50);
  const [firstOpponentManaPoints, setFirstOpponentManaPoints] = useState(50);
  const [secondOpponentManaPoints, setSecondOpponentManaPoints] = useState(50);
  // const [winnerName, setWinnerName] = useState('')
  let winnerName = '';

  function changeOpponentMove() {
    const opponent = Math.floor(Math.random() * 2);
    if (opponent === 0) {
      console.log('ходит первый')
      setFirstOpponentMove(true);
      setFirstOpponentSpellsDisabled(false);
    }
    else {
      console.log('ходит второй')
      setSecondOpponentMove(true);
      setSecondOpponentSpellsDisabled(false);
    }
  }

  useEffect(() => {
    axios.get(spellsUrl).then((res) => {
      const filterSpells = res.data.filter((spell) => spell.type === 'Jinx' || spell.type === 'Curse');
      setSpells(filterSpells);
    });
    axios.get(wizzardsUrl).then((res) => {
      const wizzardFirst = res.data.filter((elem) => elem.id === firstOpponent.id);
      setFirstOpponent(wizzardFirst[0]);
      const wizzardSecond = res.data.filter((elem) => elem.id === secondOpponent.id);
      setSecondOpponent(wizzardSecond[0]);
    });
    changeOpponentMove();
  }, []);

  function getFirstOpponentSpell(spell) {
    const health = secondOpponentHealthPoints;
    const spellDamage = spell.damage;
    const mana = firstOpponentManaPoints;
    const usedMana = spell.mana;
    setSecondOpponentHealthPoints(health - spellDamage);
    setFirstOpponentManaPoints(mana - usedMana);
    setSecondOpponentMove(true);
    setSecondOpponentSpellsDisabled(false);
    setFirstOpponentMove(false);
    setFirstOpponentSpellsDisabled(true);
  }

  function getSecondOpponentSpell(spell) {
    const health = firstOpponentHealthPoints;
    const spellDamage = spell.damage;
    const mana = secondOpponentManaPoints;
    const usedMana = spell.mana;
    setFirstOpponentHealthPoints(health - spellDamage);
    setSecondOpponentManaPoints(mana - usedMana);
    setFirstOpponentMove(true);
    setFirstOpponentSpellsDisabled(false);
    setSecondOpponentMove(false);
    setSecondOpponentSpellsDisabled(true);
  }
  function getRandomInt(min, max) {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

  function showWinner() {
    if (firstOpponentHealthPoints < 0) {
      if (secondOpponent.firstName === null) {
        secondOpponent.firstName = '';
      }
      setIsOpenPopup(true);
      winnerName = `${secondOpponent.firstName} ${secondOpponent.lastName}`;
    }
    else if (firstOpponentManaPoints < 0) {
      if (secondOpponent.firstName === null) {
        secondOpponent.firstName = '';
      }
      setIsOpenPopup(true);
      winnerName = `${secondOpponent.firstName} ${secondOpponent.lastName}`;
    }
    else if (secondOpponentHealthPoints < 0) {
      if (firstOpponent.firstName === null) {
        firstOpponent.firstName = '';
      }
      setIsOpenPopup(true);
      winnerName = `${firstOpponent.firstName} ${firstOpponent.lastName}`;
    }
    else if (secondOpponentManaPoints < 0) {
      if (firstOpponent.firstName === null) {
        firstOpponent.firstName = '';
      }
      setIsOpenPopup(true);
      winnerName = `${firstOpponent.firstName} ${firstOpponent.lastName}`;
    }
  }
  showWinner();
  return (
        <>
        <section className={styles.battle}>
          <div className={styles.battle__container}>
          {firstOpponentMove === true && <h1>ваш ход</h1>}
            <Card
              healthPoints={firstOpponentHealthPoints}
              manaPoints={firstOpponentManaPoints}
              name={firstOpponent.firstName}
              lastName={firstOpponent.lastName}
            />
            { spells.map((spell) => {
              if (spell.type === 'Curse') {
                spell.damage = getRandomInt(10, 20);
                spell.mana = getRandomInt(6, 20);
              }
              else {
                spell.damage = getRandomInt(10, 30);
                spell.mana = getRandomInt(6, 30);
              }
              if (spells.indexOf(spell) < 20) {
                return (<Spell
                   spellName={spell.name}
                   key={spell.id}
                   disableButton={firstOpponentSpellsDisabled}
                   clickButton={() => getFirstOpponentSpell(spell)}
                   damage={spell.damage}
                   mana={spell.mana}
                   />);
              }
            })}
          </div>
          <div className={styles.battle__container}>
            {secondOpponentMove === true && <h1>ваш ход</h1>}
            <Card
            name={secondOpponent.firstName}
            lastName={secondOpponent.lastName}
            healthPoints={secondOpponentHealthPoints}
            manaPoints={secondOpponentManaPoints}
            />
            { spells.map((spell) => {
              if (spell.type === 'Curse') {
                spell.damage = getRandomInt(10, 20);
                spell.mana = getRandomInt(6, 20);
              }
              else {
                spell.damage = getRandomInt(10, 30);
                spell.mana = getRandomInt(6, 30);
              }
              if (spells.indexOf(spell) > 20 && spells.indexOf(spell) <= 40) {
                return (<Spell
                   spellName={spell.name}
                   key={spell.id}
                   disableButton={secondOpponentSpellsDisabled}
                   clickButton={() => getSecondOpponentSpell(spell)}
                   damage={spell.damage}
                   mana={spell.mana}
                   />);
              }
            })}
          </div>
        </section>
        {isOpenPopup && <PopupWithMessage setIsOpenPopup={setIsOpenPopup} text={`Поздравляем, ${winnerName}, вы победили! Перенаправляем вас на главную страницу`}></PopupWithMessage>}
        </>
  );
}
