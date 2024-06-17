// LogsPage.js
import React from 'react';
import LogsViewContainer from '../containers/LogsViewContainer';

const LogsPage = () => {
  return (
    <div>
      <h1>Logs de Proxmox</h1>
      <LogsViewContainer />
    </div>
  );
};

export default LogsPage;
