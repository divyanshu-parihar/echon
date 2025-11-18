import { useAuth } from '../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import { WorkflowBuilder } from '../components/WorkflowBuilder';

const nodeTypes: NodeTypes = {
  filterNode: FilterNode,
};

export function AppPage() {
  const { user, signOut } = useAuth();



  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Token Strategy Builder
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <User className="w-4 h-4" />
            <span>{user?.email}</span>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <WorkflowBuilder />
      </div>

            {selectedNode && (
              <ConfigPanel
                nodeData={selectedNode.data}
                onClose={() => setSelectedNode(null)}
                onUpdate={updateNodeConfig}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
