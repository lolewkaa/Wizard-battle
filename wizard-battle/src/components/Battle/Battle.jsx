import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import styles from './Battle.module.css';
import Card from '../Card/Card.jsx';
import Spell from '../Spell/Spell.jsx';
import PopupWithMessage from '../PopupWithMessage/PopupWithMessage.jsx';
import getRandomInt from '../utils/utils';

const spellsUrl = 'https://wizard-world-api.herokuapp.com/Spells';
const wizzardsUrl = 'https://wizard-world-api.herokuapp.com/Wizards';

export default function Battle({
  setIsBattleStarted,
  isOpenPopup,
  setIsOpenPopup,
}) {
  const [firstOpponent, setFirstOpponent] = useState({
    id: JSON.parse(localStorage.getItem('firstOpponentId')),
    firstName: '',
    lastName: '',
    healthPoints: 200,
    manaPoints: 200,
  });

  const [secondOpponent, setSecondOpponent] = useState({
    id: JSON.parse(localStorage.getItem('secondOpponentId')),
    firstName: '',
    lastName: '',
    healthPoints: 200,
    manaPoints: 200,
  });
  const [propsFirstAnimationHealth, setFirstAnimationHealth] = useSpring(
    () => ({ width: 200 }),
  );
  const [propsSecondAnimationHealth, setSecondAnimationHealth] = useSpring(
    () => ({ width: 200 }),
  );
  const [propsFirstAnimationMana, setFirstAnimationMana] = useSpring(() => ({
    width: 200,
  }));
  const [propsSecondAnimationMana, setSecondAnimationMana] = useSpring(() => ({
    width: 200,
  }));
  const [spells, setSpells] = useState([]);
  const [isOpponentMove, setisOpponentMove] = useState('');
  const [firstOpponentSpellsDisabled, setFirstOpponentSpellsDisabled] = useState(true);
  const [secondOpponentSpellsDisabled, setSecondOpponentSpellsDisabled] = useState(true);
  let winnerName = '';

  const location = useLocation();

  function changeOpponentMove() {
    const opponent = Math.floor(Math.random() * 2);
    if (opponent === 0) {
      console.log('ходит первый');
      setisOpponentMove('first');
      setFirstOpponentSpellsDisabled(false);
    } else {
      console.log('ходит второй');
      setisOpponentMove('second');
      setSecondOpponentSpellsDisabled(false);
    }
  }

  useEffect(() => {
    axios.get(spellsUrl).then((res) => {
      const filterSpells = res.data.filter(
        (spell) => spell.type === 'Jinx' || spell.type === 'Curse',
      );
      filterSpells.map((spell) => {
        if (spell.type === 'Curse') {
          spell.damage = getRandomInt(8, 20);
          spell.mana = getRandomInt(6, 18);
        } else {
          spell.damage = getRandomInt(7, 27);
          spell.mana = getRandomInt(5, 25);
        }
        if (spell.type === 'Curse') {
          spell.manaDiapason = '6-18';
          spell.damageDiapason = '8-20';
        } else {
          spell.manaDiapason = '5-25';
          spell.damageDiapason = '7-27';
        }
      });
      setSpells(filterSpells);
    });
    axios.get(wizzardsUrl).then((res) => {
      const wizzardFirst = res.data.find(
        (elem) => elem.id === firstOpponent.id,
      );
      setFirstOpponent({
        id: wizzardFirst.id,
        firstName: wizzardFirst.firstName,
        lastName: wizzardFirst.lastName,
        healthPoints: 200,
        manaPoints: 200,
      });
      const wizzardSecond = res.data.find(
        (elem) => elem.id === secondOpponent.id,
      );
      setSecondOpponent({
        id: wizzardSecond.id,
        firstName: wizzardSecond.firstName,
        lastName: wizzardSecond.lastName,
        healthPoints: 200,
        manaPoints: 200,
      });
    });
    changeOpponentMove();
    if (location.pathname === '/battle') {
      setIsBattleStarted(
        localStorage.setItem('isBattleStarted', JSON.stringify(true)),
      );
    }
  }, []);

  // const [currentHealthWidth, setCurrentHealthWidth] = useState(250)
  function getFirstOpponentSpell(spell) {
    const health = secondOpponent.healthPoints;
    const spellDamage = spell.damage;
    const mana = firstOpponent.manaPoints;
    const usedMana = spell.mana;
    secondOpponent.healthPoints = health - spellDamage;
    firstOpponent.manaPoints = mana - usedMana;
    setSecondAnimationHealth({ width: secondOpponent.healthPoints });
    setFirstAnimationMana({ width: firstOpponent.manaPoints });
    setisOpponentMove('second');
    setSecondOpponentSpellsDisabled(false);
    setFirstOpponentSpellsDisabled(true);
    if (secondOpponent.healthPoints < 0) {
      secondOpponent.healthPoints = 0;
    }
    if (firstOpponent.manaPoints < 0) {
      firstOpponent.manaPoints = 0;
    }
    //   const width = 250;
    //   const maxHealth = 200;
    // let updatedHealth = health - spellDamage;
    // let healthProcent = updatedHealth * 100 / maxHealth
    // let current = width * (healthProcent / 100)
    // setCurrentHealthWidth(current)
  }

  function getSecondOpponentSpell(spell) {
    const health = firstOpponent.healthPoints;
    const spellDamage = spell.damage;
    const mana = secondOpponent.manaPoints;
    const usedMana = spell.mana;
    firstOpponent.healthPoints = health - spellDamage;
    secondOpponent.manaPoints = mana - usedMana;
    setFirstAnimationHealth({ width: firstOpponent.healthPoints });
    setSecondAnimationMana({ width: secondOpponent.manaPoints });
    setisOpponentMove('first');
    setFirstOpponentSpellsDisabled(false);
    setSecondOpponentSpellsDisabled(true);
    if (firstOpponent.healthPoints < 0) {
      firstOpponent.healthPoints = 0;
    }
    if (secondOpponent.manaPoints < 0) {
      secondOpponent.manaPoints = 0;
    }
  }

  function showWinner() {
    if (secondOpponent.manaPoints <= 0) {
      if (firstOpponent.firstName === null) {
        firstOpponent.firstName = '';
      }
      setIsOpenPopup(true);
      winnerName = `${firstOpponent.firstName} ${firstOpponent.lastName}`;
    } else if (firstOpponent.manaPoints <= 0) {
      if (secondOpponent.firstName === null) {
        secondOpponent.firstName = '';
      }
      setIsOpenPopup(true);
      winnerName = `${secondOpponent.firstName} ${secondOpponent.lastName}`;
    } else if (firstOpponent.healthPoints <= 0) {
      if (secondOpponent.firstName === null) {
        secondOpponent.firstName = '';
      }
      setIsOpenPopup(true);
      winnerName = `${secondOpponent.firstName} ${secondOpponent.lastName}`;
    } else if (secondOpponent.healthPoints <= 0) {
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
          {/* <h2 className={styles.battle__text}>Здоровье</h2>
            <div className={styles.battle__healthLine} >{firstOpponent.healthPoints}</div>
            <h2 className={styles.battle__text}>Мана</h2>
            <div className={styles.battle__manaLine}>{firstOpponent.manaPoints}</div> */}
          <animated.div
            className={styles.battle__healthLine}
            style={propsFirstAnimationHealth}
          >
            {firstOpponent.healthPoints}
          </animated.div>
          <h2 className={styles.battle__text}>Мана</h2>
          <animated.div
            className={styles.battle__manaLine}
            style={propsFirstAnimationMana}
          >
            {firstOpponent.manaPoints}
          </animated.div>
          {spells.map((spell) => {
            if (spells.indexOf(spell) < 20) {
              return (
                <Spell
                  spellName={spell.name}
                  key={spell.id}
                  disableButton={firstOpponentSpellsDisabled}
                  clickButton={() => getFirstOpponentSpell(spell)}
                  damage={spell.damage}
                  mana={spell.mana}
                  manaDiapason={spell.manaDiapason}
                  damageDiapason={spell.damageDiapason}
                />
              );
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
          {/* <h2 className={styles.battle__text}>Здоровье</h2>
            <div className={styles.battle__healthLine}
            style={{ width: `${currentHealthWidth}px`}}>{secondOpponent.healthPoints}</div>
            <h2 className={styles.battle__text}>Мана</h2>
            <div className={styles.battle__manaLine}>{secondOpponent.manaPoints}</div> */}
          <animated.div
            className={styles.battle__healthLine}
            style={propsSecondAnimationHealth}
          >
            {secondOpponent.healthPoints}
          </animated.div>
          <h2 className={styles.battle__text}>Мана</h2>
          <animated.div
            className={styles.battle__manaLine}
            style={propsSecondAnimationMana}
          >
            {secondOpponent.manaPoints}
          </animated.div>
          {spells.map((spell) => {
            if (spells.indexOf(spell) > 20 && spells.indexOf(spell) <= 40) {
              return (
                <Spell
                  spellName={spell.name}
                  key={spell.id}
                  disableButton={secondOpponentSpellsDisabled}
                  clickButton={() => getSecondOpponentSpell(spell)}
                  damage={spell.damage}
                  mana={spell.mana}
                  spell={spell}
                  manaDiapason={spell.manaDiapason}
                  damageDiapason={spell.damageDiapason}
                />
              );
            }
          })}
        </div>
      </section>
      {isOpenPopup && (
        <PopupWithMessage
          setIsOpenPopup={setIsOpenPopup}
          text={`Поздравляем, ${winnerName}, вы победили! Перенаправляем вас на главную страницу`}
        ></PopupWithMessage>
      )}
    </>
  );
}
