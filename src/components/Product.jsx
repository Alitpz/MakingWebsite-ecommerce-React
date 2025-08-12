import React from 'react'
import '../css/Product.css'

function Product({ product }) {
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
        <button className="add-to-cart-btn">
          Sepete Ekle
        </button>
      </div>
    </div>
  )
}

export default Product
