import React from 'react';
import { Form } from 'react-bootstrap';

const IsoSelect = ({ isos, selectedIso, handleIsoChange }) => {
  // Ordenar las ISOs por nombre en orden alfabético
  const sortedIsos = [...isos].sort((a, b) => a.volid.localeCompare(b.volid));

  return (
    <>
      <Form.Label className="h5 fw-bold text mb-3">ISOs</Form.Label>
      <select className="form-control mb-3" value={selectedIso} onChange={handleIsoChange}>
        <option value="">Selecciona la ISO</option>
        {sortedIsos.map(iso => (
          <option key={iso.volid} value={iso.volid}>
            {iso.volid.split('/').pop()}
          </option>
        ))}
      </select>
    </>
  );
};

export default IsoSelect;
