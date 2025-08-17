import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Loading from './components/Loading'
import './css/Layout.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    // Sayfa ilk yüklenirken kısa bir loading göster
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 800) // 800ms loading

    return () => clearTimeout(timer)
  }, [])

  if (isInitialLoading) {
    return (
      <Loading
        message="E-Ticaret Sitesi Yükleniyor..."
        size="large"
        fullScreen={true}
      />
    )
  }

  return (
    <div className="app-container">
      <div className="page-container">
        <div className="page-content">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
