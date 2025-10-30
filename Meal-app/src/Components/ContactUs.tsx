import React, { Component } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

class ContactUs extends Component {
  state = {
    name: '',
    email: '',
    message: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = this.state;
    if (!name || !email || !message) {
      alert('Please fill all fields');
      return;
    }
    console.log('Form Submitted:', this.state);
    alert('Thank you for contacting us!');
    this.setState({ name: '', email: '', message: '' });
  };

  render() {
    const { name, email, message } = this.state;

    return (
      <Box
        sx={{
          maxWidth: 500,
          mx: 'auto',
          my: 6,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: 'center', color: '#3D4127' }}
        >
          Contact Us
        </Typography>

        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Message"
            name="message"
            value={message}
            onChange={this.handleChange}
            fullWidth
            required
            multiline
            rows={4}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: '#3D4127',
              '&:hover': { backgroundColor: '#2a2c20' },
            }}
          >
            Send Message
          </Button>
        </form>
      </Box>
    );
  }
}

export default ContactUs;
