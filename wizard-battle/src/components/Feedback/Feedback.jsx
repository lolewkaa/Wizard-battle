import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './Feedback.module.css';
import inactiveStar from '../../images/star-point_icon-icons.com_68483.svg';
import activeStart from '../../images/star_77949.svg';

export default function Feedback() {
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('email')) || '');
  const [name, setName] = useState(JSON.parse(localStorage.getItem('name')) || '');
  const [emailDirty, setEmailDirty] = useState(JSON.parse(localStorage.getItem('emailDirty')) || false);
  const [nameDirty, setNameDirty] = useState(JSON.parse(localStorage.getItem('nameDirty')) || false);
  const [emailError, setEmailError] = useState(JSON.parse(localStorage.getItem('emailError')) || 'Это обязательное поле');
  const [nameError, setNameError] = useState(JSON.parse(localStorage.getItem('nameError')) || 'Это обязательное поле');
  const [formValid, setFormValid] = useState(JSON.parse(localStorage.getItem('formValid')) || false);
  const [agreeCheckboxChecked, setAgreeCheckboxChecked] = useState(false);
  const [connectionCheckboxChecked, setConnectionCheckboxChecked] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState(JSON.parse(localStorage.getItem('commentInputValue')) || '');

  useEffect(() => {
    if (emailError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, nameError]);

  useEffect(() => {
    localStorage.setItem('nameDirty', JSON.stringify(nameDirty));
  }, [nameDirty]);

  useEffect(() => {
    localStorage.setItem('emailDirty', JSON.stringify(emailDirty));
  }, [emailDirty]);

  useEffect(() => {
    localStorage.setItem('name', JSON.stringify(name));
  }, [name]);

  useEffect(() => {
    localStorage.setItem('email', JSON.stringify(email));
  }, [email]);

  useEffect(() => {
    localStorage.setItem('formValid', JSON.stringify(formValid));
  }, [formValid]);

  useEffect(() => {
    localStorage.setItem('emailError', JSON.stringify(emailError));
  }, [emailError]);

  useEffect(() => {
    localStorage.setItem('nameError', JSON.stringify(nameError));
  }, [nameError]);

  useEffect(() => {
    localStorage.setItem('commentInputValue', JSON.stringify(commentInputValue));
  }, [commentInputValue]);

  function resetForm() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('commentInputValue');
    localStorage.removeItem('nameDirty');
    localStorage.removeItem('emailDirty');
    localStorage.removeItem('nameError');
    localStorage.removeItem('emailError');
    setEmailError('Это обязательное поле');
    setNameError('Это обязательное поле');
    setEmailDirty(false);
    setNameDirty(false);
    setEmail('');
    setName('');
    setCommentInputValue('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    resetForm();
  }

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(String(e.target.value).toLowerCase())) {
      setEmailError('Введите корректный E-mail');
    } else {
      setEmailError('');
    }
  };

  const commentHandler = (e) => {
    setCommentInputValue(e.target.value);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    const regex = /^[a-zA-Zа-яА-Я\sё-]+$/;
    if (!regex.test(String(e.target.value).toLowerCase())) {
      setNameError('Введите корректное имя');
      if (!e.target.value) {
        setNameError('Это обязательное поле');
      }
    } else {
      setNameError('');
    }
  };

  const blurHandler = (e) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
    }
  };

  // звездный рейтинг
  const [currentItem, setCurrentItem] = useState();
  const [hoverItem, setHoverItem] = useState();
  const stars = Array(5).fill(0);
  const lowRating = currentItem < 3;
  return (
    <section className={styles.feedBack}>
      <form className={styles.feedBack__container} onSubmit={handleSubmit} noValidate>
        <h2>Имя</h2>
        {(nameDirty && nameError) && <span className={styles.feedBack__err}>{nameError}</span>}
        <input
        id="name-input"
        type="text"
        minLength="2"
        maxLength="40"
        name="name"
        required
        className={styles.feedBack__input}
        placeholder='Введите имя'
        onBlur={(e) => blurHandler(e)}
        onChange={(e) => nameHandler(e)}
        value={name}
        />
        <h2>E-mail</h2>
        {(emailDirty && emailError) && <span className={styles.feedBack__err}>
          {emailError}
        </span>}
        <input
        id="email-input"
        type="email"
        minLength="2"
        maxLength="200"
        name="email"
        required
        className={styles.feedBack__input}
        placeholder='Введите почту'
        onBlur={(e) => blurHandler(e)}
        onChange={(e) => emailHandler(e)}
        value={email}
        />
        <div className={styles.feedBack__stars}>
          {
            stars.map((item, index) => (
                <img onClick={() => setCurrentItem(index)}
                  key={index}
                  src={ index <= currentItem ? activeStart : inactiveStar} 
                  className={styles.feedBack__star}
                  onMouseMove={()=> setHoverItem(index)}
                  onMouseOut={()=> setHoverItem()}
                 />
            ))
          }
          <h2 className={styles.feedBack__text}>
              Комментарий
            </h2>
          <input
        id="comment-input"
        type="text"
        minLength="2"
        maxLength="1000"
        name="comment"
        value={commentInputValue}
        onChange={commentHandler}
        placeholder='Оставьте свой комментарий'
        />
          <div className={styles.feedBack__checkBoxContainer}>
            <input type="checkbox" checked={agreeCheckboxChecked} onChange={() => setAgreeCheckboxChecked(!agreeCheckboxChecked)}/>
            <h2 className={styles.feedBack__text}>
              Подтверждаю согласие на обработку персональных данных
            </h2>
          </div>
          {lowRating && <>
          <h2 className={styles.feedBack__text}>Нам жаль, что игра вам не понравилась.
            Мы хотели бы стать лучше. Если у вас возникла проблема при игре или у вас есть идеи,
            как сделать ее лучше, опишите все в комментариях.
            Если вы хотите, чтобы мы связали с вами, отметьте это в поле “Свяжитесь со мной”</h2>
            <div className={styles.feedBack__checkBoxContainer}>
              <input type="checkbox" checked={connectionCheckboxChecked} onChange={() => setConnectionCheckboxChecked(!connectionCheckboxChecked)} />
              <h2 className={styles.feedBack__text}>
                Свяжитесь со мной
              </h2>
            </div></>
             }
        </div>
        <button disabled={!formValid} type='submit'>Отправить</button>
      </form>
    </section>
  );
}
