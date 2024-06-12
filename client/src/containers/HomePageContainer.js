import React, { useState, useEffect } from 'react';
import PoolSelect from '../components/PoolSelect.js';
import KernelSelect from '../components/KernelSelect.js';
import NodeSelect from '../components/NodeSelect.js';
import StorageSelect from '../components/StorageSelect.js';
import NetworkSelect from '../components/NetworkSelect.js';
import VmNameInput from '../components/VmNameInput.js';
import DiskSizeInput from '../components/DiskSizeInput.js';
import CpuCoresInput from '../components/CpuCoresInput.js';
import CpuSocketsInput from '../components/CpuSocketsInput.js';
import RamSizeSelect from '../components/RamSizeSelect.js';
import IsoSelect from '../components/IsoSelect.js';
import DiskStorageSelect from '../components/DiskStorageSelect.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Modal, Button, ListGroup } from 'react-bootstrap';

const HomePage = () => {
  const [data, setData] = useState({
    pools: [],
    kernels: [],
    nodes: [],
    networks: [],
  });
  const [selectedPool, setSelectedPool] = useState('');
  const [selectedKernel, setSelectedKernel] = useState('');
  const [selectedNode, setSelectedNode] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedDiskStorage, setSelectedDiskStorage] = useState('');
  const [nodeStorage, setNodeStorage] = useState([]);
  const [isos, setIsos] = useState([]);
  const [selectedIso, setSelectedIso] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [vmNames, setVmNames] = useState('');
  const [diskSize, setDiskSize] = useState(10);
  const [cpuCores, setCpuCores] = useState(1);
  const [cpuSockets, setCpuSockets] = useState(1);
  const [ramSize, setRamSize] = useState(1);
  const [ws, setWs] = useState(null);
  const [vmCreationQueue, setVmCreationQueue] = useState([]);
  const [createdVMs, setCreatedVMs] = useState([]);
  const [showCreatedVMsModal, setShowCreatedVMsModal] = useState(false);

  useEffect(() => {
    const newWs = new WebSocket('ws://10.4.1.206:8080');
    setWs(newWs);

    newWs.onopen = () => {
      console.log('WebSocket connection opened');
    };

    newWs.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData.error) {
        console.error('Error:', receivedData.error);
      } else if (receivedData.vmName) {
        console.log(`Máquina virtual ${receivedData.vmName} (ID: ${receivedData.vmid}) creada`);
        setCreatedVMs((prevVMs) => [...prevVMs, { vmName: receivedData.vmName, vmid: receivedData.vmid }]);
        setVmCreationQueue((prevQueue) => prevQueue.slice(1));
      } else {
        setData((prevData) => ({
          ...prevData,
          pools: receivedData.pools,
          kernels: receivedData.kernels,
          nodes: receivedData.nodes,
          networks: receivedData.networks,
        }));

        updateIsos(receivedData.nodes, selectedNode, selectedStorage);
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
  }, [selectedNode, selectedStorage]);

  useEffect(() => {
    const sendCreateVmRequest = (vmConfig) => {
      if (ws) {
        ws.send(JSON.stringify({ createVm: true, vmConfig }));
      }
    };

    if (vmCreationQueue.length > 0) {
      const nextVmConfig = vmCreationQueue[0];
      sendCreateVmRequest(nextVmConfig);
    } else if (createdVMs.length > 0) {
      setShowCreatedVMsModal(true);
    }
  }, [vmCreationQueue, ws, createdVMs]);

  const updateIsos = (nodes, selectedNodeId, selectedStorageId) => {
    if (nodes && selectedNodeId && selectedStorageId) {
      const selectedNode = nodes.find((node) => node.node === selectedNodeId);
      if (selectedNode) {
        const selectedStorage = selectedNode.storage.find((storage) => storage.storage === selectedStorageId);
        if (selectedStorage) {
          setIsos(selectedStorage.isos);
        } else {
          setIsos([]);
        }
      } else {
        setIsos([]);
      }
    } else {
      setIsos([]);
    }
  };

  const handlePoolChange = (event) => {
    setSelectedPool(event.target.value);
  };

  const handleKernelChange = (event) => {
    setSelectedKernel(event.target.value);
  };

  const handleNodeChange = (event) => {
    const selectedNodeId = event.target.value;
    setSelectedNode(selectedNodeId);

    const selectedNode = data.nodes.find((node) => node.node === selectedNodeId);
    const selectedNodeStorage = selectedNode ? selectedNode.storage : [];
    setNodeStorage(selectedNodeStorage);
    updateIsos(data.nodes, selectedNodeId, selectedStorage);
  };

  const handleStorageChange = (event) => {
    const selectedStorageId = event.target.value;
    setSelectedStorage(selectedStorageId);

    updateIsos(data.nodes, selectedNode, selectedStorageId);
  };

  const handleDiskStorageChange = (event) => {
    const selectedDiskStorageId = event.target.value;
    setSelectedDiskStorage(selectedDiskStorageId);
  };

  const handleNetworkChange = (event) => {
    setSelectedNetwork(event.target.value);
  };

  const handleVmNamesChange = (event) => {
    setVmNames(event.target.value);
  };

  const handleDiskSizeChange = (event) => {
    setDiskSize(event.target.value);
  };

  const handleIsoChange = (event) => {
    setSelectedIso(event.target.value);
  };

  const handleCpuCoresChange = (event) => {
    setCpuCores(event.target.value);
  };

  const handleCpuSocketsChange = (event) => {
    setCpuSockets(event.target.value);
  };

  const handleRamSizeChange = (event) => {
    setRamSize(event.target.value);
  };

  const createVirtualMachines = () => {
    const vmNamesList = vmNames.split(' ').filter((name) => name.trim() !== '');

    const vmConfigs = vmNamesList.map((vmName) => ({
      vmName,
      pool: selectedPool,
      kernel: selectedKernel,
      node: selectedNode,
      storage: selectedStorage,
      diskStorage: selectedDiskStorage,
      network: selectedNetwork,
      diskSize,
      cpuCores,
      cpuSockets,
      ramSize,
      iso: selectedIso,
    }));
    console.log(vmConfigs);

    setVmCreationQueue((prevQueue) => [...prevQueue, ...vmConfigs]);
  };

  const closeCreatedVMsModal = () => {
    setShowCreatedVMsModal(false);
    setCreatedVMs([]);
  };

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col md={3}>
          <NodeSelect nodes={data.nodes} selectedNode={selectedNode} handleNodeChange={handleNodeChange} />
          <VmNameInput vmNames={vmNames} handleVmNamesChange={handleVmNamesChange} />
          <PoolSelect pools={data.pools} selectedPool={selectedPool} handlePoolChange={handlePoolChange} />
        </Col>
        <Col md={3}>
          <StorageSelect
            nodeStorage={nodeStorage}
            selectedStorage={selectedStorage}
            handleStorageChange={handleStorageChange}
          />
          <IsoSelect isos={isos} selectedIso={selectedIso} handleIsoChange={handleIsoChange} />
          <KernelSelect kernels={data.kernels} selectedKernel={selectedKernel} handleKernelChange={handleKernelChange} />
        </Col>
        <Col md={3}>
          <CpuSocketsInput cpuSockets={cpuSockets} handleCpuSocketsChange={handleCpuSocketsChange} />
          <CpuCoresInput cpuCores={cpuCores} handleCpuCoresChange={handleCpuCoresChange} />
          <RamSizeSelect ramSize={ramSize} handleRamSizeChange={handleRamSizeChange} />
          <DiskSizeInput diskSize={diskSize} handleDiskSizeChange={handleDiskSizeChange} />
        </Col>
        <Col md={3}>
          <NetworkSelect
            networks={data.networks}
            selectedNetwork={selectedNetwork}
            handleNetworkChange={handleNetworkChange}
          />
          <DiskStorageSelect
            nodeStorage={nodeStorage}
            selectedDiskStorage={selectedDiskStorage}
            handleDiskStorageChange={handleDiskStorageChange}
          />
        </Col>
      </Row>
      <div className="text-center">
        <button className="btn btn-primary" onClick={createVirtualMachines}>
          Crear
        </button>
      </div>

      <Modal show={showCreatedVMsModal} onHide={closeCreatedVMsModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Máquinas virtuales creadas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {createdVMs.map((vm) => (
              <ListGroup.Item key={vm.vmid} className="d-flex justify-content-between align-items-center">
                <span>{vm.vmName}</span>
                <span className="fw-bold">ID: {vm.vmid}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeCreatedVMsModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
  );
};

export default HomePage;
