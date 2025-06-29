import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MissionVisionPage from './pages/MissionVisionPage';
import SchedulePage from './pages/SchedulePage';
import MembersPage from './pages/MembersPage';
import AddMemberPage from './pages/AddMemberPage';
import EditMemberPage from './pages/EditMemberPage';
import AttendancePage from './pages/AttendancePage';
import GroupsPage from './pages/GroupsPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/FirstAssemblyOfGod" element={<HomePage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/MissionVisionPage" element={<MissionVisionPage />} />
        <Route path="/SchedulePage" element={<SchedulePage />} />
        <Route path="/MembersPage" element={<MembersPage />} />
        <Route path="/AddMemberPage" element={<AddMemberPage />} />
        <Route path="/EditMemberPage" element={<EditMemberPage />} />
        <Route path="/AttendancePage" element={<AttendancePage />} />
        <Route path="/Group" element={<GroupsPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/DashboardPage" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
