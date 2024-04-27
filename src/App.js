import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/Information.js/Home';
import About from './assets/Information.js/About';
import Contact from './assets/Information.js/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/firstAssemblyOfGod" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
