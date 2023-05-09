import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Heatmap from './pages/Heatmap';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/heamtmap" element={<Heatmap />} />
      </Routes>
    </div>
  );
}

export default App;
