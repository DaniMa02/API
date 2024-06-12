import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const RamSizeSelect = ({ ramSize, handleRamSizeChange }) => {
  return (
    <Row>
      <Col xs={9}>
        <Form.Label className="h5 fw-bold text mb-3">RAM</Form.Label>
        <Form.Range
          value={ramSize}
          onChange={handleRamSizeChange}
          min="1"
          max="64"
          step="1"
        />
      </Col>
      <Col xs={3} className="d-flex align-items-center">
        <span className="fw-bold">{ramSize} GB</span>
      </Col>
    </Row>
  );
};

export default RamSizeSelect;
