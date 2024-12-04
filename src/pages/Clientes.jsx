
import { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../dashboard/components/AppNavbar';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, FormControl, OutlinedInput, InputAdornment } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InfoIcon from '@mui/icons-material/Info';
import QuejaService from '../general/conexion/Queja_Service'; 
import Header from '../general/components/Header';

export default function Clientes(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  // Cargar quejas y usuarios al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const usuariosResponse = await QuejaService.obtenerProfesionales();
        setUsuarios(
          usuariosResponse.map((u) => ({
            id: u.persona.id,
            email: u.email,
            rol: u.roles,
            nombre: `${u.persona?.nombre || ''} ${u.persona?.apellido || ''}`
          }))
        );
      } catch (error) {
        console.error('Error cargando datos:', error);
      }
    };

    cargarDatos();
  }, []);

  // Filtrar usuarios por búsqueda
  const filteredUsuarios = usuarios.filter(
    (user) =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOpenDialog = (client) => {
    setSelectedClient(client);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedClient(null);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline />
      <SideMenu />
      <AppNavbar />
      <Stack sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
        <Header />
        
        {/* Título con icono */}
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoIcon />
          profecional
        </Typography>

        {/* Barra de búsqueda */}
        <FormControl sx={{ width: { xs: '100%', md: '35ch' }, marginBottom: 2 }} variant="outlined">
          <OutlinedInput
            size="small"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o correo"
            startAdornment={
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            }
            inputProps={{
              'aria-label': 'search',
            }}
          />
        </FormControl>

        {/* Listado de usuarios con DataGrid */}
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filteredUsuarios}
            columns={[
              { field: 'nombre', headerName: 'Nombre', flex: 1 },
              { field: 'email', headerName: 'Email', flex: 1 },
              { field: 'rol', headerName: 'Rol', flex: 0.5 },
            ]}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            onRowClick={(params) => handleClickOpenDialog(params.row)} // Mostrar detalles en el diálogo
          />
        </Box>

        {/* Diálogo para mostrar más información del usuario */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Detalles del Usuario</DialogTitle>
          <DialogContent>
            {selectedClient && (
              <Box sx={{ padding: 2 }}>
                <Typography variant="h6">Nombre: {selectedClient.nombre}</Typography>
                <Typography variant="body1">Correo: {selectedClient.email}</Typography>
                <Typography variant="body1">Rol: {selectedClient.rol}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </AppTheme>
  );
}
