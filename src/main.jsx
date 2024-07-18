// React imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Custom imports
import { AuthProvider } from 'context/AuthProvider.jsx';
import { LogProvider } from 'context/LogProvider.jsx';
import { CreatorProvider } from 'context/CreatorContext.jsx';
import { ModuleProvider } from 'context/ModuleContext.jsx'
import { SectionProvider } from 'context/SectionContext.jsx'

import App from './App.jsx'

// Global Styling
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LogProvider>
          <CreatorProvider>
            <ModuleProvider>
              <SectionProvider>
                <Routes>
                  <Route path = '/*' element = {<App />} />
                </Routes>
              </SectionProvider>
            </ModuleProvider>
          </CreatorProvider>
        </LogProvider>
      </AuthProvider>
    </BrowserRouter>
  //</React.StrictMode>,
)
