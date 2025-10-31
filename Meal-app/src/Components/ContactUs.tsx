import React, { Component } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

interface ContactUsProps {
  loggedIn: boolean;
  userEmail?: string;
}

interface ContactUsState {
  name: string;
  email: string;
  message: string;
}

class ContactUs extends Component<ContactUsProps, ContactUsState> {
  constructor(props: ContactUsProps) {
    super(props);
    this.state = {
      name: '',
      email: props.loggedIn && props.userEmail ? props.userEmail : '',
      message: '',
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [e.target.name]: e.target.value } as any);
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = this.state;
    if (!name || !email || !message) {
      alert('Please fill all fields');
      return;
    }
    console.log('Form Submitted:', this.state);
    alert('Thank you for contacting us!');
    this.setState({ name: '', email: this.props.loggedIn && this.props.userEmail ? this.props.userEmail : '', message: '' });
  };

  render() {
    const { name, email, message } = this.state;
    const { loggedIn } = this.props;

    return (
      <Box
        sx={{
          maxWidth: 500,
          mx: 'auto',
          my: 6,
          p: 5,
          borderRadius: 4,
          boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
          background: 'linear-gradient(135deg, #D4DE95 0%, #BAC095 100%)',
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: 'center', color: '#3D4127', fontWeight: 'bold' }}
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
            sx={{
              mb: 2,
              input: { color: '#3D4127', fontWeight: 500 },
              '& label': { color: '#3D4127' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#636B2F' },
                '&:hover fieldset': { borderColor: '#3D4127' },
                '&.Mui-focused fieldset': { borderColor: '#3D4127' },
              },
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={this.handleChange}
            fullWidth
            required
            InputProps={{ readOnly: loggedIn }}
            sx={{
              mb: 2,
              input: { color: '#3D4127', fontWeight: 500 },
              '& label': { color: '#3D4127' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#636B2F' },
                '&:hover fieldset': { borderColor: '#3D4127' },
                '&.Mui-focused fieldset': { borderColor: '#3D4127' },
              },
            }}
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
            sx={{
              mb: 3,
              input: { color: '#3D4127', fontWeight: 500 },
              '& label': { color: '#3D4127' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#636B2F' },
                '&:hover fieldset': { borderColor: '#3D4127' },
                '&.Mui-focused fieldset': { borderColor: '#3D4127' },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#3D4127',
              color: '#D4DE95',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#636B2F' },
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
