// LogsView.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LogsView = ({ data }) => {
  return (
    <div>
      <h2>Tiempo de uso de máquinas virtuales</h2>
      <BarChart width={800} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="Tiempo de uso (horas)" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default LogsView;
