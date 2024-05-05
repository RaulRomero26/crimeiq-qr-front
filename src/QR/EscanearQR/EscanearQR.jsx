// Importa useState, Fragment y useEffect desde React
import React, { useState, Fragment, useEffect } from 'react';
import { QrScanner } from "react-qrcode-scanner";
import { Modal, Table } from 'react-bootstrap'; // Importa el componente Modal y Table de Bootstrap
import axios from 'axios';
import { useAuthStore } from '../../../hooks';
import "./EscanearQR.css";


export const EscanearQR = () => {
  const [scanning, setScanning] = useState(false);
  const [firstQRDetected, setFirstQRDetected] = useState(false);
  const [result, setResult] = useState(null);

  const { user } = useAuthStore()

  const handleScan = (value) => {
    if (scanning && !firstQRDetected) {
      setFirstQRDetected(true);
      setScanning(false);

      // Reemplazar las comillas simples por comillas dobles en la cadena JSON
      const correctedValue = value.replace(/'/g, '"');

      try {
        // Convertir la cadena de texto JSON en un objeto JavaScript
        const parsedResult = JSON.parse(correctedValue);

        // Obtener la fecha y hora actual en formato local
        const now = new Date();

        // Separar la fecha y la hora
        const fecha = now.toLocaleDateString(); // Obtener la fecha en formato local
        const hora = now.toLocaleTimeString(); // Obtener la hora en formato local

        // Agregar la fecha y la hora por separado al objeto JSON
        parsedResult.fechaEscaneo = fecha;
        parsedResult.horaEscaneo = hora;
        parsedResult.usuario = user.name;

        setResult(parsedResult);

        // Enviar el resultado a la base de datos
        enviarResultadoABaseDeDatos(parsedResult);

        // Mostrar el mensaje de éxito después de completar las operaciones
        window.alert("REGISTRO AGREGADO EXITOSAMENTE");

        // Mostrar el resultado en la consola
        console.log("Resultado analizado:", parsedResult);
      } catch (error) {
        console.error('Error al analizar el JSON:', error);
        // Manejar el error, si es necesario
        window.alert('El código QR no tiene el formato JSON correcto.');
      }
    }
  }

  const handleError = (error) => {
    console.log({ error });
    setScanning(false);
  }

  const startScan = () => {
    setScanning(true);
    setFirstQRDetected(false);
  }

  const stopScan = () => {
    setScanning(false);
  }

  // Agrega esta función dentro del componente QR
  const enviarResultadoABaseDeDatos = (resultado) => {
    axios.post('http://127.0.0.1:5000/guardar_datos', resultado)
      .then(response => {
        console.log(response.data);
        // Aquí puedes manejar la respuesta del servidor si es necesario
      })
      .catch(error => {
        console.error('Error al enviar el resultado a la base de datos:', error);
        // Aquí puedes manejar el error si es necesario
      });
  }

  // Función para borrar los resultados
  const borrarResultados = () => {
    setResult(null);
  }

  return (

    <>
      <Modal.Header closeButton>
        <Modal.Title>Escanear código QR</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Contenido del modal con el escáner y la tabla de resultados */}
        {/* Botón para limpiar los resultados */}
        {result && (
          <button className="btn btn-danger mb-3" onClick={borrarResultados}>Borrar Resultados</button>
        )}
        {/* Escáner de código QR */}
        <div className="camera-container">
          <QrScanner
            onScan={handleScan}
            onError={handleError}
            className="qr-scanner-video"
          />
        </div>
        {/* Tabla de resultados */}
        {result && (
          <Fragment>
            <h3>Resultado:</h3>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Coordenadas</td>
                  <td>{result.coordenadas.latitud}, {result.coordenadas.longitud}</td>
                </tr>
                <tr>
                  <td>Fecha de Escaneo</td>
                  <td>{result.fechaEscaneo}</td>
                </tr>
                <tr>
                  <td>Hora de Escaneo</td>
                  <td>{result.horaEscaneo}</td>
                </tr>
                <tr>
                  <td>Nombre del Archivo</td>
                  <td>{result.nombreArchivo}</td>
                </tr>
                <tr>
                  <td>Observaciones</td>
                  <td>{result.observaciones}</td>
                </tr>
                <tr>
                  <td>Punto de Vigilancia</td>
                  <td>{result.puntoVigilancia}</td>
                </tr>
                <tr>
                  <td>Ubicación</td>
                  <td>{result.ubicacion}</td>
                </tr>
                <tr>
                  <td>Usuario</td>
                  <td>{result.usuario}</td>
                </tr>
              </tbody>
            </Table>
          </Fragment>
        )}
      </Modal.Body>
    </>

  );
}



