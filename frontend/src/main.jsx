import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import toast, { Toaster } from 'react-hot-toast';
import { DataFunction } from './components/context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <DataFunction>
    <Toaster/> 
    <App />
    </DataFunction>
   
  </React.StrictMode>,

)
