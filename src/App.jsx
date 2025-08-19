import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Loading from './components/Loading'
import Notification from './components/Notification'
import './css/Layout.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  })

  useEffect(() => {
    // Sayfa ilk yüklenirken kısa bir loading göster
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 800) // 800ms loading

    return () => clearTimeout(timer)
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({
      isVisible: true,
      message,
      type
    })
  }

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }))
  }

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
            <Route path="/" element={<Home showNotification={showNotification} />} />
            <Route path="/product/:id" element={<ProductDetail showNotification={showNotification} />} />
            <Route path="/cart" element={<Cart showNotification={showNotification} />} />
            <Route path="/checkout" element={<Checkout showNotification={showNotification} />} />
          </Routes>
        </div>
      </div>

      <Notification
        isVisible={notification.isVisible}
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
        duration={3000}
      />
    </div>
  )
}

export default App
