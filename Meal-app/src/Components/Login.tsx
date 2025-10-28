
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Toolbar } from '@mui/material';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', form);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#737a3fb0',
        flexDirection: 'column',
        p: 2,
      }}
    >
   
      <Toolbar />

      <Paper
        sx={{
          width: { xs: '90%', sm: 400 },
          maxWidth: 400,
          p: 3,
          backgroundColor: '#BAC095',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, color: '#3D4127' }}>
          Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          sx={{ mb: 2, backgroundColor: '#fff' }}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          sx={{ mb: 3, backgroundColor: '#fff' }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: '#3D4127', color: '#fff' }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;
