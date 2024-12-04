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
import EmpresaService from '../general/conexion/Empresa_Service';

const xThemeComponents = {};

export default function Empresas(props) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);
  const [formData, setFormData] = React.useState({
    NombreEmpresa: '',
    Direccion: '',
    NombreCliente: '',
    Telefono: '',
    Correo: '',
    Activo: true
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const [empresaRows, setEmpresaRows] = React.useState([]);

  // Obtener las empresas desde la API
  useEffect(() => {
    const empresaService = new EmpresaService();
    const fetchEmpresas = async () => {
      const empresas = await empresaService.obtenerEmpresas();
      setEmpresaRows(empresas);
    };
    fetchEmpresas();
  }, []);

  const handleOpenDialog = (empresa = null) => {
    if (empresa) {
      setFormData(empresa);
      console.log(empresa);
      setIsEditing(true);
    } else {
      setFormData({ NombreEmpresa: '', Direccion: '', NombreCliente: '', Telefono: '', Correo: '', Activo: true });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setFormData({ ...formData, Activo: e.target.checked });
  };

  const handleSave = async () => {
    const empresaService = new EmpresaService();

    try {
      if (isEditing) {
        // Llamar a la API de actualización(id, nombre, direccion, telefono, correo, nombreCliente, status)
        await empresaService.actualizarEmpresa(
          formData.id,
          formData.NombreEmpresa,
          formData.Direccion,
          formData.Telefono,
          formData.Correo,
          formData.NombreCliente,
          formData.Activo ? 1 : 0 // Convertir el estado del switch a un valor numérico
        );
  
      
      } else {
        console.log("formData antes de llamar a registrarEmpresa:", formData);
//(nombre, direccion, telefono, correo, nombreCliente) {
        await empresaService.registrarEmpresa(
          formData.NombreEmpresa,
          formData.Direccion,
          formData.Telefono,
          formData.Correo,
          formData.NombreCliente
        );
  
        // Actualizar el estado local agregando la nueva empresa
      
      }
  
     
    const fetchEmpresas = async () => {
      const empresas = await empresaService.obtenerEmpresas();
      setEmpresaRows(empresas);
    };
    fetchEmpresas();
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
          Empresas
        </Typography>

        <FormControl sx={{ width: { xs: '100%', md: '35ch' }, marginBottom: 2 }} variant="outlined">
          <OutlinedInput
            size="small"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, correo, dirección o teléfono"
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
            rows={empresaRows}
            columns={[
              { field: 'nombreEmpresa', headerName: 'Nombre Empresa', flex: 1 },
              { field: 'direccion', headerName: 'Dirección', flex: 1 },
              { field: 'nombreCliente', headerName: 'Nombre Cliente', flex: 1 },
              { field: 'telefono', headerName: 'Teléfono', flex: 1 },
              { field: 'correo', headerName: 'Correo', flex: 1 },
              { field: 'estatus', headerName: 'Activo', flex: 0.5, renderCell: (params) => (params.row.estatus ? 'Sí' : 'No') }
            ]}
            onRowClick={(params) => handleOpenDialog(params.row)}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>

        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Añadir Empresa
        </Button>

        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>{isEditing ? 'Editar Empresa' : 'Añadir Empresa'}</DialogTitle>
          <DialogContent>
            <Box component="form"  sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                fullWidth
                label="Nombre de la Empresa"
                name="NombreEmpresa"
                value={formData.nombreEmpresa}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Dirección"
                name="Direccion"
                value={formData.direccion}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Nombre del Cliente"
                name="NombreCliente"
                value={formData.nombreCliente}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Teléfono"
                name="Telefono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Correo Electrónico"
                name="Correo"
                value={formData.correo}
                onChange={handleInputChange}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.activo}
                    onChange={handleSwitchChange}
                    name="Activo"
                    color="primary"
                  />
                }
                label="Activo"
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
