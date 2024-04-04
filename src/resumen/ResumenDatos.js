import React, { useState, useEffect } from 'react';
import './ResumenDatos.css';

const ResumenDatos = ({ data }) => {
  return (
    <div>
      <h2>Resumen de Última Carga</h2>
      <table>
        <thead>
          <tr>
            <th>Sensor</th>
            <th>Valor Promedio</th>
            <th>Unidad</th>
            <th>Marca de Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.sensor}</td>
              <td>{item.valorPromedio}</td>
              <td>{item.unidad}</td>
              <td>{item.marcaTiempo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResumenDatos;
