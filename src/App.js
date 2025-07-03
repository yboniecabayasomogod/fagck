import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MissionVisionPage from './pages/MissionVisionPage';
import SchedulePage from './pages/SchedulePage';
import MembersPage from './pages/MembersPage';
import AddMemberPage from './pages/AddMemberPage';
import EditMemberPage from './pages/EditMemberPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MissionVisionPage" element={<MissionVisionPage />} />
        <Route path="/SchedulePage" element={<SchedulePage />} />
        <Route path="/MembersPage" element={<MembersPage />} />
        <Route path="/AddMemberPage" element={<AddMemberPage />} />
        <Route path="/EditMemberPage" element={<EditMemberPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
