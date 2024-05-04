import React, { useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap'; // Importa el componente Modal de React Bootstrap
import './Incidencia.css'; // Archivo CSS para estilos
import IncidenciaImg from '../assets/Incidencia.png'; // Importa la imagen del botón de incidencia

const Formulario = () => {
    const [fechaHora, setFechaHora] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [nivelGravedad, setNivelGravedad] = useState('');
    const [tipoIncidente, setTipoIncidente] = useState('');
    const [testigos, setTestigos] = useState('');
    const [accionesVigilante, setAccionesVigilante] = useState('');
    const [notasSupervisor, setNotasSupervisor] = useState('');
    const [estadoIncidente, setEstadoIncidente] = useState('');
    const [informacionAdicional, setInformacionAdicional] = useState('');
    const [mensajeExito, setMensajeExito] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
            fechaHora,
            latitud,
            longitud,
            descripcion,
            nivelGravedad,
            tipoIncidente,
            testigos,
            accionesVigilante,
            notasSupervisor,
            estadoIncidente,
            informacionAdicional
        };

        try {
            const response = await axios.post('http://127.0.0.1:5000/guardar_reporte', formData);
            console.log(response.data);
            setMensajeExito('La incidencia fue enviada con éxito');
            handleCloseModal(); // Cerrar el modal después de enviar el formulario
            resetForm();
        } catch (error) {
            console.error('Error al enviar el formulario al servidor:', error);
        }
    };

    const resetForm = () => {
        setFechaHora('');
        setLatitud('');
        setLongitud('');
        setDescripcion('');
        setNivelGravedad('');
        setTipoIncidente('');
        setTestigos('');
        setAccionesVigilante('');
        setNotasSupervisor('');
        setEstadoIncidente('');
        setInformacionAdicional('');
    };

    const activarUbicacionGPS = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitud(position.coords.latitude);
                    setLongitud(position.coords.longitude);
                },
                (error) => {
                    console.error('Error al obtener la ubicación:', error);
                    alert('No se pudo obtener la ubicación. Asegúrate de que la función de ubicación esté habilitada en tu dispositivo.');
                }
            );
        } else {
            alert('La geolocalización no está disponible en este navegador.');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleMostrarModal = () => {
        setShowModal(true);
    };

    return (
        <div>
            <div className="button-container">
                {/* Modifica el botón para usar la imagen y quitar el texto */}
                <button className="incidencias-button" onClick={handleMostrarModal}>
                    <img src={IncidenciaImg} alt="Incidencia" />
                </button>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Reporte de Incidentes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {mensajeExito && (
                        <div className="exito-mensaje">{mensajeExito}</div>
                    )}
                    <form onSubmit={handleSubmit} className="formulario-container">
                        <label>Fecha y Hora del Incidente:</label>
                        <input type="datetime-local" value={fechaHora} onChange={(e) => setFechaHora(e.target.value)} />

                        <label>Ubicación del Incidente:</label>
                        <div className="ubicacion-input">
                            <input type="text" value={`Lat: ${latitud}`} readOnly />
                            <input type="text" value={`Log: ${longitud}`} readOnly />
                            <button type="button" className="gps-button" onClick={activarUbicacionGPS}><i className="fas fa-map-marker-alt"></i></button>
                        </div>

                        <label>Descripción Detallada del Incidente:</label>
                        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />

                        <label>Nivel de Gravedad del Incidente:</label>
                        <select value={nivelGravedad} onChange={(e) => setNivelGravedad(e.target.value)}>
                            <option value="">Seleccione...</option>
                            <option value="bajo">Bajo</option>
                            <option value="medio">Medio</option>
                            <option value="alto">Alto</option>
                        </select>

                        <label>Tipo de Incidente:</label>
                        <select value={tipoIncidente} onChange={(e) => setTipoIncidente(e.target.value)}>
                            <option value="">Seleccione...</option>
                            <option value="robo">Robo</option>
                            <option value="intrusion">Intrusión</option>
                            <option value="vandalismo">Vandalismo</option>
                            <option value="otro">Otro</option>
                        </select>

                        <label>Testigos (si los hubo):</label>
                        <input type="text" value={testigos} onChange={(e) => setTestigos(e.target.value)} />

                        <label>Acciones Tomadas por el Vigilante:</label>
                        <textarea value={accionesVigilante} onChange={(e) => setAccionesVigilante(e.target.value)} />

                        <label>Notas del Supervisor (si las hubo):</label>
                        <textarea value={notasSupervisor} onChange={(e) => setNotasSupervisor(e.target.value)} />

                        <label>Estado del Incidente:</label>
                        <select value={estadoIncidente} onChange={(e) => setEstadoIncidente(e.target.value)}>
                            <option value="">Seleccione...</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="enProceso">En Proceso</option>
                            <option value="resuelto">Resuelto</option>
                        </select>

                        <label>Información Adicional:</label>
                        <textarea value={informacionAdicional} onChange={(e) => setInformacionAdicional(e.target.value)} />

                        <button type="submit">Enviar Reporte</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="close-button" style={{ backgroundColor: 'red' }} onClick={handleCloseModal}>Cerrar</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Formulario;

