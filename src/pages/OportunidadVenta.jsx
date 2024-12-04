

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../dashboard/components/AppNavbar';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography, FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { DataGrid } from '@mui/x-data-grid';
import  React, { useEffect, useState } from 'react';

import OportunidadVentaServicio from '../general/conexion/OportunidadVenta_Servicio';
const xThemeComponents = {};

export default function OportunidadesVenta(props) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [oportunidadRows, setOportunidadRows] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    nombreCliente: '',
    descripcion: '',
    valorEstimado: '',
    fechaCierre: '',
    estado: '',
  });

  useEffect(() => {
    const servicio = new OportunidadVentaServicio();
    servicio.obtenerOportunidadesVenta().then(setOportunidadRows).catch(console.error);
  }, []);

  const handleOpenDialog = (oportunidad = null) => {
    if (oportunidad) {
      setFormData(oportunidad);
      setIsEditing(true);
    } else {
      setFormData({ id: null, nombreCliente: '', descripcion: '', valorEstimado: '', fechaCierre: '', estado: '' });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const servicio = new OportunidadVentaServicio();
    try {
      if (isEditing) {
        console.log(formData);
        await servicio.actualizarOportunidadVenta(
          formData.id, formData);
      } else {
        await servicio.crearOportunidadVenta(
        
          formData.nombreCliente, 
          formData.descripcion,  
          formData.valorEstimado,  
          formData.fechaCierre,  
          formData.estado
          );
      }
      const oportunidades = await servicio.obtenerOportunidadesVenta();
      setOportunidadRows(oportunidades);
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <SideMenu />
      <AppNavbar />
    <Stack spacing={3} sx={{ padding: 3 }}>
      <Typography variant="h4">Oportunidades de Venta</Typography>
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
          rows={oportunidadRows}
          columns={[
            { field: 'nombreCliente', headerName: 'Cliente', flex: 1 },
            { field: 'descripcion', headerName: 'Descripción', flex: 1 },
            { field: 'valorEstimado', headerName: 'Valor Estimado', flex: 1 },
            { field: 'fechaCierre', headerName: 'Fecha de Cierre', flex: 1 },
            { field: 'estado', headerName: 'Estado', flex: 1 },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          onRowClick={(params) => handleOpenDialog(params.row)}
        />
      </Box>
      <Button variant="contained" onClick={() => handleOpenDialog()}>Añadir Oportunidad</Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEditing ? 'Editar Oportunidad' : 'Nueva Oportunidad'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Cliente" name="nombreCliente" value={formData.nombreCliente} onChange={handleInputChange} />
          <TextField fullWidth label="Descripción" name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
          <TextField fullWidth label="Valor Estimado"   type="number"  name="valorEstimado" value={formData.valorEstimado} onChange={handleInputChange} />
          <TextField fullWidth type="date" label="Fecha de Cierre" name="fechaCierre" value={formData.fechaCierre} onChange={handleInputChange} />
          <TextField fullWidth label="Estado" name="estado" value={formData.estado} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Stack>
    </AppTheme>
  );
}
