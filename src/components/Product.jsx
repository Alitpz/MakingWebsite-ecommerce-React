import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Product.css'

function Product({ product }) {
  const navigate = useNavigate()

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />
      <h3 className="product-title">
        {product.title}
      </h3>
      <p className="product-description">
        {product.description}
      </p>
      <div className="product-footer">
        <span className="product-price">
          ${product.price}
        </span>
        <div className="product-buttons">
          <button className="view-product-btn" onClick={handleViewProduct}>
            İncele
          </button>
          <button className="add-to-cart-btn">
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
