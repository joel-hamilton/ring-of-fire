// manually fetch data from USGS and persist to Postgres

require('dotenv').config()
const { DateTime } = require('luxon');
const { Pool } = require('pg')
const fetch = require('node-fetch');
const pool = new Pool()
const start = DateTime.local(1995, 1, 3);
const end = DateTime.now()

fetchData(saveData);

async function fetchData(saveFn) {
    let current = start;
    do {
        current = current.plus({ days: 1 });
        const next = current.plus({ days: 1 });
        const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?eventtype=earthquake&format=geojson&minmagnitude=0&starttime=${current.toFormat('yyyy-MM-dd')}&endtime=${next.toFormat('yyyy-MM-dd')}`
        const res = await fetch(url);
        const data = await res.json()
        await saveFn(data);
    } while (current.startOf("day") < end.startOf("day"))
}

async function saveData(data) {
    console.log(data.features.length);
    let promises = data.features.map(feature => {
        return pool.query("INSERT INTO usgs_data (event_type, magnitude, time, feature) VALUES ($1, $2, $3, $4)", [feature.properties.type, feature.properties.mag, DateTime.fromMillis(feature.properties.time).toISO(), feature])
    });

    await Promise.all(promises);
}