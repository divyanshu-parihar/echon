export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  position: { x: number; y: number };
  data: {
    label: string;
    config: Record<string, any>;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  userId: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NodeType {
  type: 'trigger' | 'condition' | 'action';
  label: string;
  description: string;
  configSchema: Record<string, any>;
  category: 'token' | 'price' | 'trading' | 'notification';
}

export const NODE_TYPES: NodeType[] = [
  {
    type: 'trigger',
    label: 'Token Launch',
    description: 'Trigger when a new token is launched',
    configSchema: {
      chain: { type: 'string', required: true, options: ['ethereum', 'bsc', 'polygon'] },
      minLiquidity: { type: 'number', required: false }
    },
    category: 'token'
  },
  {
    type: 'trigger',
    label: 'Price Change',
    description: 'Trigger when token price changes',
    configSchema: {
      token: { type: 'string', required: true },
      changeType: { type: 'string', required: true, options: ['percentage', 'absolute'] },
      changeValue: { type: 'number', required: true },
      direction: { type: 'string', required: true, options: ['above', 'below'] }
    },
    category: 'price'
  },
  {
    type: 'condition',
    label: 'Price Filter',
    description: 'Filter by token price',
    configSchema: {
      price: { type: 'number', required: true },
      direction: { type: 'string', required: true, options: ['above', 'below'] }
    },
    category: 'price'
  },
  {
    type: 'condition',
    label: 'Liquidity Filter',
    description: 'Filter by liquidity amount',
    configSchema: {
      minLiquidity: { type: 'number', required: true },
      currency: { type: 'string', required: true, options: ['USD', 'ETH', 'BNB'] }
    },
    category: 'trading'
  },
  {
    type: 'action',
    label: 'Buy Token',
    description: 'Buy a specific amount of token',
    configSchema: {
      amount: { type: 'number', required: true },
      currency: { type: 'string', required: true, options: ['USD', 'ETH', 'BNB'] },
      slippage: { type: 'number', required: false, default: 3 }
    },
    category: 'trading'
  },
  {
    type: 'action',
    label: 'Sell Token',
    description: 'Sell a specific amount of token',
    configSchema: {
      percentage: { type: 'number', required: true, min: 1, max: 100 },
      slippage: { type: 'number', required: false, default: 3 }
    },
    category: 'trading'
  },
  {
    type: 'action',
    label: 'Send Notification',
    description: 'Send notification alert',
    configSchema: {
      message: { type: 'string', required: true },
      type: { type: 'string', required: true, options: ['email', 'telegram', 'discord'] }
    },
    category: 'notification'
  }
];