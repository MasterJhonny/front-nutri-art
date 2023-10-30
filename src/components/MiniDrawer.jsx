import { NavLink } from 'react-router-dom';
import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// impoert icon material ui
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ListAltIcon from '@mui/icons-material/ListAlt';

const listIcon = {
  'HomeIcon': HomeIcon,
  'InventoryIcon': InventoryIcon,
  'PeopleIcon': PeopleIcon,
  'MonetizationOnIcon': MonetizationOnIcon
}

function MakeIcon({nameIcon}) {
  const [icon, setIcon] = useState(nameIcon);
  return (
    <>
      {icon === 'HomeIcon' ? <HomeIcon/> : null }
      {icon === 'InventoryIcon' ? <InventoryIcon/> : null }
      {icon === 'PeopleIcon' ? <PeopleIcon/> : null }
      {icon === 'MonetizationOnIcon' ? <MonetizationOnIcon/> : null } 
      {icon === 'ListAltIcon' ? <ListAltIcon/> : null } 

    </>
  );
}

import { Routes, Route, Navigate } from 'react-router-dom';
// import components
import { Home } from '../pages/Home'
import { InventoryMaterial } from '../pages/InventoryMaterial';
import { Labour } from '../pages/Labour';
import { IndirectCosts } from '../pages/IndirectCosts'
import { Users } from '../pages/Users'
import { NotFound } from '../pages/NotFound'
import { User } from '../pages/User'
import { Login } from '../pages/Login';
import { ProductionCost } from '../pages/ProductionCost';


const drawerWidth = 270;
const auth = true;
const listItemModule = [
  {
    name: 'Inicio',
    path: '/',
    nameIcon: 'HomeIcon'
  },
  {
    name: 'Invetarios de Materiales',
    path: '/inventory',
    nameIcon: 'InventoryIcon'
  },
  {
    name: 'Mano de Obra',
    path: '/labour',
    nameIcon: 'PeopleIcon'
  },
  {
    name: 'Costos Indirectos',
    path: '/indirectCosts',
    nameIcon: 'MonetizationOnIcon'
  },
  {
    name: 'Costos de Producción',
    path: '/productionCost',
    nameIcon: 'ListAltIcon'
  }
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color='inherit' sx={{ background: '#F4CE14' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            EMPRESA "YOGURT NUTRI ART"
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listItemModule.map((item, index) => (
            
              <NavLink to={item.path} key={item.name} style={{ width: open ? 170 : 0}}>
                
                <ListItemButton
                  
                  sx={{
                    background: 'none',
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <MakeIcon nameIcon={item.nameIcon}/>
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </NavLink>
            
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          Bienvenidos a sistema de inventarios y kardex de la empresa de Yogurt nutri Art.
        </Typography>
        <Routes>
          <Route path="/" element={auth ? <Home/> : <Navigate to='/login'/>}/>
          <Route path="/labour/*" element={<Labour/>}/>
          <Route path="/indirectCosts/*" element={<IndirectCosts/>}/>
          <Route path="/productionCost/*" element={<ProductionCost/>}/>
          
          <Route path="/inventory/*" element={<InventoryMaterial/>}>
            <Route path="welcome" element={<h3>Welcome !!</h3>}/>
            <Route path="bye" element={<h3>bye !!</h3>}/>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users/>}/>
          <Route path="/users/:id" element={<User/>}/>
          
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </Box>
    </Box>
  );
}