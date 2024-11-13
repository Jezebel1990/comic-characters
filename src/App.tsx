import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer } from "./components/Footer/Footer";
import { Home } from "./pages/home/Home";
import { HeroPage } from './pages/hero-page/Hero-page';

function App() {
  return (
    <Router>
      <Routes>
     <Route path="/" element={<Home />} />
      <Route path="/hero/:id" element={<HeroPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

