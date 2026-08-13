import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Heart } from 'lucide-react';
import './Nodes.css';

export const FamilyNode = ({ data, selected }) => {
  return (
    <div className={`family-node ${selected ? 'selected' : ''}`} title={data.name || 'Family Hub'}>
      <Handle type="target" position={Position.Top} id="t-top" />
      <Heart className="family-icon" size={24} />
      <Handle type="source" position={Position.Bottom} id="s-bottom" />
    </div>
  );
};
