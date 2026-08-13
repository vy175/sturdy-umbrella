import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { MoreHorizontal, Network } from 'lucide-react';
import './Nodes.css';

export const PersonNode = ({ data, selected }) => {
  return (
    <div className={`person-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} id="t-top" />
      <img 
        className="person-avatar" 
        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${data.id}&gender=${data.gender === 'male' ? 'male' : 'female'}`} 
        alt="avatar" 
      />
      <div className="person-name">{data.name}</div>
      <div className="person-details">{data.birthYear || '?'}</div>
      
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        {data.hasMissingFamilies && (
          <button 
            className="icon-btn" 
            style={{ padding: '2px', backgroundColor: '#f1f5f9' }} 
            onClick={() => data.onAddMissingFamilies && data.onAddMissingFamilies(data.id)} 
            title="Load missing families"
          >
            <MoreHorizontal size={14} />
          </button>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} id="s-bottom" />
    </div>
  );
};
