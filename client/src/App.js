import React from 'react';
import { Switch, Routes, Route, Link, useHistory } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './pages/Main';
import Board from './pages/Board';
import Myhistory from './pages/Myhistory';
import Myfavorite from './pages/Myfavorite';
import Footer from './components/Footer';

function Router() {
  return (
    <div>
      <Nav 
      />
      <Routes>
        <Route path='/'>
          <Main 
          />
        </Route>
        <Route path='/board'>
          <Board
          />
        </Route> 
        <Route path='/myfavorite'>
          <Myfavorite 
          />
        </Route> 
        <Route path='/myhistory'>
          <Myhistory
          />
        </Route> 
      </Routes>
      <Footer 
      /> 
    </div>
  );
}

function App() {
  return <Router />;
}

export default App;
