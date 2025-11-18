import React, { useState } from 'react';
import type { Node } from '@xyflow/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X, Settings } from 'lucide-react';
import type { WorkflowNode } from '../types/workflow';

interface NodeConfigPanelProps {
  node: Node<WorkflowNode['data']>;
  onClose: () => void;
  onUpdate: (config: Record<string, any>) => void;
}

export const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({ 
  node, 
  onClose, 
  onUpdate 
}) => {
  const [config, setConfig] = useState(node.data.config || {});

  const handleSave = () => {
    onUpdate(config);
    onClose();
  };

  const renderConfigField = (key: string, schema: any) => {
    const value = config[key] || '';

    switch (schema.type) {
      case 'string':
        if (schema.options) {
          return (
            <select
              value={value}
              onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select {key}</option>
              {schema.options.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        }
        return (
          <Input
            value={value}
            onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
            placeholder={`Enter ${key}`}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => setConfig({ ...config, [key]: parseFloat(e.target.value) || 0 })}
            placeholder={`Enter ${key}`}
            min={schema.min}
            max={schema.max}
            step={schema.step || 'any'}
          />
        );

      default:
        return null;
    }
  };

  const getNodeSchema = () => {
    const { NODE_TYPES } = require('../types/workflow');
    const nodeType = NODE_TYPES.find((nt: any) => nt.label === node.data.label);
    return nodeType?.configSchema || {};
  };

  const schema = getNodeSchema();

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Configure Node</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <Card className="p-4 mb-6">
          <div className="text-sm font-medium text-gray-900">{node.data.label}</div>
          <div className="text-xs text-gray-500 capitalize">{node.type}</div>
        </Card>

        <div className="space-y-4">
          {Object.entries(schema).map(([key, fieldSchema]: [string, any]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {fieldSchema.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderConfigField(key, fieldSchema)}
              {fieldSchema.description && (
                <p className="text-xs text-gray-500 mt-1">{fieldSchema.description}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          <Button onClick={handleSave} className="flex-1">
            Save Configuration
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};