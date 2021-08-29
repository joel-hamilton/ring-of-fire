// import '/node_modules/mapbox-gl/dist/mapbox-gl.css';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import mapboxgl, { GeoJSONSource, Map } from 'mapbox-gl';

const MapElem = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

export default function FeatureMap({ settings }: { settings: MapOptions }) {
    const [map, setMap] = useState<Map | null>(null);
    const [featuresCollection, setFeaturesCollection] = useState<GeoJSON.FeatureCollection>({ type: "FeatureCollection", features: [] });
    const [sourceAdded, setSourceAdded] = useState<boolean>(false);

    useEffect(() => {
        async function load() {
            await loadData();
        }

        load();
    }, []);

    // update features on date change
    useEffect(() => {
        loadData();
    }, [settings.start, settings.end])

    const loadData = async function () {
        let url = 'http://localhost:8080/v1/graphql';
        const featureQuery = `
        query featureQuery {
            usgs_data(where: {time: {_gte: "${settings.start}", _lte: "${settings.end}"}, magnitude: {_gte: ${settings.magnitude}}}) {
                feature
            }
        }
        `;

        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: featureQuery
            })
        });

        const data = await res.json();
        const features: GeoJSON.Feature[] = data.data.usgs_data.map((obj: any) => {
            return obj.feature;
        })
        const collection: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features };
        setFeaturesCollection(collection);
    }

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY as string;
        const m = new mapboxgl.Map({
            container: 'map',
            logoPosition: 'bottom-right',
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [170, 40],
            zoom: 1
        });

        m.on('load', () => {
            m.addLayer({
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
                        // '#FF3645',
                        ['>', ['to-number', ['get', 'mag']], 6],
                        '#00cc69',
                        // '#FFA936',
                        ['>', ['to-number', ['get', 'mag']], 5],
                        '#00b35c',
                        // '#ffca33',
                        ['>', ['to-number', ['get', 'mag']], 4],
                        '#00994f',
                        // '#FFE036',
                        '#008040',
                        // '#fff242'
                    ]
                }
            });
        })
        setMap(m);
    }, [])

    // update features
    useEffect(() => {
        console.log('updating features collection')
        updateFeatures();
    }, [featuresCollection])

    const updateFeatures = function () {
        if (!map) return;

        if (sourceAdded) {
            const source: GeoJSONSource = map.getSource('earthquakes') as GeoJSONSource;
            source.setData(featuresCollection);
        } else {
            map.addSource('earthquakes', {
                type: 'geojson',
                data: featuresCollection
            });

            setSourceAdded(true);
        }
    }

    return (
        <MapElem id="map" aria-label="map" />
    )
}