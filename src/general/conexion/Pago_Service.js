import {baseURL} from "./conexion";



class PagoService {
  
  
    async _obtenerToken() {
      return localStorage.getItem('token');
    }
  
    async _getHeaders() {
      const token = await this._obtenerToken();
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
    }
  
    // Obtener todos los pagos
    async obtenerPagos() {
      try {
        const headers = await this._getHeaders();
        const response = await fetch(`${baseURL}/api/pago`, { headers });
        console.error(response);
        if (response.ok) {
          return await response.json();
        } else {
          console.error("Error en obtenerPagos:", await response.text());
          return [];
        }
      } catch (error) {
        console.error("Exception in obtenerPagos:", error);
        return [];
      }
    }
  
    // Obtener todas las suscripciones
    async obtenerSuscripciones() {
      try {
        const headers = await this._getHeaders();
        const response = await fetch(`${baseURL}/api/suscripcion`, { headers });
  
        if (response.ok) {
          return await response.json();
        } else {
          console.error("Error en obtenerSuscripciones:", await response.text());
          return [];
        }
      } catch (error) {
        console.error("Exception in obtenerSuscripciones:", error);
        return [];
      }
    }
  
    // Registrar un pago
    async registrarPago( cantidad,
        fechaDePago,
        suscripcionId) {
            var body=JSON.stringify({cantidad,
                fechaDePago,
                suscripcionId});
      try {
        const headers = await this._getHeaders();
        const response = await fetch(`${baseURL}/api/pago/registrar-pago`, {
          method: 'POST',
          headers,
          body: body,
            
        });
        if (!response.ok) {
          throw new Error('Error al registrar el pago');
        }
      } catch (error) {
        console.error("Exception in registrarPago:", error);
        throw new Error('No se pudo registrar el pago');
      }
    }
  
    // Actualizar un pago
    async actualizarPago(id, data) {
      try {
        const headers = await this._getHeaders();
        const response = await fetch(`${baseURL}/api/pago/${id}/actualizar`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('Error al actualizar el pago');
        }
      } catch (error) {
        console.error("Exception in actualizarPago:", error);
        throw new Error('No se pudo actualizar el pago');
      }
    }
  
    // Eliminar un pago
    async eliminarPago(id) {
      try {
        const headers = await this._getHeaders();
        const response = await fetch(`${baseURL}/api/pago/${id}/eliminar`, {
          method: 'DELETE',
          headers,
        });
  
        if (!response.ok) {
          throw new Error('Error al eliminar el pago');
        }
      } catch (error) {
        console.error("Exception in eliminarPago:", error);
        throw new Error('No se pudo eliminar el pago');
      }
    }
  }

  
    
  export default  PagoService;