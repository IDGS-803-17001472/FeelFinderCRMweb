import {baseURL} from "./conexion";


class ListaPrecios {
    constructor(id, tipoPlan, precioPlan, empresa, cantidadLicencias, duracionContrato, precioFinal) {
      this.id = id;
      this.tipoPlan = tipoPlan;
      this.precioPlan = precioPlan;
      this.empresa = empresa;
      this.cantidadLicencias = cantidadLicencias;
      this.duracionContrato = duracionContrato;
      this.precioFinal = precioFinal;
    }
  
    // Método estático para crear una instancia desde un JSON
    static fromJson(json) {
      return new ListaPrecios(
        json.id,
        json.tipoPlan,
        json.precioPlan,
        json.empresa,
        json.cantidadLicencias,
        json.duracionContrato,
        json.precioFinal
      );
    }
  
    // Método para convertir la instancia a JSON
    toJson() {
      return {
        id: this.id,
        tipoPlan: this.tipoPlan,
        precioPlan: this.precioPlan,
        empresa: this.empresa,
        cantidadLicencias: this.cantidadLicencias,
        duracionContrato: this.duracionContrato,
        precioFinal: this.precioFinal,
      };
    }
  }
  
  class ListaPreciosServicio {
  
  
    async obtenerListasPrecios() {
      const response = await fetch(baseURL);
  
      if (!response.ok) {
        throw new Error('Error al cargar las listas de precios');
      }
  
      const data = await response.json();
      return data.map((item) => ListaPrecios.fromJson(item));
    }
  
    async obtenerListaPrecios(id) {
      const response = await fetch(`${baseURL}/${id}`);
  
      if (!response.ok) {
        throw new Error('Error al cargar la lista de precios');
      }
  
      const data = await response.json();
      return ListaPrecios.fromJson(data);
    }
  
    async crearListaPrecios(listaPrecios) {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listaPrecios.toJson()),
      });
  
      if (!response.ok) {
        throw new Error('Error al crear la lista de precios');
      }
  
      return response;
    }
  
    async actualizarListaPrecios(id, listaPrecios) {
      const response = await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listaPrecios.toJson()),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar la lista de precios');
      }
  
      return response;
    }
  
    async eliminarListaPrecios(id) {
      const response = await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar la lista de precios');
      }
  
      return response;
    }
  }
  
  // Ejemplo de uso:
  (async () => {
    const servicio = new ListaPreciosServicio();
    try {
      const listasPrecios = await servicio.obtenerListasPrecios();
      console.log(listasPrecios);
    } catch (error) {
      console.error(error.message);
    }
  })();
  export default  ListaPreciosServicio;