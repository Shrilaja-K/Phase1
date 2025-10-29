import React, { Component } from 'react';
import { Box, TextField, Button, Typography, Paper, Link } from '@mui/material';
import { withRouter } from './withRouter'; 

class SignUp extends Component {
  state = { 
    name: '', 
    email: '', 
    password: '', 
    signedUp: false,
    errors: {} 
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errors: { ...this.state.errors, [name]: '' } });
  };

  
  validateForm = () => {
    const { name, email, password } = this.state;
    const errors = {};

    if (!name.trim()) {
      errors.name = 'Full name is required';
    }

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
      console.log('✅ Sign Up submitted:', this.state);
      this.setState({ signedUp: true });
    } else {
      console.warn('⚠️ Validation failed');
    }
  };

  navigateToLogin = () => {
    this.props.navigate('/Login'); 
  };

  navigateToHome = () => {
    this.props.navigate('/'); 
  };

  render() {
    const { name, email, password, signedUp, errors } = this.state;

    if (signedUp) {
      return (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#737a3fb0',
            p: 0,
            m:0,
            overflow:'hidden'
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: '100%',
              maxWidth: 400,
              p: 4,
              mx:'auto',
              textAlign: 'center',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="h4" sx={{ color: '#3D4127', mb: 2 }}>
              Welcome, {name}!
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#3D4127', color: '#fff' }}
              onClick={this.navigateToHome}
            >
              Go to Home
            </Button>
          </Paper>
        </Box>
      );
    }

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
            Sign Up
          </Typography>

          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={name}
              onChange={this.handleChange}
              error={Boolean(errors.name)}
              helperText={errors.name}
              sx={{ mb: 2 }}
            />

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
              Sign Up
            </Button>
          </form>

          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link
              component="button"
              variant="body2"
              onClick={this.navigateToLogin}
              sx={{ color: '#3D4127', fontWeight: 500 }}
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    );
  }
}

export default withRouter(SignUp);
