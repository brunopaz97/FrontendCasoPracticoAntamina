import React, { useState } from 'react';
import './CargaArchivo.css'; // Importar estilos CSS

const CargaArchivo = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        onFileUpload(reader.result);
      };
    } else {
      alert('Por favor, selecciona un archivo.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Subir Archivo CSV</h2>
      <input type="file" onChange={handleFileChange} />
      <button className="upload-btn" onClick={handleUpload}>Subir</button>
    </div>
  );
};

export default CargaArchivo;