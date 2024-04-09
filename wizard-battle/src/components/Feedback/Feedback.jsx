import React, { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './Feedback.module.css';
import inactiveStar from '../../images/star-point_icon-icons.com_68483.svg';
import activeStart from '../../images/star_77949.svg';

export default function Feedback() {
  
  const [agreeCheckboxChecked, setAgreeCheckboxChecked] = useState(false);
  const [connectionCheckboxChecked, setConnectionCheckboxChecked] = useState(false);

  // звездный рейтинг
  const [currentItem, setCurrentItem] = useState();
  const [, setHoverItem] = useState();
  const stars = Array(5).fill(0);
  const lowRating = currentItem < 3;

  /** Создаем схему валидации */
  const validationsSchema = yup.object().shape({
    name: yup.string().typeError('Строка должна содержать только буквы').required('Это обязательное поле'),
    email: yup.string().email('Введите корректный E-mail').required('Это обязательное поле'),
    comment: yup.string(),
  });
  return (
    <section className={styles.feedBack}>
        <Formik
        initialValues={{
          name: '',
          email: '',
          comment: '',
        }}
        validateOnBlur
        onSubmit={(values) => {
          values.email = '';
          values.name = '';
          values.comment = '';
          localStorage.removeItem("secondOpponentId");
          localStorage.removeItem("firstOpponentId");
          localStorage.removeItem("isBattleStarted");
        }}
        validationSchema={validationsSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            dirty,
          }) => (
            <div className={styles.feedBack__container}>
              <label htmlFor={'name'}>Имя</label>
              <input
                type={'text'}
                name={'name'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {touched.name && errors.name && <p className={styles.feedBack__err}>{errors.name}</p>}
              <label htmlFor={'email'}>E-mail</label>
              <input
                className={'input'}
                type={'email'}
                name={'email'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {
                touched.email
                && errors.email
                && <p className={styles.feedBack__err}>{errors.email}</p>
              }
              {
                <div className={styles.feedBack__stars}>
                {
                  stars.map((item, index) => (
                      <img onClick={() => setCurrentItem(index)}
                        key={index}
                        src={ index <= currentItem ? activeStart : inactiveStar}
                        className={styles.feedBack__star}
                        onMouseMove={() => setHoverItem(index)}
                        onMouseOut={() => setHoverItem()}
                       />
                  ))
                }
                <label htmlFor={'comment'}>Комментарий</label>
              <input
                className={'input'}
                type={'comment'}
                name={'comment'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.comment}
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
              }
              <button
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
              type={'submit'}
              >
                Отправить
              </button>
            </div>
          )}
        </Formik>
    </section>
  );
}
