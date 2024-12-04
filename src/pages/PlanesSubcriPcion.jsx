import React, { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../dashboard/components/AppNavbar';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography, FormControl, OutlinedInput, InputAdornment, Switch, FormControlLabel } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid } from '@mui/x-data-grid';
import PlanSuscripcionService from '../general/conexion/PlanSuscripcion_Service';

const xThemeComponents = {};

export default function PlanesSuscripcion(props) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [formData, setFormData] = React.useState({
    nombre: '',
    precio: 0,
    descripcion: '',
    duracionMeses: 0,
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const [planesRows, setPlanesRows] = React.useState([]);

  // Obtener los planes de suscripción desde la API
  useEffect(() => {
    const planService = new PlanSuscripcionService();
    const fetchPlanes = async () => {
      const planes = await planService.obtenerPlanes();
      setPlanesRows(planes);
    };
    fetchPlanes();
  }, []);

  const handleOpenDialog = (plan = null) => {
    if (plan) {
      setFormData(plan);
      setIsEditing(true);
    } else {
      setFormData({ nombre: '', precio: 0, descripcion: '', duracionMeses: 0 });
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
    const planService = new PlanSuscripcionService();

    try {
      if (isEditing) {
        // Llamar a la API de actualización(id, nombre, direccion, telefono, correo, nombreCliente, status)
        await planService.actualizarPlan(
          formData.id,
          formData.nombre,
          formData.precio,
          formData.descripcion,
          formData.duracionMeses,
          
        );
  
      
      } else {
        console.log("formData antes de llamar a registrarEmpresa:", formData);
//(nombre, direccion, telefono, correo, nombreCliente) {
        await planService.registrarPlan(
          formData.nombre,
          formData.precio,
          formData.descripcion,
          formData.duracionMeses,
          
        );
  
        // Actualizar el estado local agregando la nueva empresa
      
      }
  
     
      const fetchPlanes = async () => {
        const planes = await planService.obtenerPlanes();
        setPlanesRows(planes);
      };
      fetchPlanes();
      handleCloseDialog();
    } catch (error) {
      console.error("Error al guardar la empresa:", error);
      alert("Hubo un problema al guardar la empresa. Por favor, inténtalo de nuevo.");
    }
  };
  

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <SideMenu />
      <AppNavbar />

      <Stack sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoIcon />
          Planes de Suscripción
        </Typography>

        <FormControl sx={{ width: { xs: '100%', md: '35ch' }, marginBottom: 2 }} variant="outlined">
          <OutlinedInput
            size="small"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, descripción o precio"
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            }
            inputProps={{ 'aria-label': 'search' }}
          />
        </FormControl>

        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={planesRows}
            columns={[
              { field: 'nombre', headerName: 'Nombre', flex: 1 },
              { field: 'precio', headerName: 'Precio', flex: 0.5 },
              { field: 'descripcion', headerName: 'Descripción', flex: 1 },
              { field: 'duracionMeses', headerName: 'Duración (meses)', flex: 0.5 },
            ]}
            onRowClick={(params) => handleOpenDialog(params.row)}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>

        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Añadir Plan
        </Button>

        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>{isEditing ? 'Editar Plan' : 'Añadir Plan'}</DialogTitle>
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
                margin="normal"
                fullWidth
                label="Nombre del Plan"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Precio"
                name="precio"
                type="number"
                value={formData.precio}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Duración en Meses"
                name="duracionMeses"
                type="number"
                value={formData.duracionMeses}
                onChange={handleInputChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </AppTheme>
  );
}
