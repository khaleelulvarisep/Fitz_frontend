import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <StrictMode>
        <GoogleOAuthProvider clientId="132218327312-1rt0ns02vos3fgcrkg4bpo2au6d4gv2o.apps.googleusercontent.com">
             <App />
        </GoogleOAuthProvider>
     </StrictMode>
  </BrowserRouter>
  
)
