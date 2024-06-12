import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const CpuCoresInput = ({ cpuCores = 1, handleCpuCoresChange }) => {
  return (
    <Row>
      <Col xs={9}>
        <Form.Label className="h5 fw-bold text mb-3">Núcleos</Form.Label>
        <Form.Range
          value={cpuCores}
          onChange={handleCpuCoresChange}
          min="1"
          max="32"
          step="1"
        />
      </Col>
      <Col xs={3} className="d-flex align-items-center">
        <span className="fw-bold">{cpuCores}</span>
      </Col>
    </Row>
  );
};

export default CpuCoresInput;
