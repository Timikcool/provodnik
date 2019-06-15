import React from 'react';
import {BrowserRouter, NavLink, Route } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg';
import logo from './logo.svg' ;

import './App.scss';
import Map from './Map';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
      <div className="app">
        <header className="header">
          <img src={logo} className="logo" />
          <nav className="nav">
            <NavLink to="/" activeClassName="active">Map</NavLink>
            <NavLink to="/faq" activeClassName="active">About us</NavLink>
            <NavLink to="/volunteers" activeClassName="active">Volunteers</NavLink>
            <NavLink to="/contacts" activeClassName="active">Contacts</NavLink>
            <NavLink to="/join" activeClassName="active">Join</NavLink>
            <NavLink to="/login" activeClassName="active">Log in</NavLink>
          </nav>
          </header>
          <Route path="/" component={Map} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
