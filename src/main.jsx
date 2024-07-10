// React imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Custom imports
import { AuthProvider } from 'context/AuthProvider.jsx';
import { LogProvider } from 'context/LogProvider.jsx';
import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LogProvider>
          <Routes>
            <Route path = '/*' element = {<App />} />
          </Routes>
        </LogProvider>
      </AuthProvider>
    </BrowserRouter>
  //</React.StrictMode>,
)
