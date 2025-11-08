package main

import (
	"encoding/json"
	"io"
	"log"
	"os"
)

func main() {

	log.Println("Engine started")
	strategies, err := os.Open("strategies.json")
	if err != nil {
		log.Println("Error opening strategies file:", err)
	}
	defer strategies.Close()
	var config StrategiesConfig
	byteValue, _ := io.ReadAll(strategies)
	err = json.Unmarshal(byteValue, &config)
	if err != nil {
		log.Println("Error parsing strategies file:", err)
		return
	}

	log.Println("Strategies loaded:", config.Strategies)

	mockTokenPrice := 0.60 // Example price
	for _, strategy := range config.Strategies {
		if strategy.Name == "price-filter" {
			result := applyPriceFilter(strategy, mockTokenPrice)
			log.Printf("Applying price-filter for user %s. Token price %.2f is %s %s: %t", strategy.User, mockTokenPrice, strategy.Filter.Direction, strategy.Filter.Price, result)
		}
	}
}
