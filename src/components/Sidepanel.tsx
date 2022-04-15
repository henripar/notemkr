import React, { useEffect, useState } from 'react';
import styles from './Sidepanel.module.css';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Note from '../types/note';

function Sidepanel(props: any) {
  const [t, test] = useState<string>();
  const [selectedNote, setSeletedNote] = useState('');
  const addActiveBg = (id: string) => {
    let note = document.getElementById(id);
    if (note) {
      note.classList.add('highlightSelected');
    }
    let prew = document.getElementById(selectedNote);
    prew?.classList.remove('highlightSelected');
    setSeletedNote(id);
  };

  return (
    <div className={styles.mainContainer}>
      <div className="titleBar"></div>
      <input
        type="text"
        placeholder="Search.."
        className={styles.searchInput}
      />
      <div className={styles.buttonContainer}>
        <NoteAddIcon className={styles.icon}></NoteAddIcon>
        <DeleteIcon className={styles.icon}></DeleteIcon>
      </div>
      <div className={styles.noteCardsContainer}>
        {props.notes
          ? props.notes
              .sort(
                (n: any, i: any) =>
                  new Date(i.date).getTime() - new Date(n.date).getTime()
              )
              .map((note: Note) => (
                <div
                  className={styles.noteCard}
                  id={note.Id}
                  onClick={() => {
                    console.log(note);
                    addActiveBg(note.Id);
                    console.log(JSON.parse(note.note));
                    props.setActiveNote(JSON.parse(note.note));
                    props.setActiveNoteId(note.Id);
                  }}
                >
                  <div className={styles.noteHeaderContainer}>
                    <h4 className={styles.clampLines}>
                      {JSON.parse(note?.note)[0]?.children[0]?.text}
                    </h4>
                  </div>
                  <span>{dayjs(note?.date).format('D.M.YYYY')}</span>
                </div>
              ))
          : null}
      </div>
    </div>
  );
}

export default Sidepanel;
