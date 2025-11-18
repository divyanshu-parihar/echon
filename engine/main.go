package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
)

type WorkflowNode struct {
	ID       string                 `json:"id"`
	Type     string                 `json:"type"` // trigger, condition, action
	Position map[string]float64     `json:"position"`
	Data     map[string]interface{} `json:"data"`
}

type WorkflowEdge struct {
	ID     string `json:"id"`
	Source string `json:"source"`
	Target string `json:"target"`
}

type Workflow struct {
	ID          string         `json:"id"`
	Name        string         `json:"name"`
	Description string         `json:"description"`
	UserID      string         `json:"userId"`
	Nodes       []WorkflowNode `json:"nodes"`
	Edges       []WorkflowEdge `json:"edges"`
	IsActive    bool           `json:"isActive"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
}

type WorkflowStore struct {
	Workflows map[string]Workflow
}

var store = &WorkflowStore{
	Workflows: make(map[string]Workflow),
}

func main() {
	r := chi.NewRouter()

	// CORS middleware
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	})

	// Workflow routes
	r.Route("/api/workflows", func(r chi.Router) {
		r.Get("/", listWorkflows)
		r.Post("/", createWorkflow)
		r.Get("/{id}", getWorkflow)
		r.Put("/{id}", updateWorkflow)
		r.Delete("/{id}", deleteWorkflow)
		r.Post("/{id}/execute", executeWorkflow)
	})

	// Legacy strategies endpoint for backward compatibility
	r.Route("/api/strategies", func(r chi.Router) {
		r.Get("/", getLegacyStrategies)
		r.Post("/", saveLegacyStrategies)
	})

	fmt.Println("Server starting on :8080...")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func listWorkflows(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("userId")
	if userID == "" {
		userID = "anonymous"
	}

	var userWorkflows []Workflow
	for _, workflow := range store.Workflows {
		if workflow.UserID == userID {
			userWorkflows = append(userWorkflows, workflow)
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(userWorkflows)
}

func createWorkflow(w http.ResponseWriter, r *http.Request) {
	var workflow Workflow
	if err := json.NewDecoder(r.Body).Decode(&workflow); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	workflow.ID = uuid.New().String()
	workflow.CreatedAt = time.Now()
	workflow.UpdatedAt = time.Now()

	if workflow.UserID == "" {
		workflow.UserID = "anonymous"
	}

	store.Workflows[workflow.ID] = workflow

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(workflow)
}

func getWorkflow(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	workflow, exists := store.Workflows[id]
	if !exists {
		http.Error(w, "Workflow not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(workflow)
}

func updateWorkflow(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	
	var updatedWorkflow Workflow
	if err := json.NewDecoder(r.Body).Decode(&updatedWorkflow); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	workflow, exists := store.Workflows[id]
	if !exists {
		http.Error(w, "Workflow not found", http.StatusNotFound)
		return
	}

	updatedWorkflow.ID = id
	updatedWorkflow.CreatedAt = workflow.CreatedAt
	updatedWorkflow.UpdatedAt = time.Now()

	store.Workflows[id] = updatedWorkflow

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(updatedWorkflow)
}

func deleteWorkflow(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	
	if _, exists := store.Workflows[id]; !exists {
		http.Error(w, "Workflow not found", http.StatusNotFound)
		return
	}

	delete(store.Workflows, id)
	w.WriteHeader(http.StatusNoContent)
}

func executeWorkflow(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	workflow, exists := store.Workflows[id]
	if !exists {
		http.Error(w, "Workflow not found", http.StatusNotFound)
		return
	}

	// Execute the workflow logic
	executionResult := executeWorkflowLogic(workflow)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(executionResult)
}

func executeWorkflowLogic(workflow Workflow) map[string]interface{} {
	log.Printf("Executing workflow: %s", workflow.Name)

	// Create node lookup
	nodeByID := make(map[string]WorkflowNode)
	for _, node := range workflow.Nodes {
		nodeByID[node.ID] = node
	}

	// Create adjacency list
	adjacency := make(map[string][]string)
	incoming := make(map[string]int)
	
	for _, edge := range workflow.Edges {
		adjacency[edge.Source] = append(adjacency[edge.Source], edge.Target)
		incoming[edge.Target]++
	}

	// Find trigger nodes (no incoming edges)
	var triggers []string
	for _, node := range workflow.Nodes {
		if incoming[node.ID] == 0 && node.Type == "trigger" {
			triggers = append(triggers, node.ID)
		}
	}

	if len(triggers) == 0 {
		return map[string]interface{}{
			"status":  "error",
			"message": "No trigger nodes found in workflow",
		}
	}

	// Execute workflow starting from triggers
	executedNodes := make(map[string]bool)
	results := make(map[string]interface{})

	for _, triggerID := range triggers {
		executeNode(triggerID, nodeByID, adjacency, executedNodes, results)
	}

	return map[string]interface{}{
		"workflowId": workflow.ID,
		"status":     "completed",
		"timestamp":  time.Now(),
		"message":    fmt.Sprintf("Workflow '%s' executed successfully", workflow.Name),
		"results":    results,
	}
}

func executeNode(nodeID string, nodeByID map[string]WorkflowNode, adjacency map[string][]string, executedNodes map[string]bool, results map[string]interface{}) {
	if executedNodes[nodeID] {
		return
	}

	node, exists := nodeByID[nodeID]
	if !exists {
		return
	}

	executedNodes[nodeID] = true

	// Execute node based on type
	var nodeResult interface{}
	switch node.Type {
	case "trigger":
		nodeResult = executeTrigger(node)
	case "condition":
		nodeResult = executeCondition(node)
	case "action":
		nodeResult = executeAction(node)
	}

	results[nodeID] = nodeResult

	// Execute child nodes
	for _, childID := range adjacency[nodeID] {
		executeNode(childID, nodeByID, adjacency, executedNodes, results)
	}
}

func executeTrigger(node WorkflowNode) interface{} {
	log.Printf("Executing trigger: %s", node.Data["label"])
	
	switch node.Data["label"] {
	case "Token Launch":
		return map[string]interface{}{
			"triggered": true,
			"token": map[string]interface{}{
				"address": "0x1234567890123456789012345678901234567890",
				"name":    "Example Token",
				"symbol":  "EX",
				"chain":   "ethereum",
			},
		}
	case "Price Change":
		return map[string]interface{}{
			"triggered": true,
			"price": map[string]interface{}{
				"token":     "0x1234567890123456789012345678901234567890",
				"oldPrice":  0.50,
				"newPrice":  0.75,
				"change":    50.0,
			},
		}
	default:
		return map[string]interface{}{"triggered": true}
	}
}

func executeCondition(node WorkflowNode) interface{} {
	log.Printf("Executing condition: %s", node.Data["label"])
	
	config := node.Data["config"].(map[string]interface{})
	
	switch node.Data["label"] {
	case "Price Filter":
		price := config["price"].(float64)
		direction := config["direction"].(string)
		currentPrice := 0.60 // Mock current price
		
		passes := false
		if direction == "above" {
			passes = currentPrice > price
		} else {
			passes = currentPrice < price
		}
		
		return map[string]interface{}{
			"passes": passes,
			"price":  currentPrice,
		}
	case "Liquidity Filter":
		minLiquidity := config["minLiquidity"].(float64)
		currentLiquidity := 100000.0 // Mock liquidity
		
		return map[string]interface{}{
			"passes":    currentLiquidity >= minLiquidity,
			"liquidity": currentLiquidity,
		}
	default:
		return map[string]interface{}{"passes": true}
	}
}

func executeAction(node WorkflowNode) interface{} {
	log.Printf("Executing action: %s", node.Data["label"])
	
	switch node.Data["label"] {
	case "Buy Token":
		return map[string]interface{}{
			"executed": true,
			"action":   "buy",
			"amount":   "100 USD",
			"txHash":   "0xabcdef1234567890",
		}
	case "Sell Token":
		return map[string]interface{}{
			"executed": true,
			"action":   "sell",
			"percentage": 50,
			"txHash":   "0x1234567890abcdef",
		}
	case "Send Notification":
		return map[string]interface{}{
			"executed": true,
			"action":   "notification",
			"type":     "email",
			"message":  "Trading signal triggered",
		}
	default:
		return map[string]interface{}{"executed": true}
	}
}

// Legacy endpoints for backward compatibility
type LegacyStrategy struct {
	User   string      `json:"user"`
	Name   string      `json:"name"`
	Filter interface{} `json:"filter"`
}

type LegacyConfig struct {
	Strategies []LegacyStrategy `json:"strategies"`
}

func getLegacyStrategies(w http.ResponseWriter, r *http.Request) {
	// Convert workflows to legacy format
	var strategies []LegacyStrategy
	for _, workflow := range store.Workflows {
		strategy := LegacyStrategy{
			User: workflow.UserID,
			Name: workflow.Name,
		}
		
		// Extract filter info from first condition node if exists
		for _, node := range workflow.Nodes {
			if node.Type == "condition" {
				strategy.Filter = node.Data["config"]
				break
			}
		}
		
		strategies = append(strategies, strategy)
	}

	config := LegacyConfig{Strategies: strategies}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(config)
}

func saveLegacyStrategies(w http.ResponseWriter, r *http.Request) {
	var config LegacyConfig
	if err := json.NewDecoder(r.Body).Decode(&config); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Convert legacy strategies to workflows
	for _, strategy := range config.Strategies {
		workflow := Workflow{
			ID:          uuid.New().String(),
			Name:        strategy.Name,
			Description: "Migrated from legacy format",
			UserID:      strategy.User,
			IsActive:    true,
			CreatedAt:   time.Now(),
			UpdatedAt:   time.Now(),
			Nodes: []WorkflowNode{
				{
					ID:   uuid.New().String(),
					Type: "condition",
					Position: map[string]float64{"x": 100, "y": 100},
					Data: map[string]interface{}{
						"label":  "Price Filter",
						"config": strategy.Filter,
					},
				},
			},
			Edges: []WorkflowEdge{},
		}
		store.Workflows[workflow.ID] = workflow
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "success"})
}