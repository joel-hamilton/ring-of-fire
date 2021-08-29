import './App.css';
import { useState, useEffect } from 'react';
import Info from './components/Info';
import FeatureMap from './components/FeatureMap';
import Settings from './components/Settings';
import { DateTime } from 'luxon';
import { GraphQLClient, ClientContext } from 'graphql-hooks'

const client = new GraphQLClient({
    url: '/graphql'
})

function App() {
    const [settings, setSettings] = useState<MapOptions>({ start: "1995-01-01", end: "1995-02-05", magnitude: 5, speed: 5 });

    const updateSettings = function (key: string, value: string) {
        if (key === 'start' || key === 'end') {
            const date: DateTime = DateTime.fromISO(value);
            if (!date.isValid) return;
            value = date.toFormat('yyyy-MM-dd');
        }
        setSettings({ ...settings, [key]: value });
    }

    return (
        <div className="app">
            <ClientContext.Provider value={client}>
                {`loading data from: ${settings.start} to ${settings.end}, magnitude >${settings.magnitude}`}
                <Info settings={settings} />
                <FeatureMap settings={settings} />
                <Settings settings={settings} onUpdate={updateSettings} />
            </ClientContext.Provider>
        </div>
    );
}

export default App;
