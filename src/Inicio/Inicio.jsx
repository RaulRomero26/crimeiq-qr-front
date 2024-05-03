import React from 'react';
import Logo from '../assets/4.png'; // Importa la imagen
import Marca from '../assets/Logo.png'; // Importa la imagen Marca
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import GuardiaImg from '../assets/Guardia.jpg';
import GuardiaImg2 from '../assets/guardia2.jpg';


function Descripcion() {
  // Función para cerrar el modal
  const handleClose = () => {};

  return (
    <div>
      <div style={{ position: 'relative', marginTop: '5%', marginBottom: '5%' }}>
        
        {/* Agregar la imagen Marca después del título */}
        <img
          src={Marca}
          alt="Marca"
          style={{ width: '80%', height: 'auto', marginBottom: '5%', marginTop: '5%', maxWidth: '400px' }}
        />

        <h1>
          <span style={{ color: 'white', fontWeight: 'bold' }}>¡Bienvenidos! </span>
        </h1>
        
        <br />
        <p style={{ fontFamily: 'Sonhne', fontSize: '15px', color: 'white', textAlign: 'justify', marginBottom: '5%', maxWidth: '90%', marginLeft: '5%', marginRight: '5%' }}>
          CrimeIQ Solutions es líder en análisis de datos delictivos, ofreciendo soluciones avanzadas para abordar los desafíos de seguridad. 
          Nuestro equipo desarrolla aplicaciones web especializadas que proporcionan una visión profunda de los datos, desde la identificación de 
          patrones hasta la predicción de tendencias. Estamos comprometidos en fortalecer a las fuerzas del orden, agencias de seguridad y empresas 
          para tomar decisiones informadas en la lucha contra la delincuencia. Utilizando tecnología de vanguardia, creamos un futuro más seguro para todos. 
          En CrimeIQ Solutions, no solo creamos tecnología, también forjamos un mundo mejor. Únete a nosotros para ser parte de esta importante misión donde 
          la inteligencia se encuentra con la seguridad.
        </p>

        {/* Carrusel de imágenes */}
        <div style={{ maxWidth: '90%', margin: '0 auto', marginBottom: '5%' }}>
          <Carousel showThumbs={false} showStatus={false}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={GuardiaImg} alt="Guardia" style={{ width: '80%', height: 'auto', maxWidth: '800px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={GuardiaImg2} alt="Guardia2" style={{ width: '80%', height: 'auto', maxWidth: '800px' }} />
            </div>
            {/* Agrega más elementos div con imágenes según sea necesario */}
          </Carousel>
        </div>

      </div>
      <div style={{ position: 'fixed', bottom: '0', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#222', color: 'white', textAlign: 'center', padding: '10px', width: '100%', fontSize: '10px' }}>
          <img src={Logo} alt="4" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
          Copyright: 2024 Todos los derechos reservados ©
      </div>
    </div>
  );
}

export default Descripcion;