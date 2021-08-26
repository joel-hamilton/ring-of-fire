// import '/node_modules/mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapElem = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;


export default function Map({features}: {features: []}) {
    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;
        let map = new mapboxgl.Map({
            container: 'map',
            logoPosition: 'bottom-right',
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [170, 40],
            zoom: 1
        });

        // map.on('load', () => {
        //     map.addSource('earthquakes', {
        //         type: 'geojson',
        //         data: {features}
        //     })
        // })
    }, [])

    // useEffect(() => {
    //     const src:GeoJSONSource = map.getSource('earthquakes');
    //     src.setData(features)
    // }, [features])

    return (
        <MapElem id="map" aria-label="map" />
    )
}