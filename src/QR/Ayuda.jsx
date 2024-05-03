import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import AyudaImg from '../assets/Ayuda.png';
import './Ayuda.css';

const Ayuda = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button className="ayuda-button" onClick={handleShow}>
        <img
          src={AyudaImg}
          alt="Ayuda"
        />
      </button>
      <Modal show={showModal} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Ayuda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            En QR TRACK tienes la posibilidad de poder crear, personalizar y escanear códigos QR para una mejor gestión de tus actividades.
          </p>
          <p>
            Abre la aplicación QR TRACK y selecciona la opción "GENERAR QR".
          </p>
          <p>
            Completa los siguientes campos según tus necesidades:
          </p>
          <ul>
            <li>
              <strong>Número de Punto de Vigilancia:</strong> Ingresa el número correspondiente al punto de vigilancia, como "Punto 1" o "Punto 2", según corresponda.
            </li>
            <li>
              <strong>Ubicación:</strong> Especifica la ubicación del punto de vigilancia, puede ser una dirección o un nombre descriptivo del lugar.
            </li>
            <li>
              <strong>Coordenadas:</strong> Ingresa las coordenadas geográficas del punto de vigilancia, dividiéndolas en Latitud (Lat) y Longitud (Log).
            </li>
            <li>
              <strong>Observaciones:</strong> Agrega cualquier observación adicional, por ejemplo, "Prestar atención a que la puerta de acceso esté cerrada".
            </li>
            <li>
              <strong>Nombre del Archivo:</strong> Asigna un nombre al archivo QR que estás generando para identificarlo en el futuro.
            </li>
          </ul>
          <p>
            Haz clic en el botón "Generar" y ¡listo! Puedes descargar tu QR personalizado.
          </p>
          <p>
            Con estos pasos, podrás generar fácilmente un código QR para gestionar tus actividades y los recorridos de vigilancia.
          </p>

          <p>
            Con QR TRACK, escanear un código es muy sencillo.
          </p>
          <ol>
            <li>
              Abre la aplicación "QR TRACK" en tu dispositivo móvil.
            </li>
            <li>
              Busca y selecciona la opción que te permite iniciar el registro de recorridos.
            </li>
            <li>
              Una vez que hayas iniciado el registro de recorridos, la aplicación abrirá la cámara de tu dispositivo para que puedas escanear el código QR.
            </li>
            <li>
              Apunta la cámara hacia el código QR que necesitas escanear. Asegúrate de que el código esté bien enfocado y dentro del área de visión de la cámara.
            </li>
            <li>
              La aplicación "QR TRACK" detectará automáticamente el código QR y lo escaneará.
            </li>
            <li>
              Si el código QR es válido y no hay errores, verás los resultados reflejados en pantalla. Esto puede incluir información sobre el recorrido de vigilancia asociado al código QR, como la ubicación, la hora, o cualquier otro dato relevante.
            </li>
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Ayuda;
