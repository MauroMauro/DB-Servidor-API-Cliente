import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import Home from './components/Home'
import Notifications from './components/Notification'
import Footer from './components/Footer'
import ClienteBlock from './components/clientes/ClientesBlock'
import CustomersBlock from './components/customer/CustomersBlock'



// Styles
import Button from 'react-bootstrap/Button'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [errorNotification, setErrorNotification] = useState(null)



  const padding = {
    padding: 5
  }




  return (
    <div className='container'>
      <h1>DB - Servidor - API - Cliente</h1>

      {
        <div>
          <Notifications.Notification message={notification} />
          <Notifications.ErrorNotification message={errorNotification} />

          <hr/>

          <Router>
            <div>
              <Link style={padding} to="/">home</Link>
              <Link style={padding} to="/cliente">cliente</Link>
              <Link style={padding} to="/customer">customer</Link>
            </div>

            <hr/>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cliente" element={<ClienteBlock setNotification={setNotification} setErrorNotification={setErrorNotification} />} />
              <Route path="/customer" element={<CustomersBlock setNotification={setNotification} setErrorNotification={setErrorNotification} />} />

            </Routes>

          </Router>

        </div>
      }

      <hr/>
      <Footer />
      
    </div>
  )
}

export default App