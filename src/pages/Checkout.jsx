import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../redux/slices/cartSlice'
import { FaCreditCard, FaLock, FaCheckCircle, FaArrowLeft, FaUser, FaCreditCard as FaCard, FaClipboardCheck } from 'react-icons/fa'
import '../css/Checkout.css'

function Checkout({ showNotification }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { items, totalAmount } = useSelector((store) => store.cart)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    })

    const [currentStep, setCurrentStep] = useState(1)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isCompleted, setIsCompleted] = useState(() => {
        // localStorage'dan ödeme durumunu kontrol et
        const saved = localStorage.getItem('checkout_completed')
        return saved === 'true'
    })

    // Sayfa yüklendiğinde sepet durumunu kontrol et
    useEffect(() => {
        if (items.length === 0 && !isCompleted) {
            // Sepet boşsa ve ödeme tamamlanmamışsa ana sayfaya yönlendir
            navigate('/')
        }
    }, [items.length, navigate, isCompleted])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleBackToCart = () => {
        navigate('/cart')
    }

    const handleNextStep = () => {
        if (currentStep === 1 && validatePersonalInfo()) {
            setCurrentStep(2)
        } else if (currentStep === 2 && validatePaymentInfo()) {
            setCurrentStep(3)
        }
    }

    const handlePrevStep = () => {
        setCurrentStep(prev => Math.max(1, prev - 1))
    }

    const validatePersonalInfo = () => {
        const { firstName, lastName, email, phone, address, city, zipCode } = formData
        if (!firstName || !lastName || !email || !phone || !address || !city || !zipCode) {
            showNotification('Lütfen tüm alanları doldurun', 'error')
            return false
        }
        if (!email.includes('@')) {
            showNotification('Geçerli bir email adresi girin', 'error')
            return false
        }
        return true
    }

    const validatePaymentInfo = () => {
        const { cardNumber, cardName, expiryDate, cvv } = formData
        if (!cardNumber || !cardName || !expiryDate || !cvv) {
            showNotification('Lütfen tüm kart bilgilerini doldurun', 'error')
            return false
        }
        if (cardNumber.length < 16) {
            showNotification('Geçerli bir kart numarası girin', 'error')
            return false
        }
        if (cvv.length < 3) {
            showNotification('Geçerli bir CVV girin', 'error')
            return false
        }
        return true
    }

    const handleSubmitOrder = async () => {
        setIsProcessing(true)

        // Simüle edilmiş ödeme işlemi
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Başarılı ödeme
            dispatch(clearCart())
            setIsCompleted(true)
            localStorage.setItem('checkout_completed', 'true')
            showNotification('Siparişiniz başarıyla alındı!', 'success')

            // 3 saniye sonra ana sayfaya yönlendir
            setTimeout(() => {
                setIsCompleted(false)
                localStorage.removeItem('checkout_completed')
                navigate('/')
            }, 3000)

        } catch (error) {
            showNotification('Ödeme işlemi başarısız oldu', 'error')
        } finally {
            setIsProcessing(false)
        }
    }

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = v.match(/\d{4,16}/g)
        const match = matches && matches[0] || ''
        const parts = []

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join(' ')
        } else {
            return v
        }
    }

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value)
        setFormData(prev => ({
            ...prev,
            cardNumber: formatted
        }))
    }

    // Eğer sepet boşsa ana sayfaya yönlendir
    if (items.length === 0) {
        return (
            <div className="checkout-success">
                <div className="success-content">
                    <FaCheckCircle className="success-icon" />
                    <h1>Sepetiniz Boş</h1>
                    <p>Ödeme yapmak için önce sepete ürün eklemelisiniz.</p>
                    <div className="success-actions">
                        <button
                            className="btn-primary"
                            onClick={() => navigate('/')}
                        >
                            Alışverişe Devam Et
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (isCompleted) {
        return (
            <div className="checkout-success">
                <div className="success-content">
                    <FaCheckCircle className="success-icon" />
                    <h1>Siparişiniz Alındı!</h1>
                    <p>Sipariş numaranız: <strong>#{Math.random().toString(36).substr(2, 9).toUpperCase()}</strong></p>
                    <p>Email adresinize onay mesajı gönderildi.</p>
                    <div className="success-actions">
                        <button
                            className="btn-primary"
                            onClick={() => {
                                setIsCompleted(false)
                                localStorage.removeItem('checkout_completed')
                                navigate('/')
                            }}
                        >
                            Alışverişe Devam Et
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <button className="back-btn" onClick={handleBackToCart}>
                    <FaArrowLeft /> Sepete Dön
                </button>
                <h1>Ödeme</h1>
            </div>

            <div className="checkout-content">
                <div className="checkout-steps">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        ></div>
                    </div>
                    <div className={`step ${currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : ''}`}>
                        <span className="step-number">1</span>
                        <span className="step-title">Kişisel Bilgiler</span>
                        <span className="step-subtitle">Ad, email, adres</span>
                    </div>
                    <div className={`step ${currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : ''}`}>
                        <span className="step-number">2</span>
                        <span className="step-title">Ödeme Bilgileri</span>
                        <span className="step-subtitle">Kart bilgileri</span>
                    </div>
                    <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
                        <span className="step-number">3</span>
                        <span className="step-title">Onay</span>
                        <span className="step-subtitle">Sipariş özeti</span>
                    </div>
                </div>

                <div className="checkout-form">
                    {/* Adım 1: Kişisel Bilgiler */}
                    {currentStep === 1 && (
                        <div className="form-step">
                            <div className="step-header">
                                <FaUser className="step-icon" />
                                <h2>Kişisel Bilgiler</h2>
                                <p>Lütfen teslimat için gerekli bilgileri doldurun</p>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Ad *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        placeholder="Adınız"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Soyad *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        placeholder="Soyadınız"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="email@example.com"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Telefon *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="0555 123 45 67"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Adres *</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Tam adres"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Şehir *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="Şehir"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Posta Kodu *</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleInputChange}
                                        placeholder="34000"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Adım 2: Ödeme Bilgileri */}
                    {currentStep === 2 && (
                        <div className="form-step">
                            <div className="step-header">
                                <FaCard className="step-icon" />
                                <h2>Ödeme Bilgileri</h2>
                                <p>Güvenli ödeme için kart bilgilerinizi girin</p>
                            </div>
                            <div className="payment-methods">
                                <div className="payment-method active">
                                    <FaCreditCard />
                                    <span>Kredi Kartı</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Kart Numarası *</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleCardNumberChange}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Kart Üzerindeki İsim *</label>
                                <input
                                    type="text"
                                    name="cardName"
                                    value={formData.cardName}
                                    onChange={handleInputChange}
                                    placeholder="Kart üzerindeki isim"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Son Kullanma Tarihi *</label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CVV *</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        maxLength="4"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="security-notice">
                                <FaLock />
                                <span>Ödeme bilgileriniz güvenli şekilde şifrelenir</span>
                            </div>
                        </div>
                    )}

                    {/* Adım 3: Onay */}
                    {currentStep === 3 && (
                        <div className="form-step">
                            <div className="step-header">
                                <FaClipboardCheck className="step-icon" />
                                <h2>Sipariş Onayı</h2>
                                <p>Bilgilerinizi kontrol edip siparişi onaylayın</p>
                            </div>
                            <div className="order-summary">
                                <h3>Sipariş Özeti</h3>
                                <div className="summary-items">
                                    {items.map((item) => (
                                        <div key={item.id} className="summary-item">
                                            <img src={item.image} alt={item.title} />
                                            <div className="item-details">
                                                <h4>{item.title}</h4>
                                                <p>Adet: {item.quantity}</p>
                                                <span className="item-price">${item.totalPrice}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="summary-total">
                                    <strong>Toplam: ${totalAmount.toFixed(2)}</strong>
                                </div>
                            </div>

                            <div className="delivery-info">
                                <h3>Teslimat Bilgileri</h3>
                                <p><strong>Adres:</strong> {formData.address}, {formData.city} {formData.zipCode}</p>
                                <p><strong>Telefon:</strong> {formData.phone}</p>
                                <p><strong>Email:</strong> {formData.email}</p>
                            </div>
                        </div>
                    )}

                    <div className="form-actions">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={handlePrevStep}
                            >
                                Geri
                            </button>
                        )}

                        {currentStep < 3 ? (
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={handleNextStep}
                            >
                                Devam Et
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={handleSubmitOrder}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'İşleniyor...' : 'Siparişi Tamamla'}
                            </button>
                        )}
                    </div>
                </div>

                <div className="checkout-sidebar">
                    <div className="order-summary-card">
                        <h3>Sipariş Özeti</h3>
                        <div className="summary-items">
                            {items.map((item) => (
                                <div key={item.id} className="summary-item">
                                    <img src={item.image} alt={item.title} />
                                    <div className="item-info">
                                        <h4>{item.title}</h4>
                                        <p>Adet: {item.quantity}</p>
                                        <span className="price">${item.totalPrice}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="summary-total">
                            <span>Toplam Tutar:</span>
                            <strong>${totalAmount.toFixed(2)}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
