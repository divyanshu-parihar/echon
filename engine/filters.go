package main

import "log"

func applyPriceFilter(strategy Strategy, currentPrice float64) bool {
	filterPrice := strategy.Filter.Price
	if filterPrice == 0 {
		log.Println("Error converting price string to float:")
		return false
	}

	switch strategy.Filter.Direction {
	case "above":
		return currentPrice > filterPrice
	case "below":
		return currentPrice < filterPrice
	default:
		log.Println("Unknown direction:", strategy.Filter.Direction)
		return false
	}
}
