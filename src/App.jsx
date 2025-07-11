import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Printing from './pages/Printing';
import Souvenirs from './pages/Souvenirs';
import Blanks from './pages/Blanks';
import Badges from './pages/Badges';
import logo from './assets/kolibri-logo.png';
import mailIcon from './assets/icons/mail.svg';
import phoneIcon from './assets/icons/phone.svg';
import TopInfoBar from './pages/TopInfoBar';
import ProductPage from './pages/ProductPage';
import StubPage from './pages/StubPage';
import Polygraphy from './pages/Polygraphy';
import Advert from './pages/Advert';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <TopInfoBar />
        <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/polygraphy" element={<Polygraphy />} />
        <Route path="/souvenirs" element={<Souvenirs />} />
        <Route path="/advert" element={<Advert />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
