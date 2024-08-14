// src/components/Logout.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store'; // Asegúrate de importar el tipo AppDispatch

const Logout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Usa el tipo AppDispatch
  const navigate = useNavigate();

  const handleLogout = () => {
    // Despacha la acción de logout para limpiar el token y el estado
    dispatch(logoutUser())
      .then(() => {
        // Redirige al usuario a la página de inicio de sesión o a la página de inicio
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
