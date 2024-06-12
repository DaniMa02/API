import React from 'react';
import { Form } from 'react-bootstrap';

const NodeSelect = ({ nodes, selectedNode, handleNodeChange }) => {
  // Ordenar los nodos por nombre en orden alfabético
  const sortedNodes = [...nodes].sort((a, b) => a.node.localeCompare(b.node));

  return (
    <>
      <Form.Label className="h5 fw-bold text mb-3">Nodo</Form.Label>
      <select className="form-control mb-3" value={selectedNode} onChange={handleNodeChange}>
        <option value="">Selecciona un nodo</option>
        {sortedNodes.map(node => (
          <option key={node.node} value={node.node}>
            {node.node}
          </option>
        ))}
      </select>
    </>
  );
};

export default NodeSelect;
