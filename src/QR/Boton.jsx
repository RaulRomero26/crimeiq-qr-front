import React, { useState, useEffect } from 'react';
import alertaImg from '../assets/Alerta.png';
import './Boton.css';

function Emergencia() {
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [segundosRestantes, setSegundosRestantes] = useState(5);
  
    useEffect(() => {
      let intervalo;
      if (mostrarMensaje && segundosRestantes > 0) {
        intervalo = setInterval(() => {
          setSegundosRestantes((prevSegundos) => prevSegundos - 1);
        }, 1000);
      } else if (segundosRestantes === 0) {
        // Lógica para enlazar la llamada (en este caso, abrir el marcador del teléfono con el número 911)
        window.location.href = 'tel:911';
        setTimeout(() => {
          setMostrarMensaje(false);
        }, 1000); // Esperar 1 segundo antes de ocultar el mensaje
      }
  
      return () => clearInterval(intervalo);
    }, [mostrarMensaje, segundosRestantes]);
  
    const handleClick = () => {
      setMostrarMensaje(true);
    };
  
    const handleCancelar = () => {
      setMostrarMensaje(false);
      setSegundosRestantes(5);
    };
  
    return (
      <div className="emergencia-container">
        <h2 className="emergencia-title">
          <span>QR TRA</span>
          <span style={{ color: 'orange' }}>CK</span>
        </h2>
        <img src={alertaImg} alt="Botón de Emergencia" onClick={handleClick} className="emergencia-img" />
        <p className="emergencia-button-title">BOTÓN DE EMERGENCIA</p>
        {mostrarMensaje && (
          <div>
            <p className="emergencia-message">Tu llamada se enlazará en {segundosRestantes} segundos</p>
            <button onClick={handleCancelar}>Cancelar</button>
          </div>
        )}
      </div>
    );
  }
  
  
export default Emergencia;
