import React, { useEffect, useState } from 'react';
import styles from './Sidepanel.module.css';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Note from '../types/note';

function Sidepanel(props: any) {
  const [search, setSearch] = useState<string>('');
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

  const openDeleteNoteModal = () => {
    props.setShowDeleteModal(true);
  };

  const createNewNote = () => {
    props.setActiveNote([
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ]);
    props.setActiveNoteId('');
  };

  const deleteNote = () => {
    axios
      .post(
        'http://localhost:7071/api/DeleteNote',
        {
          noteid: props.activeNoteId,
        },
        {
          headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((res) => {
        props.setActiveNote([
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ]);
        props.setActiveNoteId('');
      });
  };

  return (
    <div className={styles.mainContainer}>
      <div className="titleBar"></div>
      <input
        type="text"
        placeholder="Search.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.buttonContainer}>
        <NoteAddIcon
          onClick={() => createNewNote()}
          className={styles.icon}
        ></NoteAddIcon>
        <DeleteIcon
          onClick={() => deleteNote()}
          className={styles.icon}
        ></DeleteIcon>
      </div>
      <div className={styles.noteCardsContainer}>
        {props.notes
          ? props.notes
              .sort(
                (n: any, i: any) =>
                  new Date(i.date).getTime() - new Date(n.date).getTime()
              )
              .map((note: Note) =>
                note.note.includes(search) ? (
                  <div
                    key={note.Id}
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
                ) : null
              )
          : null}
      </div>
    </div>
  );
}

export default Sidepanel;
