import React, { Component } from 'react';
import { Box, Button, IconButton, Toolbar, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import CategoryIcon from '@mui/icons-material/Category';
import { withRouter } from './withRouter';

class Appbardiv extends Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({ drawerOpen: open });
  };

  navigateTo = (path) => {
    this.props.navigate(path); 
    this.setState({ drawerOpen: false });
  };

  render() {
    const menuItems = [
      { text: 'Home', icon: <HomeIcon />, path: '/' },
      { text: 'Login', icon: <LoginIcon />, path: '/login' },
      { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
    ];

    return (
      <Box>
        <AppBar
          sx={{
            position: 'fixed',  
            bgcolor: '#3D4127',
            height: '80px',
            display: 'flex',
            justifyContent: 'center',
            
          }}
        >
          <Toolbar sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={this.toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

          
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <img
                src="/logo.jpg"
                alt="logo"
                style={{ height: '50px', width: '50px', borderRadius: '50%' }}
              />
              <Typography variant="h6" sx={{ marginLeft: '10px', fontWeight: 500 }}>
                Meal Mate
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#BAC095',
                borderRadius: '4px',
                padding: '0 8px',
                flexGrow: 1,
                maxWidth: 600,
                mr: 3,
              }}
            >
              <input
                type="text"
                placeholder="Search meals..."
                style={{
                  outline: 'none',
                  border: 'none',
                  backgroundColor: '#BAC095',
                  flexGrow: 1,
                  padding: '6px',
                }}
              />
              <IconButton type="submit" sx={{ p: '4px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Box>

            <Button color="inherit" onClick={() => this.navigateTo('/')}>Home</Button>
            <Button color="inherit" onClick={() => this.navigateTo('/login')}>Login</Button>
          </Toolbar>
        </AppBar>

        <Drawer
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer(false)}
        >
          <Box sx={{ width: 250 }} >
            <List>
              {menuItems.map((item) => (
                <ListItemButton
                  key={item.text}
                  onClick={() => this.navigateTo(item.path)}
                >
                  <ListItemIcon sx={{ color: '#3D4127' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    );
  }
}

export default withRouter(Appbardiv);
