import { X } from 'lucide-react';
import type { FilterNodeData } from '../types';

interface ConfigPanelProps {
  nodeData: FilterNodeData | null;
  onClose: () => void;
  onUpdate: (config: Partial<FilterNodeData['config']>) => void;
}

export function ConfigPanel({ nodeData, onClose, onUpdate }: ConfigPanelProps) {
  if (!nodeData) return null;

  return (
    <div className="absolute top-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Configure Filter</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Filter Type</label>
          <div className="px-3 py-2 bg-gray-50 rounded border border-gray-200">
            {nodeData.label}
          </div>
        </div>

        {nodeData.filterType === 'price' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={nodeData.config.price || 0}
                onChange={(e) => onUpdate({ price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Direction</label>
              <select
                value={nodeData.config.direction || 'above'}
                onChange={(e) => onUpdate({ direction: e.target.value as 'above' | 'below' })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="above">Above</option>
                <option value="below">Below</option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
