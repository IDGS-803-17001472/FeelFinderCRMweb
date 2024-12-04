import {baseURL} from "./conexion";


class OportunidadVenta {
    constructor(id, nombreCliente, descripcion, valorEstimado, fechaCierre, estado) {
      this.id = id;
      this.nombreCliente = nombreCliente;
      this.descripcion = descripcion;
      this.valorEstimado = valorEstimado;
      this.fechaCierre = new Date(fechaCierre);
      this.estado = estado;
    }
  
    // Método estático para crear una instancia desde un JSON
    static fromJson(json) {
      return new OportunidadVenta(
        json.id,
        json.nombreCliente,
        json.descripcion,
        json.valorEstimado,
        json.fechaCierre,
        json.estado
      );
    }
  
    // Método para convertir la instancia a JSON
    toJson() {
      return {
        id: this.id,
        nombreCliente: this.nombreCliente,
        descripcion: this.descripcion,
        valorEstimado: this.valorEstimado,
        fechaCierre: this.fechaCierre.toISOString(),
        estado: this.estado,
      };
    }
  }
  
  class OportunidadVentaServicio {
  
    async obtenerOportunidadesVenta() {
      const response = await fetch(`${baseURL}/api/OportunidadVenta`);
  
      if (!response.ok) {
        throw new Error('Error al cargar las oportunidades de venta');
      }
  
      const data = await response.json();
      return data.map((item) => OportunidadVenta.fromJson(item));
    }
  
   
  
    async crearOportunidadVenta( nombreCliente, descripcion, valorEstimado, fechaCierre, estado
      ) {
    
      const response = await fetch(`${baseURL}/api/OportunidadVenta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {id:0, 
           nombreCliente, descripcion, valorEstimado, fechaCierre, estado
            }),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear la oportunidad de venta');
      }
  
      return response;
    }
  
    async actualizarOportunidadVenta(id, oportunidadVenta) {
      const response = await fetch(`${baseURL}/api/OportunidadVenta/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(oportunidadVenta),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar la oportunidad de venta');
      }
  
      return response;
    }
  
    async eliminarOportunidadVenta(id) {
      const response = await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar la oportunidad de venta');
      }
  
      return response;
    }
  }
  
  // Ejemplo de uso:
  (async () => {
    const servicio = new OportunidadVentaServicio();
    try {
      const oportunidades = await servicio.obtenerOportunidadesVenta();
      console.log(oportunidades);
    } catch (error) {
      console.error(error.message);
    }
  })();
  export default  OportunidadVentaServicio;