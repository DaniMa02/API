import WebSocket, { WebSocketServer } from 'ws';
import { getProxmoxData, getVirtualMachines } from '../services/proxmoxService.js';
import { createVirtualMachine, deleteVirtualMachines } from '../controllers/vmController.js';
import { getLogsFromView } from './database/logQueries.js';

let wss;
const clients = new Set();

function initWebSocketServer() {
  wss = new WebSocketServer({ port: 8080, host: '10.4.1.206' });

  wss.on('connection', (ws) => {
    console.log('Client connected');
    sendDataToClients();
    clients.add(ws);

    ws.on('message', async (message) => {
      const data = JSON.parse(message);

      if (data.createVm) {
        handleCreateVirtualMachine(ws, data.vmConfig);
        sendDataToClients();
      } else if (data.deleteVms) {
        sendDataToClients();
        const { vms } = data;
        console.log('Máquinas virtuales a eliminar:', vms);
        try {
          await deleteVirtualMachines(vms);
          ws.send(JSON.stringify({ message: 'Máquinas virtuales eliminadas correctamente' }));
        } catch (error) {
          console.error('Error al eliminar las máquinas virtuales:', error);
          ws.send(JSON.stringify({ error: 'Error al eliminar las máquinas virtuales' }));
        }
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      clients.delete(ws);
    });
  });
}

async function handleCreateVirtualMachine(ws, vmConfig) {
  try {
    const vmid = await createVirtualMachine(vmConfig);
    ws.send(JSON.stringify({ vmName: vmConfig.vmName, vmid }));
  } catch (error) {
    console.error(`Error al crear la máquina virtual ${vmConfig.vmName}:`, error);
    ws.send(JSON.stringify({ error: `Error al crear la máquina virtual ${vmConfig.vmName}` }));
  }
}

async function sendDataToClients() {
  try {
    const proxmoxData = await getProxmoxData();
    const virtualMachines = await getVirtualMachines();
    const logs = await getLogsFromView();

  if (typeof proxmoxData !== 'object' || !Array.isArray(virtualMachines) || !Array.isArray(logs)) {
    throw new TypeError('Data is not in the expected format');
  }

    const dataToSend = { ...proxmoxData, virtualMachines, logs};

    clients.forEach((client) => {
      client.send(JSON.stringify(dataToSend));
    });
  } catch (error) {
    console.error('Error al enviar datos a los clientes:', error);
  }
}

export { initWebSocketServer, sendDataToClients };