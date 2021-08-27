import './App.css';
import { useState, useEffect } from 'react';
import Info from './components/Info';
import FeatureMap from './components/FeatureMap';
import Settings from './components/Settings';
import { DateTime } from 'luxon';

function App() {
    const [settings, setSettings] = useState<MapOptions>({ start: "1995-01-01", end: "1995-02-05", magnitude: 5, speed: 5 });
    const [featuresCollection, setFeaturesCollection] = useState<GeoJSON.FeatureCollection>({ type: "FeatureCollection", features: [] });

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

    const updateSettings = function (key: string, value: string) {
        if (key === 'start' || key === 'end') {
            const date: DateTime = DateTime.fromISO(value);
            if (!date.isValid) return;
            value = date.toFormat('yyyy-MM-dd');
        }
        setSettings({ ...settings, [key]: value });
    }

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

    return (
        <div className="app">
            {`loading data from: ${settings.start} to ${settings.end}, magnitude >${settings.magnitude}`}
            <Info settings={settings} />
            <FeatureMap featuresCollection={featuresCollection} />
            <Settings settings={settings} onUpdate={updateSettings} />
        </div>
    );
}

export default App;
