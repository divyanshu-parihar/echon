# Solana Token Trading Pipeline Builder

A modern React application for building custom trading pipelines with filters for Solana tokens.

## Features

- 🎨 **Visual Pipeline Builder** - Drag and drop interface using React Flow
- 🔧 **Custom Filters** - Configure price filters with above/below conditions
- 💾 **Save/Load Pipelines** - Export and import pipeline configurations as JSON
- 🎯 **Real-time Configuration** - Click nodes to configure filter parameters
- 🚀 **Modern UI** - Clean, responsive design with utility-based styling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## Usage

1. **Add Filters**: Drag the "Price Filter" node from the sidebar onto the canvas
2. **Configure**: Click on a node to open the configuration panel
3. **Set Parameters**: 
   - Enter the price threshold
   - Choose direction (above/below)
4. **Connect Nodes**: Draw connections between nodes to build your pipeline
5. **Save**: Click "Save Pipeline" to export as JSON
6. **Load**: Click "Load Pipeline" to import existing configurations

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── FilterNode.tsx      # Custom React Flow node component
│   │   ├── Sidebar.tsx         # Sidebar with draggable filters
│   │   └── ConfigPanel.tsx     # Configuration panel for nodes
│   ├── types.ts                # TypeScript type definitions
│   ├── App.tsx                 # Main application component
│   └── index.css               # Utility CSS classes
├── package.json
└── vite.config.ts
```

## Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Flow** - Visual node-based editor
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **Axios** - HTTP client

## Backend Integration

The application is designed to work with the Go backend in the `engine/` directory. It saves filter configurations to `strategies.json` which the backend reads to execute trading strategies.

### API Endpoints (To be implemented)

- `POST /api/strategies` - Save pipeline configuration
- `GET /api/strategies` - Load pipeline configuration

## License

MIT
