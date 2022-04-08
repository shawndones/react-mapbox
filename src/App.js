import './App.css';
import React, {useEffect, useRef, useState } from 'react'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import { arcgisToGeoJSON } from "@terraformer/arcgis"
import coGmus from './data/co-gmu'
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;


function App() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState( -106.5496);
  const [lat, setLat] = useState(39.0079);
  const [zoom, setZoom] = useState(6.87);
  const [wildernessData, setWildernessData] = useState({});



  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/shawndones/cl1m7psiw000m14paze9cnc9v',
      center: [lng, lat],
      zoom: zoom
    });
    map.current.on('load', () => {
      map.current.addSource('co-gmus', {
        type: 'geojson',
        data: coGmus
      })
      map.current.addLayer({
        'id': 'co-gmus-layer',
        'type': 'line',
        'source': 'co-gmus'
      })
    })
  
    // set contour lines to feet instead of meters
    // map.current.on('load', function(){
    //   map.current.setLayoutProperty('contour-label', 'text-field', ["to-string", ["*", [ "get", "ele"], 3.3]])
    // })
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });


  return (
    <div className="content">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
// function App() {
  
//   const [viewport, setViewport] = useState({
//     latitude: 37.5726028,
//     longitude: -85.1551411,
//     zoom: 10
//   })

//   return <div>

//   <Map
//     mapboxAccessToken= {process.env.REACT_APP_MAPBOX_TOKEN }
//     initialViewState={{...viewport}}
//     style={{width: 1000, height: 1000}}
//     mapStyle="mapbox://styles/shawndones/cl1m7psiw000m14paze9cnc9v"
//   />
//   Map ad markers 
//   </div>;
// }

export default App;
