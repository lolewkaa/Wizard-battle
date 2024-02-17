import React from 'react';
import styles from './SelectionOpponents.module.css';
import AutoSelect from '../AutoSelect/AutoSelect';
import IndependentSelect from '../IndependentSelect/IndependentSelect';

export default function SelectionOpponents({
  setIsBlockButtonFind,
  isAutoSelect,
  isBlockButtonFind,
}) {
  return (
      <>
      <section className={styles.opponents}>
        {isAutoSelect ? (
        <AutoSelect setIsBlockButtonFind={setIsBlockButtonFind}
         isBlockButtonFind={isBlockButtonFind} />
        ) : (
          <IndependentSelect />
        )
        }
     </section>
      </>
  );
}
