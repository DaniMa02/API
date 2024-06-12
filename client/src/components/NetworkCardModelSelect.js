import React from 'react';
import { Form } from 'react-bootstrap';

const NetworkCardModelSelect = ({ networkCardModels, selectedNetworkCardModel, handleNetworkCardModelChange }) => {
  return (
    <div>
      <Form.Label className="h5 fw-bold text mb-3">Modelo de tarjeta de red</Form.Label>
      <select className='form-control mb-3'
        value={selectedNetworkCardModel}
        onChange={handleNetworkCardModelChange}
      >
        <option value="">Seleccionar modelo</option>
        {networkCardModels.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NetworkCardModelSelect;