// LogsViewContainer.js
import React, { useEffect, useState } from 'react';
import LogsView from '../components/LogsView';

const LogsViewContainer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://10.4.1.206:8080');

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData.logs) {
        const processedData = receivedData.logs.map((log) => ({
          name: log.usuario || log.nodo,
          'Tiempo de uso (horas)': log.tiempo_uso
        }));
        setData(processedData);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return <LogsView data={data} />;
};

export default LogsViewContainer;
