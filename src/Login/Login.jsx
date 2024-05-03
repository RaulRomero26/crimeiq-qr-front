import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componente para la página de inicio de sesión
const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí podrías realizar la autenticación, por ejemplo, mediante una solicitud HTTP a tu servidor

    // Simulando una autenticación exitosa
    if (username === 'usuario' && password === 'contraseña') {
      setIsAuthenticated(true);
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

// Componente para la aplicación principal
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        {/* Redireccionar a la página de inicio de sesión si no está autenticado */}
        {!isAuthenticated && <Navigate to="/login" />}
        {/* Ruta protegida, solo accesible si está autenticado */}
        <Route path="/" element={<MainApp />} />
      </Routes>
    </Router>
  );
};

// Componente para la aplicación principal
const MainApp = () => {
  return (
    <div>
      <h2>Aplicación Principal</h2>
      {/* Contenido de tu aplicación */}
    </div>
  );
};

export default App;

