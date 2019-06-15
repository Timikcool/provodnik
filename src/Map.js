import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg';
import axios from 'axios';
export default class Map extends Component {
  state = {
    map: {}
  };
  render() {
    return (
      <React.Fragment>
        <div className="search">
          <input className="input" onChange={this.search} />
        </div>
        <div className="map" id="map" />
      </React.Fragment>
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
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
        }), 'top-left');
    map.on('click', ev => console.log(ev));
    this.setState({ map });
  }
  search({ target }) {
    const text = target.value;
    axios
      .get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json`)
      .then(res => console.log(res));
  }
}
