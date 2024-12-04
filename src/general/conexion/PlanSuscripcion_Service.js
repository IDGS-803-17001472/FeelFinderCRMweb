import { baseURL } from './conexion';



class PlanSuscripcionService {
    
  
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
  
    // Obtener todos los planes
    async obtenerPlanes() {
      try {
        const headers = await this._getHeaders();
        const response = await fetch(`${baseURL}/api/planSuscripcion`, { headers });
  
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error('Error al cargar los planes de suscripción');
        }
      } catch (error) {
        console.error('Exception in obtenerPlanes:', error);
        return [];
      }
    }
  
    // Registrar un nuevo plan
    async registrarPlan(nombre, precio, descripcion, duracionMeses) {
      try {
        const headers = await this._getHeaders();
        const body = JSON.stringify({ nombre, precio, descripcion, duracionMeses });
        console.log('body ',body);

        const response = await fetch(`${baseURL}/api/planSuscripcion/registrar-plan`, {
          method: 'POST',
          headers,
          body,
        });
        console.log('response ',response);
        if (!response.ok) {
          const errorResponse = await response.text();
          console.error('Error al registrar plan:', errorResponse);
          throw new Error('Error al registrar el plan de suscripción');
        }
      } catch (error) {
        console.error('Exception in registrarPlan:', error);
        throw new Error('No se pudo registrar el plan de suscripción');
      }
    }
  
    // Actualizar un plan existente
    async actualizarPlan(id, nombre, precio, descripcion, duracionMeses) {
      try {
        const headers = await this._getHeaders();
        const body = JSON.stringify({ nombre, precio, descripcion, duracionMeses });
        console.log('body ',body);
        const response = await fetch(`${baseURL}/api/planSuscripcion/${id}/actualizar`, {
          method: 'PUT',
          headers,
          body,
        });
        console.log('response ',response);
        if (!response.ok) {
          const errorResponse = await response.text();
          console.error('Error al actualizar plan:', errorResponse);
          throw new Error('Error al actualizar el plan de suscripción');
        }
      } catch (error) {
        console.error('Exception in actualizarPlan:', error);
        throw new Error('No se pudo actualizar el plan de suscripción');
      }
    }
  
    // Eliminar un plan
    async eliminarPlan(id) {
      try {
        const headers = await this._getHeaders();
  
        const response = await fetch(`${baseURL}/api/planSuscripcion/${id}/eliminar`, {
          method: 'DELETE',
          headers,
        });
  
        if (!response.ok) {
          const errorResponse = await response.text();
          console.error('Error al eliminar plan:', errorResponse);
          throw new Error('Error al eliminar el plan de suscripción');
        }
      } catch (error) {
        console.error('Exception in eliminarPlan:', error);
        throw new Error('No se pudo eliminar el plan de suscripción');
      }
    }
  }


  export default PlanSuscripcionService;
