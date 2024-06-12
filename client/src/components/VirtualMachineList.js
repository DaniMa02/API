import React from 'react';
import { Table, Form } from 'react-bootstrap';

const VirtualMachineList = ({ virtualMachines, handleVMSelection, selectedVMs }) => {
  const isVMSelected = (vmid) => selectedVMs.some((vm) => vm.vmid === vmid);

  const handleSwitchChange = (vmid) => {
    const isSelected = isVMSelected(vmid);
    handleVMSelection(vmid, !isSelected);
  };

  const sortedVirtualMachines = [...virtualMachines].sort((a, b) => a.vmid - b.vmid);

  return (
    <div>
      <br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="p-0 text-center" style={{ width: '50px' }}></th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Nodo</th>
          </tr>
        </thead>
        <tbody>
          {sortedVirtualMachines.map((vm) => (
            <tr key={vm.vmid}>
              <td className="p-0 text-center" style={{ width: '50px' }}>
                <Form.Check
                  type="switch"
                  id={`switch-${vm.vmid}`}
                  checked={isVMSelected(vm.vmid)}
                  onChange={() => handleSwitchChange(vm.vmid)}
                />
              </td>
              <td>{vm.vmid}</td>
              <td>{vm.name}</td>
              <td>{vm.node}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VirtualMachineList;
