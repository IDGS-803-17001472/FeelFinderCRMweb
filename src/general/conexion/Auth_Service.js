import {baseURL}  from './conexion';

class AuthService {
    // Endpoint de login
    _loginEndpoint = "api/account/login";
    
    // Función para hacer login
    async login(email, password) {
      try {
        const response = await fetch(`${baseURL}/${this._loginEndpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
  
        if (response.ok) {
          const responseData = await response.json();
  
          if (responseData.isSuccess) {
            const token = responseData.token;
            const expiration = new Date();
            expiration.setSeconds(expiration.getSeconds() + 3600); // 1 hora de duración
  
            // Almacenamos el token y su fecha de expiración en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', email);
            localStorage.setItem('tokenExpiration', expiration.toISOString());
  
            return "Login exitoso!";
          } else {
            return responseData.message || "Error de login.";
          }
        } else {
          return `Error al iniciar sesión: ${response.status}`;
        }
      } catch (error) {
        return `Error al hacer la solicitud: ${error.message}`;
      }
    }
  
    // Función para obtener el token
    async getToken() {
      const token = localStorage.getItem('token');
      const expiration = localStorage.getItem('tokenExpiration');
  
      if (expiration && new Date(expiration) < new Date()) {
        // El token ha expirado
        return null;
      }
      return token;
    }
  
    // Función para hacer logout
    async logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
    }
  }
  
  export default new AuthService();
  
