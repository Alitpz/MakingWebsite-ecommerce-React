import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProducts } from '../redux/slices/productSlice'
import { addToCart } from '../redux/slices/cartSlice'
import Loading from '../components/Loading'
import '../css/ProductDetail.css'

function ProductDetail({ showNotification }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { products, loading } = useSelector((store) => store.product)
    const [product, setProduct] = useState(null)

    useEffect(() => {
        // Eğer ürünler yüklenmemişse, yükle
        if (products.length === 0) {
            dispatch(getAllProducts())
        }
    }, [dispatch, products.length])

    useEffect(() => {
        // ID'ye göre ürünü bul
        if (products.length > 0) {
            const foundProduct = products.find(p => p.id === parseInt(id))
            if (foundProduct) {
                setProduct(foundProduct)
            }
        }
    }, [products, id])

    const handleBackToHome = () => {
        navigate('/')
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product))
        showNotification(`${product.title} sepete eklendi!`, 'success')
    }

    if (loading) {
        return (
            <Loading
                message="Ürün detayları yükleniyor..."
                size="medium"
                fullScreen={false}
            />
        )
    }

    if (!product) {
        return (
            <div className="product-detail-error">
                <h2>Ürün bulunamadı</h2>
                <button onClick={handleBackToHome} className="back-btn">
                    Ana Sayfaya Dön
                </button>
            </div>
        )
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-content">
                <button onClick={handleBackToHome} className="back-btn">
                    ← Ana Sayfaya Dön
                </button>

                <div className="product-detail-card">
                    <div className="product-detail-image-section">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="product-detail-image"
                        />
                    </div>

                    <div className="product-detail-info">
                        <h1 className="product-detail-title">{product.title}</h1>
                        <p className="product-detail-category">
                            Kategori: {product.category}
                        </p>
                        <div className="product-detail-rating">
                            <span className="rating-text">Değerlendirme: {product.rating?.rate || 'N/A'}/5</span>
                            <span className="rating-count">({product.rating?.count || 0} değerlendirme)</span>
                        </div>
                        <p className="product-detail-description">
                            {product.description}
                        </p>
                        <div className="product-detail-price-section">
                            <span className="product-detail-price">
                                ${product.price}
                            </span>
                            <button className="add-to-cart-btn-large" onClick={handleAddToCart}>
                                Sepete Ekle
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
