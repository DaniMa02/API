import React from 'react';
import { Form } from 'react-bootstrap';

const VmNameInput = ({ vmNames, handleVmNamesChange }) => {
  return (
    <>
      <Form.Label className="h5 fw-bold text mb-3">Nombres</Form.Label>
      <input
        className="form-control mb-3"
        type="text"
        value={vmNames}
        onChange={handleVmNamesChange}
        placeholder="Introduce el nombre de las máquinas virtuales separados por espacios"
      />
    </>
  );
};

export default VmNameInput;
