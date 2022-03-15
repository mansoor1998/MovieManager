import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './componenets/app/layout/header/header';

export class Comp extends React.Component {
  render() {
    return (
      <p>this is the compoenent baby</p>
    );
  }
}


class App extends React.Component {
  state = { 
    data: 'some data'
  }
  render(){
    return (
      <div>
        <Header/>
        <div className="app-body">
          <Outlet />
        </div>
      </div>
    );
  }
}

export default App;
