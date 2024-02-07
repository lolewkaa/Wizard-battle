import React from 'react';
import styles from './SelectionOpponents.module.css';
import AutoSelect from '../AutoSelect/AutoSelect';
import IndependentSelect from '../IndependentSelect/IndependentSelect';

export default function SelectionOpponents({ isAutoSelect, isBlockButtonFind, findFighter }) {
  return (
      <>
      <section className={styles.opponents}>
        {isAutoSelect ? (
        <AutoSelect findFighter={findFighter} isBlockButtonFind={isBlockButtonFind} />
        ) : (
          <IndependentSelect />
        )
        }
     </section>
      </>
  );
}