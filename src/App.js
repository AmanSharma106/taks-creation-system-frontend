import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskFormComponent from './Components/TaskFormComponent'

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="" element={<TaskFormComponent />} />          
        </Routes>

      </Router>
    </div >
  );
};

export default App;

