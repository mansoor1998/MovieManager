import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App  from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from './componenets/login/login';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './componenets/app/home/home';
import MovieDetail from './componenets/app/movie-detail/movie-detail';

function isLogedIn() {
  const token = localStorage.getItem('auth-token');
  return (token !== 'null' && token) ? true : false;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="app" element={isLogedIn() ? <App/> : <Navigate replace to="/login" />}>
          <Route path="home" element={<Home/>} />
          <Route path="movie-detail/:id" element={<MovieDetail/>} />
        </Route>
        <Route path="login" element={<Login/>} />
        <Route path="*" element={<Navigate replace to="/app/home" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
