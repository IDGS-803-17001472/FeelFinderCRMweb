import {baseURL} from "./conexion";


class CotizacionServicio {
  
  
    async obtenerCotizaciones() {
      try {
        const response = await fetch(baseURL);
        if (response.ok) {
          const data = await response.json();
          return data.map(item => Cotizacion.fromJson(item)); // Suponiendo que tienes una clase Cotizacion en JS.
        } else {
          throw new Error('Error al cargar las cotizaciones');
        }
      } catch (error) {
        console.error("Exception in obtenerCotizaciones:", error);
        throw error;
      }
    }
  
    async obtenerCotizacion(id) {
      try {
        const response = await fetch(`${baseURL}/${id}`);
        if (response.ok) {
          const data = await response.json();
          return Cotizacion.fromJson(data); // Suponiendo que tienes una clase Cotizacion en JS.
        } else {
          throw new Error('Error al cargar la cotización');
        }
      } catch (error) {
        console.error("Exception in obtenerCotizacion:", error);
        throw error;
      }
    }
  
    async crearCotizacion(cotizacion) {
      try {
        const response = await fetch(baseURL, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cotizacion.toJson()), // Suponiendo que tienes un método toJson en JS.
        });
  
        if (!response.ok) {
          throw new Error('Error al crear la cotización');
        }
  
        return response;
      } catch (error) {
        console.error("Exception in crearCotizacion:", error);
        throw error;
      }
    }
  
    async actualizarCotizacion(id, cotizacion) {
      try {
        const response = await fetch(`${baseURL}/${id}`, {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cotizacion.toJson()), // Suponiendo que tienes un método toJson en JS.
        });
  
        if (!response.ok) {
          throw new Error('Error al actualizar la cotización');
        }
  
        return response;
      } catch (error) {
        console.error("Exception in actualizarCotizacion:", error);
        throw error;
      }
    }
  
    async eliminarCotizacion(id) {
      try {
        const response = await fetch(`${baseURL}/${id}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error('Error al eliminar la cotización');
        }
  
        return response;
      } catch (error) {
        console.error("Exception in eliminarCotizacion:", error);
        throw error;
      }
    }
  }


  class Cotizacion {
    constructor(id, cliente, descripcion, precio, fecha) {
      this.id = id;
      this.cliente = cliente;
      this.descripcion = descripcion;
      this.precio = precio;
      this.fecha = new Date(fecha); // Aseguramos que sea un objeto Date
    }
  
    // Método estático para crear una instancia desde un JSON
    static fromJson(json) {
      return new Cotizacion(
        json.id,
        json.cliente,
        json.descripcion,
        json.precio,
        json.fecha
      );
    }
  
    // Método para convertir la instancia a JSON
    toJson() {
      return {
        id: this.id,
        cliente: this.cliente,
        descripcion: this.descripcion,
        precio: this.precio,
        fecha: this.fecha.toISOString(),
      };
    }
  }
  








  export default  CotizacionServicio;  
