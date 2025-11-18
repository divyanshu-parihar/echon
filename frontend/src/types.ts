import type { Node } from '@xyflow/react';

export interface PriceFilter {
  price: number;
  direction: 'above' | 'below';
}

export interface Strategy {
  user: string;
  name: string;
  filter: PriceFilter;
}

export interface StrategiesConfig {
  strategies: Strategy[];
}

export type FilterNodeData = {
  label: string;
  filterType: 'price' | 'volume' | 'marketCap';
  config: Partial<PriceFilter>;
};

export type FilterNode = Node<FilterNodeData, 'filter'>;

// Re-export workflow types
export type { WorkflowNode, WorkflowEdge, Workflow, NodeType } from './workflow';
export { NODE_TYPES } from './workflow';
