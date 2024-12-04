import {baseURL} from './conexion';


class ClienteService {
    // Obtener el token desde el almacenamiento local (localStorage)
    async _obtenerToken() {
      return localStorage.getItem('token');  // Asumiendo que el token está guardado en localStorage
    }
  
    // Obtener los encabezados para las solicitudes, incluyendo el token de autorización
    async _getHeaders() {
      const token = await this._obtenerToken();
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
    }
  
    // Obtener todos los clientes
    async obtenerClientes() {
      try {
        const headers = await this._getHeaders();
        const uri = `${baseURL}/api/cliente`;  // Usando la base URL desde las variables de entorno
        const response = await fetch(uri, { method: 'GET', headers: headers });
  
        if (response.ok) {
          return await response.json();  // Devuelve la lista de clientes
        } else if (response.status === 404) {
          return [];  // Si no se encuentran clientes, se retorna una lista vacía
        } else {
          throw new Error('Error al cargar los clientes');
        }
      } catch (e) {
        console.error("Exception in obtenerClientes:", e);
        return [];  // En caso de error, retorna una lista vacía
      }
    }
  
    // Registrar un nuevo cliente
    async registrarCliente( nombre, apellido, correo) {
      try {
        const headers = await this._getHeaders();
        const uri = `${baseURL}/api/cliente/registrar-cliente`;
        
        const body = JSON.stringify({
          nombre: nombre,
          apellido: apellido || '',
          correoElectronico: correo
        });
  console.log('cliente b',body);
        const response = await fetch(uri, {
          method: 'POST',
          headers: headers,
          body: body,
        });
        console.log('cliente r',response);

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Error al registrar cliente:", errorResponse);
          throw new Error('Error al registrar cliente');
        }
      } catch (e) {
        console.error("Exception in registrarCliente:", e);
        throw new Error('No se pudo registrar el cliente');
      }
    }
  
    // Actualizar un cliente existente
    async actualizarCliente(id, nombre, apellido, correo) {
      try {
        const headers = await this._getHeaders();
        const uri = `${baseURL}/api/cliente/${id}/actualizar`;
  
        const body = JSON.stringify({

          nombre: nombre,
          apellido: apellido,
          correoElectronico: correo
        });
        console.log('cliente b',body);
        const response = await fetch(uri, {
          method: 'PUT',
          headers: headers,
          body: body,
        });
        console.log('cliente r',response);
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Error al actualizar cliente:", errorResponse);
          throw new Error('Error al actualizar cliente');
        }
      } catch (e) {
        console.error("Exception in actualizarCliente:", e);
        throw new Error('No se pudo actualizar el cliente');
      }
    }
  
    // Eliminar un cliente
    async eliminarCliente(id) {
      try {
        const headers = await this._getHeaders();
        const uri = `${baseURL}/api/cliente/${id}/eliminar`;
  
        const response = await fetch(uri, {
          method: 'DELETE',
          headers: headers,
        });
  
        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Error al eliminar cliente:", errorResponse);
          throw new Error('Error al eliminar cliente');
        }
      } catch (e) {
        console.error("Exception in eliminarCliente:", e);
        throw new Error('No se pudo eliminar el cliente');
      }
    }
  }
  
  export default  ClienteService;
  