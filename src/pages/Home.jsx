import React from 'react'
import ProductList from '../components/ProductList'

function Home({ showNotification }) {
  return (
    <div className="home-container">
      <ProductList showNotification={showNotification} />
    </div>
  )
}

export default Home
