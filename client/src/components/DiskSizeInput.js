import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const DiskSizeInput = ({ diskSize = 10, handleDiskSizeChange }) => {
  return (
    <Row>
      <Col xs={9}>
        <Form.Label className="h5 fw-bold text mb-3">Tamaño del disco</Form.Label>
        <Form.Range
          value={diskSize}
          onChange={handleDiskSizeChange}
          min="10"
          max="1000"
          step="10"
        />
      </Col>
      <Col xs={3} className="d-flex align-items-center">
        <span className="fw-bold">{diskSize} GB</span>
      </Col>
    </Row>
  );
};

export default DiskSizeInput;
