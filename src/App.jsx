import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import './css/Layout.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="app-container">
      <div className="page-container">
        <div className="page-content">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
