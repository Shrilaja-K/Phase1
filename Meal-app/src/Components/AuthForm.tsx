// Components/AuthForm.tsx
import React, { Component } from 'react';
import { Box, Paper, TextField, Button, Typography, Link } from '@mui/material';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onAuthSuccess: (name: string) => void;
  navigate: (path: string) => void;
}

interface AuthFormState {
  name: string;
  email: string;
  password: string;
  errors: any;
}

export default class AuthForm extends Component<AuthFormProps, AuthFormState> {
  constructor(props: AuthFormProps) {
    super(props);
    this.state = { name: '', email: '', password: '', errors: {} };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, errors: { ...this.state.errors, [name]: '' } } as any);
  };

  validateForm = () => {
    const { name, email, password } = this.state;
    const errors: any = {};

    if (this.props.mode === 'signup' && !name.trim()) errors.name = 'Full name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!email.includes('@')) errors.email = 'Enter valid email';
    if (!password.trim()) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (this.validateForm()) {
      // call parent to update App state
      const username = this.props.mode === 'signup' ? this.state.name : this.state.email.split('@')[0];
      this.props.onAuthSuccess(username);
      this.props.navigate('/'); // go to home
    }
  };

  render() {
    const { mode, navigate } = this.props;
    const { name, email, password, errors } = this.state;

    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: '#737a3fb0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Typography>

          <form onSubmit={this.handleSubmit}>
            {mode === 'signup' && (
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={name}
                onChange={this.handleChange}
                error={!!errors.name}
                helperText={errors.name}
                sx={{ mb: 2 }}
              />
            )}

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
              error={!!errors.email}
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
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 3 }}
            />

            <Button fullWidth variant="contained" type="submit" sx={{ backgroundColor: '#3D4127', color: '#fff' }}>
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </Button>
          </form>

          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <Link component="button" onClick={() => navigate('/signup')} sx={{ color: '#3D4127' }}>
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link component="button" onClick={() => navigate('/login')} sx={{ color: '#3D4127' }}>
                  Login
                </Link>
              </>
            )}
          </Typography>
        </Paper>
      </Box>
    );
  }
}
