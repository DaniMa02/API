import React from 'react';
import { Form } from 'react-bootstrap';

const DiskStorageSelect = ({ nodeStorage, selectedDiskStorage, handleDiskStorageChange }) => {
  // Ordenar el almacenamiento de nodos por nombre en orden alfabético
  const sortedNodeStorage = [...nodeStorage].sort((a, b) => a.storage.localeCompare(b.storage));

  return (
    <>
      <Form.Label className="h5 fw-bold text mb-3">Almacenamiento de la máquina</Form.Label>
      <select className="form-control mb-3" value={selectedDiskStorage} onChange={handleDiskStorageChange}>
        <option value="">Selecciona el disco donde se almacenará la máquina</option>
        {sortedNodeStorage.map(storage => (
          <option key={storage.storage} value={storage.storage}>
            {storage.storage}
          </option>
        ))}
      </select>
    </>
  );
};

export default DiskStorageSelect;
