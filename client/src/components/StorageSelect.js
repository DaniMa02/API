import React from 'react';
import { Form } from 'react-bootstrap';

const StorageSelect = ({ nodeStorage, selectedStorage, handleStorageChange }) => {
  // Ordenar el almacenamiento de nodos por nombre en orden alfabético
  const sortedNodeStorage = [...nodeStorage].sort((a, b) => a.storage.localeCompare(b.storage));

  return (
    <>
      <Form.Label className="h5 fw-bold text mb-3">Ruta de la ISO</Form.Label>
      <select className="form-control mb-3" value={selectedStorage} onChange={handleStorageChange}>
        <option value="">Selecciona el disco donde se encuentra tu ISO</option>
        {sortedNodeStorage.map(storage => (
          <option key={storage.storage} value={storage.storage}>
            {storage.storage}
          </option>
        ))}
      </select>
    </>
  );
};

export default StorageSelect;
