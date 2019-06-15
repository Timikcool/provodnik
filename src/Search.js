import React, { Component } from 'react'
import axios from 'axios';
import './Search.scss';
export default class Search extends Component {
    render() {
        return (
            <div className="search">
                <input></input>
            </div>
        )
    }
    search(text){
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json`).then(res => console.log(res));
    }
}
