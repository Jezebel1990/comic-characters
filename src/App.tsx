import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer/Footer'
import { Home } from './pages/home/Home'
import { HeroPage } from './pages/hero-page/Hero-page'

function App() {
  return (
    <div className="app-container">
      <Router>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hero/:id" element={<HeroPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App
