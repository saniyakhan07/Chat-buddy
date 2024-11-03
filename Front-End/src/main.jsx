import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { SocketContextProvider } from './Context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <AuthContextProvider>
    <SocketContextProvider>
    <App />
    <Toaster  position="top-center"/>
    </SocketContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  
)
