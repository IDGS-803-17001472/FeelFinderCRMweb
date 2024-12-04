import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../dashboard/components/AppNavbar';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography, FormControl, OutlinedInput, InputAdornment, InputLabel, Select, MenuItem } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid } from '@mui/x-data-grid';
import ClienteService from '../general/conexion/Cliente_Service';

export default function ClientesRegistrados(props) {
 
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    estado: 'Activo',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [clientesRows, setClientesRows] = useState([]);
  const [, setClientes] = useState([]);

  useEffect(() => {
    const clienteService = new ClienteService();

    const fetchData = async () => {
      const clientes = await clienteService.obtenerClientes();

      const rows = clientes.map((cliente) => ({
        id: cliente.id,
        nombre: cliente.nombre,
        correo: cliente.correoElectronico,
     
        apellido: cliente.apellido,
      }));

      setClientesRows(rows);
      setClientes(clientes);
    };

    fetchData();
  }, []);

  const handleOpenDialog = (cliente = null) => {
    if (cliente) {
      setFormData({
        id: cliente.id, // El ID se almacena pero no se muestra en el formulario.
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        email: cliente.email,
        telefono: cliente.telefono,
        estado: cliente.estado,
      });
      setIsEditing(true);
    } else {
      setFormData({
        id: '', // Limpiar ID al añadir un nuevo cliente.
        nombre: '',
        apellido: '',
        correo: '',
        estado: 'Activo',
      });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const clienteService = new ClienteService();
  
    try {
      if (isEditing) {
        // Llamar al API para actualizar el clienteid, nombre, apellido, correo)
        await clienteService.actualizarCliente(
          formData.id, // Pasa el id al actualizar
          formData.nombre,
          formData.apellido,
          formData.correo
         
          
        );
        console.log("Cliente actualizado", formData);
      } else {
        // Llamar al API para registrar un nuevo clientenombre, apellido, correo)
        await clienteService.registrarCliente(
          formData.nombre,
          formData.apellido,
          formData.correo
        );
        console.log("Nuevo cliente registrado", formData);
      }
  
      // Después de guardar, vuelve a cargar los datos de clientes
      const fetchData = async () => {
        const clientes = await clienteService.obtenerClientes();
        const rows = clientes.map((cliente) => ({
          id: cliente.id,
          nombre: cliente.nombre,
          correo: cliente.correoElectronico,
       
          apellido: cliente.apellido,
        }));
        setClientesRows(rows);
        setClientes(clientes);
      };
  
      fetchData(); // Refresca los datos de clientes
      handleCloseDialog(); // Cierra el diálogo
  
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
      alert("Hubo un problema al guardar el cliente. Por favor, inténtalo de nuevo.");
    }
  };
  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SideMenu />
      <AppNavbar />

      <Stack sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoIcon />
          Clientes
        </Typography>


        <Box sx={{ height: 600, width: '100%' }}>
  <DataGrid
    rows={clientesRows}
    columns={[
    // Ocultar el ID pero disponible internamente
    { field: 'correo', headerName: 'Correo', flex: 1 },
      { field: 'nombre', headerName: 'nombre', flex: 1 },
      // Asegúrate que este nombre coincida con el mapeo de datos
      { field: 'apellido', headerName: 'Apellido', flex: 1 },
    ]}
    onRowClick={(params) => handleOpenDialog(params.row)}
    pageSize={5}
    rowsPerPageOptions={[5, 10]}
  />
</Box>


        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Añadir Cliente
        </Button>

        {/* Dialogo de agregar/editar cliente */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>{isEditing ? 'Editar Cliente' : 'Añadir Cliente'}</DialogTitle>
          <DialogContent>
            <Box component="form" noValidate sx={{ mt: 2 }}>
            <Box sx={{ display: 'none' }}>
                  <TextField
                    label="ID"
                    name="id"
                    type="text"
                    value={formData.id || ''}
                    margin="normal"
                  />
                </Box>

              <TextField
                label="Nombre"
                name="nombre"
                fullWidth
                value={formData.nombre || ''}
                onChange={handleInputChange}
                margin="normal"
              />

              <TextField
                label="Apellido"
                name="apellido"
                fullWidth
                value={formData.apellido || ''}
                onChange={handleInputChange}
                margin="normal"
              />

              <TextField
                label="Correo"
                name="correo"
                type="email"
                fullWidth
                value={formData.correo || ''}
                onChange={handleInputChange}
                margin="normal"
              />

            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </AppTheme>
  );
}
