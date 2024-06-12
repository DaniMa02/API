import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const CpuSocketsInput = ({ cpuSockets = 1, handleCpuSocketsChange }) => {
  return (
    <Row>
      <Col xs={9}>
        <Form.Label className="h5 fw-bold text mb-3">Sockets</Form.Label>
        <Form.Range
          value={cpuSockets}
          onChange={handleCpuSocketsChange}
          min="1"
          max="8"
          step="1"
        />
      </Col>
      <Col xs={3} className="d-flex align-items-center">
        <span className="fw-bold">{cpuSockets}</span>
      </Col>
    </Row>
  );
};

export default CpuSocketsInput;
