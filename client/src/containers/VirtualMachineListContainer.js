import React, { useState, useEffect } from 'react';
import VirtualMachineList from '../components/VirtualMachineList';
import { Button, Modal, Pagination, Container, Row, Col, ListGroup } from 'react-bootstrap';

const VirtualMachineListContainer = () => {
  const [virtualMachines, setVirtualMachines] = useState([]);
  const [selectedVMs, setSelectedVMs] = useState([]);
  const [ws, setWs] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeletedVMsModal, setShowDeletedVMsModal] = useState(false);
  const [deletedVMs, setDeletedVMs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const newWs = new WebSocket('ws://10.4.1.206:8080');
    setWs(newWs);

    newWs.onopen = () => {
      console.log('WebSocket connection opened');
    };

    newWs.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);

      if (receivedData.virtualMachines) {
        setVirtualMachines(receivedData.virtualMachines);
      }
    };

    newWs.onclose = () => {
      console.log('WebSocket connection closed');
    };

    newWs.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      newWs.close();
    };
  }, []);

  const handleVMSelection = (vmid, isSelected) => {
    setSelectedVMs((prevSelectedVMs) => {
      const vm = virtualMachines.find((vm) => vm.vmid === vmid);
      if (isSelected) {
        return [...prevSelectedVMs, { vmid: vm.vmid, node: vm.node }];
      } else {
        return prevSelectedVMs.filter((vm) => vm.vmid !== vmid);
      }
    });
  };

  const handleDeleteVMs = () => {
    setShowConfirmModal(true);
  };

  const confirmDeleteVMs = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const vmsToDelete = selectedVMs.map(({ vmid, node }) => ({ vmid, node }));
      console.log('Máquinas virtuales a eliminar:', vmsToDelete);
      const data = { deleteVms: true, vms: vmsToDelete};
      const jsonData = JSON.stringify(data);
      ws.send(jsonData);
      setVirtualMachines([]);
      setSelectedVMs([]);
      setCurrentPage(1);
      setDeletedVMs(vmsToDelete);
      setShowDeletedVMsModal(true);
    } else {
      console.error('WebSocket no está abierto');
    }
    setShowConfirmModal(false);
  };

  const cancelDeleteVMs = () => {
    setShowConfirmModal(false);
  };

  const closeDeletedVMsModal = () => {
    setShowDeletedVMsModal(false);
    setDeletedVMs([]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = virtualMachines.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(virtualMachines.length / itemsPerPage);

  const renderPagination = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  return (
    <Container fluid> 
    <div>
      <VirtualMachineList
        virtualMachines={currentItems}
        handleVMSelection={handleVMSelection}
        selectedVMs={selectedVMs}
      />
      <Container fluid>
        <Row>
          <Col xs={8}>
            <Pagination>{renderPagination()}</Pagination>
          </Col>
          <Col xs={4} className="text-end">
            <Button variant="danger" onClick={handleDeleteVMs} className="mb-3">
              Eliminar
            </Button>
          </Col>
        </Row>
      </Container>

      <Modal show={showConfirmModal} onHide={cancelDeleteVMs}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar las máquinas virtuales seleccionadas?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDeleteVMs}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDeleteVMs}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeletedVMsModal} onHide={closeDeletedVMsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Máquinas virtuales eliminadas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {deletedVMs.map((vm) => (
              <ListGroup.Item key={vm.vmid} className="d-flex justify-content-between align-items-center">
                <span>ID: {vm.vmid}</span>
                <span className="fw-bold">Nodo: {vm.node}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeDeletedVMsModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      </Container>
  );
};

export default VirtualMachineListContainer;
