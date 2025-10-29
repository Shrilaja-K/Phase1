import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <h1  >404 - Page Not Found</h1>
        <p style={{  color: '#555' }}>
          The page you are looking for does not exist.
        </p>
      </div>
    );
  }
}

export default NotFound;
