import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidepanel from '../components/Sidepanel';
import MyEditor from '../components/Editor';

const Hello = () => {
  return (
    <div className="mainContainer">
      <Sidepanel className="sidepanel"></Sidepanel>
      <div className="editorContainer">
        <div className="titleBar"></div>
        <div className="editor">
          <MyEditor />
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
