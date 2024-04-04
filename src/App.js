import React, { useState } from 'react';
import CargaArchivo from './carga/CargaArchivo';
import ResumenDatos from './resumen/ResumenDatos';

const App = () => {
  const [resumenData, setResumenData] = useState([]);

  const handleFileUpload = (fileContent) => {
    const resumen = procesarArchivoCSV(fileContent);
    setResumenData(resumen);
  };

  const procesarArchivoCSV = (fileContent) => {
    const lines = fileContent.split('\n').slice(1); // Se omiten los encabezados del csv

    const sensorData = {};
    
    lines.forEach(line => {
        const [sensor, value, unit, timestamp] = line.trim().split(';').map(item => item.trim());
        
        // Si el sensor ya existe en el objeto, actualiza los datos
        if (sensorData.hasOwnProperty(sensor)) {
            sensorData[sensor].values.push(parseFloat(value));
        } else { // Si el sensor no existe, crea un nuevo objeto de sensor
            sensorData[sensor] = {
                values: [parseFloat(value)],
                unit: unit,
                timestamp: timestamp
            };
        }
    });

    // Calcular el promedio y la marca de tiempo más reciente para cada sensor
    const summary = Object.keys(sensorData).map(sensor => {
        const values = sensorData[sensor].values;
        const promedio = values.reduce((acc, curr) => acc + curr, 0) / values.length;
        return {
            sensor: sensor,
            valorPromedio: promedio.toFixed(2), // Redondear a 2 decimales
            unidad: sensorData[sensor].unit,
            marcaTiempo: sensorData[sensor].timestamp
        };
    });

      return summary;
  };

  return (
    <div>
      <CargaArchivo onFileUpload={handleFileUpload} />
      <ResumenDatos data={resumenData} />
    </div>
  );
};

export default App;
