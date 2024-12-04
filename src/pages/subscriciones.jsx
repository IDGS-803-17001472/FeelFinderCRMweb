import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../dashboard/components/AppNavbar';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography, FormControl, OutlinedInput, InputAdornment, InputLabel, Select, MenuItem } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InfoIcon from '@mui/icons-material/Info';
import { DataGrid } from '@mui/x-data-grid';
import SuscripcionService from '../general/conexion/Suscripcion_Service';
import PagoService from '../general/conexion/Pago_Service';

export default function Suscripciones(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openPagoDialog, setOpenPagoDialog] = useState(false);
  const [formData, setFormData] = useState({
    cliente: '',
    plan: '',
    fechaInicio: '',
    fechaFin: '',
    estado: 'Activo',
  });
  const [pagosData, setPagosData] = useState({
    cantidad: '',
    fechaDePago: '',
    suscripcionId: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [suscripcionesRows, setSuscripcionesRows] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const suscripcionService = new SuscripcionService();
    const pagoService = new PagoService();

    const fetchData = async () => {
      const suscripciones = await suscripcionService.obtenerSuscripciones();
      const clientes = await suscripcionService.obtenerClientes();
      const planes = await suscripcionService.obtenerPlanes();
      const pagos = await pagoService.obtenerPagos();

      const rows = suscripciones.map((suscripcion) => {
        const cliente = clientes.find((c) => c.id === suscripcion.clienteId);
        const plan = planes.find((p) => p.id === suscripcion.planId);

        return {
          id: suscripcion.id,
          nombre: cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Desconocido',
          plan: plan ? plan.nombre : 'Desconocido',
          estado: suscripcion.estado,
          fechaInicio: suscripcion.fechaDeInicio,
          fechaFin: suscripcion.fechaDeFin,
          pagos: pagos.filter((pago) => pago.suscripcionId === suscripcion.id), // Filtrar pagos por suscripción
        };
      });
console.log("rows",rows);
      setSuscripcionesRows(rows);
      setClientes(clientes);
      setPlanes(planes);
      setPagos(pagos);
    };

    fetchData();
  }, []);

  const handleOpenDialog = (suscripcion = null) => {
    if (suscripcion) {
      setFormData({
        id: suscripcion.id,
        cliente: suscripcion.nombre,
        plan: suscripcion.plan,
        estado: suscripcion.estado,
        fechaInicio: suscripcion.fechaInicio.split('T')[0],
        fechaFin: suscripcion.fechaFin.split('T')[0],
      });
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => setOpenDialog(false);

  const handleOpenPagoDialog = (suscripcionId) => {
    console.log("id ",suscripcionId)
    setPagosData({
      ...pagosData,
      suscripcionId,
    });
    setOpenPagoDialog(true);
  };

  const handleClosePagoDialog = () => setOpenPagoDialog(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cliente') {
      const selectedCliente = clientes.find((cliente) => cliente.id === value);
      setFormData(selectedCliente || { id: 0, nombre: '', apellido: '' });
    } else if (name === 'plan') {
      const selectedPlan = planes.find((plan) => plan.id === value);
      setFormData(selectedPlan || { id: 0, nombre: '', apellido: '' });
    }
    setFormData({ ...formData, [name]: value });
  };

  const handlePagoInputChange = (e) => {
    const { name, value } = e.target;
    setPagosData({ ...pagosData, [name]: value });
  };

   // Guardar o actualizar los datos
   const handleSave = async () => {
    const suscripcionService = new SuscripcionService();
    try {
      if (isEditing) {
        console.log("formData antes de llamar a registrarEmpresa:", formData);

        await suscripcionService.actualizarSuscripcion(
          formData.fechaDeInicio,
          formData.fechaDeFin,
          formData.estado,
          formData.cliente,
          formData.plan,
          formData.id
        );
        console.log("formData antes de llamar a registrarEmpresa:", formData);
      } else {
        console.log("formData antes de llamar a registrarEmpresa:", formData);

        await suscripcionService.registrarSuscripcion(
          formData.fechaDeInicio,
          formData.fechaDeFin,
          formData.estado,
          formData.cliente,
          formData.plan,
        );
        console.log("formData antes de llamar a registrarEmpresa:", formData);
      }
      setOpenDialog(false);
      const pagoService = new PagoService();

      const fetchData = async () => {
        const suscripciones = await suscripcionService.obtenerSuscripciones();
        const clientes = await suscripcionService.obtenerClientes();
        const planes = await suscripcionService.obtenerPlanes();
        const pagos = await pagoService.obtenerPagos();
  
        const rows = suscripciones.map((suscripcion) => {
          const cliente = clientes.find((c) => c.id === suscripcion.clienteId);
          const plan = planes.find((p) => p.id === suscripcion.planId);
  
          return {
            id: suscripcion.id,
            nombre: cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Desconocido',
            plan: plan ? plan.nombre : 'Desconocido',
            estado: suscripcion.estado,
            fechaInicio: suscripcion.fechaDeInicio,
            fechaFin: suscripcion.fechaDeFin,
            pagos: pagos.filter((pago) => pago.suscripcionId === suscripcion.id) // Filtrar pagos por suscripción
            
          };
         
        });
       
        setSuscripcionesRows(rows);
        setClientes(clientes);
        setPlanes(planes);
        setPagos(pagos);
      };
  
      fetchData();
     
    } catch (error) {
      console.error('Error guardando queja:', error);
    }
  };

  const handleSavePago = async () => {
    const pagoService = new PagoService();
    console.log("pagosData",pagosData)
    await pagoService.registrarPago(pagosData.cantidad,pagosData.fechaDePago,pagosData.suscripcionId);

    const updatedPagos = await pagoService.obtenerPagos();
    setPagos(updatedPagos);

    setSuscripcionesRows((prev) =>
      prev.map((suscripcion) =>
        suscripcion.id === pagosData.suscripcionId
          ? { ...suscripcion, pagos: [...suscripcion.pagos, pagosData] }
          : suscripcion
      )
    );
    handleClosePagoDialog();
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SideMenu />
      <AppNavbar />

      <Stack sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoIcon />
          Suscripciones
        </Typography>

        <FormControl sx={{ width: { xs: '100%', md: '35ch' }, marginBottom: 2 }} variant="outlined">
          <OutlinedInput
            size="small"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente o plan"
            startAdornment={
              <InputAdornment position="start" sx={{ color: 'text.primary' }}>
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            }
            inputProps={{ 'aria-label': 'search' }}
          />
        </FormControl>

        <Box sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={suscripcionesRows}
            columns={[
              { field: 'nombre', headerName: 'Cliente', flex: 1 },
              { field: 'plan', headerName: 'Plan', flex: 1 },
              { field: 'estado', headerName: 'Estado', flex: 1 },
              {
                field: 'fechaInicio',
                headerName: 'Fecha de Inicio',
                flex: 1,
                renderCell: (params) => {
                  const date = new Date(params.row.fechaInicio);
                  return date.toLocaleDateString();
                },
              },
              {
                field: 'fechaFin',
                headerName: 'Fecha de Fin',
                flex: 1,
                renderCell: (params) => {
                  const date = new Date(params.row.fechaFin);
                  return date.toLocaleDateString();
                },
              },
              {
                field: 'pagos',
                headerName: 'Pagos',
                flex: 1,
                renderCell: (params) => {
                  const pagos = params.row.pagos;
                  if (pagos && pagos.length > 0) {
                    return pagos
                      .map((pago) => `Cantidad: ${pago.cantidad}, Fecha: ${new Date(pago.fechaDePago).toLocaleDateString()}`)
                      .join(' | ');
                  }
                  return 'No hay pagos';
                }
              },
              {
                field: 'addPago',
                headerName: 'Agregar Pago',
                renderCell: (params) => (
                  <Button variant="contained" onClick={() => handleOpenPagoDialog(params.row.id)}>
                    Agregar Pago
                  </Button>
                ),
              },
            ]}
            onRowClick={(params) => handleOpenDialog(params.row)}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
          />
        </Box>

        <Button variant="contained" onClick={() => handleOpenDialog()}>
          Añadir Suscripción
        </Button>

        {/* Dialogo de agregar/editar suscripción */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>{isEditing ? 'Editar Suscripción' : 'Añadir Suscripción'}</DialogTitle>
          <DialogContent>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="IdCliente-label">Usuario Solicita</InputLabel>
                <Select labelId="IdCliente-label" name="cliente" value={formData.cliente || ''} onChange={handleInputChange}>
                  {clientes.map((cliente) => (
                    <MenuItem key={cliente.id} value={cliente.id}>
                      {cliente.nombre} {cliente.apellido}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="plan-label">Plan</InputLabel>
                <Select labelId="plan-label" name="plan" value={formData.plan || ''} onChange={handleInputChange}>
                  {planes.map((plan) => (
                    <MenuItem key={plan.id} value={plan.id}>
                      {plan.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Fecha Inicio"
                name="fechaInicio"
                type="date"
                fullWidth
                value={formData.fechaInicio || ''}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Fecha Fin"
                name="fechaFin"
                type="date"
                fullWidth
                value={formData.fechaFin || ''}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSave}>Guardar</Button>
          </DialogActions>
        </Dialog>

        {/* Dialogo de agregar pago */}
        <Dialog open={openPagoDialog} onClose={handleClosePagoDialog} fullWidth maxWidth="sm">
          <DialogTitle>Registrar Pago</DialogTitle>
          <DialogContent>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <TextField
                label="Cantidad"
                name="cantidad"
                type="number"
                fullWidth
                value={pagosData.cantidad || ''}
                onChange={handlePagoInputChange}
              />

              <TextField
                label="Fecha de Pago"
                name="fechaDePago"
                type="date"
                fullWidth
                value={pagosData.fechaDePago || ''}
                onChange={handlePagoInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePagoDialog}>Cancelar</Button>
            <Button onClick={handleSavePago}>Guardar Pago</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </AppTheme>
  );
}
