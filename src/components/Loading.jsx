import React from 'react'
import '../css/Loading.css'

function Loading({ message = "Yükleniyor...", size = "medium", fullScreen = false }) {
    const sizeClass = `loading-spinner-${size}`
    const containerClass = fullScreen ? 'loading-fullscreen' : 'loading-container'

    return (
        <div className={containerClass}>
            <div className="loading-content">
                <div className={`loading-spinner ${sizeClass}`}>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                </div>
                <p className="loading-message">{message}</p>
            </div>
        </div>
    )
}

export default Loading
