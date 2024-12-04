import { baseURL } from './conexion';

class SuscripcionService {
  async _obtenerToken() {
    const box = await localStorage.getItem('token');
    // Aquí solo retornamos el token directamente sin intentar parsearlo como JSON
    return box ? box : null; 
  }

  async _getHeaders() {
    const token = await this._obtenerToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async obtenerSuscripciones() {
    const headers = await this._getHeaders();
    const url = `${baseURL}/api/suscripcion`;
    const response = await fetch(url, { method: 'GET', headers });

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Error en obtenerSuscripciones:", await response.text());
      return [];
    }
  }

  async obtenerClientes() {
    const headers = await this._getHeaders();
    const url = `${baseURL}/api/cliente`;
    const response = await fetch(url, { method: 'GET', headers });

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Error en obtenerClientes:", await response.text());
      return [];
    }
  }

  async obtenerPlanes() {
    const headers = await this._getHeaders();
    const url = `${baseURL}/api/planSuscripcion`;
    const response = await fetch(url, { method: 'GET', headers });

    if (response.ok) {
      return await response.json();
    } else {
      console.error("Error en obtenerPlanes:", await response.text());
      return [];
    }
  }

  async registrarSuscripcion(  fechaDeInicio,fechaDeFin,estado,clienteId,planId) {
    const headers = await this._getHeaders();
    const url = `${baseURL}/api/suscripcion/registrar-suscripcion`;

   
    console.log("Headers:", clienteId,planId);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ fechaDeInicio,fechaDeFin,estado,clienteId:clienteId,planId:planId}),
    });

    if (!response.ok) {
      throw new Error(`Error al registrar la suscripción: ${await response.text()}`);
    } else {
      console.log("Suscripción registrada con éxito en la API.");
    }
  }

  async actualizarSuscripcion(fechaDeInicio,fechaDeFin,estado,clienteId,planId,id) {
    const headers = await this._getHeaders();
    const url = `${baseURL}/api/suscripcion/${id}/actualizar`;

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ fechaDeInicio,fechaDeFin,estado,clienteId,planId,id}),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la suscripción');
    }
  }

  async eliminarSuscripcion(id) {
    const headers = await this._getHeaders();
    const url = `${baseURL}/api/suscripcion/${id}/eliminar`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la suscripción');
    }
  }
}

export default SuscripcionService;
