import React from 'react'
import '../css/Layout.css'

function PageContainer({ children }) {
  return (
    <div className="page-container">
      <div className="page-content">
        {children}
      </div>
    </div>
  )
}

export default PageContainer
