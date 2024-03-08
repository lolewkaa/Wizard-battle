import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import Button from '../Button/Button.jsx';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const button = location.pathname !== '/feedback';

  function openForm() {
    navigate('/feedback');
  }
  return (
          <>
            <section className={styles.header}>
              <h1>header</h1>
              {button && <Button text='Обратная связь' clickButton={openForm}/>}
            </section>
          </>
  );
}