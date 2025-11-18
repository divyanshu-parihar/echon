import { Filter, DollarSign, Save, Download } from 'lucide-react';

interface SidebarProps {
  onExport: () => void;
  onLoad: () => void;
}

export function Sidebar({ onExport, onLoad }: SidebarProps) {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4 space-y-6">
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter Nodes
        </h2>
        
        <div className="space-y-2">
          <div
            className="flex items-center gap-2 p-3 bg-white border-2 border-gray-300 rounded-lg cursor-move hover:border-blue-500 transition-colors"
            onDragStart={(e) => onDragStart(e, 'priceFilter')}
            draggable
          >
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium">Price Filter</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200 space-y-2">
        <button
          onClick={onExport}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Export Strategy
        </button>
        
        <button
          onClick={onLoad}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Load Strategy
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold mb-2">Instructions</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Drag filter nodes to canvas</li>
          <li>• Click nodes to configure</li>
          <li>• Connect nodes to build pipeline</li>
          <li>• Save to export JSON</li>
        </ul>
      </div>
    </aside>
  );
}
