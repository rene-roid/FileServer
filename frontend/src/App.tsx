import { useEffect, useState } from 'react'
import './App.css'
import './styles/modal.css'
import Login from './views/auth/login'
import Dashboard from './views/dashboard/dashboard'

function App() {
  const [uuid, setUuid] = useState<string>('')

  useEffect(() => {
    let uuid = localStorage.getItem('uuid')

    if (uuid) setUuid(uuid)
  }, [])

  return (
    <>
      <div id="app">
        <div id="star-container">
          <div id="star-pattern"></div>
          <div id="star-gradient-overlay"></div>
        </div>

        <div className="wrapper">
          {uuid ? <Dashboard /> : <Login />}
        </div>
      </div>
    </>
  )
}

export default App
