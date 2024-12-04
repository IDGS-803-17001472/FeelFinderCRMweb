import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CommentIcon from '@mui/icons-material/Comment';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom';

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, route: '/' },
  { text: 'Analytics', icon: <AnalyticsRoundedIcon />, route: '/analytics' },
  { text: 'Clientes', icon: <PeopleRoundedIcon />, route: '/clientes' },
  { text: 'Empresas', icon: <AddBusinessIcon />, route: '/empresas' },
  { text: 'Quejas', icon: <CommentIcon />, route: '/quejas' },
  { text: 'Subscriciones', icon: <FormatListBulletedIcon />, route: '/subcriciones' },
  { text: 'Profecional', icon: <AssignmentIndIcon />, route: '/profecional' },
  { text: 'Planes de Suscripción', icon: <AssignmentRoundedIcon />, route: '/plansubcripcion' },
  {text: 'Oportunidad de Venta', icon: <MonetizationOnIcon  />, route: '/OportunidadVenta'}
];



export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton component={Link} to={item.route}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      
    </Stack>
  );
}
