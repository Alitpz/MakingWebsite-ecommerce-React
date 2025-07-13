import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import PageContainer from './container/pageContainer'

function App() {
  return (
   <div>
   <PageContainer>
    <Header />
   </PageContainer>
   </div>
  )
}

export default App
