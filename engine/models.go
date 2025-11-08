package main

type PriceFilter struct {
	Price     float64 `json:"price"`
	Direction string  `json:"direction"`
}

type Strategy struct {
	User   string      `json:"user"`
	Name   string      `json:"name"`
	Filter PriceFilter `json:"filter"`
}

type StrategiesConfig struct {
	Strategies []Strategy `json:"strategies"`
}
