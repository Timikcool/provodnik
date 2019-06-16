import React, { Component, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mbxClient  from '@mapbox/mapbox-sdk';
import mbxDatasets from '@mapbox/mapbox-sdk/services/datasets';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-compass.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-geolocate.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-in.svg';
import 'mapbox-gl/dist/svg/mapboxgl-ctrl-zoom-out.svg';
import axios from 'axios';
export default class Map extends Component {
  state = {
    map: {},
    options: [
      'authorities',
      'education',
      'food',
      'health',
      'hotels',
      'leisure',
      'money',
      'shopping',
      'sport',
      'toilets',
      'tourism',
      'transport'
    ],
    activeOption: '',
    editingMode: false
  };
  render() {
    return (
      <div
        className={`map-container ${this.state.editingMode ? 'editor' : ''}`}
      >
        {!this.state.editingMode && (
          <div className="search">
            <div className="options" onClick={ev => this.setActiveOption(ev)}>
              {this.state.options.map(option => (
                <div
                  className={`option ${option} ${
                    this.state.activeOption === option ? 'active ' : ''
                  }`}
                >
                  {this.state.activeOption === option ? (
                    <img
                      src={
                        process.env.PUBLIC_URL + `/icons/${option}-active.svg`
                      }
                      alt={option}
                    />
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + `/icons/${option}.svg`}
                      alt={option}
                    />
                  )}
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </div>
              ))}
            </div>
            <div className="legend">
              <section className="wheelchairs">
                <ul>
                  <li className="green">
                    <span>Avaliable</span> for wheelchairs
                  </li>
                  <li className="yellow">
                    <span>Partially avaliable</span> for wheelchairs
                  </li>
                  <li className="red">
                    <span>Unavaliable</span> for wheelchairs
                  </li>
                </ul>
              </section>
              <section className="stroller">
                <ul>
                  <li className="green">
                    <span>Avaliable</span> for stroller
                  </li>
                  <li className="yellow">
                    <span>Partially avaliable</span> for stroller
                  </li>
                  <li className="red">
                    <span>Unavaliable</span> for stroller
                  </li>
                </ul>
              </section>
              <section className="crutches">
                <ul>
                  <li className="green">
                    <span>Avaliable </span> for crutches
                  </li>
                  <li className="yellow">
                    <span>Partially avaliable </span> for crutches
                  </li>
                  <li className="red">
                    <span>Unavaliable </span> for crutches
                  </li>
                </ul>
              </section>
            </div>
          </div>
        )}
        <section
          className="add"
          onClick={() =>
            this.setState({ editingMode: !this.state.editingMode })
          }
        >
          {this.state.editingMode ? 'Finish' : 'Add to map'}
        </section>
        <div className={`map`} id="map" />
      </div>
    );
  }
  setActiveOption({ target }) {
    console.log(target);
    this.setState({ activeOption: target.classList[1] });
  }
  makeid() {
    const length = 32;
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoidGltaWtjb29sIiwiYSI6ImNqd3gyeHI1ODBvMDY0M3J6dHNoZGtoeDgifQ.9HL1O6diAw5_eE8qhAfUCA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/timikcool/cjwxk6uez1jkq1co93ybi7bfg',
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
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      }),
      'top-left'
    );
    map.on('click', ev => console.log(ev));
    map.on('click', function(e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['points'] // replace this with the name of the layer
      });

      if (!features.length) {
        return;
      }

      var feature = features[0];

      var popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
          `<h3> Name: ${feature.properties.name}</h3><p> Aviability: ${
            feature.properties.aviability
          }</p><a href=${feature.properties.link}>${
            feature.properties.link
          }<a/>`
        )
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    });
    map.on(
      'click',
      function(e) {
        if (this.state.editingMode) {
          var popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(e.lngLat)
            .setHTML(
              `<form id="send";return false;"><h3> Name: </h3> <input name="name" type="text" /><p> Aviability:</p>
              <select name="aviability">
                <option>bad</option>
                <option>medium</option>
                <option>good</option>
                </select>
            <button type="submit">Send</button>
            </form>
              `
            )
            .setLngLat(e.lngLat)
            .addTo(map);
          document.getElementById('send').addEventListener('submit', ev => {
            function makeid() {
              const length = 32;
              var result = '';
              var characters =
                'abcdefghijklmnopqrstuvwxyz0123456789';
              var charactersLength = characters.length;
              for (var i = 0; i < length; i++) {
                result += characters.charAt(
                  Math.floor(Math.random() * charactersLength)
                );
              }
              return result;
            }
            ev.preventDefault();
            const name = new FormData(ev.target).get('name');
            const aviability = new FormData(ev.target).get('aviability');
            const lngLat = e.lngLat;
            const id = makeid();
            console.log(name, aviability, lngLat, id);
            /*
                  {
      "type": "Feature",
      "properties": {
        "name": "Casino Adjara",
        "aviability": "bad",
        "link": "http://casinoadjara.com/"
      },
      "geometry": {
        "coordinates": [
          44.777752,
          41.719549
        ],
        "type": "Point"
      },
      "id": "51d51d4e453f60b853526acaa2cc8e90"
    }
    */
//    {
//     "id": "{feature_id}",
//     "type": "Feature",
//     "geometry": {
//       "type": "Polygon",
//       "coordinates": [
//         [
//           [ 100, 0 ],
//           [ 101, 0 ],
//           [ 101, 1 ],
//           [ 100, 1 ],
//           [ 100, 0 ]
//         ]
//       ]
//     },
//     "properties": {
//       "prop0": "value0"
//     }
//   }
// axios.put(`https://api.mapbox.com/datasets/v1/timikcool/cjwxjw9mh0qbr2nqomsw01fai/features/${id}?access_token=pk.eyJ1IjoidGltaWtjb29sIiwiYSI6ImNqd3gyeHI1ODBvMDY0M3J6dHNoZGtoeDgifQ.9HL1O6diAw5_eE8qhAfUCA`, 
//        {
//     "id": id,
//     "type": "Feature",
//     "geometry": {
//       "type": "Point",
    //   "coordinates": [
    //     lngLat.lng,
    //     lngLat.lat
    //   ]
//     },
//     "properties": {
//         "name": name.toString(),
//         "aviability": aviability.toString()
//     }
//   }
// ).then(console.log)
const baseClient = mbxClient({ accessToken: 'sk.eyJ1IjoidGltaWtjb29sIiwiYSI6ImNqd3lxMm91aTBmdDUzeXBjZDZweXU4MjMifQ.LB_0v8xAN-IPZDN54N8n0w' });
const datasetsClient = mbxDatasets(baseClient);
datasetsClient.putFeature({
    datasetId: 'cjwxjw9mh0qbr2nqomsw01fai',
    featureId: id,
    feature: {
      "type": "Feature",
      "properties": { "name": name, "aviability": aviability },
      "geometry": {
        "type": "Point",
        "coordinates": [
            lngLat.lng,
            lngLat.lat
          ]
      }
    }
  })
    .send()
    .then(response => {
      const feature = response.body;
      console.log(response);
      if (response.statusCode == 200) {
          alert('Success');
      }
    });
          });
        }
      }.bind(this)
    );
    this.setState({ map });
  }
  //   componentWillUnmount(){

  //   }
}
