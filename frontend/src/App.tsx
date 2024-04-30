import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles/modal.css'
import Login from './views/auth/login'
import Dashboard from './views/dashboard/dashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="app">
        <div id="star-container">
          <div id="star-pattern"></div>
          <div id="star-gradient-overlay"></div>
        </div>

        <div className="wrapper">
          {/* <Login /> */}
          <Dashboard />
        </div>
      </div>
    </>
  )
}

export default App
