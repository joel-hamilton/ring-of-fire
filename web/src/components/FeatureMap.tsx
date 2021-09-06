// import '/node_modules/mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import { useState } from 'react';
import mapboxgl, { GeoJSONSource, Map } from 'mapbox-gl';
import { useQuery } from 'graphql-hooks'


const MapElem = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

const featureQuery = `query featureQuery($start: timestamp, $end: timestamp, $magnitude: Float) {
    usgs_data(where: {time: {_gte: $start, _lte: $end}, magnitude: {_gte: $magnitude}}) {
        feature
    }
}`

export default function FeatureMap({ settings }: { settings: MapOptions }) {
    const [map, setMap] = useState<Map | null>(null);

    const { loading, error, data } = useQuery(featureQuery, {
        variables: {
            start: settings.start,
            end: settings.end,
            magnitude: settings.magnitude
        }
    });

    // if (loading) return <h1>Loading...</h1>
    // if (error) return <h1>Something Bad Happened</h1>

    const loadMapbox = () => new Promise((res, rej) => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;
        const m = new mapboxgl.Map({
            container: 'map',
            logoPosition: 'bottom-right',
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [170, 40],
            zoom: 1
        });

        m.on('error', rej);
        m.on('load', () => {
            setMap(m);
            res(true);
        });
    });

    const updateFeatures = async function (featuresCollection: GeoJSON.FeatureCollection) {
        if (!map) return;

        const source: GeoJSONSource = map.getSource('earthquakes') as GeoJSONSource;

        if (source) {
            source.setData(featuresCollection);
        } else {
            map.addSource('earthquakes', {
                type: 'geojson',
                data: featuresCollection
            });

            map.addLayer({
                "id": "earthquakes",
                "source": "earthquakes",
                "type": "circle",
                "paint": {
                    "circle-blur": 0.1,
                    // "circle-opacity": [
                    //     'get', 'opacity'
                    // ],
                    'circle-radius': ['/', ['^', ['to-number', ['get', 'mag']], 3], 40],
                    "circle-color": [
                        'case',
                        ['>', ['to-number', ['get', 'mag']], 7],
                        '#00e67a',
                        ['>', ['to-number', ['get', 'mag']], 6],
                        '#00cc69',
                        ['>', ['to-number', ['get', 'mag']], 5],
                        '#00b35c',
                        ['>', ['to-number', ['get', 'mag']], 4],
                        '#00994f',
                        '#008040',
                    ]
                }
            });
        }
    }

    const load = async function (collection: GeoJSON.FeatureCollection) {
        if (!map) {
            setTimeout(async () => {
                await loadMapbox();
            }, 0);
        }

        updateFeatures(collection);
    }


    if (!loading && !error) {
        const features: GeoJSON.Feature[] = data.usgs_data.map((obj: any) => obj.feature);
        const collection: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features };
        load(collection);
    }

    return (
        <MapElem id="map" aria-label="map" />
    )
}