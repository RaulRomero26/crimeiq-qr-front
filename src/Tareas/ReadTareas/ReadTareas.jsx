import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReadTareas.css';
import Logo from '../../assets/4.png'; // Importa la imagen del pie de página

export const ReadTareas = () => {
  const [datos, setDatos] = useState([]);
  const [filtroUsuario, setFiltroUsuario] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroMensaje, setFiltroMensaje] = useState('');
  const [filtroDescripcion, setFiltroDescripcion] = useState('');

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get-tareas');
        if (response.status !== 200) {
          throw new Error('Error al obtener los datos');
        }
        console.log(response.data)
        setDatos(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerDatos();
  }, []);

  const handlefiltroUsuarioChange = (event) => {
    setFiltroUsuario(event.target.value);
  };

  const handlefiltroNombreChange = (event) => {
    setFiltroNombre(event.target.value);
  };

  const handlefiltroMensajeChange = (event) => {
    setFiltroMensaje(event.target.value);
  };

  const handlefiltroDescripcionChange = (event) => {
    setFiltroDescripcion(event.target.value);
  };
  
  // const formatDate = (dateString) => {
  //   if (!dateString) return ''; // Manejar caso de fecha nula
  //   const parts = dateString.split(' ');
  //   const datePart = parts[0]; // Tomar solo la parte de la fecha
  //   const dateParts = datePart.split('/');
  //   if (dateParts.length === 3) {
  //     const [day, month, year] = dateParts;
  //     return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
  //   } else {
  //     return dateString;
  //   }
  // };
  
  const datosFiltrados = datos.filter((dato) => {
    const usuarioMatch = dato.usuario.toLowerCase().includes(filtroUsuario.toLowerCase());
    const nombreMatch = dato.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const mensajeMatch = dato.mensaje.toLowerCase().includes(filtroMensaje.toLowerCase());
    const descripcionMatch = dato.descripcion.toLowerCase().includes(filtroDescripcion.toLowerCase());

    
    return nombreMatch && mensajeMatch && descripcionMatch && usuarioMatch;
  });

  return (
    <div>
     
      <div className="filtro-container mt-4">
        <input
          type="text"
          value={filtroUsuario}
          onChange={handlefiltroUsuarioChange}
          placeholder="Filtrar Usuario"
          style={{ marginRight: '10px', width: '200px' }}
        />
        <input
          type="text"
          value={filtroNombre}
          onChange={handlefiltroNombreChange}
          placeholder="Filtrar Nombre Tarea"
          style={{ marginRight: '10px', width: '200px' }}
        />
        <input
          type="text"
          value={filtroMensaje}
          onChange={handlefiltroMensajeChange}
          placeholder="Filtrar Mensaje"
          style={{ marginRight: '10px', width: '150px' }}
        />
        <input
          type="text"
          value={filtroDescripcion}
          onChange={handlefiltroDescripcionChange}
          placeholder="Filtrar Descripcion/Instrucciones"
          style={{ width: '200px' }}
        />
      </div>
      <div className="tabla-container">
        <div className="tabla-scroll">
          <table className="tabla-datos">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Nombre Tarea</th>
                <th>Mensaje</th>
                <th>Descripcion Tarea</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((dato, index) => (
                <tr key={index}>
                  <td>{dato.usuario}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.mensaje}</td>
                  <td>{dato.descripcion}</td>
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


