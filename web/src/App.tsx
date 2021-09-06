import './App.css';
import { useState, useEffect } from 'react';
import Info from './components/Info';
import FeatureMap from './components/FeatureMap';
import Settings from './components/Settings';
import { DateTime } from 'luxon';
import { GraphQLClient, ClientContext } from 'graphql-hooks'

const client = new GraphQLClient({
    url: 'http://localhost:8080/v1/graphql'
})

function App() {
    const [settings, setSettings] = useState<MapOptions>({ start: "1995-01-01", end: "1995-02-05", magnitude: 5, speed: 5 });
    const [play, setPlay] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (play) {
                updateSettings('start', DateTime.fromISO(settings.start).plus({ days: 1 }).toFormat('yyyy-MM-dd'));
            }
        }, 250);
    });

    const updateSettings = function (key: string, value: string) {
        if (key === 'start') {
            const date: DateTime = DateTime.fromISO(value);
            if (!date.isValid) return;
            const dates = {
                start: date.toFormat('yyyy-MM-dd'),
                end: date.plus({ days: 30 }).toFormat('yyyy-MM-dd')
            };
            setSettings({ ...settings, ...dates });
        } else {
            setSettings({ ...settings, [key]: value });
        }
    }

    const PlayPause = function ({ play, onClick }: { play: boolean, onClick: () => void }) {
        return (
            <div onClick={onClick} style={{ position: 'relative', zIndex: 1 }}>
                {play ? 'play' : 'pause'}
            </div>
        )
    }

    return (
        <div className="app">
            <ClientContext.Provider value={client}>
                {`loading data from: ${settings.start} to ${settings.end}, magnitude >${settings.magnitude}`}
                <Info settings={settings} />
                <FeatureMap settings={settings} />
                <Settings settings={settings} onUpdate={updateSettings} />
                <PlayPause play={play} onClick={() => setPlay(!play)} />
            </ClientContext.Provider>
        </div>
    );
}

export default App;
