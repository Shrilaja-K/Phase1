import React, { Component } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import SearchIcon from '@mui/icons-material/Search';
import { withRouter } from './withRouter'; 
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';


class Sidebar extends Component {
  render() {
    const { open, toggleDrawer } = this.props; 
    const menuItems = [
      { text: 'Home', icon: <HomeIcon />, path: '/' },
      { text: 'Login', icon: <LoginIcon />, path: '/login' },
      { text: 'Search', icon: <SearchIcon />, path: '/search' },
      { text: 'Favorites',icon:<FavoriteIcon/>,path:'/favorites'},
      { text: 'Filter',icon:<FilterAltIcon/>,path:'/filter'},
    ];

    return (
      <Drawer
        
        open={open}
        onClose={toggleDrawer(false)}
      >
       <List sx={{ width: { xs: 200, sm: 250 }, 
       color: '#fff', 
       height: '100%',
        }}>

        {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => {
                this.props.navigate(item.path);
                toggleDrawer(false)(); 
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    );
  }
}

export default withRouter(Sidebar);
