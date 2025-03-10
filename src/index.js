import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Media from './pages/media/media';
 import Login from './pages/login/login';
import { Settings } from './pages/settings/settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/media" element={<Media />} />
         <Route path="/login" element={<Login />} /> 
         <Route path="/settings" element={<Settings/>} /> 
         <Route path="*" element={<Media />} /> 
      </Routes>
    </BrowserRouter>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();