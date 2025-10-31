import React, { Component } from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

class Footer extends Component {
  render() {
    return (
      <Box
        component="footer"
        sx={{
          width: '100%',
          py: 4,
          backgroundColor: '#3D4127',
          color: '#fff',
        }}
      >
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Meal App
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            &copy; {new Date().getFullYear()} Meal App. All rights reserved.
          </Typography>
        </Container>
      </Box>
    );
  }
}

export default Footer;
