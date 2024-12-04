import {baseURL} from "./conexion";


class TableroRendimiento {
    constructor(leadsConcretados, leadsCerrados, tasaConversion) {
      this.leadsConcretados = leadsConcretados;
      this.leadsCerrados = leadsCerrados;
      this.tasaConversion = tasaConversion;
    }
  
    // Método estático para crear una instancia desde un JSON
    static fromJson(json) {
      return new TableroRendimiento(
        json.leadsConcretados,
        json.leadsCerrados,
        json.tasaConversion
      );
    }
  
    // Método para convertir la instancia a JSON
    toJson() {
      return {
        leadsConcretados: this.leadsConcretados,
        leadsCerrados: this.leadsCerrados,
        tasaConversion: this.tasaConversion,
      };
    }
  }
  
  class TableroRendimientoServicio {
    constructor(apiUrl = `${baseURL}/api/tablerorendimiento`) {
      this.apiUrl = apiUrl;
    }
  
    async obtenerTableroRendimiento() {
      const response = await fetch(this.apiUrl);
  
      if (!response.ok) {
        throw new Error('Error al cargar el tablero de rendimiento');
      }
  
      const data = await response.json();
      return TableroRendimiento.fromJson(data);
    }
  }
  
  // Ejemplo de uso:
  (async () => {
    const servicio = new TableroRendimientoServicio();
    try {
      const tablero = await servicio.obtenerTableroRendimiento();
      console.log(tablero);
    } catch (error) {
      console.error(error.message);
    }
  })();
  