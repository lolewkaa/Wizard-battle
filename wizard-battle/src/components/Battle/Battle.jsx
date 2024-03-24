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
    firstName: '',
    lastName: '',
    healthPoints: 50,
    manaPoints: 50,
  });

  const [secondOpponent, setSecondOpponent] = useState({
    id: JSON.parse(localStorage.getItem('secondOpponentId')),
    firstName: '',
    lastName: '',
    healthPoints: 50,
    manaPoints: 50,
  });
  const [spells, setSpells] = useState([]);
  const [isOpponentMove, setisOpponentMove] = useState('');
  const [firstOpponentSpellsDisabled, setFirstOpponentSpellsDisabled] = useState(true);
  const [secondOpponentSpellsDisabled, setSecondOpponentSpellsDisabled] = useState(true);
  let winnerName = '';

  function changeOpponentMove() {
    const opponent = Math.floor(Math.random() * 2);
    if (opponent === 0) {
      console.log('ходит первый')
      setisOpponentMove('first');
      setFirstOpponentSpellsDisabled(false);
    }
    else {
      console.log('ходит второй')
      setisOpponentMove('second');
      setSecondOpponentSpellsDisabled(false);
    }
  }

  function getRandomInt(min, max) {
    const minNumber = Math.ceil(min);
    const maxNumber = Math.floor(max);
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

  useEffect(() => {
    axios.get(spellsUrl).then((res) => {
      const filterSpells = res.data.filter((spell) => spell.type === 'Jinx' || spell.type === 'Curse');
      filterSpells.map((spell) => {
        if (spell.type === 'Curse') {
          spell.damage = getRandomInt(10, 20);
          spell.mana = getRandomInt(6, 20);
        }
        else {
          spell.damage = getRandomInt(10, 30);
          spell.mana = getRandomInt(6, 30);
        }
      })
      setSpells(filterSpells);
    });
    axios.get(wizzardsUrl).then((res) => {
      const wizzardFirst = res.data.find((elem) => elem.id === firstOpponent.id);
      setFirstOpponent({
        id: wizzardFirst.id,
        firstName: wizzardFirst.firstName,
        lastName: wizzardFirst.lastName,
        healthPoints: 50,
        manaPoints: 50,
      });
      const wizzardSecond = res.data.find((elem) => elem.id === secondOpponent.id);
      setSecondOpponent({
        id: wizzardSecond.id,
        firstName: wizzardSecond.firstName,
        lastName: wizzardSecond.lastName,
        healthPoints: 50,
        manaPoints: 50,
      });
    });
    changeOpponentMove();
  }, []);

  function getFirstOpponentSpell(spell) {
    const health = firstOpponent.healthPoints;
    const spellDamage = spell.damage;
    const mana = firstOpponent.manaPoints;
    const usedMana = spell.mana;
    firstOpponent.healthPoints = health - spellDamage;
    firstOpponent.manaPoints = mana - usedMana;
    setisOpponentMove('second');
    setSecondOpponentSpellsDisabled(false);
    setFirstOpponentSpellsDisabled(true);
  }

  function getSecondOpponentSpell(spell) {
    const health = secondOpponent.healthPoints;
    const spellDamage = spell.damage;
    const mana = secondOpponent.manaPoints;
    const usedMana = spell.mana;
    secondOpponent.healthPoints = health - spellDamage;
    secondOpponent.manaPoints = mana - usedMana;
    setisOpponentMove('first');
    setFirstOpponentSpellsDisabled(false);
    setSecondOpponentSpellsDisabled(true);
  }

  function showWinner() {
    if (firstOpponent.healthPoints < 0) {
      if (secondOpponent.firstName === null) {
        secondOpponent.firstName = '';
      }
      setIsOpenPopup(true);
      winnerName = `${secondOpponent.firstName} ${secondOpponent.lastName}`;
    }
    else if (firstOpponent.manaPoints < 0) {
      if (secondOpponent.firstName === null) {
        secondOpponent.firstName = '';
      }
      setIsOpenPopup(true);
      winnerName = `${secondOpponent.firstName} ${secondOpponent.lastName}`;
    }
    else if (secondOpponent.healthPoints < 0) {
      if (firstOpponent.firstName === null) {
        firstOpponent.firstName = '';
      }
      setIsOpenPopup(true);
      winnerName = `${firstOpponent.firstName} ${firstOpponent.lastName}`;
    }
    else if (secondOpponent.manaPoints < 0) {
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
          {isOpponentMove === 'first' && <h1>ваш ход</h1>}
            <Card
              healthPoints={firstOpponent.healthPoints}
              manaPoints={firstOpponent.manaPoints}
              name={firstOpponent.firstName}
              lastName={firstOpponent.lastName}
            />
            { spells.map((spell) => {
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
            {isOpponentMove === 'second' && <h1>ваш ход</h1>}
            <Card
            name={secondOpponent.firstName}
            lastName={secondOpponent.lastName}
            healthPoints={secondOpponent.healthPoints}
            manaPoints={secondOpponent.manaPoints}
            />
            { spells.map((spell) => {
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
