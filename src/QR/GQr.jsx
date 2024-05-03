import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Logo from '../assets/4.png'; 
import QrImg from '../assets/Qr.png'; 
import './GQr.css';

function GenerateQR() {
  const [showModal, setShowModal] = useState(false);
  const [generatedSuccessfully, setGeneratedSuccessfully] = useState(false);
  const [qrImagePath, setQrImagePath] = useState(null);

  const handleClose = () => {
    resetForm(); // Llama a la función resetForm al cerrar el modal
    setShowModal(false);
  };

  const handleShow = () => setShowModal(true);

  const resetForm = () => {
    document.getElementById('puntoVigilancia').value = '';
    document.getElementById('ubicacion').value = '';
    document.getElementById('lat').value = '';
    document.getElementById('log').value = '';
    document.getElementById('observaciones').value = '';
    document.getElementById('nombreArchivo').value = '';
    setGeneratedSuccessfully(false);
    setQrImagePath(null);
  };

  const handleCreateQRCode = async (event) => {
    event.preventDefault();
  
    const puntoVigilancia = document.getElementById('puntoVigilancia').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const lat = document.getElementById('lat').value;
    const log = document.getElementById('log').value;
    const observaciones = document.getElementById('observaciones').value;
    const nombreArchivo = document.getElementById('nombreArchivo').value;
  
    const formData = {
      puntoVigilancia,
      ubicacion,
      coordenadas: {
        latitud: lat,
        longitud: log,
      },
      observaciones,
      nombreArchivo,
    };
  
    console.log('Datos a enviar al backend:', formData);
  
    await enviarDatosAlBackend(formData);
  };

  const enviarDatosAlBackend = async (formData) => {
    try {
      const response = await fetch('https://api.crimeiq.org/generar_qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Datos enviados correctamente al backend');
        const responseData = await response.json();
        if (responseData.mensaje && responseData.ruta) {
          setGeneratedSuccessfully(true);
          setQrImagePath(responseData.ruta);
        }
      } else {
        console.error('Error al enviar los datos al backend');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="App">
      <div className="btn1-container-top-left">
        <div className="btn1" onClick={handleShow} style={{ backgroundImage: `url(${QrImg})` }}></div>
      </div>
      
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generador de QR</Modal.Title>
        </Modal.Header>
        <Modal.Body className="form-container">
          <form onSubmit={handleCreateQRCode}>
            <label htmlFor="puntoVigilancia">Nombre de Punto de Vigilancia:</label>
            <input type="text" id="puntoVigilancia" name="puntoVigilancia"/>
            <label htmlFor="ubicacion">Ubicación: (Dirección/Local/Casa):</label>
            <input type="text" id="ubicacion" name="ubicacion" />
            <label htmlFor="coordenadas">Coordenadas:</label>
            <div>
              <input type="text" id="lat" name="lat" placeholder="Lat" />
              <input type="text" id="log" name="log" placeholder="Log" />
            </div>
            <label htmlFor="observaciones">Recomendaciones del punto:</label>
            <textarea id="observaciones" name="observaciones" />
            <label htmlFor="nombreArchivo">Nombre del Archivo Qr:</label>
            <input type="text" id="nombreArchivo" name="nombreArchivo" />
            <button type="submit">CREAR</button>
            <button type="button" onClick={handleClose}>CERRAR</button>
          </form>

          {generatedSuccessfully && qrImagePath && (
            <div className="success-message-container">
              <p style={{ color: 'black' }}>¡Tu código se ha generado correctamente!</p>
              <a href={qrImagePath} download style={{ color: 'black' }}>Descargar aquí</a>
            </div>
          )}

        </Modal.Body>
      </Modal>


      <div className="footer">
        <img src={Logo} alt="4" />
        Copyright: 2024 Todos los derechos reservados
      </div>
    </div>
  );
}

export default GenerateQR;


