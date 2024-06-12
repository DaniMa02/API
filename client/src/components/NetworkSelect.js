import React from 'react';
import { Form } from 'react-bootstrap';

const NetworkSelect = ({ networks, selectedNetwork, handleNetworkChange }) => {
  // Ordenar las redes por nombre en orden alfabético
  const sortedNetworks = [...networks].sort((a, b) => a.iface.localeCompare(b.iface));

  return (
    <>
      <Form.Label className="h5 fw-bold text mb-3">VMBRs</Form.Label>
      <select className="form-control mb-3" value={selectedNetwork} onChange={handleNetworkChange}>
        <option value="">Selecciona la VMBR</option>
        {sortedNetworks.map(network => (
          <option key={network.iface} value={network.iface}>
            {network.iface}
          </option>
        ))}
      </select>
    </>
  );
};

export default NetworkSelect;
