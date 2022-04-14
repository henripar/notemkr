import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidepanel from '../components/Sidepanel';
import MyEditor from '../components/Editor';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios';

import Note from '../types/note';

const Hello = (props: any) => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState();
  const [activeNoteId, setActiveNoteId] = useState('');
  useEffect(() => {
    dayjs.extend(customParseFormat);
    axios
      .get('http://localhost:7071/api/GetNotes')
      .then((r) => setNotes(r.data));
  }, [activeNote, activeNoteId]);

  return (
    <div className="mainContainer">
      <Sidepanel
        notes={notes}
        setActiveNote={setActiveNote}
        setActiveNoteId={setActiveNoteId}
        setNotes={setNotes}
        className="sidepanel"
      ></Sidepanel>
      <div className="editorContainer">
        <div className="titleBar"></div>
        <div className="editor">
          <MyEditor activeNote={activeNote} activeNoteId={activeNoteId} />
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
