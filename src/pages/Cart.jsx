import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart, removeItemCompletely, updateQuantity, clearCart } from '../redux/slices/cartSlice'
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa'
import '../css/Cart.css'

function Cart({ showNotification }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { items, totalQuantity, totalAmount } = useSelector((store) => store.cart)

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id))
    }

    const handleRemoveItemCompletely = (id) => {
        const item = items.find(item => item.id === id)
        dispatch(removeItemCompletely(id))
        showNotification(`${item.title} sepetten kaldırıldı`, 'info')
    }

    const handleUpdateQuantity = (id, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateQuantity({ id, quantity: newQuantity }))
        }
    }

    const handleClearCart = () => {
        dispatch(clearCart())
        showNotification('Sepet temizlendi', 'info')
    }

    if (totalQuantity === 0) {
        return (
            <div className="cart-empty">
                <h2>Sepetiniz Boş</h2>
                <p>Henüz hiç ürün eklemediniz.</p>
                <button
                    className="continue-shopping-btn"
                    onClick={() => window.history.back()}
                >
                    Alışverişe Devam Et
                </button>
            </div>
        )
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Sepetim ({totalQuantity} ürün)</h1>
                <button
                    className="clear-cart-btn"
                    onClick={handleClearCart}
                >
                    Sepeti Temizle
                </button>
            </div>

            <div className="cart-content">
                <div className="cart-items">
                    {items.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.image} alt={item.title} />
                            </div>

                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{item.title}</h3>
                                <p className="cart-item-category">{item.category}</p>
                                <div className="cart-item-price">
                                    <span className="price">${item.price}</span>
                                    <span className="total-price">Toplam: ${item.totalPrice}</span>
                                </div>
                            </div>

                            <div className="cart-item-actions">
                                <div className="quantity-controls">
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="quantity">{item.quantity}</span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>

                                <button
                                    className="remove-item-btn"
                                    onClick={() => handleRemoveItemCompletely(item.id)}
                                    title="Ürünü tamamen kaldır"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Sepet Özeti</h3>
                    <div className="summary-item">
                        <span>Toplam Ürün:</span>
                        <span>{totalQuantity}</span>
                    </div>
                    <div className="summary-item total">
                        <span>Toplam Tutar:</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <button
                        className="checkout-btn"
                        onClick={() => navigate('/checkout')}
                    >
                        Ödemeye Geç
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart
