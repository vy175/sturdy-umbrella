import React from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import { Save, Trash2, Network, LayoutTemplate } from 'lucide-react';
import { PersonNode } from '../nodes/PersonNode';
import { FamilyNode } from '../nodes/FamilyNode';
import './Board.css';

const nodeTypes = {
  person: PersonNode,
  family: FamilyNode,
};

export const Board = ({
  notification,
  loading,
  handleSave,
  clearBoard,
  expandAllOnBoard,
  autoLayout,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect
}) => {
  const isValidConnection = (connection) => {
    const sourceNode = nodes.find(n => n.id === connection.source);
    const targetNode = nodes.find(n => n.id === connection.target);
    
    if (!sourceNode || !targetNode) return false;
    
    // Prevent connecting to self
    if (sourceNode.id === targetNode.id) return false;

    // Must be strictly Person -> Family or Family -> Person
    if (sourceNode.type === 'person' && targetNode.type === 'person') return false;
    if (sourceNode.type === 'family' && targetNode.type === 'family') return false;

    return true;
  };

  return (
    <div className="board-container">
      <div className="board-toolbar">
        {notification.message && (
          <div className={`status-msg ${notification.type === 'error' ? 'status-error' : 'status-success'}`}>
            {notification.message}
          </div>
        )}
        <button className="save-btn" style={{backgroundColor: '#fcd34d', color: '#b45309'}} onClick={autoLayout} title="Auto-organize nodes into a clean tree layout">
          <LayoutTemplate size={18} />
          Auto Layout
        </button>
        <button className="save-btn" style={{backgroundColor: '#e0f2fe', color: '#0284c7'}} onClick={expandAllOnBoard} title="Expand all trees for all persons on board">
          <Network size={18} />
          Expand All
        </button>
        <button className="save-btn" style={{backgroundColor: '#e2e8f0', color: '#0f172a'}} onClick={clearBoard} title="Clear the board">
          <Trash2 size={18} />
          Clear Board
        </button>
        <button className="save-btn" onClick={handleSave} disabled={loading}>
          <Save size={18} />
          {loading ? 'Saving...' : 'Save Tree'}
        </button>
      </div>
      
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        isValidConnection={isValidConnection}
        deleteKeyCode={['Backspace', 'Delete']}
        fitView
      >
        <Background color="#cbd5e1" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
