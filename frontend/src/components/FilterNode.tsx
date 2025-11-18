import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { FilterNode } from '../types';
import { Filter, TrendingUp, TrendingDown } from 'lucide-react';

export function FilterNode({ data, selected }: NodeProps<FilterNode>) {
  return (
    <div
      className={`px-4 py-3 shadow-lg rounded-lg border-2 bg-white min-w-200 ${
        selected ? 'border-blue-500' : 'border-gray-300'
      }`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-4 h-4 text-blue-600" />
        <div className="font-bold text-sm">{data.label}</div>
      </div>
      
      {data.config.price !== undefined && (
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-1">
            {data.config.direction === 'above' ? (
              <TrendingUp className="w-3 h-3 text-green-600" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-600" />
            )}
            <span className="capitalize">{data.config.direction}</span>
          </div>
          <div className="font-mono">${data.config.price.toFixed(2)}</div>
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
