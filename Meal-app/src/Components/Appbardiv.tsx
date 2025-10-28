import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { Component } from 'react';
import Appbar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default class Appbardiv extends Component {
  render() {
    return (
      <Box>
        <Appbar
          sx={{
            position:'static',
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
            >
              <MenuIcon />
            </IconButton>

            
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
              <img
                src="/logo.jpg"
                alt="logo"
                style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '50%',
                }}
              />
              <Typography
                variant="h6"
                sx={{ marginLeft: '10px', fontWeight: 500 }}
              >
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
            <Button color="inherit">Home</Button>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </Appbar>
      </Box>
    );
  }
}
