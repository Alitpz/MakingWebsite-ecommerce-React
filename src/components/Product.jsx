import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cartSlice'
import '../css/Product.css'

function Product({ product, showNotification }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product))
    showNotification(`${product.title} sepete eklendi!`, 'success')
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
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
