import React from 'react';
import { Form } from 'react-bootstrap';

const PoolSelect = ({ pools, selectedPool, handlePoolChange }) => {
  // Ordenar las pools por nombre en orden alfabético
  const sortedPools = [...pools].sort((a, b) => a.poolid.localeCompare(b.poolid));

  return (
    <>
      <Form.Label className="h5 fw-bold text mb-3">Pool</Form.Label>
      <select className="form-control mb-3" value={selectedPool} onChange={handlePoolChange}>
        <option value="">Selecciona la pool</option>
        {sortedPools.map(pool => (
          <option key={pool.poolid} value={pool.poolid}>
            {pool.poolid}
          </option>
        ))}
      </select>
    </>
  );
};

export default PoolSelect;
