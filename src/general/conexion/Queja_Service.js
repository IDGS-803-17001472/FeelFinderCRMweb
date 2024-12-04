import {baseURL} from "./conexion";

class QuejaService {
    constructor() {
      this.headers = {
        'Content-Type': 'application/json', // Solo Content-Type
      };
    }
  
    // Obtener el token desde el almacenamiento local
    async _obtenerToken() {
      return localStorage.getItem('token');
    }
  
    // Obtener los encabezados de la solicitud, incluyendo el token de autorización
    async _getHeaders() {
      const token = await this._obtenerToken();
      if (token) {
        return {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        };
      } else {
        return this.headers; // Si no hay token, solo usamos los headers básicos
      }
    }
  
    // Obtener todas las quejas
    async obtenerQuejas() {
      try {
        const headers = await this._getHeaders();
        const uri = `${baseURL}/api/Queja/todas`;
        console.log("obtenerQuejas: " + uri);
  
        const response = await fetch(uri, { method: 'GET', headers: headers });
  
        if (response.ok) {
          const quejas = await response.json();
          console.log("obtenerQuejas respuesta: ", quejas);
          return quejas;
        } else if (response.status === 404) {
          return []; // Si no se encuentran quejas, se retorna una lista vacía
        } else {
          throw new Error('Error al cargar las quejas');
        }
      } catch (e) {
        console.error("Exception en obtenerQuejas:", e);
        return []; // En caso de error, retornamos una lista vacía
      }
    }
  
    // Registrar una nueva queja
    async registrarQueja(idUsuarioSolicita, idUsuarioNecesita, descripcion, tipo) {
      try {
        const headers = await this._getHeaders();
        const uri = `${baseURL}/api/queja/registrar`;
  
        const body = JSON.stringify({
          id: 0,
          idUsuarioSolicita: idUsuarioSolicita,
          idUsuarioNecesita: idUsuarioNecesita,
          descripcion: descripcion,
          tipo: tipo,
          estatus: 1,
        });
  
        const response = await fetch(uri, {
          method: 'POST',
          headers: headers,
          body: body,
        });
  
        if (response.status !== 201) {
          const errorResponse = await response.json();
          console.error("Error al registrar queja: ", errorResponse);
          throw new Error('Error al registrar la queja');
        }
      } catch (e) {
        console.error("Exception en registrarQueja:", e);
        throw new Error('No se pudo registrar la queja');
      }
    }
  
    // Actualizar una queja existente
    async actualizarQueja(id, descripcion, tipo, estatus, idUsuarioSolicita, idUsuarioNecesita) {
      try {
        const headers = await this._getHeaders();
        const uri = `${baseURL}/api/queja/actualizar/${id}`;
  
        const body = JSON.stringify({
          id: id,
          idUsuarioSolicita: idUsuarioSolicita,
          idUsuarioNecesita: idUsuarioNecesita,
          descripcion: descripcion,
          tipo: tipo,
          estatus: estatus,
        });
  
        const response = await fetch(uri, {
          method: 'PUT',
          headers: headers,
          body: body,
        });
  
        if (response.status !== 204) {
          const errorResponse = await response.json();
          console.error("Error al actualizar queja: ", errorResponse);
          throw new Error('Error al actualizar la queja');
        }
      } catch (e) {
        console.error("Exception en actualizarQueja:", e);
        throw new Error('No se pudo actualizar la queja');
      }
    }
  
    // Cambiar el estatus de una queja
    async cambiarEstatusQueja(idQueja, estatus) {
      try {
        const headers = await this._getHeaders();
        const uri = `${baseURL}/api/queja/${idQueja}/cambiar-estatus`;
  
        const body = JSON.stringify({
          estatus: estatus,
        });
  
        const response = await fetch(uri, {
          method: 'PUT',
          headers: headers,
          body: body,
        });
  
        if (response.status !== 200) {
          const errorResponse = await response.json();
          console.error("Error al cambiar estatus de queja: ", errorResponse);
          throw new Error('Error al cambiar el estatus de la queja');
        }
      } catch (e) {
        console.error("Exception en cambiarEstatusQueja:", e);
        throw new Error('No se pudo cambiar el estatus de la queja');
      }
    }
  
    // Obtener profesionales
    async obtenerProfesionales() {
      try {
        const headers = await this._getHeaders();
        const uri = `${baseURL}/api/Queja/profesionales`;
        console.log("obtenerProfesionales: " + uri);
  
        const response = await fetch(uri, { method: 'GET', headers: headers });
  
        if (response.ok) {
          const profesionales = await response.json();
          
          return profesionales;
        } else if (response.status === 404) {
          return []; // Si no se encuentran profesionales, se retorna una lista vacía
        } else {
          throw new Error('Error al cargar los profesionales');
        }
      } catch (e) {
        console.error("Exception en obtenerProfesionales:", e);
        return []; // En caso de error, retornamos una lista vacía
      }
    }
  }
  
  export default new QuejaService();
  