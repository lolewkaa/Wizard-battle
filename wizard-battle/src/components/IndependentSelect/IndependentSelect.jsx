import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './IndependentSelect.module.css';
import Card from '../Card/Card.jsx';

const baseUrl = 'https://wizard-world-api.herokuapp.com/Wizards';

const wizzards = [
  {
    id: '0',
    name: 'Harry',
    lastName: 'Potter',
    healthPoints: 100,
    manaPoints: 100,
    status: 'active',
  },

  {
    id: '1',
    name: 'Sirius',
    lastName: 'Snake',
    healthPoints: 100,
    manaPoints: 1000,
    status: 'active',
  },

  {
    id: '2',
    name: 'Hermiona',
    lastName: 'Granger',
    healthPoints: 100,
    manaPoints: 1000,
    status: 'active',
  },
];

export default function IndependentSelect({ setIsOpenPopup }) {
  const [isDisableButton, setIsDisableButton] = useState(false);
  const [firstOpponentId, setFirstOpponentId] = useState(JSON.parse(localStorage.getItem('firstOpponentId')) || '');
  const [secondOpponentId, setSecondOpponentId] = useState(JSON.parse(localStorage.getItem('secondOpponentId')) || '');
  const [wizzardsData, setWizzardsData] = useState([]);

  axios.get(baseUrl).then((res) => {
    setWizzardsData(res.data);
  });

  function openPopup() {
    setIsOpenPopup(true);
  }

  const defoltOpponentData = {
    id: '',
    firstName: '',
    lastName: '',
  }
  const toggleSelectionOpponent = (id, opponent, firstName, lastName) => {
    if (opponent === 'firstOpponentId') {
      if (firstOpponentId.id === id) {
        setFirstOpponentId(defoltOpponentData);
      } else {
        setFirstOpponentId({ id, firstName, lastName });
      }
    }
    if (opponent === 'secondOpponentId') {
      if (secondOpponentId.id === id) {
        setSecondOpponentId(defoltOpponentData);
      } else {
        setSecondOpponentId({ id, firstName, lastName });
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('firstOpponentId', JSON.stringify(firstOpponentId));
  }, [firstOpponentId]);

  useEffect(() => {
    localStorage.setItem('secondOpponentId', JSON.stringify(secondOpponentId));
  }, [secondOpponentId]);

  useEffect(() => {
    setIsDisableButton(firstOpponentId === '' || secondOpponentId === '');
  }, [firstOpponentId, secondOpponentId]);
  return (
          <>
            <section className={styles.manual}>
              <div className={styles.manual__container}>
              {wizzardsData.map((wizzard) => (
                  <Card
                    colorPlace={wizzard.id === firstOpponentId.id}
                    toggleSelectionOpponent = {() => toggleSelectionOpponent(wizzard.id, 'firstOpponentId', wizzard.firstName, wizzard.lastName)}
                    key={wizzard.id}
                    name={wizzard.firstName}
                    lastName={wizzard.lastName}
                  />))}
              </div>
              <button
              onClick={openPopup}
              disabled={isDisableButton}
              className={styles.manual__button
              }>В бой</button>
              <div className={styles.manual__container}>
              {wizzardsData.map((wizzard) => (
                  <Card
                    colorPlace={wizzard.id === secondOpponentId.id}
                    toggleSelectionOpponent = {() => toggleSelectionOpponent(wizzard.id, 'secondOpponentId', wizzard.firstName, wizzard.lastName)}
                    key={wizzard.id}
                    name={wizzard.firstName}
                    lastName={wizzard.lastName}
                  />))}
              </div>
            </section>
          </>
  );
}
