import React from 'react';
import styles from './Sidepanel.module.css';

function Sidepanel(props: any) {
  return (
    <div className={styles.mainContainer}>
      <div className="titleBar"></div>
      <input
        type="text"
        placeholder="Search.."
        className={styles.searchInput}
      />
      <div className={styles.noteCard}>
        <h4>Note</h4>
        <span>22.2.2022</span>
      </div>
      <div className={styles.noteCard}>
        <h4>Note one row</h4>
        <span>22.2.2022</span>
      </div>
      <div className={styles.noteCard}>
        <h4>This is wery cool...</h4>
        <span>22.2.2022</span>
      </div>
      <div className={styles.noteCard}>
        <h4>Noice!</h4>
        <span>22.2.2022</span>
      </div>
      <div className={styles.noteCard}>
        <h4>Note</h4>
        <span>22.2.2022</span>
      </div>
      <div className={styles.noteCard}>
        <h4>Note</h4>
        <span>22.2.2022</span>
      </div>
      <div className={styles.noteCard}>
        <h4>Note</h4>
        <span>22.2.2022</span>
      </div>
      <div className={styles.noteCard}>
        <h4>Note</h4>
        <span>22.2.2022</span>
      </div>
      <div className={styles.noteCard}>
        <h4>Note</h4>
        <span>22.2.2022</span>
      </div>
      <div className={styles.noteCard}>
        <h4>Note</h4>
        <span>22.2.2022</span>
      </div>
      <div className={styles.noteCard}>
        <h4>Note</h4>
        <span>22.2.2022</span>
      </div>
      <div className={styles.noteCard}>
        <h4>Note</h4>
        <span>22.2.2022</span>
      </div>
    </div>
  );
}

export default Sidepanel;
