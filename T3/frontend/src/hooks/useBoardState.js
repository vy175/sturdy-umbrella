import { useState, useRef, useCallback } from 'react';
import { applyNodeChanges, applyEdgeChanges, addEdge, MarkerType } from '@xyflow/react';
import { getLayoutedElements } from '../utils/layout';

export const useBoardState = (persons, setNotification, API_BASE_URL) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const nodesRef = useRef([]);
  const spawnIndex = useRef(0);

  nodesRef.current = nodes;

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#94a3b8' }, style: { stroke: '#94a3b8', strokeWidth: 1.5 } }, eds)),
    []
  );

  const clearBoard = () => {
    setNodes([]);
    setEdges([]);
    spawnIndex.current = 0;
  };

  const autoLayout = useCallback(() => {
    const layouted = getLayoutedElements(nodes, edges);
    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
  }, [nodes, edges]);

  const computeMissingFamilies = (nds) => {
    const familyIds = new Set(nds.filter(n => n.type === 'family').map(n => n.id));
    return nds.map(n => {
      if (n.type === 'person') {
        const allFids = [...(n.data.parentInFamilies || []), ...(n.data.childInFamilies || [])].map(f => f._id || f);
        const hasMissing = allFids.some(fid => !familyIds.has(fid));
        if (n.data.hasMissingFamilies !== hasMissing) {
          return { ...n, data: { ...n.data, hasMissingFamilies: hasMissing } };
        }
      }
      return n;
    });
  };

  const addMissingFamilies = async (personId) => {
    const latestNodes = nodesRef.current;
    const p = persons.find(x => x._id === personId);
    if (!p) return;
    
    const sourceNode = latestNodes.find(n => n.id === personId);
    if (!sourceNode) return;
    
    const sourcePos = sourceNode.position;
    const allFamilyIds = [...(p.parentInFamilies || []), ...(p.childInFamilies || [])].map(f => f._id || f);
    
    try {
      const newNodes = [];
      const newEdges = [];
      const markerOptions = { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#94a3b8' };
      
      for (const fid of allFamilyIds) {
        if (!latestNodes.some(n => n.id === fid)) {
          const res = await fetch(`${API_BASE_URL}/families/${fid}`);
          if (!res.ok) continue;
          
          const fullFamily = await res.json();
          newNodes.push({
            id: fid,
            type: 'family',
            position: { x: sourcePos.x + 300, y: sourcePos.y - 150 },
            data: { id: fid, name: fullFamily.name }
          });
          
          fullFamily.parents?.forEach((parent, idx) => {
            newNodes.push({
              id: parent._id, type: 'person', position: { x: sourcePos.x + 200 + (idx * 200), y: sourcePos.y - 300 },
              data: { id: parent._id, name: parent.name, gender: parent.gender, birthYear: parent.birthYear, onAddMissingFamilies: addMissingFamilies, parentInFamilies: parent.parentInFamilies, childInFamilies: parent.childInFamilies }
            });
            newEdges.push({ id: `e-${parent._id}-${fid}`, source: parent._id, target: fid, markerEnd: markerOptions, style: { stroke: '#94a3b8', strokeWidth: 1.5 } });
          });
          
          fullFamily.children?.forEach((child, idx) => {
            newNodes.push({
              id: child._id, type: 'person', position: { x: sourcePos.x + 220 + (idx * 160), y: sourcePos.y },
              data: { id: child._id, name: child.name, gender: child.gender, birthYear: child.birthYear, onAddMissingFamilies: addMissingFamilies, parentInFamilies: child.parentInFamilies, childInFamilies: child.childInFamilies }
            });
            newEdges.push({ id: `e-${fid}-${child._id}`, source: fid, target: child._id, markerEnd: markerOptions, style: { stroke: '#94a3b8', strokeWidth: 1.5 } });
          });
        }
      }
      
      setNodes(nds => {
          const existingIds = new Set(nds.map(n => n.id));
          const uniqueNewNodes = newNodes.filter(n => !existingIds.has(n.id));
          return computeMissingFamilies([...nds, ...uniqueNewNodes]);
      });
      setEdges(eds => {
          const existingIds = new Set(eds.map(e => e.id));
          const uniqueNewEdges = newEdges.filter(e => !existingIds.has(e.id));
          return [...eds, ...uniqueNewEdges];
      });
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  const expandAllOnBoard = async () => {
    try {
      const personNodes = nodesRef.current.filter(n => n.type === 'person');
      if (personNodes.length === 0) return;
      
      const allPromises = personNodes.map(p => fetch(`${API_BASE_URL}/persons/${p.id}/tree`).then(res => res.json()));
      const responses = await Promise.all(allPromises);
      
      let newNodes = [];
      let newEdges = [];
      
      responses.forEach(response => {
          if (!response.rootFamilies || response.rootFamilies.length === 0) return;
          
          let flatFamilies = [];
          response.rootFamilies.forEach(rf => {
              flatFamilies.push(rf);
              if (rf.descendantFamilies) flatFamilies.push(...rf.descendantFamilies);
              if (rf.ancestorFamilies) flatFamilies.push(...rf.ancestorFamilies);
          });

          flatFamilies.forEach((fullFamily) => {
              const idxRef = spawnIndex.current++;
              const baseX = 400 + (idxRef * 300);
              const baseY = 100 + (idxRef * 80);

              const fId = fullFamily._id;
              newNodes.push({
                id: fId, type: 'family', position: { x: baseX, y: baseY + 150 },
                data: { id: fId, name: fullFamily.name }
              });
              
              const markerOptions = { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#94a3b8' };

              fullFamily.parents?.forEach((p, idx) => {
                  newNodes.push({
                      id: p._id, type: 'person', position: { x: baseX - 100 + (idx * 200), y: baseY },
                      data: { id: p._id, name: p.name, gender: p.gender, birthYear: p.birthYear, onAddMissingFamilies: addMissingFamilies, parentInFamilies: p.parentInFamilies, childInFamilies: p.childInFamilies }
                  });
                  newEdges.push({ id: `e-${p._id}-${fId}`, source: p._id, target: fId, markerEnd: markerOptions, style: { stroke: '#94a3b8', strokeWidth: 1.5 } });
              });

              fullFamily.children?.forEach((c, idx) => {
                  newNodes.push({
                      id: c._id, type: 'person', position: { x: baseX - 80 + (idx * 160), y: baseY + 300 },
                      data: { id: c._id, name: c.name, gender: c.gender, birthYear: c.birthYear, onAddMissingFamilies: addMissingFamilies, parentInFamilies: c.parentInFamilies, childInFamilies: c.childInFamilies }
                  });
                  newEdges.push({ id: `e-${fId}-${c._id}`, source: fId, target: c._id, markerEnd: markerOptions, style: { stroke: '#94a3b8', strokeWidth: 1.5 } });
              });
          });
      });
      
      setNodes(nds => {
          const existingIds = new Set(nds.map(n => n.id));
          const uniqueNewNodes = newNodes.filter(n => !existingIds.has(n.id));
          return computeMissingFamilies([...nds, ...uniqueNewNodes]);
      });
      setEdges(eds => {
          const existingIds = new Set(eds.map(e => e.id));
          const uniqueNewEdges = newEdges.filter(e => !existingIds.has(e.id));
          return [...eds, ...uniqueNewEdges];
      });
      
      // Auto-layout after expanding everything
      setTimeout(() => {
        setNodes(nds => {
          setEdges(eds => {
            const layouted = getLayoutedElements(nds, eds);
            setNodes(layouted.nodes);
            return layouted.edges;
          });
          return nds;
        });
      }, 100);
      
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    }
  };

  const addPersonToBoard = (personId) => {
    const person = persons.find(p => p._id === personId);
    if (!person || nodes.some(n => n.id === personId)) return;
    
    const idxRef = spawnIndex.current++;
    const newNode = {
      id: person._id,
      type: 'person',
      position: { x: 400 + (idxRef * 300), y: 100 + (idxRef * 80) },
      data: { id: person._id, name: person.name, gender: person.gender, birthYear: person.birthYear, onAddMissingFamilies: addMissingFamilies, parentInFamilies: person.parentInFamilies, childInFamilies: person.childInFamilies }
    };
    
    setNodes((nds) => computeMissingFamilies([...nds, newNode]));
  };

  const addFamilyToBoard = (familyId) => {
    if (nodes.some(n => n.id === familyId)) return;
    
    fetch(`${API_BASE_URL}/families/${familyId}`).then(res => res.json()).then(fullFamily => {
        let newNodes = [];
        let newEdges = [];
        const markerOptions = { type: MarkerType.ArrowClosed, width: 20, height: 20, color: '#94a3b8' };

        const parentCount = fullFamily.parents?.length || 0;
        const childCount = fullFamily.children?.length || 0;
        
        const parentSpacing = 200;
        const childSpacing = 160;

        const idxRef = spawnIndex.current++;
        const baseX = 400 + (idxRef * 300);
        const baseY = 100 + (idxRef * 80);

        newNodes.push({
            id: familyId,
            type: 'family',
            position: { x: baseX, y: baseY + 150 },
            data: { id: familyId, name: fullFamily.name }
        });

        fullFamily.parents?.forEach((p, idx) => {
            newNodes.push({
                id: p._id, type: 'person', position: { x: baseX - ((parentCount - 1) * parentSpacing) / 2 + (idx * parentSpacing), y: baseY },
                data: { id: p._id, name: p.name, gender: p.gender, birthYear: p.birthYear, onAddMissingFamilies: addMissingFamilies, parentInFamilies: p.parentInFamilies, childInFamilies: p.childInFamilies }
            });
            newEdges.push({ id: `e-${p._id}-${familyId}`, source: p._id, target: familyId, markerEnd: markerOptions, style: { stroke: '#94a3b8', strokeWidth: 1.5 } });
        });

        fullFamily.children?.forEach((c, idx) => {
            newNodes.push({
                id: c._id, type: 'person', position: { x: baseX - ((childCount - 1) * childSpacing) / 2 + (idx * childSpacing), y: baseY + 300 },
                data: { id: c._id, name: c.name, gender: c.gender, birthYear: c.birthYear, onAddMissingFamilies: addMissingFamilies, parentInFamilies: c.parentInFamilies, childInFamilies: c.childInFamilies }
            });
            newEdges.push({ id: `e-${familyId}-${c._id}`, source: familyId, target: c._id, markerEnd: markerOptions, style: { stroke: '#94a3b8', strokeWidth: 1.5 } });
        });

        setNodes(nds => {
            const existingIds = new Set(nds.map(n => n.id));
            const uniqueNewNodes = newNodes.filter(n => !existingIds.has(n.id));
            return computeMissingFamilies([...nds, ...uniqueNewNodes]);
        });
        setEdges(eds => {
            const existingIds = new Set(eds.map(e => e.id));
            const uniqueNewEdges = newEdges.filter(e => !existingIds.has(e.id));
            return [...eds, ...uniqueNewEdges];
        });
    }).catch(err => setNotification({ type: 'error', message: err.message }));
  };

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    clearBoard,
    autoLayout,
    addPersonToBoard,
    addFamilyToBoard,
    expandAllOnBoard
  };
};
