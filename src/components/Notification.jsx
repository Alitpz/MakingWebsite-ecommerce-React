import React, { useEffect } from 'react'
import { FaCheckCircle, FaTimes } from 'react-icons/fa'
import '../css/Notification.css'

function Notification({ message, type = 'success', isVisible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="notification-icon success" />
      case 'error':
        return <FaTimes className="notification-icon error" />
      case 'info':
        return <FaCheckCircle className="notification-icon info" />
      default:
        return <FaCheckCircle className="notification-icon success" />
    }
  }

  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return 'notification-success'
      case 'error':
        return 'notification-error'
      case 'info':
        return 'notification-info'
      default:
        return 'notification-success'
    }
  }

  return (
    <div className={`notification ${getTypeClass()}`}>
      <div className="notification-content">
        {getIcon()}
        <span className="notification-message">{message}</span>
      </div>
      <button className="notification-close" onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  )
}

export default Notification
