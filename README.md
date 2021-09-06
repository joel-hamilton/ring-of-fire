# Ring of Fire

Time-travel visualization of seismic events, using data from USGS.

Very much a WIP. The data needs of the frontend are fairly basic, so I'm using this as an opportunity to try out some backends that I haven't worked with too much before. Currently there are 3 backends, I'm building them all concurrently, and they'll eventually return the same data, so they're interchangeable to the frontend.

Usage: `cd web && npm start`
Backends (pick one!):
    - Hasura GraphQL API `cd graphql-server && docker-compose up`
    - Python/Flask REST API `cd python-server && docker build -t python-server . && docker run -it python-server`
    - Simple Golang backend  `cd go-server && go run .`


![Demo](demo.gif)

{{learning|react|typescript|graphql|go|python|postgresql}}