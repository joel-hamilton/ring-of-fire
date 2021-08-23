// import '/node_modules/mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
import { useEffect } from 'react';

const MapElem = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;


export default function Map() {
    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;
        const map = new mapboxgl.Map({
            container: 'map',
            logoPosition: 'bottom-right',
            // renderWorldCopies: false,
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [170, 40],
            zoom: 1
        });
    })

    return (
        <MapElem id="map" />
    )
}