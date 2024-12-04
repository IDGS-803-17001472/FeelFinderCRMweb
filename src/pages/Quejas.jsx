import  { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../dashboard/components/AppNavbar';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from '../general/components/Header';
import QuejaService from '../general/conexion/Queja_Service'; // Asegúrate de la ruta correcta

const xThemeComponents = {};

export default function Quejas(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    IdUsuarioSolicita: '',
    IdUsuarioNecesita: '',
    Estatus: 1,
    Tipo: 1,
    Descripcion: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);

  // Tipos disponibles para el campo 'Tipo'
  const tipos = [
    { id: 1, tipo: 'Mejora' },
    { id: 2, tipo: 'Queja' },
    { id: 3, tipo: 'Error' },
    { id: 4, tipo: 'Sugerencias' },
  ];

  // Estatus de la solicitud
  const estatusOptions = [
    { id: 1, status: 'Activo' },
    { id: 0, status: 'Inactivo' }
  ];

  // Cargar quejas y usuarios al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const quejas = await QuejaService.obtenerQuejas();
        if (Array.isArray(quejas)) {
          setSolicitudes(
            quejas.map((queja) => ({
              id: queja.id,
              IdUsuarioSolicita: queja.IdUsuarioSolicita,
              IdUsuarioNecesita: queja.IdUsuarioNecesita,
              Estatus: queja.estatus,
              Tipo: queja.tipo,
              Descripcion: queja.descripcion
            }))
          );
        }

        const usuariosResponse = await QuejaService.obtenerProfesionales();
        setUsuarios(
          usuariosResponse.map((u) => ({
            id: u.persona.id,
            persona: {
              nombre: u.persona?.nombre || '',
              apellido: u.persona?.apellido || ''
            }
          }))
        );
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };

    cargarDatos();
  }, []);

  // Manejar apertura del cuadro de diálogo para agregar o editar
  const handleOpenDialog = (solicitud = null) => {
    if (solicitud) {
        console.log('solicitus',solicitud)
      setFormData(solicitud);
      setIsEditing(true);
    } else {
      setFormData({
        id: '',
        IdUsuarioSolicita: '',
        IdUsuarioNecesita: '',
        Estatus: 1,
        Tipo: 1,
        Descripcion: ''
      });
      setIsEditing(false);
    }
    console.log('form data',FormData)
    setOpenDialog(true);
  };

  // Manejar cierre del cuadro de diálogo
  const handleCloseDialog = () => setOpenDialog(false);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Guardar o actualizar los datos
  const handleSave = async () => {
    try {
      if (isEditing) {
        await QuejaService.actualizarQueja(
          formData.id,
          formData.Descripcion,
          formData.Tipo,
          formData.Estatus,
          formData.IdUsuarioSolicita,
          formData.IdUsuarioNecesita
        );
      } else {
        await QuejaService.registrarQueja(
          formData.IdUsuarioSolicita,
          formData.IdUsuarioNecesita,
          formData.Descripcion,
          formData.Tipo
        );
      }
      setOpenDialog(false);

      // Recargar quejas
      const quejasActualizadas = await QuejaService.obtenerQuejas();
      setSolicitudes(
        quejasActualizadas.map((queja) => ({
          id: queja.id,
          IdUsuarioSolicita: queja.IdUsuarioSolicita,
          IdUsuarioNecesita: queja.IdUsuarioNecesita,
          Estatus: queja.estatus,
          Tipo: queja.tipo,
          Descripcion: queja.descripcion
        }))
      );
      console.log('quejas actualizadas', quejasActualizadas);
    } catch (error) {
      console.error('Error guardando queja:', error);
    }
  };

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <SideMenu />
      <AppNavbar />
      <Stack sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
        <Header />
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          Quejas y Sugerencias
        </Typography>

        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
          
            rows={solicitudes || []}
            columns={[
              {
                field: 'IdUsuarioSolicita',
                headerName: 'Usuario Solicita',
                flex: 1,
                renderCell: (params) => {
                    
                  const usuario = usuarios.find((u) => u.id === params.id);
                  return usuario
                    ? `${usuario.persona.nombre} ${usuario.persona.apellido}`
                    : 'Desconocido';
                }
              },
              {
                field: 'IdUsuarioNecesita',
                headerName: 'Usuario Necesita',
                flex: 1,
                renderCell: (params) => {
                  const usuario = usuarios.find((u) => u.id === params.id);
                  return usuario
                    ? `${usuario.persona.nombre} ${usuario.persona.apellido}`
                    : 'Desconocido';
                }
              },
              {
                field: 'Estatus',
                headerName: 'Estatus',
                flex: 0.5,
                renderCell: (params) => {
                  const estatus = estatusOptions.find(e => e.id === params.value);
                  return estatus ? estatus.status : 'Desconocido';
                }
              },
              {
                field: 'Tipo',
                headerName: 'Tipo',
                flex: 0.5,
                renderCell: (params) => {
                  const tipo = tipos.find(t => t.id === params.value);
                  return tipo ? tipo.tipo : 'Desconocido';
                }
              },
              { field: 'Descripcion', headerName: 'Descripción' }
            ]}
            
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            
            onRowClick={(e) => 
            
                handleOpenDialog(e.row)
                

            } // Manejo de clic en la fila
          />
        </Box>

        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Añadir Solicitud
        </Button>

        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>{isEditing ? 'Editar Solicitud' : 'Añadir Solicitud'}</DialogTitle>
          <DialogContent>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="IdUsuarioSolicita-label">Usuario Solicita</InputLabel>
                <Select
                  labelId="IdUsuarioSolicita-label"
                  name="IdUsuarioSolicita"
                  value={formData.IdUsuarioSolicita}
                  onChange={handleInputChange}
                  
                >
                  {usuarios.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {`${user.persona.nombre} ${user.persona.apellido}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="IdUsuarioNecesita-label">Usuario Necesita</InputLabel>
                <Select
                  labelId="IdUsuarioNecesita-label"
                  name="IdUsuarioNecesita"
                  value={formData.IdUsuarioNecesita}
                  onChange={handleInputChange}
                >
                  {usuarios.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {`${user.persona.nombre} ${user.persona.apellido}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Descripción"
                name="Descripcion"
                value={formData.Descripcion}
                onChange={handleInputChange}
                
                rows={4}
                sx={{ marginBottom: 1 }}
              />

              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="Tipo-label">Tipo</InputLabel>
                <Select
                  labelId="Tipo-label"
                  name="Tipo"
                  value={formData.Tipo}
                  onChange={handleInputChange}
                >
                  {tipos.map((tipo) => (
                    <MenuItem key={tipo.id} value={tipo.id}>
                      {tipo.tipo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="Estatus-label">Estatus</InputLabel>
                <Select
                  labelId="Estatus-label"
                  name="Estatus"
                  value={formData.Estatus}
                  onChange={handleInputChange}
                >
                  {estatusOptions.map((estatus) => (
                    <MenuItem key={estatus.id} value={estatus.id}>
                      {estatus.status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSave} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </AppTheme>
  );
}
