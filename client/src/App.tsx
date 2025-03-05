// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import ProgrammerRoadmap from './pages/programmerRoadMap';
import CareerIntroPage from './pages/careerIntroduce';
import CityJobs from './pages/cityJobs';

function App() {
  return (
    <Routes>
      {/* Home page with career paths */}
      <Route path="/" element={<ProgrammerRoadmap />} />

      {/* Career routes */}
      <Route path="/career">
        {/* Career intro page */}
        <Route path=":slug" element={<CareerIntroPage />} />

        {/* Career job listings - nested under the same career context */}
        <Route path=":slug/jobs/:country/:city" element={<CityJobs />} />
      </Route>

      {/* Catch-all route for 404 */}
      <Route
        path="*"
        element={
          <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
