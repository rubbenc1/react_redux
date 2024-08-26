import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PicturesList from './components/PicturesList';
import PictureDetail from './components/PictureDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PicturesList />} />
        <Route path="/picture/:id" element={<PictureDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
