import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidepanel from '../components/Sidepanel';
import MyEditor from '../components/Editor';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Note from '../types/note';

const Hello = (props: any) => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  const [activeNoteId, setActiveNoteId] = useState(uuidv4());
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isNewNote, setIsNewNote] = useState(true);

  useEffect(() => {
    dayjs.extend(customParseFormat);
    axios.get('http://localhost:7071/api/GetNotes').then((r) => {
      console.log(r.data);
      setNotes(r.data);
    });
    console.log(notes);
  }, [activeNote, activeNoteId]);

  useEffect(() => {
    dayjs.extend(customParseFormat);
    axios.get('http://localhost:7071/api/GetNotes').then((r) => {
      console.log(r.data);
      setNotes(r.data);
    });
    console.log(notes);
  }, []);

  return (
    <div className="mainContainer">
      <Sidepanel
        notes={notes}
        setActiveNote={setActiveNote}
        setActiveNoteId={setActiveNoteId}
        activeNoteId={activeNoteId}
        setNotes={setNotes}
        setShowDeleteModal={setShowDeleteModal}
        setIsNewNote={setIsNewNote}
        className="sidepanel"
      ></Sidepanel>
      <div className="editorContainer">
        <div className="titleBar"></div>
        <div className="editor">
          <MyEditor
            notes={notes}
            activeNote={activeNote}
            activeNoteId={activeNoteId}
            setActiveNoteId={setActiveNoteId}
            setActiveNote={setActiveNote}
            setIsNewNote={setIsNewNote}
            isNewNote={isNewNote}
            setNotes={setNotes}
          />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
