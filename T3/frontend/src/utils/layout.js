import dagre from 'dagre';

export const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Define graph layout settings
  dagreGraph.setGraph({ 
      rankdir: direction,
      nodesep: 150, // Space between nodes horizontally
      ranksep: 100, // Space between layers vertically
      edgesep: 100,
  });

  nodes.forEach((node) => {
    // We assume default dimensions for nodes if they aren't measured yet
    const width = node.type === 'person' ? 180 : 120;
    const height = node.type === 'person' ? 80 : 50;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const width = node.type === 'person' ? 180 : 120;
    const height = node.type === 'person' ? 80 : 50;

    // Dagre returns the center point of the node, React Flow expects the top-left point
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - width / 2,
        y: nodeWithPosition.y - height / 2,
      },
    };
  });

  return { nodes: newNodes, edges };
};
