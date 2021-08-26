import './App.css';
import { useState, useEffect } from 'react';
import Info from './components/Info';
import Map from './components/Map';
import Settings from './components/Settings';
import { DateTime } from 'luxon';

function App() {
    const [settings, setSettings] = useState({ start: DateTime.now().minus({ weeks: 2 }).toFormat('yyyy-MM-dd'), end: DateTime.now().toFormat('yyyy-MM-dd'), magnitude: 5, speed: 5 });
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        async function load() {
            await loadData();
        }

        load();
    }, []);

    const updateSettings = function (key: string, value: string) {
        if (key === 'start' || key === 'end') {
            const date: DateTime = DateTime.fromISO(value);
            if (!date.isValid) return;
            value = date.toFormat('yyyy-MM-dd');
        }
        setSettings({ ...settings, [key]: value });
    }

    const loadData = async function () {
        let url = new URL(`${process.env.REACT_APP_API_URL}/features`);
        url.search = new URLSearchParams({ start: settings.start, end: settings.end, magnitude: settings.magnitude.toString() }).toString();
        let res = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        let json = await res.json();
        setFeatures(json);
    }

    return (
        <div className="app">
            {`loading data from: ${settings.start} to ${settings.end}, magnitude >${settings.magnitude}`}
            <Info settings={settings} />
            {/* <Map features={features} /> */}
            <Settings settings={settings} onUpdate={updateSettings} />
        </div>
    );
}

export default App;
