import React from 'react';
import { Form } from 'react-bootstrap';

const KernelSelect = ({ kernels, selectedKernel, handleKernelChange }) => {
  return (
    <>
      <Form.Label className="h5 fw-bold text mb-3">Kernel</Form.Label>
      <select className="form-control mb-3" value={selectedKernel} onChange={handleKernelChange}>
        <option value="">Selecciona un kernel</option>
        {kernels && kernels.map(kernel => (
          <option key={kernel.value} value={kernel.value}>
            {kernel.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default KernelSelect;
