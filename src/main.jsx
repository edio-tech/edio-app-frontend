// React imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Custom imports
import { AuthProvider } from 'context/AuthProvider.jsx';
import { LogProvider } from 'context/LogProvider.jsx';
import { CreatorProvider } from 'context/CreatorContext.jsx';

import App from './App.jsx'

// Global Styling
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LogProvider>
          <CreatorProvider>
            <Routes>
              <Route path = '/*' element = {<App />} />
            </Routes>
          </CreatorProvider>
        </LogProvider>
      </AuthProvider>
    </BrowserRouter>
  //</React.StrictMode>,
)
