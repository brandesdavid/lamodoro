import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './css/App.css';
import './css/water-dark.css';
import PomodoroTimer from '../components/PomodoroTimer';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PomodoroTimer />} />
      </Routes>
    </Router>
  );
}
