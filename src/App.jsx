import './App.css'
import Header from './components/Header'
import PageContainer from './container/pageContainer'
import RouterConfig from './config/RouterConfig'
import './css/Layout.css'

function App() {
  return (
    <div className="app-container">
      <PageContainer>
        <Header />
        <RouterConfig />
      </PageContainer>
    </div>
  )
}

export default App
