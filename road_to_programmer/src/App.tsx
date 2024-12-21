// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import ProgrammerRoadmap from './pages/programmerRoadMap';
import CareerIntroPage from './pages/careerIntroduce';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProgrammerRoadmap />} />
      <Route path="/career/:slug" element={<CareerIntroPage />} />
    </Routes>
  );
}

export default App;
