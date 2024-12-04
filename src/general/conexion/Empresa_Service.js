import {baseURL}  from './conexion';

class EmpresaService {
    constructor() {
      this.headers = {
        'Content-Type': 'application/json', // Solo Content-Type
      };
    }
  
    // Obtener todas las empresas
    async obtenerEmpresas() {
      try {
        const uri = `${baseURL}/api/Empresa/todas`; // Asegúrate de tener la URL correcta aquí
        console.log(`obtenerEmpresas: ${uri}`);
  
        const response = await fetch(uri, {
          method: 'GET',
          headers: this.headers,
        });
  
        if (response.status === 200) {
          const empresas = await response.json();
          console.log("obtenerEmpresas respuesta:", empresas);
          return empresas;
        } else if (response.status === 404) {
          return [];
        } else {
          throw new Error('Error al cargar las empresas');
        }
      } catch (e) {
        console.error("Exception en obtenerEmpresas:", e);
        return [];
      }
    }
  
    // Registrar una nueva empresa
    async registrarEmpresa(nombre, direccion, telefono, correo, nombreCliente) {
      try {
        const uri = `${baseURL}/api/empresa/registrar`; // Asegúrate de tener la URL correcta aquí
  
        const body = JSON.stringify({
          nombreCliente: nombre || "", // Valor predeterminado si es undefined
          nombreEmpresa: nombreCliente || "", 
          direccion: direccion || "",
          telefono: telefono || "",
          correo: correo || "",
          estatus: 1, // Por defecto activa
        });
        
        console.log('body1',body);
        const response = await fetch(uri, {
          method: 'POST',
          headers: this.headers,
          body: body,
        });
        console.log('body',body);
  console.log('resonse',response);
        if (!response.ok) {
          throw new Error('No se pudo registrar la empresa');
        }
      } catch (e) {
        console.error("Exception en registrarEmpresa:", e);
        throw new Error('No se pudo registrar la empresa');
      }
    }
  
    // Actualizar una empresa existente
    async actualizarEmpresa(id, nombre, direccion, telefono, correo, nombreCliente, status) {
      try {
        const uri = `${baseURL}/api/empresa/actualizar-datos/${id}`; // Asegúrate de tener la URL correcta aquí
  
        const body = JSON.stringify({
          id: id,
          NombreCliente: nombre,
          NombreEmpresa: nombreCliente,
          direccion: direccion,
          telefono: telefono,
          correo: correo,
          estatus: status,
        });
        console.log('body actualizar',body);
 
        const response = await fetch(uri, {
          method: 'PUT',
          headers: this.headers,
          body: body,
        });
        console.log('resonse',response);
        if (!response.ok) {
          console.error("Error al actualizar empresa:", await response.text());
          throw new Error('Error al actualizar la empresa');
        }
      } catch (e) {
        console.error("Exception en actualizarEmpresa:", e);
        throw new Error('No se pudo actualizar la empresa');
      }
    }
  
    // Cambiar el estado de una empresa
    async cambiarEstatusEmpresa(idEmpresa, estatus) {
      try {
        const uri = `${baseURL}/api/empresa/${idEmpresa}/cambiar-estatus`; // Asegúrate de tener la URL correcta aquí
  
        const body = JSON.stringify({
          estatus: estatus,
        });
  
        const response = await fetch(uri, {
          method: 'PUT',
          headers: this.headers,
          body: body,
        });
  
        if (!response.ok) {
          console.error("Error al cambiar estado de empresa:", await response.text());
          throw new Error('Error al cambiar el estado de la empresa');
        }
      } catch (e) {
        console.error("Exception en cambiarEstatusEmpresa:", e);
        throw new Error('No se pudo cambiar el estado de la empresa');
      }
    }
  }
  
  export default EmpresaService;
  