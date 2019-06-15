import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg';
import logo from './logo.svg' ;

import './App.scss';

class App extends React.Component {
  state = {
    map: {}
  };
  render() {
    return (
      <div className="app">
        <header className="header">
          <img src={logo} className="logo" />
          <nav>
            <a>About us</a>
            <a>Volunteers</a>
            <a>Contacts</a>
            <a>Join</a>
            <a>Login</a>
          </nav>
          </header>
        <div className="map" id="map" />
      </div>
    );
  }
  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoidGltaWtjb29sIiwiYSI6ImNqd3gyeHI1ODBvMDY0M3J6dHNoZGtoeDgifQ.9HL1O6diAw5_eE8qhAfUCA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [44.77771644303229, 41.71912112932134], // starting position
      zoom: 17 // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      }));
    map.on('click', (ev) => console.log(ev));
    this.setState({ map });
  }
}

export default App;
