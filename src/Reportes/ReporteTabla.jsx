import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './R_tabla.css';
import Logo from '../assets/4.png'; // Importa la imagen del pie de página

const TablaDatos = () => {
  const [datos, setDatos] = useState([]);
  const [filtroPuntoVigilancia, setFiltroPuntoVigilancia] = useState('');
  const [filtroUbicacion, setFiltroUbicacion] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroUsuario, setFiltroUsuario] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get('https://api.crimeiq.org/api/recorridos');
        if (response.status !== 200) {
          throw new Error('Error al obtener los datos');
        }
        setDatos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerDatos();
  }, []);

  const handleFiltroPuntoVigilanciaChange = (event) => {
    setFiltroPuntoVigilancia(event.target.value);
  };

  const handleFiltroUbicacionChange = (event) => {
    setFiltroUbicacion(event.target.value);
  };

  const handleFiltroFechaChange = (event) => {
    const value = event.target.value;
    setFiltroFecha(value);
  };

  const handleFiltroUsuarioChange = (event) => {
    setFiltroUsuario(event.target.value);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return ''; // Manejar caso de fecha nula
    const parts = dateString.split(' ');
    const datePart = parts[0]; // Tomar solo la parte de la fecha
    const dateParts = datePart.split('/');
    if (dateParts.length === 3) {
      const [day, month, year] = dateParts;
      return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
    } else {
      return dateString;
    }
  };
  
  const datosFiltrados = datos.filter((dato) => {
    const puntoVigilanciaMatch = dato.puntoVigilancia.toLowerCase().includes(filtroPuntoVigilancia.toLowerCase());
    const ubicacionMatch = dato.ubicacion.toLowerCase().includes(filtroUbicacion.toLowerCase());
    const fechaMatch = !filtroFecha || formatDate(dato.fechaEscaneo).startsWith(formatDate(filtroFecha));
    const usuarioMatch = !filtroUsuario || dato.usuario.toLowerCase().includes(filtroUsuario.toLowerCase());
    
    return puntoVigilanciaMatch && ubicacionMatch && fechaMatch && usuarioMatch;
  });

  return (
    <div>
      <h2 style={{fontWeight: 'bold', color: 'white', marginTop: '20px'}}>
        TABLA DE <span style={{color: 'orange'}}>RECORRIDOS</span>
      </h2>
      <div className="filtro-container">
        <input
          type="text"
          value={filtroPuntoVigilancia}
          onChange={handleFiltroPuntoVigilanciaChange}
          placeholder="Filtrar Punto de Vigilancia"
          style={{ marginRight: '10px', width: '200px' }}
        />
        <input
          type="text"
          value={filtroUbicacion}
          onChange={handleFiltroUbicacionChange}
          placeholder="Filtrar Ubicación"
          style={{ marginRight: '10px', width: '200px' }}
        />
        <input
          type="text"
          value={filtroFecha}
          onChange={handleFiltroFechaChange}
          placeholder="Fecha (DD/MM/AAAA)"
          style={{ marginRight: '10px', width: '150px' }}
        />
        <input
          type="text"
          value={filtroUsuario}
          onChange={handleFiltroUsuarioChange}
          placeholder="Filtrar Usuario"
          style={{ width: '200px' }}
        />
      </div>
      <div className="tabla-container">
        <div className="tabla-scroll">
          <table className="tabla-datos">
            <thead>
              <tr>
                <th>Punto de Vigilancia</th>
                <th>Ubicación</th>
                <th>Observaciones</th>
                <th>Latitud</th>
                <th>Longitud</th>
                <th>Fecha del Recorrido</th>
                <th>Hora del Recorrido</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((dato, index) => (
                <tr key={index}>
                  <td>{dato.puntoVigilancia}</td>
                  <td>{dato.ubicacion}</td>
                  <td>{dato.observaciones}</td>
                  <td>{dato.coordenadas ? dato.coordenadas.latitud : ''}</td>
                  <td>{dato.coordenadas ? dato.coordenadas.longitud : ''}</td>
                  <td>{formatDate(dato.fechaEscaneo)}</td>
                  <td>{dato.horaEscaneo}</td>
                  <td>{dato.usuario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Fragmento de código agregado */}
      <div className="footer">
        <img src={Logo} alt="Logo" />
        Copyright: 2024 Todos los derechos reservados
      </div>
    </div>
  );
};

export default TablaDatos;

