import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Agregar PropTypes
import './App.css';

import Login from './pages/Login';
import Dashboard from './dashboard/Dashboard';
import Clientes from './pages/Clientes';
import Empresas from './pages/Empresa';
import Quejas from './pages/Quejas';
import Subscriciones from './pages/subscriciones';
import ClientesRegistrados from './pages/clientesRegistrados';
import PlanesSubcriPcion from './pages/PlanesSubcriPcion';
import OportunidadVenta from './pages/OportunidadVenta';

// Componente de Ruta Protegida
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // Verifica si hay un token en el localStorage
  return token ? children : <Navigate to="/" replace />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validación de PropTypes
};

// Componente para página 404
function NotFound() {
  return <h1>Página no encontrada - Error 404</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta para el login */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/clientes" element={<ProtectedRoute><ClientesRegistrados /></ProtectedRoute>} />
        <Route path="/empresas" element={<ProtectedRoute><Empresas /></ProtectedRoute>} />
        <Route path="/quejas" element={<ProtectedRoute><Quejas /></ProtectedRoute>} />
        <Route path="/subcriciones" element={<ProtectedRoute><Subscriciones /></ProtectedRoute>} />
        <Route path="/profecional" element={<ProtectedRoute><Clientes /></ProtectedRoute>} />
        <Route path="/plansubcripcion" element={<ProtectedRoute><PlanesSubcriPcion /></ProtectedRoute>} />
       <Route path="/OportunidadVenta" element={<ProtectedRoute><OportunidadVenta /></ProtectedRoute>} />
        {/* Ruta para página no encontrada OportunidadVenta*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
