import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import StartPage from './pages/StartPage';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import './App.css';
import JobPost from './pages/JobPost';

// Create a component that conditionally renders the Navbar
function NavbarConditional() {
  const location = useLocation();
  
  // Don't show Navbar on the Auth page
  if (location.pathname === '/auth') {
    return null;
  }
  
  return <Navbar />;
}

function App() {
  return (
    <Router>
      <NavbarConditional />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/job-post" element={<JobPost />} />
      </Routes>
    </Router>
  );
}

export default App;