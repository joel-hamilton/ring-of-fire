package main

// TODO
// this currently just passes through the USGS earthquake data, want to eventually save it in redis and only fetch if necessary

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Unable to read .env")
	}

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{os.Getenv("FRONTEND_URL")},
		AllowMethods: []string{"GET", "OPTIONS"},
		AllowHeaders: []string{"Content-Type"},
	}))

	router.GET("/features", getFeatures)
	router.Run("localhost:8080")
}

func getFeatures(c *gin.Context) {
	base, err := url.Parse("https://earthquake.usgs.gov/fdsnws/event/1/query")
	if err != nil {
		c.AbortWithStatus(500)
		return
	}

	params := url.Values{}
	params.Add("eventtype", "earthquake")
	params.Add("format", "geojson")
	params.Add("minmagnitude", c.Query("magnitude"))
	params.Add("starttime", c.Query("start"))
	params.Add("endtime", c.Query("end"))
	base.RawQuery = params.Encode()
	fmt.Println(base.String())

	response, err := http.Get(base.String())
	if err != nil {
		c.AbortWithStatus(500)
		return
	}

	defer response.Body.Close()
	responseData, err := ioutil.ReadAll(response.Body)
	if err != nil {
		c.AbortWithStatus(500)
		return
	}

	type QueryRes struct {
		Features []struct {
			Geometry struct {
				Coordinates []float64 `json:"coordinates"`
			} `json:"geometry"`
			ID         string `json:"id"`
			Properties struct {
				Mag   int    `json:"mag"`
				Place string `json:"place"`
				Time  int64  `json:"time"`
				Title string `json:"title"`
				Type  string `json:"type"`
			} `json:"properties"`
			Type string `json:"type"`
		} `json:"features"`
	}

	// pass-through the events from usgs
	// var parsedResponse map[string]interface{}
	var parsedResponse QueryRes
	json.Unmarshal([]byte(responseData), &parsedResponse)
	c.IndentedJSON(http.StatusOK, parsedResponse)
}
