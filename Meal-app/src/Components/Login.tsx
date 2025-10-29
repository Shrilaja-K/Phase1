import React, { Component } from 'react';
import { Box, TextField, Button, Typography, Paper, Link } from '@mui/material';
import { withRouter } from './withRouter'; 

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {} 
  };

  handleChange = (e) => {
    const { name, value } = e.target;
 
    this.setState({ [name]: value, errors: { ...this.state.errors, [name]: '' } });
  };

  validateForm = () => {
    const { email, password } = this.state;
    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!email.includes('@') || !email.includes('.')) {
      errors.email = 'Enter a valid email';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      console.log('✅ Login submitted:', this.state);
    } else {
      console.warn('⚠️ Validation failed');
    }
  };

  navigateToSignup = () => {
    this.props.navigate('/Signup'); 
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          backgroundColor: '#737a3fb0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '100vh',
          p: { xs: 2, sm: 0 },
          overflowX:'hidden',
          overflowY: 'hidden',
          m:0,
          p:0
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            maxWidth: 400,
            mx:1,
           p: { xs: 3, sm: 4 },
            backgroundColor: '#fff',
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 3, color: '#3D4127', textAlign: 'center' }}
          >
            Login
          </Typography>

          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
              error={Boolean(errors.email)}
              helperText={errors.email}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={{ mb: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ backgroundColor: '#3D4127', color: '#fff', mb: 2 }}
            >
              Login
            </Button>
          </form>

          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={this.navigateToSignup}
              sx={{ color: '#3D4127', fontWeight: 500 }}
            >
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Box>
    );
  }
}

export default withRouter(Login);
